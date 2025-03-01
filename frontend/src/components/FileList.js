import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function FileList() {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const fetchFiles = () => {
    fetch('http://localhost:8000/files')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched files:', data);
        setFiles(data);
      })
      .catch(error => console.error('Error fetching files:', error));
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleCheckboxChange = (e, fileId) => {
    if (e.target.checked) {
      setSelectedFiles(prev => [...prev, fileId]);
    } else {
      setSelectedFiles(prev => prev.filter(id => id !== fileId));
    }
  };

  const handleDelete = () => {
    // Delete each selected file using the DELETE endpoint (assumed to exist)
    Promise.all(
      selectedFiles.map(fileId =>
        fetch(`http://localhost:8000/file/${fileId}`, {
          method: 'DELETE'
        })
      )
    )
      .then(() => {
        // Clear selection and refresh file list after deletion
        setSelectedFiles([]);
        fetchFiles();
      })
      .catch(error => console.error('Error deleting files:', error));
  };

  return (
    <div>
      <h2>Uploaded Files</h2>
      <Link to="/upload">
        <button>Upload New File</button>
      </Link>
      {selectedFiles.length > 0 && (
        <button 
          onClick={handleDelete} 
          style={{ backgroundColor: '#e74c3c', marginLeft: '10px' }}
        >
          Delete Selected ({selectedFiles.length})
        </button>
      )}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {files.map(file => (
          <li
            key={file.id}
            className="list-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 0',
              borderBottom: '1px solid #ddd'
            }}
          >
            <Link to={`/file/${file.id}`}>{file.original_filename}</Link>
            <input
              type="checkbox"
              checked={selectedFiles.includes(file.id)}
              onChange={(e) => handleCheckboxChange(e, file.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileList;