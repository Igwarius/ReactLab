// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";

import cors from "cors";

const games = [
  {
    id: 1,
    name: "Witcher",
    img: "https://www.mmohelper.ru/wp-content/uploads/2020/06/1-oblozhka-diska-igry.jpg",
    price: 50,
    rating: 5,
    date: new Date("October 26, 2007"),
  },
  {
    id: 2,
    name: "CS Go",
    img: "https://sm.ign.com/ign_ru/screenshot/default/1counter-strike-global-offensive_373t.jpg",
    price: 50,
    rating: 3,
    date: new Date("October 26, 2005"),
  },
  {
    id: 3,
    name: "Tekken",
    img: "https://upload.wikimedia.org/wikipedia/ru/6/6e/Tekken7Poster.jpg",
    price: 50,
    rating: 4,
    date: new Date("October 26, 2004"),
  },
  {
    id: 4,
    name: "Witcher 2",
    img: "https://s1.gaming-cdn.com/images/products/789/orig/game-gog-com-the-witcher-2-assassins-of-kings-enhanced-edition-cover.jpg",
    price: 50,
    rating: 5,
    date: new Date("October 26, 2003"),
  },
];
export default webpackMockServer.add((app, helper) => {
  app.use(cors());
  app.get("/test-mock", (_req, res) => {
    const response = {
      id: helper.getUniqueIdInt(),
      randomInt: helper.getRandomInt(),
      lastDate: new Date(),
    };

    res.json(response);
  });
  app.get("/game-by-name", (req, res) => {
    const { name } = req.query;
    const gemesres: typeof games = [];
    games.forEach((element) => {
      if (name && name.length && name.length >= 3) {
        if (element.name.toLowerCase().includes(name.toString().toLowerCase())) {
          gemesres.push(element);
        }
      }
    });

    res.json(gemesres);
  });
  app.get("/top-three-games", (_req, res) => {
    let gemesres: typeof games = [];
    gemesres = games.sort((a, b) => a.date.getTime() - b.date.getTime()).slice(games.length - 3, games.length);

    res.json(gemesres);
  });
  app.post("/test-post-mock", (req, res) => {
    res.json({ body: req.body || null, success: true });
  });
});
