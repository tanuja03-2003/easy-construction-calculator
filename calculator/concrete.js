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
function setUnit(unit) {
  currentUnit = unit;
  updateResults();
}

/* =========================
   CONCRETE BY VOLUME
========================= */
function calculateConcreteVolume() {
  const volumeInput = document.querySelector("input[type='number']");
  if (!volumeInput) return;

  baseVolumeM3 = parseFloat(volumeInput.value) || 0;
  updateResults();
}

/* =========================
   SLAB CALCULATION
========================= */
function calculateSlab() {
  const L = parseFloat(document.getElementById("length").value) || 0;
  const W = parseFloat(document.getElementById("width").value) || 0;
  const T = parseFloat(document.getElementById("thickness").value) || 0;

  baseVolumeM3 = L * W * T;
  updateResults();
}

/* =========================
   UPDATE RESULT TABLE
========================= */
function updateResults() {
  const factor = UNIT_FACTORS[currentUnit];
  const volume = baseVolumeM3 * factor;
  const dryVolume = volume * 1.54;

  const cement = volume * (1 / 7);
  const sand = volume * (2 / 7);
  const aggregate = volume * (4 / 7);

  const water = 792;
  const cementBags = (cement * 1440) / 50;

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
  if (!container) return;

  container.innerHTML = "";
  rows.forEach(r => {
    const div = document.createElement("div");
    div.className = "result-row";
    div.innerHTML = `<span>${r[0]}</span><span>${r[1]}</span><span>${r[2]}</span>`;
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
function calculateRound() {
  const D = parseFloat(document.getElementById("diameter").value);
  const H = parseFloat(document.getElementById("height").value);

  const cement = parseFloat(document.getElementById("cementRatio").value);
  const sand = parseFloat(document.getElementById("sandRatio").value);
  const agg = parseFloat(document.getElementById("aggRatio").value);
  const dryFactor = parseFloat(document.getElementById("dryFactor").value);

  // ---- Volume in m³ ----
  let volumeM3 = Math.PI * Math.pow(D / 2, 2) * H;

  let dryVolume = volumeM3 * dryFactor;
  let totalRatio = cement + sand + agg;

  let cementVol = (cement / totalRatio) * dryVolume;
  let sandVol = (sand / totalRatio) * dryVolume;
  let aggVol = (agg / totalRatio) * dryVolume;

  let water = cementVol * 1440 * 0.5;
  let cementBags = (cementVol * 1440) / 50;

  renderResults(volumeM3, dryVolume, cementVol, sandVol, aggVol, water, cementBags);
}

function calculateCircleTank() {
  const D = parseFloat(document.getElementById("tankDiameter").value);
  const H = parseFloat(document.getElementById("tankHeight").value);
  const t = parseFloat(document.getElementById("tankThickness").value);

  const c = parseFloat(document.getElementById("cementRatio").value);
  const s = parseFloat(document.getElementById("sandRatio").value);
  const a = parseFloat(document.getElementById("aggRatio").value);
  const dry = parseFloat(document.getElementById("dryFactor").value);
  const waterRatio = parseFloat(document.getElementById("waterRatio").value);

  if (!D || !H || !t) return;

  const R = D / 2;
  const r = R - t;

  if (r <= 0) {
    alert("Thickness is too large for given diameter");
    return;
  }

  // Base volume in m³
  baseVolume = Math.PI * H * (R * R - r * r);

  const dryVol = baseVolume * dry;
  const sum = c + s + a;

  const cement = (dryVol * c) / sum;
  const sand = (dryVol * s) / sum;
  const aggregate = (dryVol * a) / sum;

  const water = cement * 1000 * waterRatio;
  const cementBags = cement / 0.035;

  renderResults({
    Volume: baseVolume,
    "Dry Volume": dryVol,
    Cement: cement,
    Sand: sand,
    Aggregate: aggregate,
    Water: water,
    "Cement Bags": cementBags
  });
}
