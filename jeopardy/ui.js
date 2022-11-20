"use strict";

const BASE_API_URL = "https://jservice.io/api/";

// Value of game will become the Game instance populated below
let game;


/** Fill the HTML table #jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <th> for each category
 * - The <tbody> should be filled w/ game.numCluesPerCat <tr>s,
 *   each with a question for each category in a <td>
 *   (initially, just show a "?" where the question/answer would go.)
 */
function fillTable() {

}


/** Handle clicking on a clue: show the question or answer, update clue status.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question
 * - if currently "question", show answer
 * - if currently "answer", ignore click
 *
 * */
function handleClick(evt) {

}


/**
 * Shows loading spinner, hides start button and game board
 */
function showLoadingState() {

}

/**
 * Shows game board, updates start button text and hides loading spinner
 */
function hideLoadingState() {

}


// DO NOT CHANGE ANY CODE BELOW THIS LINE

/**
 * Generates new game instance and populates game board in DOM
 */
async function startGame() {
  showLoadingState();

  game = new Game(6, 5);
  await game.populateCategoryData();

  fillTable();
  hideLoadingState();
}

$("#start").on("click", startGame);
$("#jeopardy").on("click", "td", handleClick);