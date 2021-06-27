let recipes = [
  { 
    name: "Scrambled eggs",
    ingredients: ["1|egg"],
    instructions: ["Heat up pan", "Crack eggs into pan", "Scramble dem eggs"]
  },
  { 
    name: "Other",
    ingredients: ["1|egg"],
    instructions: ["Heat up pan", "Crack eggs into pan", "Scramble dem eggs"]
  }
];

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    let cell = row.insertCell();
    let text = document.createTextNode(element["name"]);
    cell.appendChild(text);
  }
}

let table = document.querySelector("table");
generateTable(table, recipes);