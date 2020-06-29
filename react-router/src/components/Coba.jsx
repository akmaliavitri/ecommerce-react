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
    } = await axios.get("http://localhost:4000/product", {
      headers: { access_token: localStorage.getItem("access_token") },
    });

    setProductList(data);
  };

  const destroyProduct = (_id) => {
    // console.log(_id);
    axios
      .delete(`http://localhost:4000/product/delete/${_id}`, {
        headers: { access_token: localStorage.getItem("access_token") },
      })
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
    <div class="wrapper">
      <div className="product-title">
        <h1>Product Page</h1>
      </div>
      <div className="container-page-product">
        <div className="container-product ">
          {productList.map((product, index) => (
            <div className="card-product">
            <div className="card" key={index}>
             <img src={product.image_url} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text" style={{color :'#FF613A'}}>Rp. {product.price}</p>
                <p className="card-text">Stock :{product.stock}</p>

                <div>

                    <Link to={"/product/update/" + product._id}>
                      <button className="btn btn-primary" id="nav-btn-add">
                        <i className="fa fa-pencil-square-o" aria-hidden="true">
                          {/* Update */}
                        </i>
                      </button>
                    </Link>{" "}
                  
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => destroyProduct(product._id)}
                  >
                    <i className="fa fa-trash" aria-hidden="true">
                      {" "}
                      {/* Delete */}
                    </i>{" "}
                  </button>

                    <Link
                      to={{
                        pathname: `/detailProduct`,
                        state: {
                          product: product,
                        },
                      }}
                    >
                      <button className="btn btn-primary" id="nav-btn-add">
                        <i
                          className="fa fa-cart-plus fa"
                          id="nav-add-chart"
                          aria-hidden="true"
                        >
                          {/* Detail */}
                        </i>
                      </button>
                    </Link>
                  
                </div>
              </div>
             </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;

.container-product {
  display: grid;
  /* margin: 4% 8% 20% 8%;  */
  justify-content: center;
  align-content: center;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 8px;
  border-radius: 2%;
}

.card-product {
  /* margin-left: 6%;
  margin-bottom: 5%;
  margin-top: 5%; */
  align-content: center;
}

<Link
                    to={"/chart/" + chartId + "/update/" + item.product._id}
                  >
                    <button className="btn btn-primary" id="nav-btn-add">
                      <i className="fa fa-pencil-square-o" aria-hidden="true">
                        {/* Update */}
                      </i>
                    </button>
                  </Link>