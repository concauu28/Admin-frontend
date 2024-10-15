// components/FileUploader.js
import React, { useState } from 'react';

const FileUploader = ({ onFileSelect }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        onFileSelect(file);  // Pass the selected file to the parent
    };

    return (
        <div>
            <input 
                type="file" 
                accept="image/*,video/*,.pdf" 
                onChange={handleFileChange} 
            />
            {selectedFile && (
                <div>
                    <p>{selectedFile.name}</p>
                </div>
            )}
        </div>
    );
};

export default FileUploader;
