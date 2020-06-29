import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const MyChart = () => {
  const [charItems, setChartItems] = useState([]);
  const [chartId, setChartId] = useState([]);
  const [quantity, setQuantity] = useState(1);
  // const [isCheck, setCheck] = useState(false)

  useEffect(() => {
    getItemData();
  }, []);

  const getItemData = async () => {
    const {
      data: { data },
    } = await Axios.get("http://localhost:4000/chart", {
      headers: { access_token: localStorage.getItem("access_token") },
    });
    console.log(data, "dataaaaaa");
    setChartId(data._id);
    console.log(data._id, "setChartID");
    setChartItems(data.items);
  };

  const removeItem = (_id) => {
    console.log("ini idnya", _id);
    Axios.delete(`http://localhost:4000/chart/delete/${_id}`, {
      headers: { access_token: localStorage.getItem("access_token") },
    })
      .then((result) => {
        console.log("ini result", result);
        getItemData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const inCreament = async (item) => {
    await Axios.put(
      `http://localhost:4000/chart/increament/${chartId}/update/${item.product._id}`,
      {
        quantity,
      },
      {
        headers: { access_token: localStorage.getItem("access_token") },
      }
    );
    getItemData();
  };

  const decCrement = async (item) => {
    console.log(item);
    await Axios.put(
      `http://localhost:4000/chart/decrement/${chartId}/update/${item.product._id}`,
      {
        quantity,
      },
      {
        headers: { access_token: localStorage.getItem("access_token") },
      }
    );
    getItemData();
  };

  return (
    <div>
      <h2>MyChart</h2>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">Check</th>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Image-Url</th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {charItems.map((item, index) => (
            <tr key={index}>
              <th>
                <input type="checkbox" id="checkChcekout"></input>
              </th>
              <th align="center">{index + 1}</th>
              <td valign="center">{item.product.name}</td>
              <td>
                <img
                  src={item.product.image_url}
                  className="card-img-top"
                  alt="..."
                />
              </td>
              <td align="center">Rp. {item.product.price}</td>
              <td align="center">{item.product.stock}</td>
              <td align="center">{item.quantity}</td>
              <td align="center">Rp. {item.quantity * item.product.price}</td>
              <td>
                <div>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      style={{ backgroundColor: "#FF613A" }}
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => decCrement(item)}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className="form-control"
                      id="name-product"
                      placeholder="1"
                    />
                    <button
                      style={{ backgroundColor: "#FF613A" }}
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => inCreament(item)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <br />

                  <Link
                    to={{
                      pathname: "/chart/checkout/" + item.product._id,
                      state: {
                        item: item,
                      },
                    }}
                  >
                    <button className="btn btn-primary" id="nav-btn-add">
                      <i className="fa fa-shopping-bag"></i>
                    </button>
                  </Link>

                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => removeItem(item.product._id)}
                  >
                    <i className="fa fa-trash" aria-hidden="true">
                      {" "}
                      {/* Delete */}
                    </i>{" "}
                  </button>

                  <Link
                    to={"/chart/" + chartId + "/update/" + item.product._id}
                  >
                    <button className="btn btn-primary" id="nav-btn-add">
                      <i className="fa fa-pencil-square-o" aria-hidden="true">
                        {/* Update */}
                      </i>
                    </button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <div>
          <i>Checkout All</i>
        </div>
      </table>
    </div>
  );
};

export default MyChart;
