import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

const MyChart = () => {
  const [charItems, setChartItems] = useState([]);
  const [chartId, setChartId] = useState([])

  useEffect(() => {
    getItemData();
  }, []);

  const getItemData = async () => {
    const {
      data: { data },
    } = await axios.get("http://localhost:4000/chart", {
      headers: { access_token: localStorage.getItem("access_token") },
    });

    console.log(data._id, ">>id chart user");
    console.log(data.items, "id product")
    setChartId(data._id)
    setChartItems(data.items);
  };

  const removeItem = (_id) => {
    console.log("ini idnya", _id)
    axios
      .delete(`http://localhost:4000/chart/delete/${_id}`, {
        headers: { access_token: localStorage.getItem("access_token") },
      })
      .then((result) => {
        console.log("ini result", result)
        getItemData();
      })
      .catch((err) => {
        console.log(err);
      });
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
              <td>Rp. {item.quantity * item.product.price}</td>
              <td>
                <div>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button type="button" className="btn btn-secondary">
                      -
                    </button>
                    <input
                      type="text"
                      className="form-control"
                      id="name-product"
                      placeholder="1"
                    />
                    <button type="button" className="btn btn-secondary">
                      +
                    </button>
                  </div>
                </div>
                <i className="fa fa-shopping-cart" aria-hidden="true">
                  Checkout
                </i>
                <i
                  className="fa fa-trash"
                  aria-hidden="true"
                  onClick={() => removeItem(item.product._id)}
                >
                  Delete
                </i>
                <div>
                  <Link to = {"/chart/" + chartId + "/update/" + item.product._id }>
                    Update
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyChart;
