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
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


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
                                            <Paper
                                                className="card"
                                                key={value.id}
                                                value={value}
                                                elevation={8}
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
                                                        <Typography gutterBottom variant="display1">
                                                            {value.name}
                                                        </Typography>
                                                        <Paper className="paper" elevation={6}>
                                                            <Typography gutterBottom variant="h5">
                                                                Loan Details
                                                            </Typography>
                                                            <Typography gutterBottom variant="subtitle1">
                                                                Raised ${value.loanFundraisingInfo.fundedAmount} of ${value.loanAmount}
                                                            </Typography>
                                                            <Typography gutterBottom variant="subtitle1">
                                                                Expires in <Countdown date={value.plannedExpirationDate} renderer={renderer} />
                                                            </Typography>
                                                        </Paper>
                                                    </Grid>
                                                    <Grid item lg={12}>
                                                        <Paper className="paper" elevation={6}>
                                                            <Typography variant="h5">
                                                                {value.name}'s Story
                                                        </Typography>
                                                            <br />
                                                            <Typography gutterBottom variant="body1">
                                                                {value.description}
                                                            </Typography>
                                                        </Paper>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
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