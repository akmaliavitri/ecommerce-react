import React, { useState, useEffect} from 'react'
import axios from 'axios'

const MyChart = () => {
  const [charItems, setChartItems] = useState([])

  useEffect(() => {
    getItem()
  }, [])
  
  const getItem = async () => {
    const {
      data: { data },
    } = await axios.get("http://localhost:4000/chart", {
      headers: { access_token: localStorage.getItem("access_token") },
    });

    console.log(data.items, '>>>>data dari myChart')
    setChartItems(data.items);
  }
  
  return (
    <div>
      <h2>MyChart</h2>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">no</th>
            <th scope="col">Name</th>
            <th scope="col">Image-Url</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
        {charItems.map((item, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{item.product.name}</td>
              <td>{item.product.image_url}</td>
              <td>{item.product.price}</td>
              <td>{item.quantity}</td>
              <td>
                  <i className="fa fa-trash" aria-hidden="true">Delete</i>           
              </td>
            </tr>  
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MyChart