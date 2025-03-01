from sqlalchemy import Column, String, DateTime
from datetime import datetime
from database import Base

class FileMeta(Base):
    __tablename__ = "files"
    id = Column(String, primary_key=True, index=True)
    filename = Column(String, unique=True, index=True)
    original_filename = Column(String)
    content_type = Column(String)
    upload_time = Column(DateTime, default=datetime.utcnow)