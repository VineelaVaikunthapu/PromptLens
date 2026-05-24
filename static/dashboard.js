async function loadDashboard() {
    try {
        const res = await fetch('/api/stats');
        const data = await res.json();

        if (data.error) {
            window.location.href = '/';
            return;
        }

        // greeting
        document.getElementById('greeting').textContent = `Hello, ${data.name}!`;
        document.getElementById('userName').textContent = data.name;
        document.getElementById('userAvatar').textContent = data.name[0].toUpperCase();

        // stats
        document.getElementById('totalPrompts').textContent = data.total;
        document.getElementById('avgScore').textContent = data.average || '—';
        document.getElementById('bestScore').textContent = data.best || '—';

        // graph
        if (data.history.length > 0) {
            buildChart(data.history);
        } else {
            document.getElementById('scoreChart').style.display = 'none';
            document.getElementById('noData').style.display = 'block';
        }

        // recent prompts
        buildRecent(data.recent);

    } catch (err) {
        console.error(err);
    }
}

function buildChart(history) {
    const labels = history.map((h, i) => `Prompt ${i + 1}`);
    const scores = history.map(h => h.score);

    const ctx = document.getElementById('scoreChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'Score',
                data: scores,
                borderColor: '#a67c7c',
                backgroundColor: 'rgba(201,160,160,0.1)',
                borderWidth: 2.5,
                pointBackgroundColor: '#a67c7c',
                pointRadius: 5,
                pointHoverRadius: 7,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    min: 0,
                    max: 10,
                    grid: { color: '#ede8e3' },
                    ticks: {
                        font: { family: 'Inter', size: 11 },
                        color: '#8a8a8a'
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: {
                        font: { family: 'Inter', size: 11 },
                        color: '#8a8a8a'
                    }
                }
            }
        }
    });
}

function buildRecent(recent) {
    const list = document.getElementById('recentList');

    if (recent.length === 0) {
        list.innerHTML = `
            <div class="loading-state">
                No prompts yet. <a href="/tool" style="color:#a67c7c;">Start now →</a>
            </div>`;
        return;
    }

    list.innerHTML = recent.map(item => `
        <div class="recent-item">
            <div class="recent-item-top">
                <div class="recent-prompt">${item.prompt.substring(0, 40)}...</div>
                <div class="recent-score">${item.score}/10</div>
            </div>
            <div class="recent-date">${item.created_at}</div>
        </div>
    `).join('');
}

loadDashboard();