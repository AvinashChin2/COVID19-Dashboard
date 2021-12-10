import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import StateListDetails from '../StateListDetails'
import Footer from '../Footer'
import './index.css'
import StateSpecific from '../State-specific'
import SearchItem from '../SearchItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class Home extends Component {
  state = {
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    resultListDetails: [],
    filteredData: [],
  }

  componentDidMount() {
    this.getStateWiseDetailsList()
  }

  getStateWiseDetailsList = async () => {
    const {resultListDetails} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const keyNames = Object.keys(data)
      console.log(keyNames)
      statesList.forEach(stateObj => {
        if (data[stateObj.state_code]) {
          const {total} = data[stateObj.state_code]
          const confirmed = total.confirmed ? total.confirmed : 0
          const deceased = total.deceased ? total.deceased : 0
          const recovered = total.recovered ? total.recovered : 0
          const tested = total.tested ? total.tested : 0
          const population = data[stateObj.state_code].meta.population
            ? data[stateObj.state_code].meta.population
            : 0

          resultListDetails.push({
            stateCode: stateObj,
            confirmed,
            deceased,
            recovered,
            tested,
            population,
            active: confirmed - (deceased + recovered),
          })
        }
        return resultListDetails
      })
      console.log(resultListDetails)
      this.setState({
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeInput = event => {
    const {searchInput, resultListDetails, filteredData} = this.state
    this.setState({searchInput: event.target.value})
    if (searchInput !== '') {
      const matches = resultListDetails.filter(eachState =>
        eachState.stateCode.state_name
          .toLowerCase()
          .includes(searchInput.toLowerCase()),
      )
      this.setState({filteredData: matches})
    } else {
      this.setState({filteredData: []})
    }
  }

  renderStateList = () => {
    const {searchInput, resultListDetails, filteredData} = this.state

    return (
      <div className="main-home-content-container">
        <div className="search-container">
          <div className="search-container-box">
            <BsSearch className="search-icon" />
            <input
              type="search"
              value={searchInput}
              className="input-box"
              placeholder="Enter the State"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="render-list-items">
            {filteredData.length !== 0 ? (
              <div className="search-container-items">
                <ul className="list-items-search-input">
                  {filteredData.map(eachStateName => (
                    <SearchItem
                      searchItemDetails={eachStateName}
                      key={eachStateName.stateCode}
                    />
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        <div
          className="state-wise-list-container"
          testid="stateWiseCovidDataTable"
        >
          <div className="home-table-headings">
            <div className="state-heading-and-icons">
              <p className="table-states-main-heading">States/UT</p>
              <button
                type="button"
                className="home-sort-button"
                testid="ascendingSort"
              >
                <FcGenericSortingAsc className="sort-icon" />
              </button>
              <button
                type="button"
                className="home-sort-button"
                testid="descendingSort"
              >
                <FcGenericSortingDesc className="sort-icon" />
              </button>
            </div>
            <p className="table-states-main-heading">Confirmed</p>
            <p className="table-states-main-heading">Active</p>
            <p className="table-states-main-heading">Recovered</p>
            <p className="table-states-main-heading">Deceased</p>
            <p className="table-states-main-heading">Population</p>
          </div>
          <hr className="home-horizontal-line" />
          <ul className="list-states">
            {resultListDetails.map(eachState => (
              <StateListDetails
                stateWiseDetails={eachState}
                key={eachState.stateCode}
              />
            ))}
          </ul>
        </div>
        <div className="home-footer-container">
          <Footer />
        </div>
      </div>
    )
  }

  renderHomeLoading = () => (
    <div testid="homeRouteLoader" className="loader-container">
      <Loader type="Oval" color="#007BFF" height={40} width={40} />
    </div>
  )

  renderHomePage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderStateList()
      case apiStatusConstants.failure:
        return this.renderHomeFailure()
      case apiStatusConstants.inProgress:
        return this.renderHomeLoading()
      default:
        return null
    }
  }

  render() {
    return <div className="app-container">{this.renderHomePage()}</div>
  }
}
export default Home
