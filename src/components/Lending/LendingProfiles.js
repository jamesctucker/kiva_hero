import React, { Component } from 'react';
import gql from "graphql-tag";
import Moment from 'react-moment';
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
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
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
          url(customSize: "s500")
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
            sort: 'random',
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
                            container
                            spacing={0}
                            className="grid-main">
                            <Grid item xs={4}>
                                <Card align="center" className="card-button">
                                    <FormControl className="form-control">
                                        <Select
                                            className="dropdown"
                                            label="Sort By"
                                            value={this.state.sort}
                                            onChange={this.handleChange}
                                            input={<Input name="sort" id="filled-sort-simple" />}
                                        >
                                            <MenuItem value={"amountLeft"}>Amount Left</MenuItem>
                                            <MenuItem value={"expiringSoon"}>Expiring</MenuItem>
                                            <MenuItem value={"newest"}>Newest</MenuItem>
                                            <MenuItem value={"random"}>Random</MenuItem>
                                        </Select>
                                        <FormHelperText className="dropdown">Sort By</FormHelperText>
                                    </FormControl>
                                    <FormControl className="form-control">
                                        <Select
                                            className="dropdown"
                                            value={this.state.limitResults}
                                            onChange={this.handleChange}
                                            input={<Input name="limitResults" id="filled-limit-simple" />}
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={10}>10</MenuItem>
                                            <MenuItem value={20}>20</MenuItem>
                                        </Select>
                                        <FormHelperText className="dropdown">Limit Results</FormHelperText>
                                    </FormControl>
                                </Card>
                            </Grid>
                            <Grid item xs={8}>

                                {
                                    data.lend.loans.values.map(value => (
                                        <Paper
                                            className="card"
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
                                                    <Typography gutterBottom variant="display1">
                                                        {value.name}
                                                    </Typography>
                                                    <br />
                                                    <Typography gutterBottom variant="body2">
                                                        Loan Details
                                                            </Typography>
                                                    <Typography gutterBottom variant="body1">
                                                        Raised ${value.loanFundraisingInfo.fundedAmount} of ${value.loanAmount}
                                                    </Typography>
                                                    <Typography color="error" gutterBottom variant="body1">
                                                        Expires in <Countdown date={value.plannedExpirationDate} renderer={renderer} />
                                                    </Typography>
                                                    <Link target='_blank' rel='noopener noreferrer' href={`https://www.kiva.org/lend/${value.id}`}>
                                                        <Button variant="contained" color="primary">Lend Now</Button>
                                                    </Link>
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