import React, { useState , Fragment} from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

const AddProduct = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [image_url, setImage_url] = useState('')
  const [redirect, setRedirect] = useState(false)

  const onChangeName = (e) => {
    const value = e.target.value
    setName(value)
  }

  const onChangePrice = (e) => {
    const value = e.target.value
    setPrice(value)
  }

  const onChangeStock = (e) => {
    const value = e.target.value
    setStock(value)
  }

  const onChangeImage = (e) => {
    const value = e.target.value
    setImage_url(value)
  }

  const addNewProduct = () => {
    const newProduct = {
      name :name,
      price: price,
      stock: stock,
      image_url: image_url
    }
    axios.post(`http://localhost:3000/product/add`, newProduct)
      .then(result => {
        console.log(result)
        setName('')
        setPrice('')
        setStock('')
        setImage_url('')
        setRedirect(true)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Fragment>
      {
        redirect && (
          <Redirect to='/product' />
        )
      }

    <div>
     <div className="container">
      <div className="container-AddProduct">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card p-4">

                <div className="form-gorup">
                  <label> Product Name :</label>
                  <input 
                      type="text" 
                      className="form-control" 
                      id="name-product" 
                      placeholder="ex : mobil" 
                      value = {name}
                      onChange = {onChangeName} />
                </div>

                <div className="from-group">
                  <label>Price :</label>
                  <input 
                      type="number" 
                      className="form-control" 
                      id="price-product" 
                      placeholder="ex : 200000" 
                      value = {price}
                      onChange = {onChangePrice} />
                </div>

                <div className="from-group">
                  <label>Stock :</label>
                  <input 
                      type="number" 
                      className="form-control" 
                      id="stock-product" 
                      placeholder="ex : 20" 
                      value = {stock}
                      onChange = {onChangeStock} />
                </div>

                <div className="from-group">
                  <label>Image URL :</label>
                  <input 
                      type="text" 
                      className="form-control" 
                      id="image-product" 
                      placeholder="ex : https://med.........1"
                      value = {image_url}
                      onChange = {onChangeImage} />
                </div>

                  <button className="btn btn-primary" onClick={addNewProduct}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default AddProduct
