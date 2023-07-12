// Write your code here
const SimilarProductItem = props => {
  const {similarProducts} = props
  const updatedData = {
    imageUrl: similarProducts.image_url,
    id: similarProducts.id,
    title: similarProducts.title,
    brand: similarProducts.brand,
    totalReviews: similarProducts.total_reviews,
    rating: similarProducts.rating,
    availability: similarProducts.availability,
    similarProducts: similarProducts.similar_products,
    price: similarProducts.price,
    description: similarProducts.description,
  }
  const {imageUrl, title, brand, price, rating} = updatedData
  return (
    <li>
      <img src={imageUrl} alt="similarProduct" />
      <div>
        <h1>{title}</h1>
        <p>by {brand}</p>
        <div>
          <p>Rs {price}/- </p>
          <p>
            {rating}{' '}
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
            />{' '}
          </p>
        </div>
      </div>
    </li>
  )
}
export default SimilarProductItem
