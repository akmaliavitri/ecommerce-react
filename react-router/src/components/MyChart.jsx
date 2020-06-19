import React from 'react'
import { useLocation} from 'react-router-dom'

const MyChart = () => {

  const { state } = useLocation
  const product = state.product

  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{product.name}</th>
            <td>
              <img src={product.image_url} className="card-img-top" alt="..." />
            </td>
            <td>{product.price}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  )

}

export default MyChart