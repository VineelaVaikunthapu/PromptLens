let previousPrompt = null;

async function analyzePrompt() {
    const prompt = document.getElementById("promptInput").value.trim();

    if (!prompt) {
        alert("Please write a prompt first");
        return;
    }

    showLoading("Analyzing your prompt...");

    try {
        const response = await fetch("/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });

        const data = await response.json();
        showResults(data, prompt);
        previousPrompt = prompt;

    } catch (err) {
        showError();
    }
}

async function comparePrompt() {
    const newPrompt = document.getElementById("promptInput").value.trim();

    if (!newPrompt || !previousPrompt) {
        alert("Write your improved prompt first");
        return;
    }

    if (newPrompt === previousPrompt) {
        alert("Your prompt hasn't changed. Improve it first then compare.");
        return;
    }

    showLoading("Comparing prompts...");

    try {
        const response = await fetch("/compare", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ old_prompt: previousPrompt, new_prompt: newPrompt })
        });

        const data = await response.json();
        showComparison(data, newPrompt);
        previousPrompt = newPrompt;

    } catch (err) {
        showError();
    }
}

function showLoading(message) {
    document.getElementById("results").innerHTML = `
        <div class="loading">
            <div class="loading-spinner"></div>
            <p>${message}</p>
        </div>
    `;
}

function showResults(data, prompt) {
    document.getElementById("results").innerHTML = `
        <div class="score-card">
            <div class="score-label">Prompt Score</div>
            <div class="score-number">${data.score}<span class="score-total">/10</span></div>
        </div>

        <div class="result-card">
            <div class="result-card-header">
                <div class="dot"></div>
                <h3>Output</h3>
            </div>
            <p>${data.output}</p>
        </div>

        <div class="result-card">
            <div class="result-card-header">
                <div class="dot"></div>
                <h3>Feedback</h3>
            </div>
            <p>${data.feedback}</p>
        </div>

        <div class="input-card" style="margin-top: 16px;">
            <div class="input-label">
                <div class="dot"></div>
                Improve Your Prompt
            </div>
            <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 16px;">
                Read the feedback above, improve your prompt below, then compare.
            </p>
            <button class="btn-compare" onclick="comparePrompt()">
                ⚡ I improved my prompt — Compare Now
            </button>
        </div>
    `;
}

function showComparison(data, newPrompt) {
    const oldWon = data.old_score > data.new_score;
    const newWon = data.new_score > data.old_score;

    document.getElementById("results").innerHTML = `
        <div class="score-card">
            <div class="score-label">Winner</div>
            <div class="score-number" style="font-size: 2rem;">${data.winner}</div>
        </div>

        <div class="compare-grid">
            <div class="compare-card ${oldWon ? 'winner' : 'loser'}">
                <div class="compare-tag">${oldWon ? '👑 Winner' : 'Previous'}</div>
                <div class="compare-score">${data.old_score}/10</div>
                <p>${data.old_output}</p>
            </div>
            <div class="compare-card ${newWon ? 'winner' : 'loser'}">
                <div class="compare-tag">${newWon ? '👑 Winner' : 'New Version'}</div>
                <div class="compare-score">${data.new_score}/10</div>
                <p>${data.new_output}</p>
            </div>
        </div>

        <div class="result-card">
            <div class="result-card-header">
                <div class="dot"></div>
                <h3>Why</h3>
            </div>
            <p>${data.reason}</p>
        </div>

        <div class="input-card" style="margin-top: 16px;">
            <div class="input-label">
                <div class="dot"></div>
                Keep Improving
            </div>
            <button class="btn-compare" onclick="comparePrompt()">
                ⚡ Improve Again — Compare
            </button>
            <button class="btn-primary" onclick="startFresh()" style="margin-top: 8px;">
                Start New Topic →
            </button>
        </div>
    `;
}

function showError() {
    document.getElementById("results").innerHTML = `
        <div class="loading">
            <p style="color: #ef4444;">Something went wrong. Try again.</p>
        </div>
    `;
}

function startFresh() {
    previousPrompt = null;
    document.getElementById("promptInput").value = "";
    document.getElementById("results").innerHTML = "";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}