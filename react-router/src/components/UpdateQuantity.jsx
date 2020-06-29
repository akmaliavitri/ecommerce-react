import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

const UpdateQuantity = (props) => {
  const [quantity, setQuantity] = useState("");

  let history = useHistory();

  const handlerChange = (e) => {
    setQuantity(e.target.value);
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();

    const { id, productId } = props.match.params;

    const result = await Axios.put(
      `http://localhost:4000/chart/${id}/update/${productId}`,
      {
        quantity,
      },
      {
        headers: { access_token: localStorage.getItem("access_token") },
      }
    );
    console.log(result.data, "ini data update");
    history.push("/myChart");
  };

  return (
    <div>
      <div className="container">
        <div className="container-updateProduct">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card p-4" style={{backgroundColor : '#FF613A'}}>
                <div className="from-group">
                  <h2>Update Quantity</h2>
                  <label>Quantity :</label>
                  <input
                    type="Number"
                    className="form-control"
                    id="quantity"
                    onChange={handlerChange}
                  />
                </div>
                <br />

                <button className="btn btn-primary" onClick={handlerSubmit}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateQuantity;
