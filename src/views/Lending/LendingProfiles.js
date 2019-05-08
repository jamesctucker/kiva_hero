import React, { Component } from 'react';
import axios from 'axios';
import gql from "graphql-tag";
import Countdown from 'react-countdown-now';
import { Query } from "react-apollo";
// import Nav from './../../components/Nav/Nav';
import './Lending.css';

import Button from '@material-ui/core/Button';
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

import Female_Clothier from './woman-clothier.jpg';


const kivaLoans = gql`
    query ($country: [String], $sortBy: LoanSearchSortByEnum, $limit: Int) {
  lend {
    loans(filters: {status: fundraising, country: $country}, sortBy: $sortBy, limit: $limit) {
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


const renderer = ({ hours, minutes, seconds }) => {
    return <div className="timer-div">
        <span className="timer-intro">Expires in</span>
        <span className="timer-hours">{hours}</span><span className="timer-header">hr</span>
        <span className="timer-minutes">{minutes}</span><span className="timer-header">min</span>
        <span className="timer-seconds">{seconds}</span><span className="timer-header">sec</span>
    </div>
}


class LendingProfiles extends Component {
    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            sort: 'expiringSoon',
            country: " ",
            limitResults: 10
        }
    }

    componentDidMount() {
        axios
            .get('https://api.jsonbin.io/b/5cd324de64d4fc359ead9996/2')
            .then(response => {
                this.setState({
                    countries: response.data,
                });
                console.log(response.data);
            })
            .catch(error => this.setState({ error }));

    }


    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };


    render() {
        const { country, sort, limitResults, countries } = this.state;
        return (
            <Query query={kivaLoans} variables={{ country: country, sortBy: sort, limit: limitResults }}>
                {({ data, loading, error }) => {
                    if (loading) return <div><p>Loading...</p></div>;
                    if (error) return <p>ERROR</p>;

                    return (
                        <div>
                            <div className="container">
                                <img id="header-image" src={Female_Clothier} alt="header-image" />
                                <h1 className="centered">Rescue An Entrepreneur's Dream</h1>

                            </div>
                            <Paper id="main-background" elevation={10}>

                                <Grid
                                    direction="row"
                                    justify="space-evenly"
                                    container
                                    spacing={24}
                                >
                                    <Grid item xs={12} sm={4}>
                                        <Paper align="center" className="paper-filter" elevation={20}>
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
                                            <FormControl variant="outlined" className="form-control">
                                                <InputLabel>
                                                    Country
                                        </InputLabel>
                                                <Select
                                                    className="dropdown"
                                                    value={this.state.country}
                                                    onChange={this.handleChange}
                                                    input={<OutlinedInput name="country" id="outlined-country-simple" />}
                                                >
                                                    <MenuItem value={" "}>All</MenuItem>
                                                    {countries.map(country => (
                                                        <MenuItem key={country} value={country.value}>
                                                            {country.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        {
                                            data.lend.loans.values.map(value => (
                                                <Paper
                                                    className="card"
                                                    id="main-paper"
                                                    key={value.id}
                                                    value={value}
                                                    elevation={20}
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
                                                                <Typography id="loan-name" gutterBottom variant="display1">
                                                                    {value.name}
                                                                </Typography>
                                                                <Divider />
                                                                <div className="loan-amount-div">
                                                                    <span className="timer-header">Raised</span><span id="loan-amount">${value.loanFundraisingInfo.fundedAmount}</span><span className="timer-header">of ${value.loanAmount}</span>
                                                                </div>
                                                                <Divider />
                                                                <div className="loan-countdown-div">
                                                                    <Countdown date={value.plannedExpirationDate} renderer={renderer} />
                                                                </div>
                                                                <Divider />
                                                                <Link target='_blank' rel='noopener noreferrer' href={`https://www.kiva.org/lend/${value.id}`}>
                                                                    <Button variant="contained" id="lend-btn">Lend Now</Button>
                                                                </Link>
                                                            </Paper>
                                                        </Grid>
                                                        <Grid item lg={12}>
                                                            <Paper className="paper" elevation={2}>
                                                                <Typography id="description-text" variant="h5">
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
                            </Paper>
                        </div>
                    );
                }}

            </Query>

        );
    }
}





export default LendingProfiles;