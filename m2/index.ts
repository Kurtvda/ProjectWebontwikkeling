import express from "express";
import ejs from "ejs";

import { ProductI, NutritionI } from './Interfaces';
import { promises } from "dns";

async function fetchProduct() : Promise<ProductI[]> {
  try {
    const response = await fetch('https://raw.githubusercontent.com/Kurtvda/ProjectWebontwikkeling/main/m2/public/json/foodProducts.json');
    if (response.status === 404) throw new Error('Not found');
    if (response.status === 500) throw new Error('Internal server error');
    return await response.json();
  } catch (error: any) {
    console.log(error);
    return [];
  }
}
async function fetchNutrition() : Promise<NutritionI[]> {
  try {
    const response = await fetch('https://raw.githubusercontent.com/Kurtvda/ProjectWebontwikkeling/main/m2/public/json/nutrition.json');
    if (response.status === 404) throw new Error('Not found');
    if (response.status === 500) throw new Error('Internal server error');
    return await response.json();
  } catch (error: any) {
    console.log(error);
    return [];
  }
}

let product: ProductI[] = [];
let nutrition: NutritionI[] = [];

fetchProduct().then((data) => {
  product = data;
}).catch((error) => {
  console.log(error);
});

fetchNutrition().then((data) => {
  nutrition = data;
}).catch((error) => {
  console.log(error);
});


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