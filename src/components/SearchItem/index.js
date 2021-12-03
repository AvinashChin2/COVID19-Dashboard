import './index.css'

const SearchItem = props => {
  const {searchItemDetails} = props
  const {stateCode} = searchItemDetails

  return (
    <div>
      <h1>{stateCode.state_name}</h1>
    </div>
  )
}
export default SearchItem
