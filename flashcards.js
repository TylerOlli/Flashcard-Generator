//Pull in our exports
var clozeExports = require('./cloze.js');
var basicExports = require('./basic.js');

//Inquirer will help us create the CLI
var inquirer = require('inquirer');
//FS will let us write to file
var fs = require('fs');

//Variables to help keep track of our game logic
var count = 0;
var rightCount = 0;
var wrongCount = 0;

//This is the main component of the CLI, all options are accessed from here
function start(){
	console.log('');
	console.log('==================================');
	console.log('Welcome to the Flashcard Generator');
	console.log('==================================');

	inquirer.prompt([

		{
			type: "list",
			message: "Make your choice",
			choices: ["Quiz me with basic flashcards", 
			          "Quiz me with cloze flashcards",
			          "Add a basic flashcard", 
					  "Add a cloze flashcard", 
					  "End Program"],
			name: "choices"
		}

	]).then(function(data){

		if(data.choices === "Quiz me with basic flashcards"){
			basicQuiz();
		}else if(data.choices === "Quiz me with cloze flashcards"){
			clozeQuiz();
		}else if(data.choices === "Add a basic flashcard"){
			newBasic();
		}else if(data.choices === "Add a cloze flashcard"){
			newCloze();
		}else {
			process.exit();
		};

	});
};

function newBasic(){
	//Use inquirer to gather the two necessary inputs for the basic constructor
	inquirer.prompt([

		{
			type: "input",
			message: "Enter the text that will be the front of the card",
			name: "front",
			default: ""
		},

		{
			type: "input",
			message: "Enter the text that will be the back of the card",
			name: "back",
			default: ""
		}

	]).then(function(data){
		//Construct and push to the array from exports
		basicExports.arr.push(new basicExports.BasicFlashcard(data.front, data.back));
		//Give the user the option to export their card to output.txt
		inquirer.prompt([

			{
				type: "confirm",
				name: "confirm",
				message: "Do you want to save your card to output.txt?"
			}

		]).then(function(data){
			if(data.confirm){
				saveBasic(basicExports.arr[basicExports.arr.length - 1]);
				start();
			}else {
				start();
			};
		});

	});
};


function newCloze(){
	//Use inquirer to gather the two necessary inputs for the cloze constructor
	inquirer.prompt([

		{
			type: "input",
			message: "Enter the text that will be your answer",
			name: "cloze",
			default: ""
		},

		{
			type: "input",
			message: "Enter the entire question including your answer",
			name: "question",
			default: ""
		}

	]).then(function(data){
		//Validating that the entire question includes the cloze phrase
		if(data.question.indexOf(data.cloze) !== -1){
			//If yes, construct and push to the array from exports
			clozeExports.arr.push(new clozeExports.ClozeFlashcard(data.cloze, data.question));
			//Give the user the option to export their card to output.txt
			inquirer.prompt([

				{
					type: "confirm",
					name: "confirm",
					message: "Do you want to save your card to output.txt?"
				}

			]).then(function(data){
				if(data.confirm){
					saveCloze(clozeExports.arr[clozeExports.arr.length - 1]);
					start();
				}else {
					start();
				};
			});

		}else {
			console.log("Your answer is not included in the question");
			newCloze();
		};

	});
};


//Use FS to save the basic card
function saveBasic(flashcard){
	fs.appendFile('output.txt', `Front: ${flashcard.front} Back: ${flashcard.back} \n`, 'UTF-8', function(error){
		if (error) throw error;
	});
}

//Use FS to save the cloze card
function saveCloze(flashcard){
	fs.appendFile('output.txt', `Cloze: ${flashcard.cloze} Question: ${flashcard.question} \n`, 'UTF-8', function(error){
		if (error) throw error;
	});
}


