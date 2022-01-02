from config import bcrypt

def hash_password(password):
    return bcrypt.generate_password_hash(password).decode('utf-8')

def compare_passsword(hash, password):
    return bcrypt.check_password_hash(hash,password)