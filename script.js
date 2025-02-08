let losses = [];

function addLoss() {
    let lossesDiv = document.getElementById("losses");
    let index = losses.length;

    let div = document.createElement("div");
    div.classList.add("mb-2");
    div.innerHTML = `
        <div class="card p-2">
            <label>Loss #${index + 1}:</label>
            <input type="text" class="form-control" id="lossName${index}" placeholder="Loss Name">
            <input type="number" class="form-control" id="lossValue${index}" placeholder="Loss Value ($)">
            <input type="number" class="form-control" id="lossProb${index}" placeholder="Probability (0-1)">
        </div>
    `;
    lossesDiv.appendChild(div);
    losses.push({});
}

function calculateRisk() {
    let avgLoss = 0, variance = 0, rmsLoss = 0, integralRisk = 0;
    let improvement = document.getElementById("improvement").value.trim() || "No improvement suggested";
    
    losses = losses.map((_, index) => {
        let value = parseFloat(document.getElementById(`lossValue${index}`).value) || 0;
        let prob = parseFloat(document.getElementById(`lossProb${index}`).value) || 0;
        avgLoss += value * prob;
        return { value, prob };
    });

    losses.forEach(loss => variance += loss.prob * Math.pow(loss.value - avgLoss, 2));
    rmsLoss = Math.sqrt(variance);
    integralRisk = avgLoss + rmsLoss;

    // Previous values for comparison (modify these if needed)
    let prevAvgLoss = 93;
    let prevVariance = 122251;
    let prevRmsLoss = 349.6;
    let prevIntegralRisk = 272.65;

    // Determine increase or decrease
    let avgLossChange = avgLoss > prevAvgLoss ? "increased" : "decreased";
    let varianceChange = variance > prevVariance ? "increased" : "decreased";
    let rmsLossChange = rmsLoss > prevRmsLoss ? "increased" : "decreased";
    let integralRiskChange = integralRisk > prevIntegralRisk ? "increased" : "decreased";

    let appropriateness = avgLoss < prevAvgLoss ? "appropriate" : "not appropriate";
    let effectiveness = integralRisk < prevIntegralRisk ? "effective" : "not effective";
    let beneficial = integralRisk < prevIntegralRisk ? "very beneficial" : "not beneficial";

    // Display calculated results
    document.getElementById("averageLoss").innerText = `$${avgLoss.toFixed(2)}`;
    document.getElementById("variance").innerText = variance.toFixed(2);
    document.getElementById("rmsLoss").innerText = rmsLoss.toFixed(2);
    document.getElementById("integralRisk").innerText = integralRisk.toFixed(2);

    // Generate the detailed conclusion
    let conclusionText = `
        The average loss from risk (mathematical expectation of loss) has ${avgLossChange} significantly 
        (instead of ${prevAvgLoss} it became ${avgLoss.toFixed(2)}), but at the same time the variance 
        (the degree of riskiness of the situation, the measure of dispersion) ${varianceChange} 
        (instead of ${prevVariance} it became ${variance.toFixed(2)}).
        
        Accordingly, the standard deviation RMS loss also ${rmsLossChange} 
        (instead of ${prevRmsLoss} it became ${rmsLoss.toFixed(2)}).
        
        The integral risk assessment ${integralRiskChange} 
        (instead of ${prevIntegralRisk} it became ${integralRisk.toFixed(2)}).
        
        As is known, when making a decision, the values of the integral risk assessment should be minimized.
        
        Consequently, from all of the above, we can conclude that "${improvement}" is ${appropriateness} 
        and ${effectiveness} in these conditions.
        
        This will ${integralRisk < prevIntegralRisk ? "reduce" : "increase"} the likelihood of personal data theft, 
        and also significantly ${integralRisk < prevIntegralRisk ? "reduce" : "increase"} 
        the riskiness of the situation.
        
        That is why these events are ${beneficial} for our company.
    `;

    document.getElementById("conclusion").innerText = conclusionText;
}

// 🌙 Toggle Dark Mode
document.getElementById("themeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});
