import {Link} from 'react-router-dom'
import './index.css'

const StateListDetails = props => {
  const {stateWiseDetails} = props
  const {
    active,
    confirmed,
    deceased,
    population,
    recovered,
    stateCode,
  } = stateWiseDetails

  return (
    <div className="all-state-list-cases-container">
      <Link to={`/state/${stateCode.state_code}`} className="link">
        <button type="button" className="state-names-ind">
          {stateCode.state_name}
        </button>
      </Link>

      <div className="cases-all-box">
        <p className="home-confirmed">{confirmed}</p>
        <p className="home-active">{active}</p>
        <p className="home-recovered">{recovered}</p>
        <p className="home-deceased">{deceased}</p>
        <p className="home-population">{population}</p>
      </div>
    </div>
  )
}
export default StateListDetails
