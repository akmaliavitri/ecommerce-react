import React from 'react'
import { useLocation, Link } from 'react-router-dom'

const AddToChart = () => {
  const { state } = useLocation();
  const product = state.product;

  
  return (
    <div className="container-page-product">
      <div>
        <div className="card" id="detail-product">
          <img src={product.image_url} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.price}</p>
            <p className="card-text">{product.stock}</p>
          </div>
          <div>
            <Link to="/product">
              <i>Back</i>
            </Link>{" "}
            |
            <Link to={{
              pathname: '/myChart',
              state: {
                product: product
              }
            }}>
              Add
            </Link>
          </div>
        </div>
      </div>
      <h1>ini</h1>
    </div>
  )
}

export default AddToChart