import React, { Component, Fragment } from 'react';
import gql from "graphql-tag";
import Moment from 'react-moment';
import Countdown from 'react-countdown-now';
import { Query } from "react-apollo";
import './Lending.css';


import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';
import Grid from '@material-ui/core/Grid';

import { MdHourglassEmpty } from "react-icons/md";


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

const renderer = ({ hours, minutes, seconds }) => {
    if (hours <= 1) {
        return <span>{hours}hr {minutes}mins {seconds}secs</span>
    } else if (hours <= 1 && minutes <= 1) {
        return <span>{hours}hr {minutes}min {seconds}secs</span>
    } else {
        return <span>{hours}hrs {minutes}mins {seconds}secs</span>
    }
}




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
                                                <Grid className="card-grid" justify="flex-start" container spacing={40}>
                                                    <Grid item lg={6}>
                                                        <img
                                                            className="card-image"
                                                            src={value.image.url}
                                                            alt="Contemplative Reptile"
                                                        />
                                                    </Grid>
                                                    <Grid item lg={6}>
                                                        <Typography gutterBottom variant="h4" component="h2">
                                                            {value.name}
                                                        </Typography>
                                                        <Typography gutterBottom variant="h6">
                                                            ${value.loanFundraisingInfo.fundedAmount} of ${value.loanAmount}
                                                        </Typography>
                                                        <Typography gutterBottom variant="h6">
                                                            Expires in <Countdown date={value.plannedExpirationDate} renderer={renderer} />
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item lg={12}>
                                                        <Typography variant="h5">
                                                            Hassan's Story
                                                        </Typography>
                                                        <br />
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





export default LendingProfiles;