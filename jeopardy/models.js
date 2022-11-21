"use strict";

// max # of categories that can be returned from API
const MAX_COUNT = 100;

/** Game class: manages game construction
 *
 *  Game will have:
 *  - numCategories: integer
 *  - numCluesPerCat: integer
 *  - categories:
 *    [
        Category { title: "Math",
          clues: [
            Clue {question: "2+2", answer: "4", showing: null},
            Clue {question: "1+1", answer: "2", showing: null},
            ... 3 more clues ...
          ],
        },
        Category { title: "Authors",
          clues: [
            Clue {question: "Hamlet", answer: "Shakespeare", showing: null},
            Clue {question: "Bell Jar", answer: "Plath", showing: null}, ...
          ],
        }, ...4 more Categories ...
      ]
 *
 */
class Game {

  /** Construct each Game instance from:
   *  - numCategories: integer(6)
   *  - numCluesPerCat: integer (5)
   */
  constructor(numCategories, numCluesPerCat) {
    this.numCategories = numCategories;
    this.numCluesPerCat = numCluesPerCat;
    this.categories = [];
  }

  /**
   * Simple function to fetch a large batch of high-level category
   * data from jService API.
   *
   * Accepts:
   *   - count: int
   *
   * Returns array of high-level category objects from jService API:
   *
   * [{id, title, clues_count}, {id, title, clues_count}, ... ]
   */
  async fetchCategoryBatch(count) {
    console.debug("fetchCatBatch");

    const response = await axios.get(
        `${BASE_API_URL}categories`, {params: { count }});

    return response.data;
  }

  /** Get this.numCategories random category IDs from API.
   *
   * Returns array of category ids, eg [4, 12, 5, 9, 20, 1]
   */
  async getRandomCategoryIds() {
    console.debug("getRandomCatIds");

    const categoryBatch = await this.fetchCategoryBatch(MAX_COUNT);

    // get the first 6 categories in randomized categoryBatch
    const randomizedBatch = FYRandom(categoryBatch);
    const randomCategories = randomizedBatch.slice(0, this.numCategories);

    const randomIDs = randomCategories.map(cat => cat.id);

    return randomIDs;
  }


  /** Setup category data for game instance:
   *
   * - get random category Ids
   * - get data for each category
   * - populate categories array
   */
  async populateCategoryData() {
    // Note: We've provided some structure for this function, but you'll need
    // to fill in the value for the catIds variable and the body of the loop
    // below.
    const catIds = await this.getRandomCategoryIds();

    for (let catId of catIds) {
      // TODO: Add necessary code to fetch category data & generate
      // new instance for each catId. Populate categories array accordingly.

      const category = await Category.getCategory(catId, this.numCluesPerCat);
      this.categories.push(category);
    }
  }
}

/** Category class: holds category data
 *
 *  Category will have:
 *   - title: string
 *   - clues: array of Clue instances [Clue {}, Clue {}, ...]
 */
class Category {

  /** Construct each Category instance from:
   *  - title: string
   *  - clues: array of Clue instances [Clue {}, Clue {}, ...]
   */
  constructor(title, clues) {
    this.title = title;
    this.clues = clues;
  }

  /** Static method to fetch all the information for a particular
   * category from jService API.
   *
   * Accepts:
   *   - id: int
   *
   * Returns object of category info from API:
   *
   * { id, title, clues_count, clues }
   */
  static async fetchCategoryDetail(catId) {
    const response = await axios({
      url: `${BASE_API_URL}/category`,
      method: "GET",
      params: { "id": catId }
    });

    return response.data;
  }

  /** Static method to return new Category instance with data about a category:
   *
   * Accepts:
   *  - id: integer
   *  - numCluesPerCat: integer
   *
   * Returns Category { title: "Literature", clues: clue-array }
   *
   * Where clue-array is:
   *   [
   *      Clue {question: "Hamlet Author", answer: "Shakespeare", showing: null},
   *      Clue {question: "Bell Jar Author", answer: "Plath", showing: null},
   *      ... 3 more ...
   *   ]
   */
  static async getCategory(id, numCluesPerCat) {
    // this is used to populate this.categories
    const allCatData = await this.fetchCategoryDetail(id);

    const allClueData = allCatData.clues.slice(0, numCluesPerCat);
    const clues = allClueData.map(clue => new Clue(clue.question, clue.answer));

    return new Category(allCatData.title, clues);
  }
}

/** Clue class: holds clue data and showing status
 *
 * Clue will have:
 *  - question: string
 *  - answer: string
 *  - showing: default of null, then string of either "question" or "answer"
 */
class Clue {

  /** Construct each Clue instance from:
   *  - question: string
   *  - answer: string
   */
  constructor(question, answer) {
    this.question = question;
    this.answer = answer;
    this.showing = null;
  }

  /** Update showing status on Clue instance depending on current state
   * Accepts: none
   * Returns: undefined
   */
  updateShowingStatus() {
    if (!this.showing) {
      this.showing = "question";
    } else if (this.showing === "question") {
      this.showing = "answer";
    }
  }
}

/** Fisher-Yates Shuffle used to get random array of category IDs */
function FYRandom(array) {
  let currentIndex = array.length
  let randomIndex = null;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element and decrement currentIndex
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // swap value at randomIndex with the current element.
    [array[currentIndex], array[randomIndex]] =
    [array[randomIndex], array[currentIndex]];
  }

  return array;
}
