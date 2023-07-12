import {BsFilterRight} from 'react-icons/bs'

import './index.css'

const ProductsHeader = props => {
  console.log(props)
  const {changeSortby, sortByOptions, activeOptionId} = props

  const onChangeSortby = event => {
    changeSortby(event.target.value)
  }

  console.log(sortByOptions)
  return (
    <div className="products-header">
      <h1 className="products-list-heading">All Products</h1>
      <div className="sort-by-container">
        <BsFilterRight className="sort-by-icon" />
        <p className="sort-by">Sort by</p>
        <select
          className="sort-by-select"
          value={activeOptionId}
          onChange={onChangeSortby}
        >
          {sortByOptions.map(eachOption => (
            <option
              key={eachOption.optionId}
              value={eachOption.optionId}
              className="select-option"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ProductsHeader
