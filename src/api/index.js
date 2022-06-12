// import fastify from "fastify";

const server = require("fastify")({ logger: true });

const PORT = 3030;

// const server = fastify({ logger: true });

const Restaurants = [
  {
    restaurantId: "cnfjkaewrbfwjkdnsc",
    restaurantName: "SampleRestaurant",
    score: 200,
    description: "so good",
    introducer: "kdafnjks",
    updatedDate: new Date("2020-3-23"),
    occasion: "Colleague",
  },
  {
    restaurantId: "hiuwrenjvwkbsdj",
    restaurantName: "ExRestaurant",
    score: 23,
    description: "so good",
    introducer: "smdvfowejnkvf",
    updatedDate: new Date("2022-3-23"),
    occasion: "Alone",
  },
];

const User = [
  {
    userName: "Mukai R",
    userId: "kdafnjks",
    password: "kajndeflwmc",
    mail: "lksenvw@hegdua",
    recommendRestaurant: "cnfjkaewrbfwjkdnsc",
  },
  {
    userName: "Shu Tanabe",
    userId: "smdvfowejnkvf",
    password: "apknwekfc",
    mail: "gmasicho@ale",
    recommendRestaurant: "hiuwrenjvwkbsdj",
  },
];

server.get(
  "/restaurants",
  {
    schema: {
      querystring: Restaurants,
      response: {
        200: Restaurants,
      },
    },
  },
  async (req, res) => {
    const { query: restaurants } = req;
    // res.status(200).send(restaurants);
    console.log(restaurants);
    return restaurants;
  }
);

server.get("/restaurants/:id", async (req, res) => {
  const id = req.params.id;
  res.type("application/json").code(200);
  return restaurants[id];
});

server.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  res.type("application/json").code(200);
  return users[id];
});

server.listen(PORT, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
