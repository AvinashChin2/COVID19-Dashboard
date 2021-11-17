import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <>
    <div className="not-found-container">
      <div className="content-failure-container">
        <img
          src="https://res.cloudinary.com/avinashchinthapally/image/upload/v1637171828/Project%20Images/Group_7484_esfix6.png"
          alt="failure"
          className="not-found-img"
        />
        <h1 className="not-found-heading">PAGE NOT FOUND</h1>
        <p className="not-found-para">
          we’re sorry, the page you requested could not be found, Please go back
          to the homepage
        </p>
        <Link to="/">
          <button type="button" className="button-home">
            Home
          </button>
        </Link>
      </div>
    </div>
  </>
)
export default NotFound
