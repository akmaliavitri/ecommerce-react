const Chart = require("../models/chart");
const Product = require("../models/product");
const statusMessage = require("../helpers/status.message");

module.exports = {
  addToChart: async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      const getChart = await Chart.findOne({ user: req.userData.id }).populate({
        path: "items",
      });

      const isEmpty = [];
      const payload = [];
      const items = getChart.items;

      items.forEach((item) => {
        if (item.product.toString() === id) {
          payload.push({
            product: id,
            quantity: Number(item.quantity) + Number(quantity),
          });
          isEmpty.push("check");
        } else {
          console.log("here else");
          payload.push(item);
        }
      });

      if (isEmpty.length === 0) {
        console.log("new item push");
        payload.push({ product: id, quantity });
      }

      const chart = await Chart.update(
        { user: req.userData.id },
        { items: payload }
      );
      console.log("ini chart", chart);
      statusMessage(res, true, "success add item to chart", chart);
    } catch (error) {
      statusMessage(res, false, error.message);
    }
  },

  // incrementItemQty: async () => {},
  // decrementItemQty: async () => {},

  getChart: async (req, res) => {
    try {
      const chart = await Chart.findOne({ user: req.userData.id })
        .populate({
          path: "items",
          populate: {
            path: "product",
            model: "Product",
          },
        })
        .populate("user");

      statusMessage(res, true, "success to find product", chart);
    } catch (error) {
      statusMessage(res, false, error.message);
    }
  },

  deleteItem: async (req, res) => {
    try {
      const updateChart = {
        $pull: {
          items: {
            product: req.params.id,
          },
        },
      };

      const chart = await Chart.updateOne(
        { user: req.userData.id },
        updateChart
      );

      statusMessage(res, true, "success delete item from chart", chart);
    } catch (error) {
      statusMessage(res, false, error.message);
    }
  },

  updateQuantity: async (req, res) => {
    try {
      const dataChart = await Chart.findByIdAndUpdate(
        { _id : req.params.id, 'items.product' : req.body.product},
        { 'items.0.quantity': req.body.quantity }
      )

      statusMessage(res, true, "success update quantity item from chart", dataChart);
    } catch (error) {
      console.log(error)
      statusMessage(res, false, error.message);
    }
  }
  // updateItem: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const updateChart = {
  //       $push: {
  //         items: {
  //           quantity: req.body.quantity,
  //         },
  //       },
  //     };

  //     const chart = await Chart.findOneAndUpdate({ _id: id }, req.body, {
  //       $pull: req.userData.id,
  //     });
  //     console.log(chart);
  //     statusMessage(res, true, "success updated item", chart);
  //   } catch (error) {
  //     statusMessage(res, false, error.message);
  //   }
  // },
};
