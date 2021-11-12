import {Link} from 'react-router-dom'
import './index.css'

export default function Header() {
  return (
    <nav className="header-main-container">
      <div className="nav-container">
        <h1 className="logo-name">
          COVID19<span className="india-name">INDIA</span>
        </h1>
        <div className="nav-content-list">
          <Link to="/" className="route-link">
            Home
          </Link>
          <Link to="/about" className="route-link">
            About
          </Link>
        </div>
      </div>
    </nav>
  )
}
