//Constructor for the basic flashcard
var BasicFlashcard = function(front, back){
	this.front = front;
	this.back = back;
}

//Empty array that will house our basic flashcard objects
var arr = [];

var questions = {
	"In what county does Charlotte reside": "Mecklenburg",
	"What fast food chain was founded in Charlotte": "Bojangles",
	"What major bank is located in Charlotte": "Bank of America",
	"What is the name of our football team's mascot": "Sir Purr"
};

//Loop through questions and construct objects
for (var key in questions){
	arr.push(new BasicFlashcard(key, questions[key]));
};

//Export the array of objects and the constructor out to flashcards.js
module.exports = {arr, BasicFlashcard};