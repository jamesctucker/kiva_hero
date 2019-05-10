import gql from "graphql-tag";


// graphQL query pulls data from kiva.org/graphql explorer; api url is sourced in index.js
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


export default kivaLoans;

