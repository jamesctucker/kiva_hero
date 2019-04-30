import React, { Component, Fragment } from 'react';
import gql from "graphql-tag";
import Moment from 'react-moment';
import Countdown from 'react-countdown-now';
import { Query } from "react-apollo";
import './Lending.css';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const kivaLoans = gql`
    {
  lend {
    loans(filters: {status: fundraising}, sortBy: expiringSoon, limit: 50) {
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
                            <Grid
                                alignItems="center"
                                direction="column"
                                justify="center"
                                container
                                spacing={24}>
                                {
                                    data.lend.loans.values.map(value => (
                                        <Grid item xl={6}>
                                            <Card
                                                className="card"
                                                key={value.id}
                                                value={value}
                                            >
                                                <Grid justify="center" container spacing={40}>
                                                    <Grid item lg={6}>
                                                        <img
                                                            className="card-image"
                                                            src={value.image.url}
                                                            alt="Contemplative Reptile"
                                                        />
                                                    </Grid>
                                                    <Grid item lg={6}>

                                                        <Typography gutterBottom variant="h3" component="h2">
                                                            {value.name}
                                                        </Typography>
                                                        <Typography gutterBottom variant="h5">
                                                            ${value.loanFundraisingInfo.fundedAmount} of ${value.loanAmount}
                                                        </Typography>
                                                        <Typography gutterBottom variant="h5">
                                                            {/* <Moment interval={1000} parse="hh:mm:ss" durationFromNow date={value.plannedExpirationDate} /> */}
                                                            <Countdown date={Date.now() + 10000} />,
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item lg={12}>
                                                        <Typography gutterBottom variant="body1">
                                                            {value.description}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        </Grid>
                                    ))}
                            </Grid>
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