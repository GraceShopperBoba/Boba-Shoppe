const router = require("express").Router();

const {
  models: { User },
  models: { Order },
  models: { Product },
} = require("../db");

module.exports = router;

// const requireToken = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization;
//     const user = await User.findByToken(token);
//     req.user = user;
//     next();
//   } catch (error) {
//     next(error);
//   }
// };

// const adminsOnly = (req, res, next) => {
//   if (!req.user.adminAccess) {
//     return res.status(403).send("This action requires ADMIN access");
//   } else {
//     next();
//   }
// };

//api/users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username", "imageUrl"],
      include: [Order],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//create a new user NOT SURE IF WE NEED
// router.post("/", async (req, res, next) => {
//   try {
//     res.status(201).send(await User.create(req.body));
//   } catch (error) {
//     next(error);
//   }
// });

//get specific user and their products
router.get("/:username", async (req, res, next) => {
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
      where: { username: req.params.username },
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
