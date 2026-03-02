let currentUnit = "meter";

let results = {}; // store original meter values

function calculate() {

    let length = parseFloat(document.getElementById("length").value);
    let width = parseFloat(document.getElementById("width").value);
    let thickness = parseFloat(document.getElementById("thickness").value);

    let d1 = parseFloat(document.getElementById("d1").value);
    let d2 = parseFloat(document.getElementById("d2").value);
    let s1 = parseFloat(document.getElementById("s1").value);
    let s2 = parseFloat(document.getElementById("s2").value);
    let steelPrice = parseFloat(document.getElementById("steelPrice").value);

    let cementRatio = parseFloat(document.getElementById("cementRatio").value);
    let sandRatio = parseFloat(document.getElementById("sandRatio").value);
    let aggRatio = parseFloat(document.getElementById("aggRatio").value);

    // ---------- CONCRETE ----------
    let volume = length * width * thickness;
    let dryVolume = volume * 1.54;
    let totalRatio = cementRatio + sandRatio + aggRatio;

    let cement = (cementRatio / totalRatio) * dryVolume;
    let sand = (sandRatio / totalRatio) * dryVolume;
    let aggregate = (aggRatio / totalRatio) * dryVolume;

    let bags = cement * 1440 / 50;

    // ---------- STEEL ----------
    let d1Bars = Math.ceil(width * 1000 / s1);
    let d2Bars = Math.ceil(length * 1000 / s2);

    let d1Length = length;
    let d2Length = width;

    let d1Weight = (d1 * d1 / 162) * d1Length * d1Bars;
    let d2Weight = (d2 * d2 / 162) * d2Length * d2Bars;

    let totalWeight = d1Weight + d2Weight;
    let totalCost = totalWeight * steelPrice;

    // store in meter base
    results = {
        volume, dryVolume, cement, sand, aggregate,
        d1Length, d2Length,
        d1Bars, d2Bars,
        d1Weight, d2Weight,
        totalWeight, totalCost,
        bags
    };

    updateDisplay();
}

function setUnit(unit) {
    currentUnit = unit;

    document.querySelectorAll(".unit-switch button")
        .forEach(btn => btn.classList.remove("active"));

    event.target.classList.add("active");

    updateDisplay();
}

function updateDisplay() {

    if (!results.volume) return;

    let factor = 1;
    let volUnit = "m³";
    let lenUnit = "m";
    let weightUnit = "kg";

    if (currentUnit === "foot") {
        factor = 35.3147;
        volUnit = "ft³";
        lenUnit = "ft";
        weightUnit = "lb";
    }
    else if (currentUnit === "yard") {
        factor = 1.30795;
        volUnit = "yd³";
        lenUnit = "yd";
    }
    else if (currentUnit === "brass") {
        factor = 0.0353147;
        volUnit = "brass";
    }

    // ---------- Concrete ----------
    document.getElementById("volume").innerText = (results.volume * factor).toFixed(3);
    document.getElementById("dryVolume").innerText = (results.dryVolume * factor).toFixed(3);
    document.getElementById("cement").innerText = (results.cement * factor).toFixed(3);
    document.getElementById("sand").innerText = (results.sand * factor).toFixed(3);
    document.getElementById("aggregate").innerText = (results.aggregate * factor).toFixed(3);
    document.getElementById("bags").innerText = results.bags.toFixed(1);

    // ---------- Steel ----------
    document.getElementById("d1len").innerText = convertLength(results.d1Length).toFixed(3);
    document.getElementById("d2len").innerText = convertLength(results.d2Length).toFixed(3);

    document.getElementById("d1bars").innerText = results.d1Bars;
    document.getElementById("d2bars").innerText = results.d2Bars;

    let d1W = results.d1Weight;
    let d2W = results.d2Weight;
    let totalW = results.totalWeight;

    if (currentUnit === "foot") {
        d1W *= 2.20462;
        d2W *= 2.20462;
        totalW *= 2.20462;
    }

    document.getElementById("d1Weight").innerText = d1W.toFixed(3);
    document.getElementById("d2Weight").innerText = d2W.toFixed(3);
    document.getElementById("steelWeight").innerText = totalW.toFixed(3);
    document.getElementById("steelCost").innerText = results.totalCost.toFixed(2);

    // ---------- UPDATE UNIT COLUMN ----------
    document.querySelectorAll(".vol-unit").forEach(el => el.innerText = volUnit);
    document.querySelectorAll(".len-unit").forEach(el => el.innerText = lenUnit);
    document.querySelectorAll(".weight-unit").forEach(el => el.innerText = weightUnit);
}

function convertLength(value) {
    if (currentUnit === "foot") return value * 3.28084;
    if (currentUnit === "yard") return value * 1.09361;
    return value;
}
