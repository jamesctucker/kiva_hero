import React, { Component, Fragment } from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const kivaLoans = gql`
    {
  lend {
    loans(filters: {status: fundraising}, sortBy: newest) {
      values {
        id,
        plannedExpirationDate,
        image {
          url
        },
        name,
        loanAmount,
        description
      }
    }
  }
}
`;


function LendingProfiles() {

    return (
        <div>
            <Query query={kivaLoans}>
                {({ data, loading, error }) => {
                    if (loading) return <div><p>Loading...</p></div>;
                    if (error) return <p>ERROR</p>;

                    return (
                        <div>
                            {
                                data.lend.loans.values.map(value => (
                                    <Card
                                        key={value.id}
                                        value={value}
                                    >
                                        <CardMedia
                                            image={value.image.url}
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {value.name}
                                            </Typography>

                                        </CardContent>
                                    </Card>
                                ))}
                        </div>
                    );
                }}
            </Query>

        </div>
    );
}





export default LendingProfiles;