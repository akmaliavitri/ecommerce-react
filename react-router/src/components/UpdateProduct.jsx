import React, {Component} from 'react'
import axios from 'axios'

export class UpdateProduct extends Component {
  
  state = {
    id : '', 
    name : '',
    price : '',
    stock : '',
    image_url : '',
  }

  componentDidMount = () => {
    axios.get('http://localhost:3000/product')
    .then(result => {
      const dataProduct = result.data.data
      console.log(dataProduct)
    })
    .catch(err => {
      console.log(err)
    })
  }

  handlerSubmit = (e) => {
    e.prevenDefault()

    const newProduct = {
      name: this.state.name,
      price: this.state.price,
      stock: this.state.stock,
      image_url: this.state.image_url
    }

    axios.post(`http://localhost:3000/product`, newProduct)
      .then(response => {
        console.log(response.data)
        this.state({Product : response.data})
      })
      .catch(err => {
        console.log(err)
      })
  }

  handlerPut = (id) => {
    const newProduct = {
      name: this.state.name,
      price: this.state.price,
      stock: this.state.stock,
      image_url: this.state.image_url
    }

    axios.put(`http://localhost:3000/product/${id}`, newProduct)
      .then(response => {
        console.log(response.data)
        this.state({Product : response.data})
      })
      .catch(err => {
        console.log(err)
      })
  }

  render () {
    return (
      <div className="container">
      <h2>Update Food</h2>

      <form onSubmit={this.hainSubndlerSubmit}>
        <table>
          <tbody>
            <tr>
              <td>Name </td>
              <td>
                <input  type="text" name="name" />
              </td>
            </tr>
            <tr>
              <td>image-URL </td>
              <td>
                <input  type="text" name="image_url"/>
              </td>
            </tr>
            <tr>
              <td>Price </td>
              <td>
                <input  type="number" name="price"/>
              </td>
            </tr>
            <tr>
              <td>Stock </td>
              <td>
                <input  type="number" name="stock"/>
              </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <input  type="submit" value="Edit" className="btn btn-primary" />
                </td>
              </tr>
          </tbody>
        </table>
      </form>
    </div>
    )
  }
}

export default UpdateProduct