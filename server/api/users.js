const router = require("express").Router();

const {
  models: { User },
  models: { Order },
  models: { Product },
} = require("../db");

module.exports = router;

const usersOnly = (req, res, next) => {
  if (!req.params.username) {
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

//api/users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
      include: [Order],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//get specific user and their products
router.get("/:username", usersOnly, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username,
      },
      include: [Order],
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//edit a user - will be for user to edit their own log in
router.put("/:username", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username,
      },
    });
    res.send(await user.update(req.body));
  } catch (error) {
    next(error);
  }
});

//delete a specific user
router.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.json(user);
  } catch (error) {
    next(error);
  }
});
