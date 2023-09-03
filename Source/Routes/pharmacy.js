const { Router } = require("express");
const req = require("express/lib/request");
const route = Router();

route.use((request, response, next) => {
  console.log("inside pharmacy auth check middleware")
  console.log(request.user);
  if (request.user) next();
  else response.send(401);
});

const medication_list = [
  {
    name: "panadol",
    quantity: "5",
  },
  {
    name: "antinal 20",
    quantity: "10",
  },
  {
    name: "antinal 40",
    quantity: "8",
  },
  {
    name: "abimol",
    quantity: "7",
  },
];

// get all data
route.get("", (request, response) => {
  response.send(medication_list);
});

route.get("/:name", (request, response) => {
  console.log(request.cookies);
  const { name } = request.params;
  const find_name = medication_list.find((f) => f.name === name);

  response.send(find_name);
});

route.post("", (request, response) => {
  console.log(request.body);
  medication_list.push(request.body);
  response.send(201);
});

route.get("/shopping/cart", (request, response) => {
  const { shopping_cart } = request.session;
  if (shopping_cart) {
    response.send(shopping_cart);
  } else {
    response.send("you have no cart in session");
  }
});

route.post("/shopping/cart/item", (request, response) => {
  const { name, quantity } = request.body;
  const cart_itme = { name, quantity };

  const { shopping_cart } = request.session;
  if (shopping_cart) {
    request.session.shopping_cart.items.push(cart_itme);
  } else {
    request.session.shopping_cart = {
      items: [cart_itme],
    };
  }
  response.send(201);
});

module.exports = route;
