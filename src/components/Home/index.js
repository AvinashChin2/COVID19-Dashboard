import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {searchInput: '', apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getStateWiseDetailsList()
  }

  getStateWiseDetailsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
    }
  }

  renderStateList = () => {
    const {searchInput} = this.state
    return (
      <div className="search-container">
        <BsSearch className="search-icon" />
        <input type="search" />
      </div>
    )
  }

  renderHomeLoading = () => (
    <div testid="loader" className="loader-container">
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
