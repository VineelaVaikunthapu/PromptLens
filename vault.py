import json #handle reading or writing of json files
import os #to chec if the file exists on disk
from datetime import datetime #for timestamps

VAULT_FILE = "prompts/vault.json" #place to change the path if needed
def load_prompts():
    if not os.path.exists(VAULT_FILE):
        return []
    else:
        with open(VAULT_FILE ,'r') as f:
            return json.load(f)
def save_prompts(prompt_text,note=''):#we take input from app.py and note is optional
    vault = load_prompts()
    with open(VAULT_FILE, 'w') as f:
        version = len(vault) +1
        entry ={
            "version" : version,
            "prompt" : prompt_text,
            "note" : note,
            "timestamp" : datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        vault.append(entry)
        json.dump(vault,f,indent=2)#indent 2 is each level gets two spaces easy to read
def list_prompts():
    vault=load_prompts()
    if not vault:
        print("no entries")
        return
    else:
        for entry in vault:
            print(f"----Version -----{entry['version']}------")
            print(f"prompt :{entry['prompt'][:80]}")
            print(f'note :{entry["note"]}')
            print(f'saved on :{entry["timestamp"]}')

