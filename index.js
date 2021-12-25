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
    ingredients: [["eggs", "2", ""], ["bell pepper", "1", ""]],
    instructions: ["1. Cook the eggs", "2. Add in the bell peppers", "3. Enjoy"]
  }
];

let ingredientsList = {};
let recipesList = {};
var selectedRow = 0;

function getAllInfo(data) {
  var existingIngredients = [];
  var existingRecipes = []

  for (let element of data) {
    var list = Object.values(element["ingredients"]);
    var list0 = Object.values(element["name"]);

    for (let x of list) {
      var exists = false;

      for (let i in existingIngredients) {
        if (x[0] == existingIngredients[i]) {
          exists = true;
          break;
        }
      }

      if (!exists) {
        existingIngredients.push(x[0]);
      }
    }

    for (let x of list0) {
      existingRecipes.push(x);
    }
  }

  existingIngredients.sort();
  existingRecipes.sort()

  for (let element of existingIngredients) {
    ingredientsList[element] = true;
  }

  for (let element of existingRecipes) {
    recipesList[element] = true;
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
    var row = "";

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

function search(searchVal, data) {
  var input = document.getElementById(searchVal);
  var filter = input.value.toLowerCase();
  var table = document.getElementById(data);
  var tr = table.getElementsByTagName("tr");
  console.log(filter);
  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    var td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      var txtValue = td.textContent || td.innerText;
      if (txtValue.toLowerCase().indexOf(filter) > -1) {
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

document.getElementById("find-recipes-button").onclick = function() {
  var possibleRecipesParent = document.getElementById("possible-recipes");

  while (possibleRecipesParent.rows.length > 1) {
    possibleRecipesParent.deleteRow(1);
  }

  var cells = possibleRecipesParent.getElementsByTagName('td');

  for (let element of recipes) {
    var list = Object.values(element["ingredients"]);
    var add = true;

    for (let x of list) {
      if (ingredientsList[x[0]] == true) {
        add = false;
        break;
      }
    }

    if (add == true) {
      let row = possibleRecipesParent.insertRow();
      let col = row.insertCell();
      col.appendChild(document.createTextNode(element["name"]));
    }
  }

  if (possibleRecipesParent.rows.length == 1) {
    alert("There aren't any recipes you can make with these ingredients.");
  } else {
    document.getElementById("first-page").style.display = "none";
    document.getElementById("second-page").style.display = "block";

    for (var i = 0; i < cells.length; i++) {
      // Take each cell
      var cell = cells[i];
      // do something on onclick event for cell
      cell.onclick = function () {
        // Get the row id where the cell exists
        var rowId = this.parentNode.rowIndex;
        var rowSelected = possibleRecipesParent.getElementsByTagName('tr')[rowId];
        var selectedRecipe = rowSelected.innerHTML.split("<td>");
        selectedRecipe = selectedRecipe[1].split("</td>")[0];
        document.getElementById("second-page").style.display = "none";
        document.getElementById("third-page").style.display = "block";
  
        for (let element of recipes) {
          if (element["name"] == selectedRecipe) {
            var elmnt = document.getElementById("recipeTitle");
            elmnt.innerHTML = selectedRecipe;
  
            elmnt = document.getElementById("ingredientsInfo");
            elmnt.innerHTML = "";
  
            var list = Object.values(element["ingredients"]);
            
            for (let x of list) {
              if (x[2] == "") {
                elmnt.innerHTML += x[1] + " " + x[0] + "<br />";
              } else {
                elmnt.innerHTML += x[1] + " " + x[2] + " of " + x[0] + "<br />";
              }
            }
  
            elmnt = document.getElementById("instructionsInfo");
            elmnt.innerHTML = "";
  
            list = Object.values(element["instructions"]);
  
            for (let x of list) {
              elmnt.innerHTML += x + "<br />";
            }
          }
        }
      }
    }
  }
}

document.getElementById("back-to-first-button").onclick = function() {
  document.getElementById("first-page").style.display = "block";
  document.getElementById("second-page").style.display = "none";
}

document.getElementById("back-to-second-button").onclick = function() {
  document.getElementById("second-page").style.display = "block";
  document.getElementById("third-page").style.display = "none";
}

document.getElementById("print").onclick = function() {
  print();
}

getAllInfo(recipes);
generateTable(ingredientsList);