// import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
// import { Base_Url } from "./api";

// export const apolloClient = new ApolloClient({
// 	link: new HttpLink({
// 		uri: `${Base_Url}/graphql`,
// 	}),
// 	cache: new InMemoryCache(),
// });

import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { CombinedGraphQLErrors, ServerError } from "@apollo/client/errors";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { Base_Url } from "./api";
import { refreshAccessToken } from "@/lib/auth-session";
import { getAccessToken } from "@/lib/auth-token";
import { Observable, type Subscription } from "rxjs";

// 1. HTTP link
const httpLink = new HttpLink({
	uri: `${Base_Url}/graphql`,
});

// 2. Auth link (token qo‘shadi)
const authLink = setContext((_, { headers }) => {
	const token = getAccessToken();

	return {
		headers: {
			...headers,
			Authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const errorLink = onError(({ error, operation, forward }) => {
	const isGraphQlUnauthorized =
		CombinedGraphQLErrors.is(error) &&
		error.errors.some(graphQlError => {
			const code = graphQlError.extensions?.code;
			const message = graphQlError.message?.toLowerCase();

			return code === "UNAUTHENTICATED" || message?.includes("unauthorized");
		});

	const isNetworkUnauthorized =
		ServerError.is(error) && error.statusCode === 401;

	if (!isGraphQlUnauthorized && !isNetworkUnauthorized) {
		return;
	}

	const context = operation.getContext();

	if (context.alreadyRetried) {
		return;
	}

	operation.setContext({
		...context,
		alreadyRetried: true,
	});

	return new Observable(observer => {
		let subscription: Subscription | undefined;
		let isDisposed = false;

		void refreshAccessToken().then(nextAccessToken => {
			if (isDisposed) {
				return;
			}

			if (!nextAccessToken) {
				observer.error(error);
				return;
			}

			operation.setContext(({ headers = {}, ...rest }) => ({
				...rest,
				headers: {
					...headers,
					Authorization: `Bearer ${nextAccessToken}`,
				},
			}));

			subscription = forward(operation).subscribe(observer);
		});

		return () => {
			isDisposed = true;
			subscription?.unsubscribe();
		};
	});
});

// 3. Apollo client
export const apolloClient = new ApolloClient({
	link: from([errorLink, authLink, httpLink]),
	cache: new InMemoryCache(),
});
