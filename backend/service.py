import os
import uuid
import shutil
from datetime import datetime
from fastapi import HTTPException
from sqlalchemy.orm import Session
from models import FileMeta

# Directory where file is uploaded and the extensions allowed
UPLOAD_DIR = "uploads"
ALLOWED_EXTENSIONS = {".txt", ".jpg", ".jpeg", ".png", ".json", ".pdf"}

if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

def allowed_file(filename: str):
    ext = os.path.splitext(filename)[1].lower()
    return ext in ALLOWED_EXTENSIONS

def create_file(db: Session, upload_file):
    if not allowed_file(upload_file.filename):
        raise HTTPException(status_code=400, detail="File type not allowed")

    existing_file = db.query(FileMeta).filter(FileMeta.original_filename == upload_file.filename).first()
    if existing_file:
        raise HTTPException(status_code=400, detail="Duplicate file")
    
    file_id = str(uuid.uuid4())
    ext = os.path.splitext(upload_file.filename)[1]
    stored_filename = file_id + ext
    file_location = os.path.join(UPLOAD_DIR, stored_filename)
    
    with open(file_location, "wb") as f:
        shutil.copyfileobj(upload_file.file, f)
    
    file_meta = FileMeta(
        id=file_id,
        filename=stored_filename,
        original_filename=upload_file.filename,
        content_type=upload_file.content_type,
        upload_time=datetime.now()
    )
    
    db.add(file_meta)
    db.commit()
    db.refresh(file_meta)
    return file_meta

def get_all_files(db: Session):
    return db.query(FileMeta).all()

def get_file_by_id(db: Session, file_id: str):
    return db.query(FileMeta).filter(FileMeta.id == file_id).first()


def delete_file(db: Session, file_id: str):
    file_meta = get_file_by_id(db, file_id)
    if not file_meta:
        raise HTTPException(status_code=404, detail="File not found")
    
    file_path = os.path.join(UPLOAD_DIR, file_meta.filename)
    if os.path.exists(file_path):
        os.remove(file_path)
    
    db.delete(file_meta)
    db.commit()
    return {"detail": "File deleted"}