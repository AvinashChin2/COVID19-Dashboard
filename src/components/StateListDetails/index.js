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
      <h1 className="s">sd</h1>
    </div>
  )
}
export default StateListDetails
