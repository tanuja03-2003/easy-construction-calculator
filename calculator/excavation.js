let currentUnit = "meter";

function calculate() {

    let L = parseFloat(document.getElementById("length").value);
    let W = parseFloat(document.getElementById("width").value);
    let D = parseFloat(document.getElementById("depth").value);
    let tripVol = parseFloat(document.getElementById("tripVolume").value);
    let price = parseFloat(document.getElementById("price").value);
    let qty = parseFloat(document.getElementById("quantity").value);

    let volume = L * W * D * qty;

    // Convert to selected unit
    let convertedVolume = volume;
    let unitLabel = "m³";

    if (currentUnit === "foot") {
        convertedVolume = volume * 35.3147;
        unitLabel = "ft³";
    }
    else if (currentUnit === "yard") {
        convertedVolume = volume * 1.30795;
        unitLabel = "yrd³";
    }
    else if (currentUnit === "brass") {
        convertedVolume = volume * 35.3147 / 100;
        unitLabel = "brass";
    }

    let totalTrips = convertedVolume / tripVol;
    let totalCost = convertedVolume * price;

    document.getElementById("volumeResult").innerText = convertedVolume.toFixed(3);
    document.getElementById("volumeUnit").innerText = unitLabel;
    document.getElementById("tripResult").innerText = totalTrips.toFixed(2);
    document.getElementById("costResult").innerText = totalCost.toFixed(2);
}

function setUnit(unit) {
    currentUnit = unit;
    calculate();
}

function resetForm() {
    document.getElementById("volumeResult").innerText = "0";
    document.getElementById("tripResult").innerText = "0";
    document.getElementById("costResult").innerText = "0";
}
