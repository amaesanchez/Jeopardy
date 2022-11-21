"use strict";

const BASE_API_URL = "https://jservice.io/api/";

// Value of game will become the Game instance populated below
let game;

const $jeopardyTable = $("#jeopardy");

/** Fill the HTML table #jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <th> for each category
 * - The <tbody> should be filled w/ game.numCluesPerCat <tr>s,
 *   each with a question for each category in a <td>
 *   (initially, just show a "?" where the question/answer would go.)
 */
function fillTable() {
  // create a thead elem with numCluesPerCat <th>s
  // for every cat in game.categories, append th with cat title
  // append game.numCluesPerCat <tr>s with game.categories.length <td>s inside
  // to <tbody>

  $jeopardyTable.append(
    $(`
    <thead id="categories" class="text-center">
      <tr id="category-titles">
      </tr>
    </thead>
    <tbody id="clues-per-cat" class="text-center">
    </tbody>`)
  );

  // populates header of table
  for (let i = 0; i < game.categories.length; i++) {
    $("#category-titles").append(
      $(`<th>${game.categories[i].title}</th>`)
    );
  }

  // populates body of table
  for (let i = 0; i < game.numCluesPerCat; i++) {
    const $clueRow = $(`<tr id="clues-row"></tr>`);
    for (let i = 0; i < game.categories.length; i++) {
      const $clue = $(`
        <td id="clue">
          <i class="bi bi-question-circle-fill" style="font-size: 25px"></i>
        </td>
        `);
      $clueRow.append($clue);
    }
    $("#clues-per-cat").append($clueRow);
  }
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
  // evt.currentTarget refers to the element
    //  to which the event handler has been attached!
  // get clue instance and update showing status (index of tr)
  // get clue instance by getting category instance (index of td)

  const clueInstance = $(evt.currentTarget).parent().index();
  const catInstance = $(evt.currentTarget).index();
  const clueCard = game.categories[catInstance].clues[clueInstance];

  if (clueCard.showing === null) {
    $(evt.currentTarget).html(`${clueCard.question}`);
  } else if (clueCard.showing === "question") {
    $(evt.currentTarget).html(`${clueCard.answer}`);
    $(evt.currentTarget).attr("style", "background-color: #28a200");
  }

  clueCard.updateShowingStatus();
}

/**
 * Shows loading spinner, hides start button and game board
 */
function showLoadingState() {
  $("#loading").show();
  $("#start").text("Loading...");
  $("#jeopardy").hide();
}

/**
 * Shows game board, updates start button text and hides loading spinner
 */
function hideLoadingState() {
  $("#jeopardy").show();
  $("#start").text("Restart!");
  $("#loading").hide();
}

// DO NOT CHANGE ANY CODE BELOW THIS LINE

/**
 * Generates new game instance and populates game board in DOM
 */
async function startGame() {
  showLoadingState();
  $("#jeopardy").empty();

  game = new Game(6, 5);
  await game.populateCategoryData();

  fillTable();
  hideLoadingState();
}

$("#start").on("click", startGame);
$("#jeopardy").on("click", "td", handleClick);


// BUG: when you click on the question mark icon,
// handclick still executes but the icon is not removed
// and the background of the
