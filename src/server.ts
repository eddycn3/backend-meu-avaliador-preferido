// import app from "./index";

const app = require("./index");

const server = app.listen(app.get("port"), () => {
  // tslint:disable-next-line:no-console
  console.log(
    "api is running on localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
});

module.exports = server;
