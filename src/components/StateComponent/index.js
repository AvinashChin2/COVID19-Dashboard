import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TotalCasesContent from '../TotalCasesContent'
import './index.css'

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

class StateComponent extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    dateList: [],
    lastDetails: [],
  }

  componentDidMount() {
    this.getStateFullCases()
    this.getStateCases()
  }

  getStateCases = async () => {
    const {lastDetails} = this.state
    const resultDetails = []
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/covid19-timelines-data/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    statesList.forEach(stateObj => {
      if (data[stateObj.state_code]) {
        const stateId = data[stateObj.state_code]
        const codeNames = Object.keys(stateId.dates)

        codeNames.forEach(code => {
          const confirmed = stateId.dates[code].total.confirmed
            ? stateId.dates[code].total.confirmed
            : 0
          const recovered = stateId.dates[code].total.recovered
            ? stateId.dates[code].total.recovered
            : 0
          const deceased = stateId.dates[code].total.deceased
            ? stateId.dates[code].total.deceased
            : 0
          const tested = stateId.dates[code].total.tested
            ? stateId.dates[code].total.tested
            : 0

          resultDetails.push({
            stateCode: stateObj,
            newDate: code,
            confirmed,
            recovered,
            tested,
            deceased,
            active: confirmed - (deceased + recovered),
          })
        })
      }
      return resultDetails
    })
    const lastDateDetails = resultDetails[49]
    this.setState({
      lastDetails: lastDateDetails,
    })
  }

  getStateFullCases = async () => {
    const {dateList} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/covid19-timelines-data/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    statesList.forEach(stateObj => {
      if (data[stateObj.state_code]) {
        const content = data[stateObj.state_code]
        const keyNames = Object.keys(content.dates)

        keyNames.forEach(date => {
          const confirmed = content.dates[date].total.confirmed
            ? content.dates[date].total.confirmed
            : 0
          const recovered = content.dates[date].total.recovered
            ? content.dates[date].total.recovered
            : 0
          const deceased = content.dates[date].total.deceased
            ? content.dates[date].total.deceased
            : 0
          const tested = content.dates[date].total.tested
            ? content.dates[date].total.tested
            : 0

          dateList.push({
            stateCode: stateObj,
            newDate: date,
            confirmed,
            recovered,
            tested,
            deceased,
            active: confirmed - (deceased + recovered),
          })
        })
      }
      return dateList
    })
    this.setState({
      apiStatus: apiStatusConstants.success,
    })
  }

  renderStateOfLoading = () => (
    <div testid="stateDetailsLoader" className="loader-container">
      <Loader type="Oval" color="#007BFF" height={40} width={40} />
    </div>
  )

  renderStateOfSuccess = () => {
    const {lastDetails} = this.state
    console.log(lastDetails)
    return (
      <div className="state-compo-cases">
        <div className="state-name-test-container">
          <h1>{lastDetails.confirmed}</h1>
        </div>
      </div>
    )
  }

  renderStateComponentPage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderStateOfSuccess()
      case apiStatusConstants.failure:
        return this.renderStateOfFailure()
      case apiStatusConstants.inProgress:
        return this.renderStateOfLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="state-full-page-container">
        {this.renderStateComponentPage()}
      </div>
    )
  }
}
export default StateComponent
