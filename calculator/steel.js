function calculateSteel() {

    const L = parseFloat(document.getElementById("length").value);
    const d = parseFloat(document.getElementById("diameter").value);
    const price = parseFloat(document.getElementById("price").value);
    const qty = parseInt(document.getElementById("quantity").value);

    if (L <= 0 || d <= 0 || qty <= 0) {
        alert("Please enter valid inputs");
        return;
    }

    /*
      Steel weight formula:
      Weight (kg) = (d² / 162) × Length × Quantity
      d in mm, L in meters
    */
    const weightKg = (d * d / 162) * L * qty;
    const weightLb = weightKg * 2.20462;
    const weightTon = weightKg / 1000;

    // Steel density ≈ 7850 kg/m³
    const volume = weightKg / 7850;

    const totalCost = price * weightKg;

    document.getElementById("resultRows").innerHTML = `
        <div class="result-row">
            <span>Weight</span>
            <span>${weightKg.toFixed(3)}</span>
            <span>kg</span>
        </div>

        <div class="result-row">
            <span>Weight</span>
            <span>${weightLb.toFixed(3)}</span>
            <span>lb</span>
        </div>

        <div class="result-row">
            <span>Weight</span>
            <span>${weightTon.toFixed(3)}</span>
            <span>ton</span>
        </div>

        <div class="result-row">
            <span>Volume</span>
            <span>${volume.toFixed(4)}</span>
            <span>m³</span>
        </div>

        <div class="result-row">
            <span>Total Cost</span>
            <span>${totalCost.toFixed(2)}</span>
            <span>₹</span>
        </div>
    `;
}

function resetSteel() {
    document.getElementById("length").value = "";
    document.getElementById("diameter").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "1";
    document.getElementById("resultRows").innerHTML = "";
}
