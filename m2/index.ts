import express from "express";
import ejs from "ejs";

import products from './public/json/foodProducts.json';
import nutritions from "./public/json/nutrition.json";
import { ProductI, NutritionI } from './Interfaces';

const product : ProductI[] = products;
const nutrition : NutritionI[] = nutritions;

const app = express();

app.set("view engine", "ejs"); // EJS als view engine
app.set("port", 3000);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render('index', { 
                        activeLink: 'home',
                        product : product
                      });
});
app.get("/products", (req, res) => {
  res.render('products', { 
                            activeLink: 'products',
                            product : product
                          });
});
app.get("/nutrients", (req, res) => {
  res.render('nutrients', { 
                            activeLink: 'nutrients',
                            product : product,
                            nutrition : nutrition
                          });
});

app.listen(app.get("port"), () =>
  console.log("[server] http://localhost:" + app.get("port"))
);