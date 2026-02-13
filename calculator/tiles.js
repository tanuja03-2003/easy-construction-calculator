
let currentUnit = "m";
let baseAreaM2 = 0;

function calculateTiles() {

let L = parseFloat(document.getElementById("floorLength").value) || 0;
let W = parseFloat(document.getElementById("floorWidth").value) || 0;

let tileL = parseFloat(document.getElementById("tileLength").value) || 0;
let tileW = parseFloat(document.getElementById("tileWidth").value) || 0;

let wastage = parseFloat(document.getElementById("wastage").value) || 0;
let quantity = parseFloat(document.getElementById("quantity").value) || 1;
let price = parseFloat(document.getElementById("tilePrice").value) || 0;

/* Base area in m² */
baseAreaM2 = L * W;

/* Tile area convert cm → meter */
let tileArea = (tileL / 100) * (tileW / 100);

let totalTiles = 0;

if (tileArea > 0) {
totalTiles = baseAreaM2 / tileArea;
totalTiles += totalTiles * (wastage / 100);
totalTiles = Math.ceil(totalTiles) * quantity;
}

/* Cost calculation */
let totalCost = baseAreaM2 * price;

updateResults(baseAreaM2, totalTiles, totalCost);
}

function updateResults(area, tiles, cost) {

let displayArea = area;
let unit = "m²";

if (currentUnit === "ft") {
displayArea = area * 10.764;
unit = "ft²";
}

if (currentUnit === "yd") {
displayArea = area * 1.196;
unit = "yd²";
}

if (currentUnit === "brass") {
displayArea = area * 0.353;
unit = "brass";
}

document.getElementById("resArea").innerText = displayArea.toFixed(3);
document.getElementById("areaUnit").innerText = unit;
document.getElementById("resTiles").innerText = tiles;
document.getElementById("resCost").innerText = cost.toFixed(2);
}

function setUnit(unit) {
currentUnit = unit;
calculateTiles();
}

function resetTiles() {
document.querySelectorAll("input").forEach(input => input.value = 0);
calculateTiles();
}

window.onload = calculateTiles;
