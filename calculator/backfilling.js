let currentUnit = "meter";
let volumeInMeter = 0;

function calculate() {

    let L = parseFloat(document.getElementById("length").value) || 0;
    let W = parseFloat(document.getElementById("width").value) || 0;
    let D = parseFloat(document.getElementById("depth").value) || 0;

    let tripVolume = parseFloat(document.getElementById("tripVolume").value) || 1;
    let price = parseFloat(document.getElementById("price").value) || 0;
    let quantity = parseFloat(document.getElementById("quantity").value) || 1;

    volumeInMeter = L * W * D;

    let totalTrips = (volumeInMeter / tripVolume).toFixed(2);
    let totalCost = (volumeInMeter * price * quantity).toFixed(2);

    updateDisplay(volumeInMeter);

    document.getElementById("resultTrips").innerText = totalTrips;
    document.getElementById("resultCost").innerText = totalCost;
}

function changeUnit(unit) {

    currentUnit = unit;

    updateDisplay(volumeInMeter);
}

function updateDisplay(volume) {

    let displayVolume = volume;
    let unitText = "m³";

    if (currentUnit === "foot") {
        displayVolume = volume * 35.3147;
        unitText = "ft³";
    }
    else if (currentUnit === "yard") {
        displayVolume = volume * 1.30795;
        unitText = "yrd³";
    }
    else if (currentUnit === "brass") {
        displayVolume = volume / 2.83;
        unitText = "brass";
    }

    document.getElementById("resultVolume").innerText = displayVolume.toFixed(3);
    document.getElementById("unitLabel").innerText = unitText;
}

function resetForm() {
    document.getElementById("resultVolume").innerText = "0";
    document.getElementById("resultTrips").innerText = "0";
    document.getElementById("resultCost").innerText = "0";
}
