
# PromptLens 

> The tool that makes you better at AI — one prompt at a time.

Most people guess when writing AI prompts. PromptLens shows you the data.

## What is PromptLens?

PromptLens is a full-stack prompt engineering tool that helps you write better AI prompts through scoring, feedback, and version comparison.

**The problem it solves:**
When you write a prompt and get a bad output — you change a word, try again, hope for the best. There's no feedback. No score. No way to know if you're actually improving.

PromptLens fixes that.

## Features

- **Intelligent Scoring** — Every prompt gets a 1-10 score based on clarity, specificity, role definition, and output format
- **AI Coaching** — Specific, actionable feedback on exactly what to improve
- **Version Comparison** — Submit an improved prompt and see a side-by-side comparison with a clear winner
- **Personal Dashboard** — Track your total prompts, average score, best score, and improvement graph over time
- **Auto Test Cases** — Claude automatically generates diverse test cases to challenge your prompt
- **User Authentication** — Secure signup and login with password hashing

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python, Flask |
| AI | Anthropic Claude API |
| Database | SQLite |
| Auth | Werkzeug password hashing |
| Frontend | HTML, CSS, JavaScript |
| Hosting | Render |

## How It Works

```
User writes a prompt
        ↓
Claude scores it 1-10 with specific feedback
        ↓
User improves the prompt
        ↓
Claude compares old vs new — shows winner and why
        ↓
All scores saved to personal dashboard
```

## Project Structure

```
PromptLens/
│
├── app.py              # Flask server — all routes
├── auth.py             # Signup and login logic
├── database.py         # SQLite database setup
├── vault.py            # Prompt version control
├── runner.py           # Auto test case generation
├── config.py           # API key and settings
│
├── templates/
│   ├── index.html      # Landing page
│   ├── dashboard.html  # User dashboard
│   └── tool.html       # Prompt analysis tool
│
├── static/
│   ├── style.css       # Landing page styles
│   ├── dashboard.css   # Dashboard and tool styles
│   ├── script.js       # Landing page JS
│   ├── dashboard.js    # Dashboard JS
│   └── tool.js         # Prompt tool JS
│
└── requirements.txt
```

## Running Locally

**1. Clone the repo**
```bash
git clone https://github.com/VineelaVaikunthapu/PromptLens.git
cd PromptLens
```

**2. Install dependencies**
```bash
pip install -r requirements.txt
```

**3. Add your API key**

Create a `.env` file:
```
ANTHROPIC_API_KEY=your_key_here
```

**4. Run the app**
```bash
python3 app.py
```

**5. Open in browser**
```
http://localhost:5000
```

## Live Demo

**https://promptlens-qg59.onrender.com**

> Note: Hosted on Render free tier — may take 30-50 seconds to wake up on first visit.

## Why I Built This

I was learning prompt engineering and couldn't find a tool that gave real, specific feedback on why a prompt was good or bad. Every resource said "be specific" but nobody showed you HOW specific or what that looked like in practice.

So I built the tool I wished existed.

## What I Learned

- Building a full-stack Python web application from scratch
- Designing and querying a relational database
- Implementing secure user authentication
- Using the Anthropic Claude API for intelligent evaluation
- The LLM-as-judge pattern for automated prompt evaluation
- Deploying a real application to production

---

Built by [Vineela Vaikunthapu](https://github.com/VineelaVaikunthapu)
```
