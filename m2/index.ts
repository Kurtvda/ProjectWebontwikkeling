import express from "express";
import ejs from "ejs";

const app = express();

app.set("view engine", "ejs"); // EJS als view engine

app.set("port", 3000);

app.get("/", (req, res) => {
  res.type("text/html");
  res.send("Hello <strong>World</strong>");
});

app.listen(app.get("port"), () =>
  console.log("[server] http://localhost:" + app.get("port"))
);