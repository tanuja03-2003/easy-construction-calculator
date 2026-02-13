/* ===== LOCAL STATE (NO CONFLICT) ===== */
let unit = "m";

/* ===== UNIT CONVERSION ===== */
function setUnit(u) {
unit = u;
calculateCircleBricks();
}

/* ===== MAIN CALCULATION ===== */
function calculateCircleBricks() {

const d = parseFloat(diameter.value);
const h = parseFloat(height.value);
const t = parseFloat(thickness.value);

const brickL = parseFloat(brickLInput.value || brickL.value);
const brickW = parseFloat(brickWInput.value || brickW.value);
const brickH = parseFloat(brickHInput.value || brickH.value);

if (isNaN(d) || isNaN(h) || isNaN(t)) return;

// Wall Volume (cylindrical wall)
let volume = Math.PI * h * ((d / 2) ** 2 - ((d / 2) - t) ** 2);

// Unit conversion
if (unit === "ft") volume *= 35.3147;
if (unit === "yd") volume *= 1.30795;
if (unit === "brass") volume *= 0.0353147;

// Brick volume
const brickVol = brickL * brickW * brickH;

const bricks = brickVol > 0 ? volume / brickVol : 0;

renderResults(volume, bricks);
}

/* ===== RESULTS ===== */
function renderResults(vol, bricks) {
const rows = `
<div class="result-row">
  <span>Wall Volume</span>
  <span>${vol.toFixed(3)}</span>
  <span>${unit}</span>
</div>
<div class="result-row">
  <span>Number of Bricks</span>
  <span>${Math.ceil(bricks)}</span>
  <span>bricks</span>
</div>
`;
document.getElementById("resultRows").innerHTML = rows;
}

/* ===== RESET ===== */
function resetResults() {
document.getElementById("resultRows").innerHTML = "";
}
