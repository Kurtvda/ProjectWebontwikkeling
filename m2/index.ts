import express from "express";
import ejs from "ejs";

import { main } from './database';

import { fetchApiData } from './fetchApi';
import { ProductI, NutritionI } from './Interfaces';

import { TotalIntakeToday } from './TotalIntakeToday';
import { DateToday } from "./getDateToday";



const app = express();

app.set("view engine", "ejs"); // EJS als view engine
app.set("port", 3000);
app.use(express.static("public"));

// app.listen(3001, async () => {
//   await connect();
//   console.log("Server is running on port 3001");
// });

let products: ProductI[] = [];
let nutritions: NutritionI[] = [];

let intakeToday: string[] = [];


fetchApiData().then((data) => {
  products = data.product;
  nutritions = data.nutrition;
  intakeToday = TotalIntakeToday(DateToday());
}).catch((error) => {
  console.log(error);
});

main();

app.get("/", (req, res) => {
  
  let q : string = req.query.q as string || "";

  const sortField = typeof req.query.sortField === "string" ? req.query.sortField : "name";
  const sortDirection = typeof req.query.sortDirection === "string" ? req.query.sortDirection : "asc";  

  const sortFields = [
    { value: "name", text: "Name", selected: sortField === "name" ? "selected" : "" },
    { value: "calories", text: "calories", selected: sortField === "calories" ? "selected" : ""},
    { value: "protein", text: "protein", selected: sortField === "protein" ? "selected" : ""},
    { value: "dateOfIntake", text: "dateOfIntake", selected: sortField === "dateOfIntake" ? "selected" : ""},
    { value: "type", text: "type", selected: sortField === "type" ? "selected" : ""}
  ];

  const sortDirections = [
      { value: "asc", text: "Asc", selected: sortDirection === "asc" ? "selected" : ""},
      { value: "desc", text: "Desc", selected: sortDirection === "desc" ? "selected" : ""}
  ];

  let filteredProduct: ProductI[] = products.filter((prod) => {
    return prod.name.toLowerCase().includes(q.toLowerCase());
  });

  filteredProduct.sort((a, b) =>  {
    if (sortField === "name") {
        return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } 
    else if (sortField === "calories") {
        return sortDirection === "asc" ? a.calories - b.calories : b.calories - a.calories;
    }
    else if (sortField === "protein") {
      return sortDirection === "asc" ? a.protein - b.protein : b.protein - a.protein;
    }
    else if (sortField === "dateOfIntake") {
      return sortDirection === "asc" ? a.dateOfIntake.localeCompare(b.dateOfIntake) : b.dateOfIntake.localeCompare(a.dateOfIntake);
    } 
    else if (sortField === "type") {
      return sortDirection === "asc" ? a.type.localeCompare(b.type) : b.type.localeCompare(a.type);
    } 
    else {
        return 0;
    }
  });
    res.render('index', {
      activeLink: 'home',
      products : filteredProduct,
      nutrition : nutritions,
      intakeToday: intakeToday,
      q:q,
      sortField: sortField,
      sortDirection: sortDirection
    });
});
app.get("/today", (req, res) => { 
  let date = DateToday();

  res.render('today', {     
    activeLink: 'today',
    products : products,
    nutritions : nutritions,
    intakeToday: intakeToday,
    date : date,
    });
});
app.get("/nutrients", (req, res) => {
  res.render('nutrients', { 
    activeLink: 'nutrients',
    product : products,
    nutrition : nutritions
  });
});

app.listen(app.get("port"), () =>
  console.log("[server] http://localhost:" + app.get("port"))
);