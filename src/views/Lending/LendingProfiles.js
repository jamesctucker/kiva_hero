import React, { Component } from 'react';
import gql from "graphql-tag";
import Countdown from 'react-countdown-now';
import { Query } from "react-apollo";
import './Lending.css';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';






const kivaLoans = gql`
    query ($sortBy: LoanSearchSortByEnum, $limit: Int) {
  lend {
    loans(filters: {status: fundraising}, sortBy: $sortBy, limit: $limit) {
      values {
        id
        plannedExpirationDate
        image {
          url(customSize: "s900")
        }
        name
        loanFundraisingInfo {
          fundedAmount
        }
        loanAmount
        description
        loanAmount
      }
    }
  }
}`;

const country = [
    {
        name: h, value: j,
    }
];



const renderer = ({ hours, minutes, seconds }) => {
    if (hours <= 1) {
        return <span>{hours}hr {minutes}mins {seconds}secs</span>
    } else if (hours <= 1 && minutes <= 1) {
        return <span>{hours}hr {minutes}min {seconds}secs</span>
    } else {
        return <span>{hours}hrs {minutes}mins {seconds}secs</span>
    }
}



class LendingProfiles extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sort: 'expiringSoon',
            limitResults: 10
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };



    render() {
        const { sort, limitResults } = this.state;
        return (
            <Query query={kivaLoans} variables={{ sortBy: sort, limit: limitResults }}>
                {({ data, loading, error }) => {
                    if (loading) return <div><p>Loading...</p></div>;
                    if (error) return <p>ERROR</p>;

                    return (
                        <Grid
                            direction="row"
                            justify="space-evenly"
                            container
                            spacing={24}
                        >
                            <Grid item xs={2}>
                                <Paper align="center" className="paper-filter">
                                    <FormControl variant="outlined" className="form-control">
                                        <InputLabel>
                                            Sort By
                                        </InputLabel>
                                        <Select
                                            className="dropdown"
                                            value={this.state.sort}
                                            onChange={this.handleChange}
                                            input={<OutlinedInput name="sort" id="outlined-sort-simple" />}
                                        >
                                            <MenuItem value={"amountLeft"}>Amount Left</MenuItem>
                                            <MenuItem value={"expiringSoon"}>Expiring Soonest</MenuItem>
                                            <MenuItem value={"newest"}>Newest</MenuItem>
                                            <MenuItem value={"random"}>Random</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl variant="outlined" className="form-control">
                                        <InputLabel>
                                            Results
                                        </InputLabel>
                                        <Select
                                            className="dropdown"
                                            value={this.state.limitResults}
                                            onChange={this.handleChange}
                                            input={<OutlinedInput name="limitResults" id="outlined-limit-simple" />}
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={10}>10</MenuItem>
                                            <MenuItem value={20}>20</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Paper>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography id="intro" gutterBottom variant="display1">
                                    Fund an expiring loan, save an entrepreneur's dream.
                                </Typography>
                                {
                                    data.lend.loans.values.map(value => (
                                        <Paper
                                            className="card"
                                            id="main-paper"
                                            key={value.id}
                                            value={value}
                                            elevation={3}
                                        >
                                            <Grid className="card-grid" justify="center" container spacing={24}>
                                                <Grid item lg={6}>
                                                    <img
                                                        className="card-image"
                                                        src={value.image.url}
                                                        alt={value.name}
                                                    />
                                                </Grid>
                                                <Grid item lg={6}>
                                                    <Paper className="loan-paper" elevation={2}>
                                                        <Typography gutterBottom variant="display1">
                                                            {value.name}
                                                        </Typography>
                                                        <br />
                                                        <Typography gutterBottom variant="body1">
                                                            Raised ${value.loanFundraisingInfo.fundedAmount} of ${value.loanAmount}
                                                        </Typography>
                                                        <Typography color="error" gutterBottom variant="body1">
                                                            Expires in <Countdown date={value.plannedExpirationDate} renderer={renderer} />
                                                        </Typography>
                                                        <br />
                                                        <Link target='_blank' rel='noopener noreferrer' href={`https://www.kiva.org/lend/${value.id}`}>
                                                            <Button variant="contained" id="lend-btn">Lend Now</Button>
                                                        </Link>
                                                    </Paper>
                                                </Grid>
                                                <Grid item lg={12}>
                                                    <Paper className="paper" elevation={2}>
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
                                    ))}
                            </Grid>

                        </Grid>
                    );
                }}
            </Query>

        );
    }
}





export default LendingProfiles;