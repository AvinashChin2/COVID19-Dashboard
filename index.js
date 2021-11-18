import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

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

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class StateComponent extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    dateWiseList: [],
  }

  componentDidMount() {
    this.getStateFullCases()
  }

  getStateFullCases = async () => {
    const {dateWiseList} = this.state
    const casesList = []
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/covid19-timelines-data/`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const codeList = []
      const code = statesList.map(eachCode => eachCode.state_code)
      codeList.push(code)
      console.log(codeList)
      const keyNames = Object.keys(response.codeList.dates)
      console.log(keyNames)
      const updatedData = statesList.forEach(date => ({
        fullDate: date,
        confirmed: data.state_code.dates[date].total.confirmed,
        deceased: data.state_code.dates[date].total.deceased,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        dateWiseList: updatedData,
      })
    }
  }

  renderStateOfLoading = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#007BFF" height={40} width={40} />
    </div>
  )

  renderStateList = () => (
    <div>
      {this.rendercases()}
      {this.renerTimeline()}
    </div>
  )

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
