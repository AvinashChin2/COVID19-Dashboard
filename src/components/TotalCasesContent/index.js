import './index.css'

const TotalCasesContent = props => {
  const {casesContentDetails} = props
  const {
    stateCode,
    newDate,
    confirmed,
    recovered,
    tested,
    deceased,
    active,
  } = casesContentDetails

  return (
    <div>
      <h1 className="s">{confirmed}</h1>
    </div>
  )
}
export default TotalCasesContent
