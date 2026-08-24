"""PostgreSQL database layer for Vercel serverless deployment."""
import os
import json
import uuid
import psycopg2
from psycopg2.extras import RealDictCursor

DATABASE_URL = os.getenv("DATABASE_URL", "")

_conn = None

def get_conn():
    global _conn
    if _conn is None or _conn.closed:
        _conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
        _conn.autocommit = True
    return _conn

def init_db():
    """Create tables if they don't exist."""
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            full_name TEXT,
            is_admin BOOLEAN DEFAULT FALSE,
            is_active BOOLEAN DEFAULT TRUE,
            qualifications TEXT,
            certifications TEXT,
            years_of_experience INT,
            profile_picture TEXT,
            created_at TEXT,
            created_by TEXT
        );
    """)
    cur.execute("""
        CREATE TABLE IF NOT EXISTS questionnaires (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT,
            is_default BOOLEAN DEFAULT FALSE,
            clauses JSONB,
            created_at TEXT,
            created_by TEXT
        );
    """)
    cur.execute("""
        CREATE TABLE IF NOT EXISTS audits (
            id TEXT PRIMARY KEY,
            questionnaire_id TEXT,
            questionnaire_name TEXT,
            title TEXT,
            audit_id TEXT,
            description TEXT,
            plant_name TEXT,
            auditor_name TEXT,
            auditee_name TEXT,
            audit_scope TEXT,
            audit_criteria TEXT,
            auditor TEXT,
            status TEXT DEFAULT 'draft',
            responses JSONB DEFAULT '[]',
            created_at TEXT,
            updated_at TEXT,
            capa_report_file TEXT,
            capa_report_filename TEXT,
            capa_entries JSONB DEFAULT '[]',
            capa_updated_by TEXT,
            capa_updated_at TEXT
        );
    """)
    cur.execute("""
        CREATE TABLE IF NOT EXISTS capa_reports (
            id TEXT PRIMARY KEY,
            audit_id TEXT,
            audit_title TEXT,
            site_name TEXT,
            audit_date TEXT,
            auditor_name TEXT,
            finding_description TEXT,
            standard_clause TEXT,
            category TEXT,
            correction TEXT,
            root_cause_analysis TEXT,
            status TEXT DEFAULT 'Open',
            closure_evidence JSONB DEFAULT '[]',
            created_by TEXT,
            created_at TEXT,
            updated_at TEXT
        );
    """)
    # Create default admin
    cur.execute("SELECT COUNT(*) as cnt FROM users WHERE username = 'SRD'")
    if cur.fetchone()['cnt'] == 0:
        from utils import hash_password
        cur.execute(
            "INSERT INTO users (id, username, password, full_name, is_admin, is_active, created_at) VALUES (%s, %s, %s, %s, %s, %s, %s)",
            (str(uuid.uuid4()), "SRD", hash_password("7550"), "Admin", True, True, __import__('datetime').datetime.utcnow().isoformat())
        )
        print("Created default admin user in PostgreSQL")
    cur.close()
    print("PostgreSQL database initialized")

def db_find(table, query=None, sort_key=None, sort_dir=-1):
    conn = get_conn()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql = f"SELECT * FROM {table}"
    params = []
    conditions = []
    if query:
        for k, v in query.items():
            if k == "_id":
                conditions.append("id = %s")
            else:
                conditions.append(f"{k} = %s")
            params.append(v)
    if conditions:
        sql += " WHERE " + " AND ".join(conditions)
    if sort_key:
        direction = "DESC" if sort_dir == -1 else "ASC"
        sql += f" ORDER BY {sort_key} {direction}"
    cur.execute(sql, params)
    rows = cur.fetchall()
    cur.close()
    # Convert to dicts with _id field for compatibility
    results = []
    for row in rows:
        d = dict(row)
        d["_id"] = d.pop("id")
        # Parse JSONB fields
        for field in ["clauses", "responses", "capa_entries", "closure_evidence"]:
            if field in d and isinstance(d[field], str):
                try:
                    d[field] = json.loads(d[field])
                except (json.JSONDecodeError, TypeError):
                    pass
        results.append(d)
    return results

def db_find_one(table, query=None):
    results = db_find(table, query)
    return results[0] if results else None

def db_insert(table, doc):
    conn = get_conn()
    cur = conn.cursor()
    if "_id" not in doc:
        doc["_id"] = str(uuid.uuid4())
    doc_id = doc["_id"]
    # Separate scalar and JSONB fields
    jsonb_fields = ["clauses", "responses", "capa_entries", "closure_evidence"]
    columns = []
    values = []
    placeholders = []
    for k, v in doc.items():
        if k in jsonb_fields:
            columns.append(k)
            values.append(json.dumps(v) if v else "[]")
            placeholders.append("%s")
        else:
            columns.append(k)
            values.append(v)
            placeholders.append("%s")
    # id column
    if "id" not in columns:
        columns.insert(0, "id")
        values.insert(0, doc_id)
        placeholders.insert(0, "%s")
    sql = f"INSERT INTO {table} ({', '.join(columns)}) VALUES ({', '.join(placeholders)})"
    cur.execute(sql, values)
    cur.close()
    return doc_id

def db_update(table, query, update):
    conn = get_conn()
    cur = conn.cursor()
    set_parts = []
    params = []
    if "$set" in update:
        for k, v in update["$set"].items():
            set_parts.append(f"{k} = %s")
            if isinstance(v, (list, dict)):
                params.append(json.dumps(v))
            else:
                params.append(v)
    if not set_parts:
        cur.close()
        return False
    # Build WHERE clause
    where_parts = []
    for k, v in query.items():
        if k == "_id":
            where_parts.append("id = %s")
        else:
            where_parts.append(f"{k} = %s")
        params.append(v)
    sql = f"UPDATE {table} SET {', '.join(set_parts)} WHERE {' AND '.join(where_parts)}"
    cur.execute(sql, params)
    matched = cur.rowcount > 0
    cur.close()
    return matched

def db_delete(table, query):
    conn = get_conn()
    cur = conn.cursor()
    where_parts = []
    params = []
    for k, v in query.items():
        if k == "_id":
            where_parts.append("id = %s")
        else:
            where_parts.append(f"{k} = %s")
        params.append(v)
    sql = f"DELETE FROM {table} WHERE {' AND '.join(where_parts)}"
    cur.execute(sql, params)
    deleted = cur.rowcount > 0
    cur.close()
    return deleted

def db_count(table, query=None):
    return len(db_find(table, query))
