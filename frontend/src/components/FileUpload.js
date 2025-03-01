import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPopup = ({ message, onClose }) => (
  <div className="error-popup">
    <div className="error-popup-content">
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

function FileUpload() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: formData
    })
      .then(async response => {
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Error uploading file');
        }
        return response.json();
      })
      .then(data => {
        console.log('File uploaded:', data);
        navigate('/');
      })
      .catch(err => {
        console.error('Error uploading file:', err);
        setError(err.message);
      });
  };

  return (
    <div>
      <h2>Upload File</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {error && <ErrorPopup message={error} onClose={() => setError(null)} />}
    </div>
  );
}

export default FileUpload;