import { ProductI, NutritionI } from './Interfaces';

async function fetchProduct(): Promise<ProductI[]> {
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
  
  async function fetchNutrition(): Promise<NutritionI[]> {
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
  
  export async function fetchApiData() {
    const [product, nutrition] = await Promise.all([
      fetchProduct(),
      fetchNutrition(),
    ]);
  
    return { product, nutrition };
  }