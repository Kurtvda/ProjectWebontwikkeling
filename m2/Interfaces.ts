export interface ProductI {
    id: number;
    name: string;
    description: string;
    calories: number;
    protein: number;
    isActive: boolean;
    dateOfIntake: string;
    imageUrl: string;
    type: string;
    tags: string[];
    nutritionalInfoId: number;
  }
  
  export interface NutritionI {
    id: number;
    carbohydrates: number;
    fats: number;
    fiber: number;
    vitaminC: number;
    origin: string;
  }