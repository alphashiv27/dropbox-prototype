import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FileList from './components/FileList';
import FileUpload from './components/FileUpload';
import FileView from './components/FileView';
import './App.css';

function App() {
  return (
    <div className="container">
      <header>
        <h1>File Dropbox App</h1>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<FileList />} />
          <Route path="/upload" element={<FileUpload />} />
          <Route path="/file/:id" element={<FileView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;