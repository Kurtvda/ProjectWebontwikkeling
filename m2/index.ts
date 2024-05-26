import express from "express";
import ejs from "ejs";

import { fetchApiData } from './fetchApi';
import { ProductI, NutritionI } from './Interfaces';

import { TotalIntakeToday } from './TotalIntakeToday';
import { DateToday } from "./getDateToday";

const app = express();

app.set("view engine", "ejs"); // EJS als view engine
app.set("port", 3000);
app.use(express.static("public"));

let product: ProductI[] = [];
let nutrition: NutritionI[] = [];

let intakeToday: string[] = [];

fetchApiData().then((data) => {
  product = data.product;
  nutrition = data.nutrition;
  intakeToday = TotalIntakeToday(DateToday());
}).catch((error) => {
  console.log(error);
});


app.get("/", (req, res) => {
  console.log(intakeToday);
  let date = DateToday();
  console.log(date);
  res.render('index', { 
                        activeLink: 'home',
                        product : product,
                        nutrition : nutrition,
                        intakeToday: intakeToday,
                        date : date
                      });
});
app.get("/products", (req, res) => { 
  res.render('products', { 
                            activeLink: 'products',
                            product : product,
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