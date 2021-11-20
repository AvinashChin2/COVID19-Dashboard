import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

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
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/covid19-timelines-data/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const resultListDetails = this.props
      const {stateCode} = resultListDetails
      const data = await response.json()
      console.log(data)
      const keyNames = Object.keys(data.stateCode.dates)
      console.log(keyNames)
    }
  }

  renderStateOfLoading = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#007BFF" height={40} width={40} />
    </div>
  )

  renderStateOfSuccess = () => (
    <div>
      {this.rendercases}
      {this.renderTimeline}
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
