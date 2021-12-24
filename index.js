let recipes = [
  { 
    name: "Scrambled eggs",
    ingredients: [["eggs", "3", ""]],
    instructions: ["1. Heat up pan", "2. Crack eggs into pan", "3. Scramble dem eggs"]
  },
  { 
    name: "Cereal and milk",
    ingredients: [["cereal", "1", "cup(s)"], ["milk", "1", "cup(s)"]],
    instructions: ["1. Pour cereal in milk", "2. Eat"]
  },
  {
    name: "Omelet",
    ingredients: [["eggs", "2", ""]],
    instructions: ["1. Cook the eggs"]
  }
];

let ingredientsList = {};
var selectedRow = 0;

function getAllInfo(data) {
  var existing = [];

  for (let element of data) {
    let list = Object.values(element["ingredients"]);

    for (let x of list) {
      var exists = false;

      for (let i in existing) {
        if (x[0] == existing[i]) {
          exists = true;
          break;
        }
      }

      if (!exists) {
        existing.push(x[0])
      }
    }
  }
  
  existing.sort();

  for (let element of existing) {
    ingredientsList[element] = true;
  }
}

function generateTable(data) {
  document.getElementById("find-recipes").style.display = "none";
  document.getElementById("clear-all-ingredients").style.display = "none";
  document.getElementById("delete-ingredient").style.display = "none";

  var ingredientsParent = document.getElementById("ingredients");
  
  while (ingredientsParent.rows.length > 1) {
    ingredientsParent.deleteRow(1);
  }

  var chosenIngredientsParent = document.getElementById("chosen-ingredients");

  while (chosenIngredientsParent.rows.length > 1) {
    chosenIngredientsParent.deleteRow(1);
  }

  for (let element in data) {
    let row = "";

    if (data[element] == true) {
      row = ingredientsParent.insertRow();
    } else if (data[element] == false) {
      row = chosenIngredientsParent.insertRow();
      document.getElementById("find-recipes").style.display = "block";
      document.getElementById("clear-all-ingredients").style.display = "block";
    }

    let cell = row.insertCell();
    cell.appendChild(document.createTextNode(element));
  }

  var cells = ingredientsParent.getElementsByTagName('td');

  for (var i = 0; i < cells.length; i++) {
    // Take each cell
    var cell = cells[i];
    // do something on onclick event for cell
    cell.onclick = function () {
      // Get the row id where the cell exists
      var rowId = this.parentNode.rowIndex;
      var rowSelected = ingredientsParent.getElementsByTagName('tr')[rowId];
      var selectedIngredient = rowSelected.innerHTML.split("<td>");
      selectedIngredient = selectedIngredient[1].split("</td>")[0];
      ingredientsList[selectedIngredient] = false;
      document.getElementById("find-recipes").style.display = "block";
      document.getElementById("clear-all-ingredients").style.display = "block";
      generateTable(data);
    }
  }

  var cells = chosenIngredientsParent.getElementsByTagName('td');
  
  for (var i = 0; i < cells.length; i++) {
    // Take each cell
    var cell = cells[i];
    
    // do something on onclick event for cell
    cell.onclick = function () {
      // Get the row id where the cell exists
      var rowId = this.parentNode.rowIndex;
      
      var rowsNotSelected = chosenIngredientsParent.getElementsByTagName('tr');

      for (var row = 0; row < rowsNotSelected.length; row++) {
        rowsNotSelected[row].style.backgroundColor = "";
      }

      if (selectedRow != rowId) {
        var rowSelected = chosenIngredientsParent.getElementsByTagName('tr')[rowId];
        rowSelected.style.backgroundColor = "yellow";
        document.getElementById("delete-ingredient").style.display = "block";

        selectedRow = rowId;
      } else if (selectedRow == rowId) {
        selectedRow = 0;
        document.getElementById("delete-ingredient").style.display = "none";
      }
    }
  }

  if (selectedRow > 0) {
    chosenIngredientsParent.getElementsByTagName('tr')[selectedRow].style.backgroundColor = "yellow";
  }
}

function search_ingredients(data) {
  var input = document.getElementById("ingredient_search");
  var filter = input.value.toLowerCase();
  var table = document.getElementById(data);
  var tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    var td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      var txtValue = td.textContent || td.innerText;
      if (txtValue.indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

document.getElementById("clear-all-ingredients-button").onclick = function() {
  for (let element in ingredientsList) {
    ingredientsList[element] = true;
  }

  selectedRow = 0;
  generateTable(ingredientsList);
}

document.getElementById("delete-button").onclick = function() {
  var rowSelected = document.getElementById("chosen-ingredients").getElementsByTagName('tr')[selectedRow];
  var selectedIngredient = rowSelected.innerHTML.split("<td>");
  selectedIngredient = selectedIngredient[1].split("</td>")[0];
  ingredientsList[selectedIngredient] = true;
  selectedRow = 0;
  generateTable(ingredientsList);
}

document.getElementById("find-recipes").onclick ="window.location.href='https://chelseali2001.github.io/RecipeFinder/recipes/possible_recipes';";

getAllInfo(recipes);
generateTable(ingredientsList);
possibleRecipesTable(ingredientsList);