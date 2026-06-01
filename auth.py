import psycopg2
from database import get_connection
from werkzeug.security import generate_password_hash, check_password_hash

def signup(name, email, password):
    hashed_password = generate_password_hash(password)
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
            (name, email, hashed_password)
        )
        conn.commit()
        conn.close()
        return {"success": True, "message": "Account created"}
    except psycopg2.errors.UniqueViolation:
        conn.close()
        return {"success": False, "message": "Email already exists"}

def login(email, password):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()
    conn.close()
    if user is None:
        return {"success": False, "message": "User not found"}
    if not check_password_hash(user["password"], password):
        return {"success": False, "message": "Wrong password"}
    return {"success": True, "user": {"id": user["id"], "name": user["name"], "email": user["email"]}}