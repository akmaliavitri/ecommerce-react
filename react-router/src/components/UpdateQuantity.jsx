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
      <h1>Update Quantity Page</h1>

      <form>
        <table>
          <tbody>
            <tr>
              <td>quantity </td>
              <td>
                <input type="Number" name="quantity" onChange={handlerChange} />
              </td>
              <td>
                <button onClick={handlerSubmit}>Submit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default UpdateQuantity;
