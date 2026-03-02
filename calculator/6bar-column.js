function calculate(){

    let a = parseFloat(document.getElementById("a").value);
    let b = parseFloat(document.getElementById("b").value);
    let h = parseFloat(document.getElementById("height").value);

    let d1 = parseFloat(document.getElementById("d1").value);
    let d2 = parseFloat(document.getElementById("d2").value);
    let ring = parseFloat(document.getElementById("ring").value);
    let spacing = parseFloat(document.getElementById("spacing").value);
    let price = parseFloat(document.getElementById("steelPrice").value);

    // 6 bars -> 4 of d1 + 2 of d2
    let vd1 = h;
    let vd2 = h;

    let rings = Math.ceil((h*1000)/spacing);

    let ringLen = 2*(a+b);

    // Weight formula d²/162 × length
    let w1 = (d1*d1/162) * (vd1*4);
    let w2 = (d2*d2/162) * (vd2*2);
    let wr = (ring*ring/162) * (ringLen*rings);

    let totalWeight = w1 + w2 + wr;
    let totalCost = totalWeight * price;

    let volume = a * b * h;

    document.getElementById("vd1").innerText = vd1.toFixed(3);
    document.getElementById("vd2").innerText = vd2.toFixed(3);
    document.getElementById("ringLen").innerText = ringLen.toFixed(3);
    document.getElementById("rings").innerText = rings;

    document.getElementById("w1").innerText = w1.toFixed(3);
    document.getElementById("w2").innerText = w2.toFixed(3);
    document.getElementById("wr").innerText = wr.toFixed(3);

    document.getElementById("totalWeight").innerText = totalWeight.toFixed(3);
    document.getElementById("totalCost").innerText = totalCost.toFixed(2);

    document.getElementById("vol").innerText = volume.toFixed(3);
}
