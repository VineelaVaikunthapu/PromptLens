import anthropic
import json
from config import ANTHROPIC_API_KEY, MODEL, MAX_TOKENS
from vault import load_prompts
def generate_test_cases(prompt_v1, prompt_v2):

    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
    response = client.messages.create(
        model = MODEL,
        max_tokens=MAX_TOKENS,
        messages =[
            {'role':'user',"content": f"Here are two prompts:\nPrompt 1: {prompt_v1}\nPrompt 2: {prompt_v2}\n\nGenerate 5 diverse test cases as inputs for these prompts. Include: one simple input, one complex input, one very long input, one ambiguous input, and one edge case. Return only a JSON array of 5 strings, nothing else."}
        ]

    )
    raw = response.content[0].text
    # find the JSON array inside the response
    start = raw.find("[")
    end = raw.rfind("]") + 1
    return json.loads(raw[start:end])