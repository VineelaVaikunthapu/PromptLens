import os
from dotenv import load_dotenv

load_dotenv()  # reads your .env file

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")  # grabs the key
MODEL = "claude-sonnet-4-20250514"  # which AI model to use
MAX_TOKENS = 1000 