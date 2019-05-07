import React, { Component } from 'react';
import gql from "graphql-tag";
import Countdown from 'react-countdown-now';
import { Query } from "react-apollo";
// import Nav from './../../components/Nav/Nav';
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

const countries = [
    {
        "name": "Albania",
        "value": "AL"
    },
    {
        "name": "Armenia",
        "value": "AM"
    },
    {
        "name": "Bangladesh",
        "value": "BD"
    },
    {
        "name": "Belize",
        "value": "BZ"
    },
    {
        "name": "Benin",
        "value": "BJ"
    },
    {
        "name": "Bhutan",
        "value": "BT"
    },
    {
        "name": "Bolivia",
        "value": "BO"
    },
    {
        "name": "Brazil",
        "value": "BR"
    },
    {
        "name": "Burkina Faso",
        "value": "BF"
    },
    {
        "name": "Cambodia",
        "value": "KH"
    },
    {
        "name": "Cameroon",
        "value": "CM"
    },
    {
        "name": "Canada",
        "value": "CA"
    },
    {
        "name": "Colombia",
        "value": "CO"
    },
    {
        "name": "Congo (DRC)",
        "value": "CD"
    },
    {
        "name": "Costa Rica",
        "value": "CR"
    },
    {
        "name": "Cote D'Ivoire",
        "value": "CI"
    },
    {
        "name": "Dominican Republic",
        "value": "DO"
    },
    {
        "name": "Ecuador",
        "value": "EC"
    },
    {
        "name": "Egypt",
        "value": "EG"
    },
    {
        "name": "El Salvador",
        "value": "SV"
    },
    {
        "name": "Fiji",
        "value": "FJ"
    },
    {
        "name": "Georgia",
        "value": "GE"
    },
    {
        "name": "Ghana",
        "value": "GH"
    },
    {
        "name": "Guam",
        "value": "GU"
    },
    {
        "name": "Guatemala",
        "value": "GT"
    },
    {
        "name": "Haiti",
        "value": "HT"
    },
    {
        "name": "Honduras",
        "value": "HN"
    },
    {
        "name": "India",
        "value": "IN"
    },
    {
        "name": "Indonesia",
        "value": "ID"
    },
    {
        "name": "Israel",
        "value": "IL"
    },
    {
        "name": "Jordan",
        "value": "JO"
    },
    {
        "name": "Kenya",
        "value": "KE"
    },
    {
        "name": "Kosovo",
        "value": "XK"
    },
    {
        "name": "Kyrgyzstan",
        "value": "KG"
    },
    {
        "name": "Lao",
        "value": "LA"
    },
    {
        "name": "Lebanon",
        "value": "LB"
    },
    {
        "name": "Lesotho",
        "value": "LS"
    },
    {
        "name": "Liberia",
        "value": "LR"
    },
    {
        "name": "Madagascar",
        "value": "MG"
    },
    {
        "name": "Malawi",
        "value": "MW"
    },
    {
        "name": "Mali",
        "value": "ML"
    },
    {
        "name": "Mexico",
        "value": "MX"
    },
    {
        "name": "Moldova",
        "value": "MD"
    },
    {
        "name": "Mozambique",
        "value": "MZ"
    },
    {
        "name": "Myanmar",
        "value": "MM"
    },
    {
        "name": "Namibia",
        "value": "NA"
    },
    {
        "name": "Nepal",
        "value": "NP"
    },
    {
        "name": "Nicaragua",
        "value": "NI"
    },
    {
        "name": "Nigeria",
        "value": "NG"
    },
    {
        "name": "Pakistan",
        "value": "PK"
    },
    {
        "name": "Palestine",
        "value": "PS"
    },
    {
        "name": "Panama",
        "value": "PA"
    },
    {
        "name": "Papua New Guinea",
        "value": "PG"
    },
    {
        "name": "Paraguay",
        "value": "PY"
    },
    {
        "name": "Peru",
        "value": "PE"
    },
    {
        "name": "Philippines",
        "value": "PH"
    },
    {
        "name": "Puerto Rico",
        "value": "PR"
    },
    {
        "name": "Rwanda",
        "value": "RW"
    },
    {
        "name": "Samoa",
        "value": "WS"
    },
    {
        "name": "Senegal",
        "value": "SN"
    },
    {
        "name": "Sierra Leone",
        "value": "SL"
    },
    {
        "name": "Solomon Islands",
        "value": "SB"
    },
    {
        "name": "South Africa",
        "value": "ZA"
    },
    {
        "name": "South Sudan",
        "value": "SS"
    },
    {
        "name": "Tajikistan",
        "value": "TJ"
    },
    {
        "name": "Tanzania",
        "value": "TZ"
    },
    {
        "name": "Thailand",
        "value": "TH"
    },
    {
        "name": "Timor-Leste",
        "value": "TL"
    },
    {
        "name": "Togo",
        "value": "TG"
    },
    {
        "name": "Tonga",
        "value": "TO"
    },
    {
        "name": "Turkey",
        "value": "TR"
    },
    {
        "name": "Uganda",
        "value": "UG"
    },
    {
        "name": "United States",
        "value": "US"
    },
    {
        "name": "Vietnam",
        "value": "VN"
    },
    {
        "name": "Virgin Islands",
        "value": "VI"
    },
    {
        "name": "Zambia",
        "value": "ZM"
    },
    {
        "name": "Zimbabwe",
        "value": "ZW"
    }
];



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
            sort: 'expiringSoon',
            country: " ",
            limitResults: 10
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };



    render() {
        const { country, sort, limitResults } = this.state;
        return (
            <Query query={kivaLoans} variables={{ country: country, sortBy: sort, limit: limitResults }}>
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
                            <Grid item xs={12}>
                                <img id="header-image" src={Female_Clothier} alt="header-image" />
                            </Grid>
                            <Grid item xs={2}>
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