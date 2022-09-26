const router = require("express").Router();
const {
  models: { Product },
} = require("../db");

const usersOnly = (req, res, next) => {
  if (!req.user) {
    const err = new Error("Action not allowed while logged out");
    err.status = 401;
    return next(err);
  } else {
    next();
  }
};

const adminsOnly = (req, res, next) => {
  let { id, firstName, lastName, email, password, image, adminAccess } =
    req.user.dataValues;

  if (id && firstName && lastName && email && password && image) {
    if (!adminAccess) {
      const err = new Error("This action requires Admin access!");
      err.status = 401;
      return next(err);
    } else {
      next();
    }
  } else {
    const err = new Error("This action requires Admin access!");
    err.status = 401;
    return next(err);
  }
};

//api/products
router.get("/", async (req, res, next) => {
  try {
    let products;
    if (req.query.category == "") {
      products = await Product.findAll();
    } else {
      products = await Product.findAll({
        where: { category: req.query.category },
      });
    }
    res.json(products);
  } catch (err) {
    next(err);
  }
});

//post a product - users only
router.post("/", async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//returns a single product
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

//delete a specific product - admins only
router.delete("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.json(product);
  } catch (error) {
    next(error);
  }
});

//edit a product - will be for admins
router.put("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(await product.update(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
