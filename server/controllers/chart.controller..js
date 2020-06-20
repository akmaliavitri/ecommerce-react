const Chart = require("../models/chart");
const Product = require("../models/product");
const statusMessage = require("../helpers/status.message");

module.exports = {
  addToChart: async (req, res) => {
    try {
      const newItem = {
        $push: {
          items: {
            product: req.params.id,
            quantity: req.body.quantity,
          },
        },
      };
      const chart = await Chart.updateOne({user : req.userData.id}, newItem);
  
      statusMessage(res, true, "success add item to chart", chart);
    } catch (error) {
      statusMessage(res, false, error.message);
    }
  },

  getChart: async (req, res) => {
    try {
      const chart = await Chart.find({user : req.userData.id }).populate({
        path: 'items',
        populate: {
          path: 'product',
          model: 'Product'
        }
      }).populate('user')

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

      const chart = await Chart.updateOne({user : req.userData.id}, updateChart)

      statusMessage(res, true, 'success delete item from chart', chart)
    } catch (error) {
      statusMessage(res, false, error.message);
    }
  },

  updateItem : async (req, res) => {
    try {
      const { id } = req.params
      // const updateChart = {
      //   $push: {
      //     items: {
      //       quantity: req.body.quantity,
      //     },
      //   },
      // };
      const chart = await Chart.update ({ _id : id }, req.body, {$pull : req.userData.id})

      statusMessage(res, true, 'success updated item', chart)
    } catch (error) {
      statusMessage(res, false, error.message);
    }
  }
};
