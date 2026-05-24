let previousPrompt = null;

async function analyzePrompt() {
    const prompt = document.getElementById('promptInput').value.trim();
    if (!prompt) { alert('Please write a prompt first.'); return; }
    showLoading('Analyzing your prompt...');
    try {
        const res = await fetch('/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });
        const data = await res.json();
        previousPrompt = prompt;
        showResults(data);
    } catch (err) { showError(); }
}

async function comparePrompt() {
    const newPrompt = document.getElementById('promptInput').value.trim();
    if (!newPrompt) { alert('Write your improved prompt first.'); return; }
    if (newPrompt === previousPrompt) { alert('Your prompt has not changed. Improve it first.'); return; }
    showLoading('Comparing versions...');
    try {
        const res = await fetch('/compare', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ old_prompt: previousPrompt, new_prompt: newPrompt })
        });
        const data = await res.json();
        previousPrompt = newPrompt;
        showComparison(data);
    } catch (err) { showError(); }
}

function showLoading(msg) {
    document.getElementById('results').innerHTML = `
        <div class="tool-loading">
            <div class="spinner"></div>
            <p>${msg}</p>
        </div>`;
}

function showResults(data) {
    document.getElementById('results').innerHTML = `
        <div class="result-score-card">
            <div class="result-score-label">Prompt Score</div>
            <div class="result-score-value">${data.score}<span>/10</span></div>
        </div>
        <div class="result-card">
            <div class="result-card-label">Output</div>
            <div class="result-card-text">${data.output}</div>
        </div>
        <div class="result-card">
            <div class="result-card-label">Feedback</div>
            <div class="result-card-text">${data.feedback}</div>
        </div>
        <button class="btn-compare" onclick="comparePrompt()">
            I improved my prompt — Compare Now →
        </button>`;
}

function showComparison(data) {
    const oldWon = data.old_score >= data.new_score;
    const newWon = data.new_score > data.old_score;
    document.getElementById('results').innerHTML = `
        <div class="result-score-card">
            <div class="result-score-label">Winner</div>
            <div class="result-score-value" style="font-size:1.8rem;">${data.winner}</div>
        </div>
        <div class="compare-grid">
            <div class="compare-card ${oldWon ? 'winner' : ''}">
                <div class="compare-card-tag">${oldWon ? 'Winner' : 'Previous'}</div>
                <div class="compare-card-score">${data.old_score}/10</div>
                <div class="compare-card-output">${data.old_output}</div>
            </div>
            <div class="compare-card ${newWon ? 'winner' : ''}">
                <div class="compare-card-tag">${newWon ? 'Winner' : 'New Version'}</div>
                <div class="compare-card-score">${data.new_score}/10</div>
                <div class="compare-card-output">${data.new_output}</div>
            </div>
        </div>
        <div class="result-card">
            <div class="result-card-label">Why</div>
            <div class="result-card-text">${data.reason}</div>
        </div>
        <button class="btn-compare" onclick="comparePrompt()">Improve Again →</button>
        <button class="btn-analyze" onclick="startFresh()" style="margin-top:8px;">Start New Topic →</button>`;
}

function showError() {
    document.getElementById('results').innerHTML = `
        <div class="tool-loading">
            <p style="color:#c0392b;">Something went wrong. Try again.</p>
        </div>`;
}

function startFresh() {
    previousPrompt = null;
    document.getElementById('promptInput').value = '';
    document.getElementById('results').innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">✦</div>
            <p>Your results will appear here after analysis.</p>
        </div>`;
}

async function loadUser() {
    try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        if (data.name) {
            document.getElementById('userName').textContent = data.name;
            document.getElementById('userAvatar').textContent = data.name[0].toUpperCase();
        }
    } catch (err) {}
}

loadUser();
