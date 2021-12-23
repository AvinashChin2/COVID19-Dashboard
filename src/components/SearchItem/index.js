import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'
import './index.css'

const SearchItem = props => {
  const {stateName, stateCode, id} = props

  return (
    <li>
      <Link to={`/state/${id}`} className="link-search">
        <div className="state-code-search-container">
          <div className="search-result">
            <h1 className="search-result-heading font-face-gm">{stateName}</h1>
          </div>
          <div className="name-code">
            <p className="search-button">
              {stateCode}
              <BiChevronRightSquare
                testid="searchResultChevronRightIcon"
                alt="line icon"
                className="icon-right"
              />
            </p>
          </div>
        </div>
      </Link>
      <hr className="horizontal-line" />
    </li>
  )
}

export default SearchItem
