const router = require("express").Router();
const {
  models: { Order_Products },
} = require("../db");

//api/ordersProducts
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order_Products.findAll();
  } catch (err) {
    next(err);
  }
});

//api/ordersProducts/:orderId"
router.get("/:orderId/:productId", async (req, res, next) => {
  console.log("in API");
  try {
    const order = await Order_Products.findAll({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId,
      },
    });
    res.json(order);
  } catch (error) {
    next(error);
  }
});

//api/ordersProducts/
router.delete("/:orderId/:productId", async (req, res, next) => {
  console.log("in API");
  try {
    const order = await Order_Products.findAll({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId,
      },
    });
    await order.destroy();
    res.send(order);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
