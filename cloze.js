//Constructor for the cloze flashcard
var ClozeFlashcard = function(cloze, question){
	this.cloze = cloze;
	this.question = question;

	this.displayQuestion = function(){
		var display = question.replace(cloze, "...");
		return display;
	}

}

//Empty array that will house our cloze flashcard objects
var arr = [];

//Key Value pairs for the cloze object
var questions = {
	"Nascar": "The Nascar Hall of Fame is located in Charlotte.",
	"Hornets": "The Charlotte Hornets play at the Spectrum Center",
	"Charlotte Observer": "Charlotte's local newspaper is called the Charlotte Observer",
	"Duke Energy": "Duke Energy is one of the largest electric power holding companies in the United States",
	"1946": "The University of Charlotte was founded in 1946",
	"light rail": "To get around the city of Charlotte, the light rail is probably the easiest way to downtown"
};

//Loop through questions and construct objects
for (var key in questions){
	arr.push(new ClozeFlashcard(key, questions[key]));
}

//Export the array of objects and the constructor out to flashcards.js
module.exports = {arr, ClozeFlashcard};