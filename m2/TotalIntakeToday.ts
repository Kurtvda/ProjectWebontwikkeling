import { DateToday} from './getDateToday';

import { fetchApiData } from './fetchApi';
import { ProductI, NutritionI } from './Interfaces';

let product: ProductI[] = [];
let nutrition: NutritionI[] = [];

fetchApiData().then((data) => {
    product = data.product;
    nutrition = data.nutrition;
  }).catch((error) => {
    console.log(error);
  });


let DateTodayString : string = DateToday();

export function TotalIntakeToday(): string[] {
    let totalCalories : number = 0;
    let totalProtein : number = 0;
    let totalCarbohydrates : number = 0;
    let totalFats : number = 0;
    let totalFiber : number = 0;
    let totalVitaminC : number = 0;
  
    for (let prod of product) {
      if (prod.dateOfIntake == DateTodayString) {
        totalCalories += prod.calories;
        totalProtein += prod.protein;
        for (let nutr of nutrition) {
          if (prod.nutritionalInfoId == nutr.id) {
            totalCarbohydrates += nutr.carbohydrates;
            totalFats += nutr.fats;
            totalFiber += nutr.fiber;
            totalVitaminC += nutr.vitaminC;
          }
        }
      }
    }
  
    return [
      `Total Calories: ${totalCalories}`,
      `Total Protein: ${totalProtein}`,
      `Total Carbohydrates: ${totalCarbohydrates}`,
      `Total Fats: ${totalFats}`,
      `Total Fiber: ${totalFiber}`,
      `Total Vitamin C: ${totalVitaminC}`
    ];
}