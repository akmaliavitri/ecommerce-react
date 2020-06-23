import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

const Chart = () => {
  const [quantity, setQuantity] = useState(1);
  const { state } = useLocation();
  const product = state.product;

  const addNewItem = (id) => {
    const postProduct = {
      quantity: quantity,
    };

    // const postProduct = product
    console.log("ini post product", postProduct);

    axios
      .post(`http://localhost:4000/chart/add/${id}`, postProduct, {
        headers: { access_token: localStorage.getItem("access_token") },
      })
      .then((result) => {
        setQuantity(1);
        console.log("ini result", result);
        console.log("ini data nya", result.data);
        console.log("terikirim");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-page-product">
      <div>
        <div className="card" id="detail-product">
          <img src={product.image_url} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.price}</p>
            <p className="card-text">{product.stock}</p>
            <p className="card-text">{product.quantity}</p>
          </div>

          <div>
            <Link to="/product">
              <i>Back</i>
            </Link>{" "}
            |
            <Link
              to={{
                pathname: "/myChart",
                state: {
                  product: product,
                },
              }}
            >
              <button
                className="btn btn-primary"
                onClick={() => addNewItem(product._id)}
              >
                Submit
              </button>
            </Link>
          </div>
        </div>
      </div>
      <h1>ini</h1>
    </div>
  );
};

export default Chart;
