const router = require("express").Router();
const {
  models: { Product },
} = require("../db");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const adminsOnly = (req, res, next) => {
  if (!req.user.adminAccess) {
    return res.status(403).send("This requires ADMIN access");
  } else {
    next();
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
router.post("/", requireToken, async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body));
  } catch (error) {
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
router.delete("/:id", requireToken, adminsOnly, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.json(product);
  } catch (error) {
    next(error);
  }
});

//edit a product - will be for admins
router.put("/:id", requireToken, adminsOnly, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(await product.update(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
