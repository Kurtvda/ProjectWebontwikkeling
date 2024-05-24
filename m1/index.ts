import { BookI, PublisherI } from './Interfaces';
import * as readline from 'readline-sync';
import Book from './json/Book.json';
import Publisher from "./json/Publishers.json";

const Books : BookI[] = Book;
const Publishers : PublisherI[] = Publisher;


let exit : boolean = false;

do {
    console.log("\nWelcome to the Books.json data viewer!");
    console.log("***************************************");
    console.log("1. View all data\n2. Show info by ID\n3. Exit");
    console.log("***************************************");

    let choice : string = readline.question(">>Please enter your choice: ");
    

    let choiceAsNumber: number = parseInt(choice);

    switch(choiceAsNumber){
        case 1:
            console.log("\n\n***************************************");
            console.log("Book title and ID");
            console.log("***************************************");
            for (let Book of Books) {
                console.log(`- Book title: ${Book.title}\n- Book ID: ${Book.id}\n`);
            }
            console.log("***************************************\n");
            break;
        case 2:
            choice = readline.question(">>Please enter the ID you want to filter by: ");
            console.log("\n");
            choiceAsNumber = parseInt(choice);
            console.log("***************************************");
            console.log("Book info");
            console.log("***************************************");
            for (let Book of Books) {
                if(choiceAsNumber == Book.id){
                    console.log(`- Book title: ${Book.title}`);
                    console.log(`- ID: ${Book.id}`);
                    console.log(`- Description: ${Book.description}`);
                    console.log(`- Publication year: ${Book.publicationYear}`);
                    console.log(`- Is available: ${Book.isAvailable}`);
                    console.log(`- Publication date: ${Book.publicationDate}`);
                    console.log(`- Cover image url: ${Book.coverImageUrl}`);
                    console.log(`- Genre: ${Book.genre}`);
                    console.log(`- Authors: `);
                    for (let author of Book.authors) {
                        console.log(`   - ${author}`);
                    }
                    for(let Publisher of Publishers){
                        if(Publisher.id == Book.publisherId){
                            console.log(`- Publisher name: ${Publisher.name}`);
                            console.log(`- Publisher location: ${Publisher.location}`);
                            console.log(`- Publisher contact email: ${Publisher.contactEmail}`);
                        }
                    }
                }
            }
            console.log("***************************************\n");
            break;
        case 3:
            exit = true;
            break;
        default:
            console.log("This funtion does not exist");
            break;
    }
} while (!exit);