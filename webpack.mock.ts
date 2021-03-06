// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";
import cors from "cors";

const check = (arr, val) => arr.some((element: { userName: string }) => val === element.userName);
let games = [
  {
    id: 1,
    name: "Witcher",
    img: "https://www.mmohelper.ru/wp-content/uploads/2020/06/1-oblozhka-diska-igry.jpg",
    price: 50,
    rating: 5,
    date: new Date("October 26, 2007"),
    age: "6",
    genre: "RPG",
    platform: "pc",
  },
  {
    id: 2,
    name: "CS Go",
    img: "https://sm.ign.com/ign_ru/screenshot/default/1counter-strike-global-offensive_373t.jpg",
    price: 30,
    rating: 3,
    date: new Date("October 26, 2005"),
    age: "12",
    genre: "Shooter",
    platform: "xbox",
  },
  {
    id: 3,
    name: "Tekken",
    img: "https://upload.wikimedia.org/wikipedia/ru/6/6e/Tekken7Poster.jpg",
    price: 20,
    rating: 4,
    date: new Date("October 26, 2004"),
    age: "18",
    genre: "RPG",
    platform: "ps",
  },
  {
    id: 4,
    name: "Witcher 2",
    img: "https://s1.gaming-cdn.com/images/products/789/orig/game-gog-com-the-witcher-2-assassins-of-kings-enhanced-edition-cover.jpg",
    price: 40,
    rating: 5,
    date: new Date("October 26, 2003"),
    age: "0",
    genre: "RPG",
    platform: "pc",
  },
];
let orders = [
  {
    userName: "Igwarius",
    games: [
      {
        id: 4,
        name: "Witcher 2",
        img: "https://s1.gaming-cdn.com/images/products/789/orig/game-gog-com-the-witcher-2-assassins-of-kings-enhanced-edition-cover.jpg",
        price: 40,
        rating: 5,
        date: new Date("October 26, 2003"),
        age: "0",
        genre: "RPG",
        platform: "pc",
      },
    ],
  },
];
let users = [
  {
    login: "Igwarius",
    password: "12345678",
    role: "admin",
    description: "asdsdaasdsdasddasasd",
    img: "data:image/jpeg;base64,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",
  },
];
export default webpackMockServer.add((app, helper) => {
  app.use(cors({ origin: "*" }));

  app.get("/test-mock", (_req, res) => {
    const response = {
      id: helper.getUniqueIdInt(),
      randomInt: helper.getRandomInt(),
      lastDate: new Date(),
    };

    res.json(response);
  });
  interface ISortParametrs {
    genre: string;
    age: string;
    name: string;
    sortType: string;
    sortDir: string;
    platform: string;
  }
  app.get("/all-products", (req, res) => {
    const { genre, age, name, sortType, sortDir, platform } = req.query as unknown as ISortParametrs;

    let gamesRes: typeof games = [];
    gamesRes = games;
    if (age && age !== "All") {
      gamesRes = gamesRes.filter((game) => game.age.toLowerCase().includes(age.toLowerCase()));
    }
    if (genre && genre !== "All") {
      gamesRes = gamesRes.filter((game) => game.genre.toLowerCase().includes(genre.toLowerCase()));
    }
    if (name) {
      gamesRes = gamesRes.filter((game) => game.name.toLowerCase().includes(name.toLowerCase()));
    }
    if (platform && platform !== "All") {
      gamesRes = gamesRes.filter((game) => game.platform.toLowerCase().includes(platform.toLowerCase()));
    }
    const sortAsc = (arr, key) =>
      arr.sort((prev, next) => {
        if (prev[key] < next[key]) {
          return 1;
        }
        if (prev[key] > next[key]) {
          return -1;
        }

        return 0;
      });
    const sortDesc = (arr, key) =>
      arr.sort((prev, next) => {
        if (prev[key] > next[key]) {
          return 1;
        }
        if (prev[key] < next[key]) {
          return -1;
        }

        return 0;
      });
    if (sortType && sortDir) {
      if (sortDir === "asc") {
        if (sortType === "rating") {
          gamesRes = sortAsc(gamesRes, "rating");
        }
        if (sortType === "price") {
          gamesRes = sortAsc(gamesRes, "price");
        }
      }
      if (sortDir === "desc") {
        if (sortType === "rating") {
          gamesRes = sortDesc(gamesRes, "rating");
        }
        if (sortType === "price") {
          gamesRes = sortDesc(gamesRes, "price");
        }
      }
    }
    res.json(gamesRes);

    return res;
  });

  app.get("/game-by-name", (req, res) => {
    const { name } = req.query;
    if (!name) {
      res.status(400);

      return res;
    }

    let gamesRes: typeof games = [];

    gamesRes = games.filter((game) => game.name.toLowerCase().includes(name.toString().toLowerCase()));

    res.json(gamesRes);

    return res;
  });
  app.get("/top-three-games", (_req, res) => {
    const gamesRes: typeof games = games
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(games.length - 3, games.length);

    res.json(gamesRes);
  });
  app.post("/test-post-mock", (req, res) => {
    res.json({ body: req.body || null, success: true });
  });
  app.post("/registration", (req, res) => {
    users.push(req.body);
    res.json({ success: true });
  });
  app.post("/log-in", (req, res) => {
    const check = (element: { login: string; password: string }) =>
      element.login === req.body.login && element.password === req.body.password;

    if (users.some(check)) {
      if (req.body.login === "Igwarius") res.json({ role: "admin", success: true });
      else res.json({ success: true });
    }

    res.status(400);
    res.json({ success: false });
  });
  app.get("/profile-info", (req, res) => {
    const { name } = req.query;
    const check = (element: { login: string }) => element.login === name;

    if (users.some(check)) {
      const user = users.find((a) => a.login === name);
      res.json({ user });

      return;
    }

    res.status(400);
    res.json({ success: false });
  });
  app.get("/orders", (req, res) => {
    const { name } = req.query;

    if (check(orders, name)) {
      const order = orders.find((a) => a.userName === name);
      res.json(order);
    }

    res.status(400);
    res.json({ success: false });
  });
  app.post("/orders", (req, res) => {
    const { userName, gameName } = req.body;

    const game = games.find((game) => game.name === gameName);

    if (check(orders, userName)) {
      orders = orders.map((a) => {
        if (a.userName.toLowerCase() === userName.toLowerCase()) {
          if (!a.games.includes(game)) {
            a.games.push(game);
          }
        }

        return a;
      });
    } else {
      orders.push({ userName, games: [game] });
    }

    res.json({ success: true });
  });
  app.post("/games", (req, res) => {
    const { name, age, img, platform, price, date, genre } = req.body;
    const minimum = 0;
    const maximum = 100;
    games.push({
      id: Math.floor(Math.random() * (maximum - minimum + 1)) + minimum,
      name,
      img,
      price,
      rating: 0,
      date: new Date(date),
      age,
      genre,
      platform,
    });
    res.json({ success: true });
  });
  app.put("/games", (req, res) => {
    const { name, age, img, platform, price, date, genre, id } = req.body;
    games = games.map((game) =>
      game.id === id ? { ...game, name, img, price, date: new Date(date), age, genre, platform } : game
    );
    res.json({ success: true });
  });
  app.delete("/games", (req, res) => {
    const { id } = req.query;
    games = games.filter((game) => game.id.toString() !== id);
    res.json({ success: true });
  });
  app.delete("/orders", (req, res) => {
    const { name } = req.query;

    const check = (element: { userName: string }) => element.userName === name;
    if (orders.some(check)) {
      orders = orders.filter((a) => a.userName !== name);
    }

    res.json({ success: true });
  });
  app.post("/change-password", ({ body: { login, password } }, res) => {
    users = users.map((user) => (user.login === login ? { ...user, password } : user));
    res.json({ success: true });
  });
  app.post("/save-profile", ({ body: { login, img, description } }, res) => {
    users = users.map((user) => (user.login === login ? { ...user, login, img, description } : user));
    res.json({ success: true });
  });
});
