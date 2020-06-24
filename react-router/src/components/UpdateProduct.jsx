import React, { Component } from 'react'
import axios from "axios";

export class UpdateProduct extends Component {
  state = {
    id: "",
    name: "",
    image_url: "",
    price: "",
    stock: "",
  };

  componentDidMount = () => {
    const { id } = this.props.match.params;
    console.log(id, "ini id nya")
    axios
      .get(`http://localhost:4000/product/${id}`, {
        headers: { access_token: localStorage.getItem("access_token") },
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ ...response.data, isEdit: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handlerChange = (e) => {
    const key = e.target.name;
    this.setState({ [key]: e.target.value });
  };

  handlerSubmit = async (e) => {
    e.preventDefault();

    const { id } = this.props.match.params;
    console.log("ini id nya", id);

    const dataUpdate = {
      name: this.state.name,
      image_url: this.state.image_url,
      stock: this.state.stock,
      price: this.state.price,
    };

    console.log("data yang diinput", dataUpdate);

    const result = await axios.put(
      `http://localhost:4000/product/update/${id}`,
      dataUpdate,
      {
        headers: { access_token: localStorage.getItem("access_token") },
      }
    );
    this.setState({ ...result.data, isEdit: false });
  };

  render() {
    return (
    
      <div className="container">
        <h2>Update Food</h2>

        <form onSubmit={this.handlerSubmit}>
          <table>
            <tbody>
              <tr>
                <td>Name </td>
                <td>
                  <input
                    type="text"
                    name="name"
                    onChange={this.handlerChange}
                    />
                </td>
              </tr>
              <tr>
                <td>image-URL </td>
                <td>
                  <input
                    type="text"
                    name="image_url"
                    onChange={this.handlerChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Price </td>
                <td>
                  <input
                    type="number"
                    name="price"
                    onChange={this.handlerChange}
                    />
                </td>
              </tr>
              <tr>
                <td>Stock </td>
                <td>
                  <input
                    type="number"
                    name="stock"
                    onChange={this.handlerChange}
                    />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input
                    type="submit"
                    value="Edit"
                    className="btn btn-primary"
                    onChange={this.handlerChange}
                    />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
     
    );
  }
}

export default UpdateProduct