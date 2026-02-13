
let currentUnit = 'm';

function calculate() {
  const wallVol = parseFloat(document.getElementById("wallVolume").value);
  const bw = parseFloat(document.getElementById("brickWidth").value);
  const bt = parseFloat(document.getElementById("brickThickness").value);
  const bl = parseFloat(document.getElementById("brickLength").value);
  const price = parseFloat(document.getElementById("brickPrice").value);

  const brickVol = bw * bt * bl;
  const bricks = wallVol / brickVol;

  const dryMortar = wallVol * 1.33;
  const cement = dryMortar / 6;
  const sand = dryMortar * 5 / 6;
  const bags = cement / 0.035;
  const cost = bricks * price;

  document.getElementById("rWall").innerText = wallVol.toFixed(3);
  document.getElementById("rBricks").innerText = bricks.toFixed(0);
  document.getElementById("rCost").innerText = cost.toFixed(2);
  document.getElementById("rMortar").innerText = dryMortar.toFixed(3);
  document.getElementById("rCement").innerText = cement.toFixed(3);
  document.getElementById("rSand").innerText = sand.toFixed(3);
  document.getElementById("rBags").innerText = bags.toFixed(2);
}

function resetAll() {
  location.reload();
}

function goBack() {
  window.history.back();
}

function calculateWallBricks() {
  const W = Number(document.getElementById('wallW').value);
  const H = Number(document.getElementById('wallH').value);
  const T = Number(document.getElementById('wallT').value);

  const bL = Number(document.getElementById('brickL').value);
  const bW = Number(document.getElementById('brickW').value);
  const bH = Number(document.getElementById('brickH').value);

  const deduct = Number(document.getElementById('deductArea').value);
  const price = Number(document.getElementById('brickPrice').value);

  if (!W || !H || !T || !bL || !bW || !bH) {
    alert("Please enter all dimensions");
    return;
  }

  const wallVolume = (W * H * T) - (deduct * T);
  const brickVolume = bL * bW * bH;
  const bricks = wallVolume / brickVolume;

  document.getElementById('resultRows').innerHTML = `
    <div class="row"><span>Wall Volume</span><span>${wallVolume.toFixed(3)}</span><span>${currentUnit}³</span></div>
    <div class="row"><span>Number of Bricks</span><span>${Math.ceil(bricks)}</span><span>bricks</span></div>
    <div class="row"><span>Bricks Cost</span><span>${(bricks * price).toFixed(2)}</span><span>₹</span></div>
  `;
}

function resetWallBricks() {
  document.getElementById('resultRows').innerHTML = '';
}

function setUnit(unit) {
  currentUnit = unit;
  calculateWallBricks(); // 🔥 THIS WAS MISSING
}
