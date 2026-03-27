// import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
// import { Base_Url } from "./api";

// export const apolloClient = new ApolloClient({
// 	link: new HttpLink({
// 		uri: `${Base_Url}/graphql`,
// 	}),
// 	cache: new InMemoryCache(),
// });

import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Base_Url } from "./api";

// 1. HTTP link
const httpLink = new HttpLink({
	uri: `${Base_Url}/graphql`,
});

// 2. Auth link (token qo‘shadi)
const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("accessToken");

	return {
		headers: {
			...headers,
			Authorization: token ? `Bearer ${token}` : "",
		},
	};
});

// 3. Apollo client
export const apolloClient = new ApolloClient({
	link: from([authLink, httpLink]),
	cache: new InMemoryCache(),
});
