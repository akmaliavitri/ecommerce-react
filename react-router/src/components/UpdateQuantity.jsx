import React, { Component } from "react";
import Axios from "axios";

export class UpdateQuantity extends Component {
  state = {
    id: "",
    items: [
      {
        product : "",
        quantity: "",
      },
    ],
    isEdit: false,
  };

  componentDidMount = () => {
    const { id } = this.props.match.params;
    console.log(id, "id update chart");
    
    Axios.get(`http://localhost:4000/chart/${id}`, {
      headers: { access_token: localStorage.getItem("access_token") },
    })
      .then((response) => {
        console.log(response.data, "response data");
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
    const { product } = this.props.match.params

    const dataUpdate = {
      items: [
        {
          quantity: this.state.items.quantity,
        },
      ],
    };

    const result = await Axios.put(
      `http://localhost:4000/chart/${id}/update/${product}`,
      dataUpdate,
      {
        headers: { access_token: localStorage.getItem("access_token") },
      }
    );
    console.log(result.data, "ini data update");
    this.setState({ ...result.data, isEdit: false });
  };

  render() {
    return (
      <div>
        <h1>Update Quantity Page</h1>

        <form onSubmit={this.handlerSubmit}>
          <table>
            <tbody>
              <tr>
                <td>quantity </td>
                <td>
                  <input
                    type="Number"
                    name="quantity"
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

export default UpdateQuantity;
