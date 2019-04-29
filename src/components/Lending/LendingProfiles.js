import React, { Component } from 'react';
import axios from 'axios';

class LendingProfiles extends Component {
    state = {
        error: null,
        isLoaded: false,
        items: []
    }

    componentDidMount() {

        // This is the GraphQL query
        const query = `
        query {
            lend {
              loans(filters: {status: fundraising}, sortBy: newest) {
                values {
                  id
                }
              }
            }
          }
        `;

        // These variables are optional, leave empty for now
        const variables = {};

        // We call the method here to execute our async function
        this.getLoanItems(query, variables)

    }

    getLoanItems = async (query, variables) => {
        try {
            const response = await axios.post('https://api.kivaws.org/graphql', {
                variables,
                query
            });

            // Log the response so we can look at it in the console
            console.log(response.data)

            // Set the data to the state
            this.setState(() => ({
                isLoaded: true,
                items: response.data.data
            }));

        } catch (error) {
            // If there's an error, set the error to the state
            this.setState(() => ({ error }))
        }
    }

    render() {
        return (
            <div>
                <h1>Lending Profiles</h1>
            </div>
        )
    }
}

export default LendingProfiles;