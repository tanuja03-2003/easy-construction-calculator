/* =========================
   GLOBAL STATE
========================= */
let currentUnit = "m";
let baseVolumeM3 = 0;

/* =========================
   UNIT CONVERSION FACTORS
========================= */
const UNIT_FACTORS = {
  m: 1,
  ft: 35.3147,
  yd: 1.30795,
  brass: 0.3531
};

/* =========================
   SET UNIT
========================= */
function setUnit(unit, btn) {

  currentUnit = unit;

  // Highlight active button
  document.querySelectorAll(".unit-switcher button")
    .forEach(b => b.classList.remove("active"));

  btn.classList.add("active");

  // Recalculate if already calculated
  if (baseVolumeM3 > 0) {
    calculateRound();
  }
}

/* =========================
   ROUND COLUMN CALCULATION
========================= */
function calculateRound() {

  const D = parseFloat(document.getElementById("diameter").value) || 0;
  const H = parseFloat(document.getElementById("height").value) || 0;

  const cementRatio = parseFloat(document.getElementById("cementRatio").value) || 0;
  const sandRatio = parseFloat(document.getElementById("sandRatio").value) || 0;
  const aggRatio = parseFloat(document.getElementById("aggRatio").value) || 0;
  const dryFactor = parseFloat(document.getElementById("dryFactor").value) || 1.54;
  const waterRatio = parseFloat(document.getElementById("waterRatio").value) || 0.5;

  if (!D || !H) return;

  // Base volume in m³
  baseVolumeM3 = Math.PI * Math.pow(D / 2, 2) * H;

  const dryVolumeM3 = baseVolumeM3 * dryFactor;
  const totalRatio = cementRatio + sandRatio + aggRatio;

  const cementM3 = (cementRatio / totalRatio) * dryVolumeM3;
  const sandM3 = (sandRatio / totalRatio) * dryVolumeM3;
  const aggM3 = (aggRatio / totalRatio) * dryVolumeM3;

  const cementBags = (cementM3 * 1440) / 50;
  const water = cementM3 * 1000 * waterRatio;

  // Convert to selected unit
  const factor = UNIT_FACTORS[currentUnit];

  const volume = baseVolumeM3 * factor;
  const dryVolume = dryVolumeM3 * factor;
  const cement = cementM3 * factor;
  const sand = sandM3 * factor;
  const aggregate = aggM3 * factor;

  const unitLabel =
    currentUnit === "m" ? "m³" :
    currentUnit === "ft" ? "ft³" :
    currentUnit === "yd" ? "yd³" : "brass";

  const rows = [
    ["Volume", volume.toFixed(3), unitLabel],
    ["Dry Volume", dryVolume.toFixed(3), unitLabel],
    ["Cement", cement.toFixed(3), unitLabel],
    ["Sand", sand.toFixed(3), unitLabel],
    ["Aggregate", aggregate.toFixed(3), unitLabel],
    ["Water", water.toFixed(0), "Liter"],
    ["Cement Bags", cementBags.toFixed(2), "bags"]
  ];

  const container = document.getElementById("resultRows");
  container.innerHTML = "";

  rows.forEach(r => {
    const div = document.createElement("div");
    div.className = "result-row";
    div.innerHTML = `
      <span>${r[0]}</span>
      <span>${r[1]}</span>
      <span>${r[2]}</span>
    `;
    container.appendChild(div);
  });
}

/* =========================
   RESET
========================= */
function resetResults() {
  baseVolumeM3 = 0;
  document.getElementById("resultRows").innerHTML = "";
}