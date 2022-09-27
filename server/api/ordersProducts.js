const router = require("express").Router();
const e = require("express");
const {
  models: { Order_Products },
} = require("../db");

//api/ordersProducts
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order_Products.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Order_Products.create(req.body));
  } catch (error) {
    next(error);
  }
});

//api/ordersProducts
router.delete("/:orderId/:productId", async (req, res, next) => {
  console.log("in API delete");
  try {
    await Order_Products.destroy({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId,
      },
    });
  } catch (error) {
    next(error);
  }
});

//api/ordersProducts
router.put("/:orderId/:productId", async (req, res, next) => {
  try {
    const order = await Order_Products.findOne({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId,
      },
    });
    res.send(await order.update(req.body));
  } catch (err) {
    next(err);
  }
});

//api/ordersProducts/:orderId"
router.get("/:orderId/:productId", async (req, res, next) => {
  try {
    const order = await Order_Products.findOne({
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

module.exports = router;
