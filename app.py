from vault import save_prompts, list_prompts

save_prompts(
    "Summarize this text: {text}",
    note="Version 1 - basic prompt"
)

save_prompts(
    "You are an expert summarizer. Extract the 3 most important points in under 50 words: {text}",
    note="Version 2 - added role and word limit"
)

list_prompts()