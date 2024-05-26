import { MongoClient } from "mongodb";
import { fetchApiData } from './fetchApi';
import { ProductI, NutritionI } from './Interfaces';

const uri = "mongodb+srv://userFoodEncounter:passFoodEncounter@clusterwebo.4rjd87a.mongodb.net/?retryWrites=true&w=majority&appName=clusterWebo";

const client = new MongoClient(uri);

export async function main() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Get the Products and Nutrients collections
        const db = client.db("FoodEncounter");
        const productsCollection = db.collection("Products");
        const nutrientsCollection = db.collection("Nutrients");

        // Delete all documents in the Products and Nutrients collections
        const resultToDeleteProtducts = await productsCollection.deleteMany({});
        console.log(`Deleted ${resultToDeleteProtducts .deletedCount} documents from the Products collection`);

        const resultToDeleteNutrients = await nutrientsCollection.deleteMany({});
        console.log(`Deleted ${resultToDeleteNutrients .deletedCount} documents from the Nutrients collection`);

        let products: ProductI[] = [];
        let nutritions: NutritionI[] = [];
        const data = await fetchApiData(); // Wait for the promise to resolve
        products = data.product;
        nutritions = data.nutrition;

        const resultProducts = await productsCollection.insertMany(products);
        const resultNutrients = await nutrientsCollection.insertMany(nutritions);
        console.log(`New documents inserted`);

        // Print the number of documents in the Products and Nutrients collections
        const productCount = await productsCollection.countDocuments();
        const nutrientCount = await nutrientsCollection.countDocuments();
        console.log(`Number of documents in the Products collection: ${productCount}`);
        console.log(`Number of documents in the Nutrients collection: ${nutrientCount}`);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}