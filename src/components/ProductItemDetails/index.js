// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ProductsHeader from '../ProductsHeader'
import SimilarProductItem from '../SimilarProductItem'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiRequest = {
  failure: 'FAILURE',
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
}

class ProductItemDetails extends Component {
  state = {
    blogData: {},
    count: 1,
    apiStatus: apiRequest.initial,
  }

  componentDidMount() {
    this.getBlogItemData()
  }

  getBlogItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiRequest.loading})
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/products/${id}`

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const updatedData = {
        imageUrl: data.image_url,
        id: data.id,
        title: data.title,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
        similarProducts: data.similar_products,
        price: data.price,
        description: data.description,
      }
      this.setState({blogData: updatedData, apiStatus: apiRequest.success})
    } else {
      this.setState({apiStatus: apiRequest.failure})
    }
  }

  continueShopping = () => {
    const {history} = this.props
    history.replace('/products')
  }

  increaseCount = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  decreaseCount = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  renderBlogItemDetails = () => {
    const {blogData, count} = this.state
    const {
      imageUrl,
      title,
      brand,
      totalReviews,
      rating,
      availability,
      similarProducts,
      price,
      description,
    } = blogData

    return (
      <>
        <ProductsHeader />
        <div className="blog-info">
          <img src={imageUrl} alt="brandContent" />
          <div>
            <h1>{title}</h1>
            <p>Rs {price}/- </p>
            <div>
              <p>
                {rating}{' '}
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                />{' '}
              </p>
              <p>{totalReviews} Reviews</p>
            </div>
            <p>{description}</p>
            <p>Available: {availability}</p>
            <p>Brand: {brand}</p>
            <hr />
            <div>
              <button type="button" onClick={this.decreaseCount}>
                -
              </button>
              <p>{count}</p>
              <button type="button" onClick={this.increaseCount}>
                +
              </button>
            </div>
            <button type="button">ADD TO CART</button>
          </div>
        </div>
        <ul>
          {similarProducts.map(eachItem => (
            <SimilarProductItem
              similarProducts={this.eachItem}
              key={eachItem.id}
            />
          ))}
        </ul>
      </>
    )
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="error view"
      />
      <h1>Product Not Found</h1>
      <button type="button" onClick={this.continueShopping}>
        Continue Shopping
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiRequest.failure:
        return this.renderFailure()
      case apiRequest.loading:
        return this.renderLoading()
      case apiRequest.success:
        return this.renderBlogItemDetails()
      default:
        return null
    }
  }
}

export default ProductItemDetails
