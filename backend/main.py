from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controller import router as file_router
from database import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(file_router)