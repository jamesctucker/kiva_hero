import React from 'react';
import ReactDOM from 'react-dom';
import App from './../src/views/App/App';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import './index.css';

const client = new ApolloClient({
    uri: "https://api.kivaws.org/graphql"
});






//wraps app in provider so it can access store
ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);