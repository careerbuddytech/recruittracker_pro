import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const DocumentManager = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('upload');
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const documentCategories = [
    { id: 'contracts', label: 'Contracts & Agreements', icon: 'FileText' },
    { id: 'resumes', label: 'Resumes & CVs', icon: 'User' },
    { id: 'compliance', label: 'Compliance Documents', icon: 'Shield' },
    { id: 'certificates', label: 'Certificates & Licenses', icon: 'Award' },
    { id: 'references', label: 'References & Recommendations', icon: 'Star' },
    { id: 'other', label: 'Other Documents', icon: 'Folder' }
  ];

  const existingDocuments = [
    {
      id: 1,
      name: 'TechCorp_Master_Agreement_2024.pdf',
      category: 'contracts',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      uploadedBy: 'Sarah Johnson',
      tags: ['Master Agreement', 'TechCorp', '2024']
    },
    {
      id: 2,
      name: 'Alex_Thompson_Resume.pdf',
      category: 'resumes',
      size: '1.2 MB',
      uploadDate: '2024-01-14',
      uploadedBy: 'Mike Chen',
      tags: ['Senior Developer', 'React', 'Node.js']
    },
    {
      id: 3,
      name: 'GDPR_Compliance_Checklist.pdf',
      category: 'compliance',
      size: '856 KB',
      uploadDate: '2024-01-12',
      uploadedBy: 'Lisa Rodriguez',
      tags: ['GDPR', 'Compliance', 'Checklist']
    },
    {
      id: 4,
      name: 'AWS_Certification_David_Kim.pdf',
      category: 'certificates',
      size: '1.8 MB',
      uploadDate: '2024-01-10',
      uploadedBy: 'David Kim',
      tags: ['AWS', 'Certification', 'Cloud']
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const filteredDocuments = existingDocuments.filter(doc => {
    const matchesCategory = !selectedCategory || doc.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => doc.tags.includes(tag));
    
    return matchesCategory && matchesSearch && matchesTags;
  });

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const newFiles = Array.from(files).map((file, index) => ({
      id: Date.now() + index,
      file,
      name: file.name,
      size: formatFileSize(file.size),
      category: '',
      tags: [],
      status: 'pending'
    }));
    
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const removeUploadedFile = (fileId) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== fileId));
  };

  const updateFileCategory = (fileId, category) => {
    setUploadedFiles(uploadedFiles.map(file => 
      file.id === fileId ? { ...file, category } : file
    ));
  };

  const updateFileTags = (fileId, tags) => {
    setUploadedFiles(uploadedFiles.map(file => 
      file.id === fileId ? { ...file, tags } : file
    ));
  };

  const handleUpload = () => {
    // Simulate upload process
    setUploadedFiles(uploadedFiles.map(file => ({ ...file, status: 'uploading' })));
    
    setTimeout(() => {
      setUploadedFiles(uploadedFiles.map(file => ({ ...file, status: 'completed' })));
      setTimeout(() => {
        setUploadedFiles([]);
        setActiveTab('browse');
      }, 1000);
    }, 2000);
  };

  const getCategoryIcon = (categoryId) => {
    const category = documentCategories.find(cat => cat.id === categoryId);
    return category ? category.icon : 'File';
  };

  const getCategoryLabel = (categoryId) => {
    const category = documentCategories.find(cat => cat.id === categoryId);
    return category ? category.label : 'Unknown';
  };

  const allTags = [...new Set(existingDocuments.flatMap(doc => doc.tags))];

  return (
    <div className="fixed inset-0 bg-secondary-900 bg-opacity-50 flex items-center justify-center z-100">
      <div className="bg-surface rounded-lg shadow-modal w-full max-w-6xl mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Document Manager</h2>
            <p className="text-sm text-text-secondary mt-1">
              Upload and manage contracts, CVs, and compliance documents
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-secondary-400 hover:text-text-primary transition-colors duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-border">
          <div className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('upload')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'upload' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name="Upload" size={16} className="inline mr-2" />
              Upload Documents
            </button>
            <button
              onClick={() => setActiveTab('browse')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'browse' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name="FolderOpen" size={16} className="inline mr-2" />
              Browse Documents ({existingDocuments.length})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'upload' && (
            <div className="space-y-6">
              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
                  dragActive
                    ? 'border-primary bg-primary-50' :'border-border hover:border-secondary-300'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Icon name="Upload" size={48} className="text-secondary-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">
                  Drag and drop files here
                </h3>
                <p className="text-text-secondary mb-4">
                  or click to browse and select files
                </p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 cursor-pointer transition-colors duration-200"
                >
                  <Icon name="FolderOpen" size={16} />
                  <span>Browse Files</span>
                </label>
                <p className="text-xs text-text-secondary mt-2">
                  Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB per file)
                </p>
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-text-primary mb-4">
                    Files to Upload ({uploadedFiles.length})
                  </h3>
                  <div className="space-y-3">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="bg-secondary-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Icon name="FileText" size={20} className="text-secondary-400" />
                            <div>
                              <p className="font-medium text-text-primary">{file.name}</p>
                              <p className="text-sm text-text-secondary">{file.size}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {file.status === 'pending' && (
                              <button
                                onClick={() => removeUploadedFile(file.id)}
                                className="p-1 text-error hover:text-error-700 transition-colors duration-200"
                              >
                                <Icon name="X" size={16} />
                              </button>
                            )}
                            {file.status === 'uploading' && (
                              <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-sm text-primary">Uploading...</span>
                              </div>
                            )}
                            {file.status === 'completed' && (
                              <div className="flex items-center space-x-2">
                                <Icon name="CheckCircle" size={16} className="text-success" />
                                <span className="text-sm text-success">Uploaded</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {file.status === 'pending' && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-text-primary mb-1">
                                Category
                              </label>
                              <select
                                value={file.category}
                                onChange={(e) => updateFileCategory(file.id, e.target.value)}
                                className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                              >
                                <option value="">Select category...</option>
                                {documentCategories.map((category) => (
                                  <option key={category.id} value={category.id}>
                                    {category.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-text-primary mb-1">
                                Tags (comma separated)
                              </label>
                              <input
                                type="text"
                                placeholder="e.g., Contract, 2024, Important"
                                onChange={(e) => updateFileTags(file.id, e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag))}
                                className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {uploadedFiles.some(file => file.status === 'pending') && (
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={handleUpload}
                        disabled={uploadedFiles.some(file => !file.category)}
                        className={`px-6 py-2 rounded-lg transition-colors duration-200 ${
                          uploadedFiles.every(file => file.category)
                            ? 'bg-primary text-white hover:bg-primary-700' :'bg-secondary-100 text-secondary-400 cursor-not-allowed'
                        }`}
                      >
                        Upload All Files
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'browse' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="bg-secondary-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Search Documents
                    </label>
                    <div className="relative">
                      <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                      <input
                        type="text"
                        placeholder="Search by name or tags..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">All Categories</option>
                      {documentCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                      {allTags.slice(0, 8).map((tag) => (
                        <button
                          key={tag}
                          onClick={() => {
                            if (selectedTags.includes(tag)) {
                              setSelectedTags(selectedTags.filter(t => t !== tag));
                            } else {
                              setSelectedTags([...selectedTags, tag]);
                            }
                          }}
                          className={`px-2 py-1 text-xs rounded-full transition-colors duration-200 ${
                            selectedTags.includes(tag)
                              ? 'bg-primary text-white' :'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDocuments.map((doc) => (
                  <div key={doc.id} className="bg-surface border border-border rounded-lg p-4 hover:shadow-elevated transition-shadow duration-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                          <Icon name={getCategoryIcon(doc.category)} size={20} className="text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-text-primary truncate">{doc.name}</h4>
                          <p className="text-sm text-text-secondary">{getCategoryLabel(doc.category)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <button className="p-1 text-secondary-400 hover:text-primary transition-colors duration-200">
                          <Icon name="Download" size={16} />
                        </button>
                        <button className="p-1 text-secondary-400 hover:text-primary transition-colors duration-200">
                          <Icon name="Eye" size={16} />
                        </button>
                        <button className="p-1 text-secondary-400 hover:text-error transition-colors duration-200">
                          <Icon name="Trash2" size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">Size:</span>
                        <span className="text-text-primary">{doc.size}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">Uploaded:</span>
                        <span className="text-text-primary">{doc.uploadDate}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">By:</span>
                        <span className="text-text-primary">{doc.uploadedBy}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {doc.tags.map((tag, index) => (
                        <span key={index} className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-secondary-100 text-secondary-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {filteredDocuments.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="FileText" size={48} className="text-secondary-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-text-primary mb-2">No documents found</h3>
                  <p className="text-text-secondary">Try adjusting your search criteria or upload new documents.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-secondary-50">
          <div className="text-sm text-text-secondary">
            {activeTab === 'browse' && `${filteredDocuments.length} of ${existingDocuments.length} documents`}
            {activeTab === 'upload' && `${uploadedFiles.length} files ready to upload`}
          </div>
          
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentManager;