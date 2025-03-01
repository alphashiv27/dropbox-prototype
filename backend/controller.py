import os
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from database import get_db
import service
import schema

router = APIRouter()

@router.post("/upload")
async def upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    file_meta = service.create_file(db, file)
    return {"file_id": file_meta.id, "filename": file_meta.original_filename}

@router.get("/files", response_model=list[schema.FileMetaOut])
def list_files(db: Session = Depends(get_db)):
    files = service.get_all_files(db)
    return files

@router.get("/download/{file_id}")
def download_file(file_id: str, db: Session = Depends(get_db)):
    file_meta = service.get_file_by_id(db, file_id)
    if not file_meta:
        raise HTTPException(status_code=404, detail="File not found")
    
    file_path = os.path.join(service.UPLOAD_DIR, file_meta.filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found on server")
    
    return FileResponse(
        file_path,
        media_type=file_meta.content_type,
        filename=file_meta.original_filename
    )


@router.delete("/file/{file_id}")
def delete_file(file_id: str, db: Session = Depends(get_db)):
    return service.delete_file(db, file_id)