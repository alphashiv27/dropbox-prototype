from pydantic import BaseModel
from datetime import datetime

class FileMetaOut(BaseModel):
    id: str
    filename: str
    original_filename: str
    content_type: str
    upload_time: datetime

    class Config:
        orm_mode = True