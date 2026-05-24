import sqlite3
from datetime import datetime

DATABASE = "promptlens.db"
def get_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory =sqlite3.Row
    return conn
def init_db():
    conn=get_connection()
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
""")
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS prompts(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        prompt text NOT NULL,
        score INTEGER NOT NULL,
        feedback TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
   )
   """)
    conn.commit()
    conn.close()
    print("Database ready.")
if __name__ == "__main__":
    init_db()