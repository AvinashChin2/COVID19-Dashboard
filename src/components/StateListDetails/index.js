import './index.css'

const StateListDetails = props => {
  const {stateWiseDetails} = props
  const {
    active,
    confirmed,
    deceased,
    name,
    population,
    recover,
    stateCode,
    tested,
  } = stateWiseDetails
  return (
    <div>
      <h1 className="s">{stateCode}</h1>
    </div>
  )
}
export default StateListDetails
