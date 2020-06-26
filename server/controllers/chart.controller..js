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

  checkout: async (req, res) => {
    console.log(req.params.id, "id");
    console.log(req.body.quantity, "quantity");
    // statusMessage(res, true, "success checkout item");

    try {
      await Product.findOneAndUpdate(
        { _id: req.params.id },
        { $inc: { stock: -req.body.quantity } }
      );

      const updateChart = {
        $pull: {
          items: {
            product: req.params.id,
          },
        },
      };

      const dataChart = await Chart.updateOne(
        { user: req.userData.id },
        updateChart
      );

      statusMessage(res, true, "success checkout item", dataChart);
    } catch (error) {
      statusMessage(res, false, error.message);
    }
  },

  chekoutCheck: async (req, res) => {
    // console.log("ids", req.body.ids);
    // console.log("quantities", req.body.quantities);
    try {
      await Product.updateMany(
        { _id: { $in: req.body.ids } },
        { $inc: { stock: -2 } }
      );
      const check = {
        $pull: {
          items: {
            product: { $in: [req.body.ids] },
          },
        },
      };

      const dataCheck = await Chart.updateMany(
        { user: req.userData.id },
        check
      );
      console.log("datacheck", dataCheck);
      statusMessage(res, true, "success checkout many item", dataChart);
    } catch (error) {
      statusMessage(res, false, error.message);
    }
  },

  updateQuantity: async (req, res) => {
    try {
      const { id, product } = req.params;
      const { quantity } = req.body;

      console.log(quantity);

      const dataChart = await Chart.update(
        { _id: id, "items.product": product },
        { "items.$.quantity": quantity }
      );

      statusMessage(
        res,
        true,
        "success update quantity item from chart",
        dataChart
      );
    } catch (error) {
      console.log(error);
      statusMessage(res, false, error.message);
    }
  },

  updateQuantityIn: async (req, res) => {
    try {
      const { id, product } = req.params;
      const { quantity } = req.body;

      console.log(quantity);

      const dataChart = await Chart.updateOne(
        { _id: id, "items.product": product },
        { $inc: { "items.$.quantity": 1 } }
      );

      statusMessage(
        res,
        true,
        "success update quantity item from chart",
        dataChart
      );
    } catch (error) {
      console.log(error);
      statusMessage(res, false, error.message);
    }
  },

  updateQuantityDec: async (req, res) => {
    try {
      const { id, product } = req.params;
      const { quantity } = req.body;

      console.log(quantity);

      const dataChart = await Chart.updateOne(
        { _id: id, "items.product": product },
        { $inc: { "items.$.quantity": -1 } }
      );

      statusMessage(
        res,
        true,
        "success update quantity item from chart",
        dataChart
      );
    } catch (error) {
      console.log(error);
      statusMessage(res, false, error.message);
    }
  },

  getChartItem: async (req, res) => {
    try {
      const { id } = req.params;
      const dataChart = await Chart.findOne({ _id: id });

      statusMessage(res, true, "success find item from chart", dataChart);
    } catch (error) {
      statusMessage(res, false, error.message);
    }
  },

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
