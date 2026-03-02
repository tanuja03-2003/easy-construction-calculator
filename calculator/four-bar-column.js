function calculate() {

let a = parseFloat(document.getElementById("sideA").value)/1000;
let b = parseFloat(document.getElementById("sideB").value)/1000;
let h = parseFloat(document.getElementById("height").value);
let d1 = parseFloat(document.getElementById("d1").value);
let ringDia = parseFloat(document.getElementById("ringDia").value);
let spacing = parseFloat(document.getElementById("spacing").value)/1000;
let num = parseFloat(document.getElementById("numColumns").value);
let steelPrice = parseFloat(document.getElementById("steelPrice").value);

let cementRatio = parseFloat(document.getElementById("cementRatio").value);
let sandRatio = parseFloat(document.getElementById("sandRatio").value);
let aggRatio = parseFloat(document.getElementById("aggRatio").value);

let totalRatio = cementRatio + sandRatio + aggRatio;

// ===== STEEL =====

let verticalLength = h * 4 * num;
let ringCount = Math.floor(h/spacing) * num;
let ringLength = 2*(a+b) * ringCount;

let d1Weight = (d1*d1/162) * verticalLength;
let ringWeight = (ringDia*ringDia/162) * ringLength;

let totalWeight = d1Weight + ringWeight;
let totalCost = totalWeight * steelPrice;

document.getElementById("vertLen").innerText = verticalLength.toFixed(3);
document.getElementById("ringLen").innerText = ringLength.toFixed(3);
document.getElementById("d1bars").innerText = 4 * num;
document.getElementById("ringPieces").innerText = ringCount;
document.getElementById("d1Weight").innerText = d1Weight.toFixed(3);
document.getElementById("ringWeight").innerText = ringWeight.toFixed(3);
document.getElementById("totalWeight").innerText = totalWeight.toFixed(3);
document.getElementById("totalCost").innerText = totalCost.toFixed(2);

// ===== CONCRETE =====

let volume = a * b * h * num;
let dryVolume = volume * 1.54;

let cement = (cementRatio/totalRatio) * dryVolume;
let sand = (sandRatio/totalRatio) * dryVolume;
let agg = (aggRatio/totalRatio) * dryVolume;

let bags = cement / 0.035;

document.getElementById("concVol").innerText = volume.toFixed(3);
document.getElementById("dryVol").innerText = dryVolume.toFixed(3);
document.getElementById("cement").innerText = cement.toFixed(3);
document.getElementById("sand").innerText = sand.toFixed(3);
document.getElementById("agg").innerText = agg.toFixed(3);
document.getElementById("bags").innerText = bags.toFixed(1);

}
