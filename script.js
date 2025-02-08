/* script.js */
let losses = [];

function addLoss() {
    let lossesDiv = document.getElementById("losses");
    let lossId = losses.length;
    let lossElement = document.createElement("div");
    lossElement.innerHTML = `
        <label>Loss ${lossId + 1} Amount:</label>
        <input type="number" id="loss${lossId}" placeholder="Enter loss amount">
        <label>Probability:</label>
        <input type="number" id="probability${lossId}" placeholder="Enter probability (0-1)">
    `;
    lossesDiv.appendChild(lossElement);
    losses.push(lossId);
}

function calculateRisk() {
    let totalLoss = 0, variance = 0, rmsLoss = 0;
    let assetValue = parseFloat(document.getElementById("assetValue").value);
    let totalProbability = 0;
    
    losses.forEach(id => {
        let loss = parseFloat(document.getElementById(`loss${id}`).value) || 0;
        let probability = parseFloat(document.getElementById(`probability${id}`).value) || 0;
        totalLoss += loss * probability;
        variance += Math.pow(loss - totalLoss, 2) * probability;
        totalProbability += probability;
    });
    
    rmsLoss = Math.sqrt(variance);
    let integralRisk = totalLoss / assetValue;
    
    document.getElementById("averageLoss").innerText = totalLoss.toFixed(2);
    document.getElementById("variance").innerText = variance.toFixed(2);
    document.getElementById("rmsLoss").innerText = rmsLoss.toFixed(2);
    document.getElementById("integralRisk").innerText = integralRisk.toFixed(4);
    
    let improvement = document.getElementById("improvement").value;
    document.getElementById("conclusion").innerText = `Risk assessment results suggest that ${improvement}. Overall risk impact is ${(integralRisk < 0.1) ? 'low' : 'high'}.`;
}
