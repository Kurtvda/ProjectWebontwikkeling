import { DateToday } from './getDateToday';
import { fetchApiData } from './fetchApi';
import { ProductI, NutritionI } from './Interfaces';

let product: ProductI[] = [];
let nutrition: NutritionI[] = [];

(async () => {
  try {
    const data = await fetchApiData();
    product = data.product;
    nutrition = data.nutrition;
    const dateTodayString = DateToday();
    console.log(TotalIntakeToday(dateTodayString));
  } catch (error) {
    console.log(error);
  }
})();

export function TotalIntakeToday(dateTodayString: string): string[] {
  let totalCalories: number = 0;
  let totalProtein: number = 0;
  let totalCarbohydrates: number = 0;
  let totalFats: number = 0;
  let totalFiber: number = 0;
  let totalVitaminC: number = 0;

  for (let prod of product) {
    if (prod.dateOfIntake == dateTodayString) {
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
    `Calories: ${totalCalories}`,
    `Protein: ${totalProtein}`,
    `Carbohydrates: ${totalCarbohydrates}`,
    `Fats: ${totalFats}`,
    `Fiber: ${totalFiber}`,
    `Vitamin C: ${totalVitaminC}`
  ];
}