import React, { Component, Fragment } from 'react';
import gql from "graphql-tag";
import Moment from 'react-moment';
import { Query } from "react-apollo";
import './Lending.css';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const kivaLoans = gql`
    {
  lend {
    loans(filters: {status: fundraising}, sortBy: expiringSoon) {
      values {
        id,
        plannedExpirationDate,
        image {
            url(presetSize: original)
        },
        name,
        loanFundraisingInfo { fundedAmount },
        loanAmount,
        description,
      }
    }
  }
}
`;



const styles = {
    card: {
        maxWidth: 360,
    }
};


function LendingProfiles(props) {
    const { classes } = props;


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
                                        className="card"
                                        key={value.id}
                                        value={value}
                                    >
                                        <img
                                            className="card-image"
                                            src={value.image.url}
                                            alt="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h3" component="h2">
                                                {value.name}
                                            </Typography>
                                            <Typography gutterBottom variant="h5">
                                                ${value.loanFundraisingInfo.fundedAmount} of ${value.loanAmount}
                                            </Typography>
                                            <Typography gutterBottom variant="h5">
                                                <Moment interval={1000} date={value.plannedExpirationDate} durationFromNow />
                                            </Typography>
                                            <Typography gutterBottom variant="body1">
                                                {value.description}
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



LendingProfiles.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LendingProfiles);