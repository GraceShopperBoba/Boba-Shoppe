const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 10,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  category: {
    type: Sequelize.STRING,
    //could use an isIn validation isIn: [['foo', 'bar']],   // check the value is one of these
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: "https://cdn-icons-png.flaticon.com/512/4080/4080180.png",
  },
});

module.exports = Product;
