import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'

import './index.css'

const SearchItem = props => {
  const {searchItemDetails} = props
  const {stateCode} = searchItemDetails

  return (
    <>
      <Link to={`/${stateCode.state_code}`} className="link-for-search">
        <li className="enter-search-list-container">
          <p className="state-heading-list">{stateCode.state_name}</p>
          <div className="state-code-list">
            <p className="state-code-name-list">{stateCode.state_code}</p>
            <BiChevronRightSquare className="square-arrow-icon" />
          </div>
        </li>
      </Link>
      <hr className="divide" />
    </>
  )
}
export default SearchItem
