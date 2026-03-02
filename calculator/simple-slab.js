let currentUnit = "meter";
let baseData = {}; // store meter based values

function calculate() {

    // INPUTS
    let L = parseFloat(document.getElementById("length").value);   // meter
    let W = parseFloat(document.getElementById("width").value);    // meter
    let T = parseFloat(document.getElementById("thickness").value);

    let d1 = parseFloat(document.getElementById("d1").value); // mm
    let d2 = parseFloat(document.getElementById("d2").value);

    let S1 = parseFloat(document.getElementById("s1").value); // mm
    let S2 = parseFloat(document.getElementById("s2").value);

    let cementRatio = parseFloat(document.getElementById("cementRatio").value);
    let sandRatio = parseFloat(document.getElementById("sandRatio").value);
    let aggRatio = parseFloat(document.getElementById("aggRatio").value);

    let steelPrice = parseFloat(document.getElementById("steelPrice").value);

    // COVER (standard 50mm)
    let cover = 0.05;

    // ---------------- STEEL ----------------

    // number of bars
    let d1bars = Math.floor((W * 1000) / S1) + 1;
    let d2bars = Math.floor((L * 1000) / S2) + 1;

    // cut length (subtract cover both sides)
    let d1Cut = L - 2 * cover;
    let d2Cut = W - 2 * cover;

    // total length
    let totalD1Length = d1bars * d1Cut;
    let totalD2Length = d2bars * d2Cut;

    // weight
    let d1Weight = (d1 * d1 / 162) * totalD1Length;
    let d2Weight = (d2 * d2 / 162) * totalD2Length;

    let totalWeight = d1Weight + d2Weight;

    let steelVolume = totalWeight / 7850;

    let steelCost = totalWeight * steelPrice;

    // ---------------- CONCRETE ----------------

    let wetVolume = L * W * T;

    let dryVolume = wetVolume * 1.54;

    let totalRatio = cementRatio + sandRatio + aggRatio;

    let cement = (cementRatio / totalRatio) * dryVolume;
    let sand = (sandRatio / totalRatio) * dryVolume;
    let aggregate = (aggRatio / totalRatio) * dryVolume;

    let cementBags = cement / 0.0347;

    // store base values
    baseData = {
        d1Cut, d2Cut,
        d1bars, d2bars,
        d1Weight, d2Weight,
        totalWeight,
        steelVolume,
        steelCost,
        wetVolume,
        dryVolume,
        cement,
        sand,
        aggregate,
        cementBags
    };

    displayResults();
}

function displayResults() {

    let lengthFactor = 1;
    let volumeFactor = 1;
    let weightUnit = "kg";

    if (currentUnit === "foot") {
        lengthFactor = 3.28084;
        volumeFactor = 35.3147;
    }
    else if (currentUnit === "yard") {
        lengthFactor = 1.09361;
        volumeFactor = 1.30795;
    }
    else if (currentUnit === "brass") {
        volumeFactor = 35.3147 / 100; // convert to brass
    }

    // STEEL
    document.getElementById("d1len").innerText =
        (baseData.d1Cut * lengthFactor).toFixed(3);

    document.getElementById("d2len").innerText =
        (baseData.d2Cut * lengthFactor).toFixed(3);

    document.getElementById("d1bars").innerText = baseData.d1bars;
    document.getElementById("d2bars").innerText = baseData.d2bars;

    document.getElementById("d1Weight").innerText =
        baseData.d1Weight.toFixed(3);

    document.getElementById("d2Weight").innerText =
        baseData.d2Weight.toFixed(3);

    document.getElementById("steelWeight").innerText =
        baseData.totalWeight.toFixed(3);

    document.getElementById("steelVolume").innerText =
        (baseData.steelVolume * volumeFactor).toFixed(3);

    document.getElementById("steelCost").innerText =
        baseData.steelCost.toFixed(2);

    // CONCRETE
    document.getElementById("volume").innerText =
        (baseData.wetVolume * volumeFactor).toFixed(3);

    document.getElementById("dryVolume").innerText =
        (baseData.dryVolume * volumeFactor).toFixed(3);

    document.getElementById("cement").innerText =
        (baseData.cement * volumeFactor).toFixed(3);

    document.getElementById("sand").innerText =
        (baseData.sand * volumeFactor).toFixed(3);

    document.getElementById("aggregate").innerText =
        (baseData.aggregate * volumeFactor).toFixed(3);

    document.getElementById("bags").innerText =
        baseData.cementBags.toFixed(1);
}

function setUnit(unit) {
    currentUnit = unit;
    displayResults();
}

window.onload = calculate;
