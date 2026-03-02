let currentUnit = "meter";

function calculate(){

    let L = parseFloat(document.getElementById("length").value);
    let B = parseFloat(document.getElementById("width").value);
    let T = parseFloat(document.getElementById("thickness").value);

    let d1 = parseFloat(document.getElementById("d1").value);
    let d2 = parseFloat(document.getElementById("d2").value);

    let s1 = parseFloat(document.getElementById("s1").value)/1000;
    let s2 = parseFloat(document.getElementById("s2").value)/1000;

    let steelRate = parseFloat(document.getElementById("steelPrice").value);

    // Concrete Volume
    let volume = L * B * T;
    let dryVolume = volume * 1.54;

    document.getElementById("volume").innerText = volume.toFixed(3);
    document.getElementById("dryVolume").innerText = dryVolume.toFixed(3);

    // Steel Bars
    let d1bars = Math.ceil(B / s1);
    let d2bars = Math.ceil(L / s2);

    document.getElementById("d1bars").innerText = d1bars;
    document.getElementById("d2bars").innerText = d2bars;

    document.getElementById("d1len").innerText = L.toFixed(3);
    document.getElementById("d2len").innerText = B.toFixed(3);

    // Steel Weight
    let weight1 = (d1*d1/162) * L * d1bars;
    let weight2 = (d2*d2/162) * B * d2bars;

    let totalWeight = weight1 + weight2;

    document.getElementById("totalWeight").innerText = totalWeight.toFixed(2);
    document.getElementById("totalCost").innerText = (totalWeight * steelRate).toFixed(2);

    // Cement Bags
    let cementRatio = parseFloat(document.getElementById("cementRatio").value);
    let sandRatio = parseFloat(document.getElementById("sandRatio").value);
    let aggRatio = parseFloat(document.getElementById("aggRatio").value);

    let totalRatio = cementRatio + sandRatio + aggRatio;

    let cementVol = dryVolume * (cementRatio/totalRatio);
    let bags = cementVol / 0.035;

    document.getElementById("cement").innerText = cementVol.toFixed(3);
    document.getElementById("bags").innerText = bags.toFixed(1);
}

function setUnit(unit){

    currentUnit = unit;

    let volumeUnits = document.querySelectorAll(".unit-volume");
    let lengthUnits = document.querySelectorAll(".unit-length");
    let weightUnits = document.querySelectorAll(".unit-weight");

    if(unit === "foot"){
        volumeUnits.forEach(e => e.innerText = "ft³");
        lengthUnits.forEach(e => e.innerText = "ft");
        weightUnits.forEach(e => e.innerText = "lb");
    }
    else if(unit === "yard"){
        volumeUnits.forEach(e => e.innerText = "yd³");
        lengthUnits.forEach(e => e.innerText = "yd");
        weightUnits.forEach(e => e.innerText = "kg");
    }
    else{
        volumeUnits.forEach(e => e.innerText = "m³");
        lengthUnits.forEach(e => e.innerText = "m");
        weightUnits.forEach(e => e.innerText = "kg");
    }
}
