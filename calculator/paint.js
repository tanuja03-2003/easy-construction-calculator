let currentUnit = "m";

// conversion factors
const convertToMeter = {
    m: 1,
    ft: 0.3048,
    yd: 0.9144,
    brass: 1
};

const areaFromMeter = {
    m: 1,
    ft: 10.7639,
    yd: 1.19599,
    brass: 0.107639 // 1 m² = 0.107639 brass
};

function calculatePaint() {

    let L = parseFloat(document.getElementById("length").value) || 0;
    let W = parseFloat(document.getElementById("width").value) || 0;
    let subtract = parseFloat(document.getElementById("subtract").value) || 0;
    let coats = parseFloat(document.getElementById("coats").value) || 1;
    let coverage = parseFloat(document.getElementById("coverage").value) || 1;
    let price = parseFloat(document.getElementById("price").value) || 0;

    // Convert input dimensions to meters
    let Lm = L * convertToMeter[currentUnit];
    let Wm = W * convertToMeter[currentUnit];

    // Area in m²
    let areaM2 = (Lm * Wm) - subtract;

    if (areaM2 < 0) areaM2 = 0;

    let totalAreaM2 = areaM2 * coats;

    let totalLiter = totalAreaM2 / coverage;

    let totalCost = totalLiter * price;

    // Convert area to selected unit
    let displayArea = totalAreaM2 * areaFromMeter[currentUnit];

    document.getElementById("rArea").innerText = displayArea.toFixed(3);
    document.getElementById("rAreaUnit").innerText =
        currentUnit === "m" ? "m²" :
        currentUnit === "ft" ? "ft²" :
        currentUnit === "yd" ? "yd²" :
        "brass";

    document.getElementById("rLiter").innerText = totalLiter.toFixed(2);
    document.getElementById("rCost").innerText = totalCost.toFixed(2);
}

function setUnit(unit) {
    currentUnit = unit;

    document.getElementById("dimUnit").innerText = unit;
    document.getElementById("areaUnit").innerText =
        unit === "m" ? "m²" :
        unit === "ft" ? "ft²" :
        unit === "yd" ? "yd²" :
        "brass";

    calculatePaint();
}

function resetPaint() {
    document.getElementById("length").value = 0;
    document.getElementById("width").value = 0;
    document.getElementById("subtract").value = 0;
    document.getElementById("coats").value = 1;
    document.getElementById("coverage").value = 50;
    document.getElementById("price").value = 0;

    calculatePaint();
}

window.onload = calculatePaint;
