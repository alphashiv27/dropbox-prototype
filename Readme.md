# Fullstack Dropbox Clone

A simplified Dropbox-like application where users can upload, view, download, and delete files through a web interface. This project demonstrates a segregated backend (FastAPI + SQLite) and frontend (React) architecture.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
  - [Backend (FastAPI)](#backend-fastapi)
  - [Frontend (React)](#frontend-react)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Python Virtual Environment Setup (Optional)](#python-virtual-environment-setup-optional)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
  - [File Upload](#file-upload)
  - [File List and Deletion](#file-list-and-deletion)
  - [File Viewing/Downloading](#file-viewingdownloading)
- [Additional Notes](#additional-notes)
- [License](#license)

---

## Project Structure

```
fullstack-dropbox/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schema.py
│   ├── service.py
│   ├── controller.py
│   ├── requirements.txt
│   └── uploads/
└── frontend/
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js
        ├── App.css
        └── components/
            ├── FileList.js
            ├── FileUpload.js
            └── FileView.js
```

- **backend/**: Contains all server-side code (API endpoints, DB models, business logic).
- **frontend/**: Contains the React application (pages, components, styling).

---

## Features

### Backend (FastAPI)

1. **File Upload**  
   - Endpoint: `POST /upload`  
   - Files are stored in the local `uploads/` folder, and metadata (e.g., filename, content type, upload time) is saved in a SQLite database.

2. **Duplicate File Check**  
   - Compares the original filename to detect duplicates before saving.

3. **File Listing**  
   - Endpoint: `GET /files`  
   - Returns JSON containing metadata for each file in the database.

4. **File Download**  
   - Endpoint: `GET /download/{file_id}`  
   - Retrieves a file by its unique ID from the server’s uploads folder.

5. **File Deletion**  
   - Endpoint: `DELETE /file/{file_id}`  
   - Removes the file from both the file system and the database.

6. **Allowed File Types**  
   - By default, `.txt`, `.jpg`, `.jpeg`, `.png`, `.json`, and `.pdf` are permitted. (Configurable in `service.py`.)

### Frontend (React)

1. **Home Page (FileList)**  
   - Displays all uploaded files.  
   - Each file has a checkbox to allow batch deletion when multiple files are selected.

2. **File Upload (FileUpload)**  
   - A simple form for uploading new files.  
   - Displays an error popup on invalid/duplicate files.

3. **File View (FileView)**  
   - If the file is text or JSON, contents are rendered on-screen.  
   - If it’s an image, it’s displayed inline.  
   - Other file types show a download link.

4. **Error Handling**  
   - Duplicate files or backend errors trigger a popup with a close button.

5. **Navigation & Styling**  
   - React Router is used for navigation.  
   - Basic custom CSS (in `App.css`) provides a modern, clean look.

---

## Prerequisites

- **Python 3.8+** (for the backend)
- **pip** (Python package manager)
- **Node.js & npm** (for the React frontend)

---

## Setup Instructions

### Python Virtual Environment Setup (Optional)

1. **Navigate to the Backend Directory**:
   ```bash
   cd fullstack-dropbox/backend
   ```

2. **Create a Virtual Environment**:
   ```bash
   python -m venv venv
   ```

3. **Activate the Virtual Environment**:
   - **Windows**:  
     ```bash
     venv\Scripts\activate
     ```
   - **macOS / Linux**:  
     ```bash
     source venv/bin/activate
     ```

4. **(Optional) Deactivate the Virtual Environment**:  
   When you’re finished, you can deactivate with:
   ```bash
   deactivate
   ```

### Backend Setup

1. **Install Dependencies**  
   If you’re using a virtual environment, ensure it’s activated. Then install the backend requirements:
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the FastAPI Server**  
   ```bash
   uvicorn main:app --reload
   ```
   The backend server will be available at [http://localhost:8000/docs](http://localhost:8000/docs).

### Frontend Setup

1. **Navigate to the Frontend Directory**  
   ```bash
   cd ../frontend
   ```

2. **Install Node Dependencies**  
   ```bash
   npm install
   ```

3. **Start the React App**  
   ```bash
   npm start
   ```
   The frontend will be available at [http://localhost:3000](http://localhost:3000).

---

## Usage

### File Upload

1. **Go to [http://localhost:3000](http://localhost:3000)**.  
2. Click **"Upload New File"**.  
3. Select one of the allowed file types (`.txt`, `.jpg`, `.jpeg`, `.png`, `.json`, or `.pdf`).  
4. Click **"Upload"**.  
5. If successful, you’ll be redirected to the file list. If there's an error (e.g., duplicate file), a popup will appear.

### File List and Deletion

- **Home Page** shows all uploaded files.  
- Each file has a checkbox on the right.  
- Select one or more files; a **"Delete Selected"** button appears.  
- Click **"Delete Selected"** to remove these files from the server.

### File Viewing/Downloading

1. **Click on a file** in the list.  
2. If it’s a text/JSON file, contents will be displayed.  
3. For images, an inline preview is shown with a download button below the file.  
4. All other file types provide a download link.

---

## License

This project is distributed under an open-source license. You are free to use, modify, and share it. If you encounter any bugs or want to propose improvements, feel free to open an issue or submit a pull request on GitHub.

