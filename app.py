from vault import load_prompts, list_prompts, save_prompts
from runner import generate_test_cases

# show all saved prompts
print("=== Your Saved Prompts ===")
list_prompts()

# ask if they want to add new prompts first
add_new = input("\nDo you want to add a new prompt? (yes/no): ")

while add_new == "yes":
    prompt_text = input("Enter your prompt (use {text} as placeholder): ")
    note = input("What changed in this version?: ")
    save_prompts(prompt_text, note)
    add_new = input("Add another prompt? (yes/no): ")

# show updated list
print("\n=== Updated Prompts ===")
list_prompts()

# now ask which two to compare
v1_num = int(input("\nEnter version number for Prompt 1: "))
v2_num = int(input("Enter version number for Prompt 2: "))

# load selected versions
vault = load_prompts()
prompt_v1 = vault[v1_num - 1]["prompt"]
prompt_v2 = vault[v2_num - 1]["prompt"]

print(f"\nComparing V{v1_num} vs V{v2_num}...")
print("Generating test cases...")
test_cases = generate_test_cases(prompt_v1, prompt_v2)

for i, case in enumerate(test_cases):
    print(f"\nTest Case {i+1}:")
    print(case)