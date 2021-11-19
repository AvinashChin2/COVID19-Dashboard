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
      <div className="state-name-container">
        <Link to={`/${stateCode.state_code}`}>
          <button type="button" className="state-names-ind">
            {stateCode.state_name}
          </button>
        </Link>
      </div>
      <div className="individual-container">
        <p className="list-cases-confirmed">{confirmed}</p>
      </div>
      <div className="individual-container">
        <p className="list-cases-active">{active}</p>
      </div>
      <div className="individual-container">
        <p className="list-cases-recover">{recovered}</p>
      </div>
      <div className="individual-container">
        <p className="list-cases-deceased">{deceased}</p>
      </div>
      <div className="individual-container">
        <p className="list-cases-population">{population}</p>
      </div>
    </div>
  )
}
export default StateListDetails
