let currentUnit = "m";
let baseAreaM2 = 0;

function calculateFormwork() {
  const length = parseFloat(document.getElementById("length").value) || 0;
  const width = parseFloat(document.getElementById("width").value) || 0;
  const price = parseFloat(document.getElementById("price").value) || 0;

  // Convert input to meters if needed
  let lengthM = convertToMeter(length);
  let widthM = convertToMeter(width);

  baseAreaM2 = lengthM * widthM;

  updateResults(price);
}

function updateResults(pricePerM2 = 0) {

  let displayArea = convertFromMeter(baseAreaM2);
  let totalCost = baseAreaM2 * pricePerM2;

  let unitText = getUnitText();

  document.getElementById("resultRows").innerHTML = `
    <div class="result-row">
      <span>Area</span>
      <span>${displayArea.toFixed(3)}</span>
      <span>${unitText}</span>
    </div>
    <div class="result-row">
      <span>Total Cost</span>
      <span>${totalCost.toFixed(2)}</span>
      <span>₹</span>
    </div>
  `;
}

function setUnit(unit) {
  currentUnit = unit;
  updateResults(parseFloat(document.getElementById("price").value) || 0);
}

function convertToMeter(value) {
  if (currentUnit === "ft") return value * 0.3048;
  if (currentUnit === "yd") return value * 0.9144;
  if (currentUnit === "brass") return value; // brass not used for dimension
  return value;
}

function convertFromMeter(areaM2) {
  if (currentUnit === "ft") return areaM2 * 10.7639;
  if (currentUnit === "yd") return areaM2 * 1.19599;
  if (currentUnit === "brass") return areaM2 / 9.2903;
  return areaM2;
}

function getUnitText() {
  if (currentUnit === "ft") return "ft²";
  if (currentUnit === "yd") return "yd²";
  if (currentUnit === "brass") return "brass";
  return "m²";
}

function resetForm() {
  document.getElementById("length").value = 0;
  document.getElementById("width").value = 0;
  document.getElementById("price").value = 0;
  document.getElementById("resultRows").innerHTML = "";
}
