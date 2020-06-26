import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const UpdateProduct = (props) => {
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [image_url, setImage_url] = useState("");

  let history = useHistory();

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeStock = (e) => {
    setStock(e.target.value);
  };

  const onChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const onChangeImage = (e) => {
    setImage_url(e.target.value);
  };

  const updatePost = async (e) => {
    e.preventDefault();

    const { id } = props.match.params;
    const dataUpdate = {
      name,
      price,
      stock,
      image_url,
    };

    const result = await axios.put(
      `http://localhost:4000/product/update/${id}`,
      dataUpdate,
      {
        headers: { access_token: localStorage.getItem("access_token") },
      }
    );
    console.log(result.data, "ini data update");
    history.push("/product");
  };

  return (
    <div className="container">
      <h2>Update Food</h2>

      <form>
        <table>
          <tbody>
            <tr>
              <td>Name </td>
              <td>
                <input type="text" name="name" onChange={onChangeName} />
              </td>
            </tr>
            <tr>
              <td>image-URL </td>
              <td>
                <input type="text" name="image_url" onChange={onChangeImage} />
              </td>
            </tr>
            <tr>
              <td>Price </td>
              <td>
                <input type="number" name="price" onChange={onChangePrice} />
              </td>
            </tr>
            <tr>
              <td>Stock </td>
              <td>
                <input type="number" name="stock" onChange={onChangeStock} />
              </td>
            </tr>
            <tr>
              <td>
                <button onClick={updatePost}>Submit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default UpdateProduct;
