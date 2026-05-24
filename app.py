from flask import Flask, render_template, request, jsonify,session, redirect
from vault import save_prompts, load_prompts
from runner import generate_test_cases
import anthropic
import json
from config import ANTHROPIC_API_KEY, MODEL, MAX_TOKENS, SECRET_KEY
from auth import signup, login
from database import init_db


app = Flask(__name__)
app.secret_key = SECRET_KEY
init_db
client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    prompt = data["prompt"]
    
    response = client.messages.create(
        model=MODEL,
        max_tokens=MAX_TOKENS,
        messages=[
            {"role": "user", "content": f"""
You are a prompt engineering expert.

The user has written this prompt:
{prompt}

Do three things:
1. Run this prompt with a relevant example input and show the output
2. Score this prompt from 1-10 based on clarity, specificity, and effectiveness
3. Give specific feedback on how to improve it

Reply in this exact JSON format:
{{
    "output": "the actual output of running the prompt",
    "score": 7,
    "feedback": "specific feedback here"
}}
Return only JSON, nothing else.
"""}
        ]
    )
    
    raw = response.content[0].text
    start = raw.find("{")
    end = raw.rfind("}") + 1
    result = json.loads(raw[start:end])
    save_prompts(prompt, note=f"Score: {result['score']}/10")
    
    return jsonify(result)

@app.route("/compare", methods=["POST"])
def compare():
    data = request.json
    old_prompt = data["old_prompt"]
    new_prompt = data["new_prompt"]
    
    response = client.messages.create(
        model=MODEL,
        max_tokens=MAX_TOKENS,
        messages=[
            {"role": "user", "content": f"""
You are a prompt engineering expert.

Compare these two prompts:

Old Prompt: {old_prompt}
New Prompt: {new_prompt}

Reply in this exact JSON format:
{{
    "old_score": 6,
    "new_score": 8,
    "old_output": "output of old prompt",
    "new_output": "output of new prompt",
    "winner": "New Prompt",
    "reason": "explanation of why new prompt is better"
}}
Return only JSON, nothing else.
"""}
        ]
    )
    
    raw = response.content[0].text
    start = raw.find("{")
    end = raw.rfind("}") + 1
    result = json.loads(raw[start:end])
    
    return jsonify(result)

@app.route("/signup", methods=["POST"])
def signup_route():
    data = request.json
    result = signup(data["name"], data["email"], data["password"])
    return jsonify(result)

@app.route("/login", methods=["POST"])
def login_route():
    data = request.json
    result = login(data["email"], data["password"])
    if result["success"]:
        session["user_id"] = result["user"]["id"]
        session["user_name"] = result["user"]["name"]
    return jsonify(result)

@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")

@app.route("/dashboard")
def dashboard():
    if "user_id" not in session:
        return redirect("/")
    return render_template("dashboard.html")

if __name__ == "__main__":
    app.run(debug=True)