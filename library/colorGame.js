var numSquares = 12;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

resetButton.addEventListener("click", function(){
	reset();
});

function init(){
	setUpModeButtons();
	setUpSquares();
	reset();
}

function setUpModeButtons(){
	for(var x = 0; x < modeButtons.length; x++){
		modeButtons[x].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			modeButtons[2].classList.remove("selected");
			this.classList.add("selected");
			// this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			if(this.textContent === "Easy"){
				numSquares = 6;
			} else if(this.textContent === "Hard"){
				numSquares = 12;
			} else {
				numSquares = 21;
			}
			reset();
		});
	}
}

function setUpSquares(){
	for( var x = 0; x < squares.length; x++){
		//add event listeners to squares
		squares[x].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			//compare color to picked color
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;

			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again!";
			}
		});
	}
}

function reset(){
	//Generate all new colors
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = ""; 
	//change colors of sqaures
	for( var x = 0; x < squares.length; x++){
		if(colors[x]){
			squares[x].style.display = "block";
			squares[x].style.backgroundColor = colors[x];
		} else {
			squares[x].style.display = "none";
		}
	}
	h1.style.backgroundColor = "steelblue";
}

function changeColors(color){
	//loop through all squares
	for( var x = 0; x < squares.length; x++){
		//change each color to match given color
		squares[x].style.backgroundColor = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	//Make an Array
	var arr = [];
	//Add num random colors to arr
	for(var x = 0; x < num; x++){
		//get random Color and push into arr
		arr.push(randomColor());
	}
	//return that arr
	return arr;
}

function randomColor(){
	//pick a "red" from 0 - 255
	var red = Math.floor(Math.random() * 256);
	//pick a "green" from 0 - 255
	var green = Math.floor(Math.random() * 256);
	//pick a "blue" from 0 - 255
	var blue = Math.floor(Math.random() * 256);

	return "rgb(" + red + ", " + green + ", " + blue + ")";
}