import os
from dotenv import load_dotenv #used to read .evnv files

load_dotenv()  # reads your .env file

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")  # grabs the key
MODEL = "claude-sonnet-4-5"  # which AI model to use
MAX_TOKENS = 1000 