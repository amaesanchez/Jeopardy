"use strict";

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
   *  - numCategories: integer
   *  - numCluesPerCat: integer
   */
  constructor(numCategories, numCluesPerCat) {

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
    const response = await axios.get(
        `${BASE_API_URL}categories`, {params: { count }});

    return response.data;
  }

  /** Get this.numCategories random category IDs from API.
   *
   * Returns array of category ids, eg [4, 12, 5, 9, 20, 1]
   */
  async getRandomCategoryIds() {

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
    const catIds = ______

    for (let catId of catIds) {

      // TODO: Add necessary code to fetch category data & generate 
      // new instance for each catId. Populate categories array accordingly.

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
  static async fetchCategoryDetail(id) {

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
