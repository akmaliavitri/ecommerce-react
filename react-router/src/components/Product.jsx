import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const {
      data: { data },
    } = await axios.get("http://localhost:3000/product", {
      headers: { access_token: localStorage.getItem("access_token") },
    });

    setProductList(data);
  };

  const destroyProduct = (_id) => {
    console.log(_id);
    axios
      .delete(`http://localhost:3000/product/delete/${_id}`)
      .then((result) => {
        getProduct();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!localStorage.getItem("access_token")) {
    return <Redirect to="/signin" />;
  }

  return (
    <div className="container-page-product">
      <div className="product-title">
        <h1>Product Page</h1>
      </div>
      <div className="container-product">
        {productList.map((product, index) => (
          <div className="card" key={index}>
            <img src={product.image_url} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.price}</p>
              <p className="card-text">{product.stock}</p>
              <div>
                <Link to="/product/update">
                  <i className="fa fa-pencil-square-o" aria-hidden="true">
                    Update
                  </i>
                </Link>{" "}
                |
                <i
                  className="fa fa-trash"
                  aria-hidden="true"
                  onClick={() => destroyProduct(product._id)}
                >
                  {" "}
                  Delete
                </i>{" "}
                |
                <Link
                  to={{
                    pathname:`chart/add/${product._id}`,
                    state: {
                      product: product,
                    },
                  }}
                >
                  <i className="fa fa-cart-plus fa" id ="nav-add-chart" aria-hidden="true">Add</i>                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
