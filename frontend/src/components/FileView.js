import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function FileView() {
  const { id } = useParams();
  const [fileMeta, setFileMeta] = useState(null);
  const [fileContent, setFileContent] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/files')
      .then(response => response.json())
      .then(data => {
        const file = data.find(item => item.id === id);
        setFileMeta(file);
        if (file && (file.content_type.includes('text') || file.content_type.includes('json'))) {
          fetch(`http://localhost:8000/download/${id}`)
            .then(res => res.text())
            .then(text => setFileContent(text))
            .catch(error => console.error('Error fetching file content:', error));
        }
      })
      .catch(error => console.error('Error fetching file metadata:', error));
  }, [id]);

  if (!fileMeta) return <div>Loading...</div>;

  return (
    <div>
      <h2>{fileMeta.original_filename}</h2>
      {fileMeta.content_type.includes('image') ? (
        <img
          src={`http://localhost:8000/download/${id}`}
          alt={fileMeta.original_filename}
          style={{ maxWidth: '100%' }}
        />
      ) : fileMeta.content_type.includes('text') || fileMeta.content_type.includes('json') ? (
        <pre style={{ background: '#f0f0f0', padding: '1rem' }}>{fileContent}</pre>
      ) : (
        <a href={`http://localhost:8000/download/${id}`} download>
          Download File
        </a>
      )}
    </div>
  );
}

export default FileView;