const { Router } = require("express");
const route = Router();

const super_markets = [
  {
    id: 1,
    store: "mkaa",
    miles: 0.5,
  },
  {
    id: 2,
    store: "Elmadina",
    miles: 1.5,
  },
  {
    id: 3,
    store: "sabir",
    miles: 2,
  },
  {
    id: 4,
    store: "one the run",
    miles: 3,
  },
  {
    id: 5,
    store: "omer",
    miles: 2.5,
  },
];

route.use((request, response, next) => {
  if (request.user) next();
  else response.send(401);
});

route.get("/", (request, response) => {
  const { miles } = request.query;
  const parsed_miles = parseInt(miles);
  if (parsed_miles) {
    const filter_markets = super_markets.filter(
      (ele) => ele.miles <= parsed_miles
    );
    response.send(filter_markets);
  } else {
  response.send(super_markets)
  }
});

module.exports = route;
