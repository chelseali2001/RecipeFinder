let recipes = [
  { 
    name: "Scrambled eggs",
    ingredients: ["eggs|3"],
    instructions: ["1. Heat up pan", "2. Crack eggs into pan", "3. Scramble dem eggs"]
  },
  { 
    name: "Cereal and milk",
    ingredients: ["cereal|1|cup(s)", "milk|1|cup(s)"],
    instructions: ["1. Pour cereal in milk", "2. Eat"]
  },
  {
    name: "Omelet",
    ingredients: ["eggs|2"],
    instructions: ["1. Cook the eggs"]
  }
];

var selectedRow = 0;

function generateTable(table, data) {
  var existing = [];

  for (let element of data) {
    let text = Object.values(element["ingredients"]);

    for (var x = 0; x < text.length; x++) {
      var temp = text[x].split("|");
      var exists = false;

      for (var i = 0; i < existing.length; i++) {
        if (temp[0] == existing[i]) {
          exists = true;
          break;
        }
      }

      if (!exists) {
        let row = table.insertRow();
        let cell = row.insertCell();
        existing.push(temp[0]);
        cell.appendChild(document.createTextNode(temp[0]));
      }
    }

  }
}

function highlight_row() {
  var table = document.getElementById("chosen-ingredients");
  var cells = table.getElementsByTagName('td');
  
  for (var i = 0; i < cells.length; i++) {
    // Take each cell
    var cell = cells[i];
    
    // do something on onclick event for cell
    cell.onclick = function () {
      // Get the row id where the cell exists
      var rowId = this.parentNode.rowIndex;
      
      var rowsNotSelected = table.getElementsByTagName('tr');
      for (var row = 0; row < rowsNotSelected.length; row++) {
        rowsNotSelected[row].style.backgroundColor = "";
        rowsNotSelected[row].classList.remove('selected');
      }
      var rowSelected = table.getElementsByTagName('tr')[rowId];
      rowSelected.style.backgroundColor = "yellow";
      rowSelected.className += " selected";
      document.getElementById("delete-ingredient").style.display = "block";

      selectedRow = rowId;
    }
  }
}

function choose_ingredient() {
  var table = document.getElementById("ingredients");
  var cells = table.getElementsByTagName('td');

  for (var i = 0; i < cells.length; i++) {
    // Take each cell
    var cell = cells[i];
    // do something on onclick event for cell
    cell.onclick = function () {
      // Get the row id where the cell exists
      var rowId = this.parentNode.rowIndex;
      var rowSelected = table.getElementsByTagName('tr')[rowId];
      var selectedIngredient = rowSelected.innerHTML.split("<td>");
      selectedIngredient = selectedIngredient[1].split("</td>")[0];
      document.getElementById("chosen-ingredients").insertRow().insertCell().appendChild(document.createTextNode(selectedIngredient));
      table.deleteRow(rowId);
      document.getElementById("find-recipes").style.display = "block";
      
      highlight_row();
    }
  }

}

function deleteIngredient() {
  console.log(selectedRow);
}

document.getElementById("delete").addEventListener("click", deleteIngredient);

let table = document.getElementById("ingredients");
generateTable(table, recipes);
choose_ingredient();