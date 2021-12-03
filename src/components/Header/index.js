import {Component} from 'react'

import {Link} from 'react-router-dom'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {isActive: false}

  onClickButton = () => {
    this.setState(prevState => ({isActive: !prevState.isActive}))
  }

  onCloseList = () => {
    this.setState({isActive: false})
  }

  renderMobileItems = () => (
    <div className="mobile-drop-down-container">
      <ul className="mobile-list-items">
        <Link to="/" className="route-link">
          <li className="list-name">Home</li>
        </Link>
        <Link to="/about" className="route-link">
          <li className="list-name">About</li>
        </Link>
      </ul>
      <div className="close-container">
        <button
          className="close-button"
          type="button"
          onClick={this.onCloseList}
        >
          <AiFillCloseCircle className="close-icon" />
        </button>
      </div>
    </div>
  )

  render() {
    const {isActive} = this.state
    return (
      <nav className="header-main-container">
        <div className="nav-container">
          <Link to="/" className="route-link">
            <h1 className="logo-name">
              COVID19
              <span className="india-name">INDIA</span>
            </h1>
          </Link>
          <div className="nav-content-list-large">
            <Link to="/" className="route-link-active">
              Home
            </Link>
            <Link to="/about" className="route-link-active">
              About
            </Link>
          </div>
          <div className="nav-content-list-mobile">
            <button
              className="mobile-button"
              type="button"
              onClick={this.onClickButton}
            >
              <img
                src="https://res.cloudinary.com/avinashchinthapally/image/upload/v1636781073/Project%20Images/add-to-queue_1_vxcc8k.svg"
                alt="menu"
                className="mobile-menu-button"
              />
            </button>
          </div>
        </div>
        {isActive ? this.renderMobileItems() : null}
      </nav>
    )
  }
}
export default Header
