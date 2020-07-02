import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import Navbar from './Navbar'

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
    <>
    <Navbar />
    <div>
      <div className="container-regis ">
        <div className="container px-lg-5 d-flex justify-content-center align-items-center">
          <div className="row mx-lg-n5" style={{backgroundColor : '#FF613A'}}>
            <div className="col py-3 px-lg-5 border">
              <img
                id="signupimg"
                src={product.image_url}
                className="card-img-top"
                alt="..."
              />
            </div>
            <div className="col py-3 px-lg-5 border">
              <div className="colregis">
                <div className="card p-4">
                  <div className="form-gorup">
                    <label> Product Name :</label>
                    <input className="form-control" value={product.name}  disabled={true}/>
                  </div>

                  <div className="form-gorup">
                    <label> Price :</label>
                    <input className="form-control" value={product.price} disabled/>
                  </div>

                  <div className="form-gorup">
                    <label> Stock :</label>
                    <input className="form-control" value={product.stock} disabled={true}/>
                  </div>
                  <br />

                  <div>
                    <Link to="/product">
                      <button className="btn btn-success">
                        <i>Back</i>
                      </button>
                    </Link>{" "}
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
                        Add to chart
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Chart;
