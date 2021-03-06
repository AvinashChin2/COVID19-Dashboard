import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {isToggleActive: false}

  onClickToggleButton = () => {
    this.setState(prevState => ({isToggleActive: !prevState.isToggleActive}))
  }

  onClickClose = () => {
    this.setState({isToggleActive: false})
  }

  showDropDownMenu = () => (
    <div className="mobile-view-header">
      <div>
        <ul className="navBar">
          <Link to="/" className="link">
            <li className="item">Home</li>
          </Link>

          <Link to="/about" className="link">
            <li className="item">About</li>
          </Link>
        </ul>
      </div>
      <button className="close" type="button" onClick={this.onClickClose}>
        <AiFillCloseCircle className="close-icon" />
      </button>
    </div>
  )

  render() {
    const {isToggleActive} = this.state

    return (
      <>
        <div className="header-container">
          <h1 className="logo">
            <Link to="/" className="link">
              COVID19<span className="india">INDIA</span>
            </Link>
          </h1>

          <ul className="navBar">
            <li className="item">
              <Link to="/" className="link">
                Home
              </Link>
            </li>
            <li className="item">
              <Link to="/about" className="link">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div className="mobile-menu">
          <div className="mobile-header-container">
            <Link to="/" className="link">
              <h1 className="logo">
                COVID19<span className="india">INDIA</span>
              </h1>
            </Link>
            <button
              type="button"
              className="toggle-button"
              onClick={this.onClickToggleButton}
            >
              <img
                src="https://res.cloudinary.com/avinashchinthapally/image/upload/v1640280281/Project%20Images/add-to-queue_1_1_u2n0er.svg"
                alt="menu"
              />
            </button>
          </div>

          <div className="menu">
            {isToggleActive ? this.showDropDownMenu() : ''}
          </div>
        </div>
      </>
    )
  }
}

export default Header
