"""Shared utility functions to avoid circular imports."""
import hashlib
import base64
import os


def hash_password(password: str) -> str:
    salt = base64.b64encode(os.urandom(32)).decode('utf-8')
    h = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt.encode('utf-8'), 100000)
    return f"{salt}:{base64.b64encode(h).decode('utf-8')}"


def verify_password(password: str, hashed: str) -> bool:
    try:
        salt, h = hashed.split(':')
        check = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt.encode('utf-8'), 100000)
        return base64.b64encode(check).decode('utf-8') == h
    except Exception:
        return False
