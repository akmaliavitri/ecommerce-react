import React, { useState, useEffect } from "react";
import axios from "axios";

const MyChart = () => {
  const [charItems, setChartItems] = useState([]);

  useEffect(() => {
    getItem();
  }, []);

  const getItem = async () => {
    const {
      data: { data },
    } = await axios.get("http://localhost:4000/chart", {
      headers: { access_token: localStorage.getItem("access_token") },
    });

    console.log(data.items, ">>>>data dari myChart");
    setChartItems(data.items);
  };

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
            <th scope="col">Total Harga</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {charItems.map((item, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{item.product.name}</td>
              <td>
                <img
                  src={item.product.image_url}
                  className="card-img-top"
                  alt="..."
                />
              </td>
              <td>Rp. {item.product.price}</td>
              <td>{item.quantity}</td>
              <td>
                Rp. {item.quantity * item.product.price} 
              </td>
              <td>
                <div>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-secondary">-</button>
                    <input
                      type="text"
                      className="form-control"
                      id="name-product"
                      placeholder="1"
                    />
                    <button type="button" className="btn btn-secondary">+</button>
                  </div>
                </div>
                
                <i className="fa fa-shopping-cart" aria-hidden="true">Checkout</i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyChart;