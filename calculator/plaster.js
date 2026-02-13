let currentUnit = "m";
let baseVolumeM3 = 0;

function calculatePlaster() {

  let L = parseFloat(document.getElementById("length").value) || 0;
  let W = parseFloat(document.getElementById("width").value) || 0;
  let T = parseFloat(document.getElementById("thickness").value) || 0;

  let cementRatio = parseFloat(document.getElementById("cementRatio").value) || 1;
  let sandRatio = parseFloat(document.getElementById("sandRatio").value) || 5;
  let dryFactor = parseFloat(document.getElementById("dryFactor").value) || 1.27;
  let wastage = parseFloat(document.getElementById("wastage").value) || 0;
  let bagWeight = parseFloat(document.getElementById("bagWeight").value) || 50;
  let bagPrice = parseFloat(document.getElementById("bagPrice").value) || 0;
  let plasterRate = parseFloat(document.getElementById("plasterRate").value) || 0;

  let area = L * W;
  let wetVolume = area * (T / 100); // cm to meter
  let dryVolume = wetVolume * dryFactor;

  let totalRatio = cementRatio + sandRatio;

  let cementVolume = (cementRatio / totalRatio) * dryVolume;
  let sandVolume = (sandRatio / totalRatio) * dryVolume;

  let cementWeight = cementVolume * 1440;
  let cementBags = cementWeight / bagWeight;

  let cementCost = cementBags * bagPrice;
  let plasterCost = area * plasterRate;

  dryVolume += (dryVolume * wastage / 100);

  baseVolumeM3 = dryVolume;

  displayResults(area, wetVolume, dryVolume, cementWeight, cementBags, cementCost, plasterCost);
}

function displayResults(area, wetVol, dryVol, cementWt, bags, bagCost, plasterCost) {

  let unitVolume = convertVolume(baseVolumeM3);
  let unitSymbol = getUnitSymbol();

  document.getElementById("resultRows").innerHTML = `
    <div class="result-row"><span>Plaster Area</span><span>${area.toFixed(3)}</span><span>m²</span></div>
    <div class="result-row"><span>Wet Volume</span><span>${wetVol.toFixed(3)}</span><span>${unitSymbol}</span></div>
    <div class="result-row"><span>Dry Volume</span><span>${unitVolume.toFixed(3)}</span><span>${unitSymbol}</span></div>
    <div class="result-row"><span>Cement Weight</span><span>${cementWt.toFixed(2)}</span><span>kg</span></div>
    <div class="result-row"><span>Cement Bags</span><span>${bags.toFixed(2)}</span><span>bags</span></div>
    <div class="result-row"><span>Cement Cost</span><span>${bagCost.toFixed(2)}</span><span>₹</span></div>
    <div class="result-row"><span>Total Plaster Cost</span><span>${plasterCost.toFixed(2)}</span><span>₹</span></div>
  `;
}

function setUnit(unit) {
  currentUnit = unit;
  calculatePlaster();
}

function convertVolume(m3) {
  if (currentUnit === "ft") return m3 * 35.3147;
  if (currentUnit === "yd") return m3 * 1.30795;
  if (currentUnit === "brass") return m3 / 2.83;
  return m3;
}

function getUnitSymbol() {
  if (currentUnit === "ft") return "ft³";
  if (currentUnit === "yd") return "yd³";
  if (currentUnit === "brass") return "brass";
  return "m³";
}

function resetPlaster() {
  document.getElementById("resultRows").innerHTML = "";
}
