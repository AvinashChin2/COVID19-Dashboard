import {Component, React} from 'react'
import Loader from 'react-loader-spinner'
import {BsCheckCircleFill} from 'react-icons/bs'
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
    districtsList: [],
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
    this.setState({apiStatus: apiStatusConstants.inProgress})
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
            stateCode: stateObj.state_name,
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
      apiStatus: apiStatusConstants.success,
    })
  }

  getStateFullCases = async () => {
    const {districtsList} = this.state
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
        const districtNames = Object.keys(content.districts)
        districtNames.forEach(district => {
          const districtDates = Object.keys(content.districts[district].dates)
          districtDates.forEach(date => {
            const confirmed = content.districts[district].dates[date].total
              .confirmed
              ? content.districts[district].dates[date].total.confirmed
              : 0
            const recovered = content.districts[district].dates[date].total
              .recovered
              ? content.districts[district].dates[date].total.recovered
              : 0
            const deceased = content.districts[district].dates[date].total
              .deceased
              ? content.districts[district].dates[date].total.deceased
              : 0

            districtsList.push({
              districtName: district,
              confirmed,
              deceased,
              recovered,
              active: confirmed - (deceased + recovered),
              newDate: date,
            })
          })
        })
      }
      return dateList
    })
    console.log(districtsList)
    this.setState({
      apiStatus: apiStatusConstants.success,
    })
  }

  renderStateCasesOfLoading = () => (
    <div testid="stateDetailsLoader" className="state-loader-container">
      <Loader type="Oval" color="#007BFF" height={40} width={40} />
    </div>
  )

  renderStateCasesOfSuccess = () => {
    const {lastDetails} = this.state

    return (
      <div className="state-cases-main-compo-container">
        <div className="main-content">
          <div className="state-name-tested-container">
            <div className="state-name-container">
              <h1 className="state-name-specific">{lastDetails.stateCode}</h1>
              <p className="state-date-specific">
                Last Update on october 31th 2021.
              </p>
            </div>
            <div className="tested-cases-container">
              <p className="tested-name">Tested</p>
              <p className="tested-count">{lastDetails.tested}</p>
            </div>
          </div>
        </div>
        <div className="all-cases-container-state">
          <div
            className="confirmed-container-state"
            testid="stateSpecificConfirmedCasesContainer"
          >
            <button type="button" className="confirmed-button">
              <p className="confirmed-text">Confirmed</p>
              <img
                src="https://res.cloudinary.com/avinashchinthapally/image/upload/v1637754802/Project%20Images/check-mark_1_lv6pdk.svg"
                alt="state specific confirmed cases pic"
                className="check-icon-1"
              />
              <p className="confirmed-count">{lastDetails.confirmed}</p>
            </button>
          </div>
          <div
            className="active-container-state"
            testid="stateSpecificActiveCasesContainer"
          >
            <button type="button" className="active-button">
              <p className="active-text">Active</p>
              <img
                src="https://res.cloudinary.com/avinashchinthapally/image/upload/v1637753075/Project%20Images/protection_1_lv7qls.svg"
                alt="state specific active cases pic"
                className="check-icon-2"
              />
              <p className="active-count">{lastDetails.active}</p>
            </button>
          </div>
          <div
            className="recovered-container-state"
            testid="stateSpecificRecoveredCasesContainer"
          >
            <button type="button" className="recovered-button">
              <p className="recovered-text">Recovered</p>
              <img
                src="https://res.cloudinary.com/avinashchinthapally/image/upload/v1637753210/Project%20Images/recovered_1_grkgaa.svg"
                alt="state specific recovered cases pic"
                className="check-icon-3"
              />
              <p className="recovered-count">{lastDetails.recovered}</p>
            </button>
          </div>
          <div
            className="deceased-container-state"
            testid="stateSpecificDeceasedCasesContainer"
          >
            <button type="button" className="deceased-button">
              <p className="deceased-text">Deceased</p>
              <img
                src="https://res.cloudinary.com/avinashchinthapally/image/upload/v1637753322/Project%20Images/breathing_1_u9ikvw.svg"
                alt="state specific deceased cases pic"
                className="check-icon-4"
              />
              <p className="deceased-count">{lastDetails.deceased}</p>
            </button>
          </div>
        </div>
      </div>
    )
  }

  renderTimeLineSuccess = () => {
    const {dateList} = this.state
  }

  renderStateTimeLineLoading = () => {
    ;<div testid="timelinesDataLoader" className="timeline-loader-container">
      <Loader type="Oval" color="#007BFF" height={40} width={40} />
    </div>
  }

  renderStateComponentCases = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderStateCasesOfSuccess()
      case apiStatusConstants.failure:
        return this.renderStateCasesOfFailure()
      case apiStatusConstants.inProgress:
        return this.renderStateCasesOfLoading()
      default:
        return null
    }
  }

  renderStateTimeLine = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTimeLineSuccess()
      case apiStatusConstants.failure:
        return this.renderTimeLineFailure()
      case apiStatusConstants.inProgress:
        return this.renderStateTimeLineLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="state-full-page-container">
        {this.renderStateComponentCases()}
        {this.renderStateTimeLine()}
      </div>
    )
  }
}
export default StateComponent
