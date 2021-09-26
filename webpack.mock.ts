// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";

export default webpackMockServer.add((app, helper) => {
  app.get("/test-mock", (_req, res) => {
    const response = {
      id: helper.getUniqueIdInt(),
      randomInt: helper.getRandomInt(),
      lastDate: new Date(),
    };

    res.json(response);
  });
  app.post("/test-post-mock", (req, res) => {
    res.json({ body: req.body || null, success: true });
  });
});
