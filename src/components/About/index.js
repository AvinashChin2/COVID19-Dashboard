import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Faqs from '../Faqs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class About extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    aboutFactoids: [],
    aboutFaqs: [],
  }

  componentDidMount() {
    this.getAboutPageDetails()
  }

  getAboutPageDetails = async () => {
    const {aboutFactoids, aboutFaqs} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.faq.map(eachFaq => ({
        answer: eachFaq.answer,
        category: eachFaq.category,
        qno: eachFaq.qno,
        question: eachFaq.question,
      }))
      aboutFaqs.push(updatedData)
      this.setState({
        aboutFaqs: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.renderAboutFailure()
    }
  }

  renderAboutSuccess = () => {
    const {aboutFactoids, aboutFaqs} = this.state
    return (
      <div>
        {aboutFaqs.map(eachItem => (
          <Faqs faqDetails={eachItem} key={eachItem.qno} />
        ))}
      </div>
    )
  }

  renderAboutLoading = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#007BFF" height={40} width={40} />
    </div>
  )

  renderAboutPage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAboutSuccess()
      case apiStatusConstants.failure:
        return this.renderAboutFailure()
      case apiStatusConstants.inProgress:
        return this.renderAboutLoading()
      default:
        return null
    }
  }

  render() {
    return <div className="about-app-container">{this.renderAboutPage()}</div>
  }
}
export default About
