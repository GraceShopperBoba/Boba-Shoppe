"use strict";

const {
  db,
  models: { User, Product, Order },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      id: 1,
      firstName: "Abby",
      lastName: "Lee",
      email: "a@l.com",
      imageUrl: "/images/profile.jpg",
      adminAccess: false,
      username: "Abby",
      password: "123",
    }),
    User.create({
      id: 2,
      firstName: "Bea",
      lastName: "Bosch",
      email: "b@b.com",
      imageUrl: "/images/profile.jpg",
      adminAccess: true,
      username: "Bea",
      password: "123",
    }),
    User.create({
      id: 3,
      firstName: "Zach",
      lastName: "Pram",
      email: "z@p.com",
      imageUrl: "/images/profile.jpg",
      adminAccess: false,
      username: "Zach",
      password: "123",
    }),
    User.create({
      id: 4,
      firstName: "Eric",
      lastName: "Fan",
      email: "e@f.com",
      imageUrl: "/images/profile.jpg",
      adminAccess: false,
      username: "Eric",
      password: "123",
    }),
  ]);

  // Creating Products
  const products = await Promise.all([
    Product.create({
      id: 1,
      name: "Strawberry",
      quantity: 10,
      imageUrl: "/images/StrawberryTea.jpg",
      price: 5.45,
      description: "yummy",
      category: "Fruit",
    }),
    Product.create({
      id: 2,
      name: "Mango",
      quantity: 7,
      imageUrl: "/images/Mango.jpg",
      price: 6.95,
      description: "delicious",
      category: "Fruit",
    }),
    Product.create({
      id: 3,
      name: "Brown Sugar",
      quantity: 7,
      imageUrl: "/images/brownsugar.jpg",
      price: 6.25,
      description: "Oooooh lala",
      category: "Sweet",
    }),
    Product.create({
      id: 4,
      name: "Taro",
      quantity: 3,
      imageUrl: "/images/Taro.jpg",
      price: 3.99,
      description: "Purple",
      category: "Tea",
    }),
    Product.create({
      id: 5,
      name: "Oolong",
      quantity: 4,
      imageUrl: "/images/oolongTea.jpeg",
      price: 3.19,
      description: "Milk Tea",
      category: "Tea",
    }),
    Product.create({
      id: 6,
      name: "Matcha",
      quantity: 6,
      imageUrl: "/images/matcha.jpeg",
      price: 5.19,
      description: "Caffine",
      category: "Tea",
    }),
    Product.create({
      id: 7,
      name: "Coffee",
      quantity: 6,
      imageUrl: "/images/coffee.jpeg",
      price: 5.19,
      description: "Caffine",
      category: "Tea",
    }),
  ]);

  // Creating Orders
  const orders = await Promise.all([
    Order.create({
      isFulfilled: false,
    }),
    Order.create({
      isFulfilled: true,
    }),
    Order.create({
      isFulfilled: false,
    }),
    Order.create({
      isFulfilled: true,
    }),
    Order.create({
      isFulfilled: false,
    }),
  ]);

  //assingning a user to order using magic method
  await orders[0].setUser(users[1]);
  await orders[1].setUser(users[2]);
  await orders[2].setUser(users[2]);

  //adding a user to a product belonggs to many
  await orders[0].addProduct(products[0], { through: "Order_Products" });
  await orders[0].addProduct(products[1], { through: "Order_Products" });

  await orders[1].addProduct(products[2], { through: "Order_Products" });
  await orders[1].addProduct(products[3], { through: "Order_Products" });

  await orders[2].addProduct(products[1], { through: "Order_Products" });
  await orders[2].addProduct(products[3], { through: "Order_Products" });

  console.log(
    `seeded ${users.length} users && ${products.length} products && ${orders.length} orders`
  );
  console.log(`seeded successfully`);
  return {
    users: {
      abby: users[0],
      bea: users[1],
      zach: users[2],
      eric: users[3],
    },
    products: {
      strawberry: products[0],
      mango: products[1],
      chocolate: products[2],
      matcha: products[3],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
