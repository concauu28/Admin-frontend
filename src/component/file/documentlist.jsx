import React, { useEffect, useState } from 'react';
import { getDocumentAPI, deleteDocumentAPI } from '../../util/api'; // Import the delete function
import { notification } from 'antd'; // Use Ant Design for notifications

const DocumentList = ({ email }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch documents when the component mounts
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const result = await getDocumentAPI(email);
        console.log(result);

        if (result?.EC === 0) {
          setDocuments(result.documents);
        } else {
          setError(result.message || 'Không thể tải tài liệu');
        }
      } catch (err) {
        setError('Lỗi khi tải tài liệu: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [email]);

  // Handle document deletion
  const handleDelete = async (documentName) => {
    try {
      const res = await deleteDocumentAPI(documentName);
      if (res?.EC === 0) {
        notification.success({
          message: 'Xóa tài liệu thành công',
          description: `Tài liệu "${documentName}" đã được xóa thành công.`,
        });

        // Update the document list by filtering out the deleted one
        setDocuments((prevDocs) =>
          prevDocs.filter((doc) => doc.document_name !== documentName)
        );
      } else {
        notification.error({
          message: 'Lỗi xóa tài liệu',
          description: res.message || 'Không thể xóa tài liệu',
        });
      }
    } catch (error) {
      notification.error({
        message: 'Lỗi xóa tài liệu',
        description: 'Không thể xóa tài liệu. Vui lòng thử lại sau.',
      });
    }
  };

  if (loading) return <div>Đang tải tài liệu...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div>
      {documents.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {documents.map((doc, index) => (
            <li key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
              <a
                href={doc.signedUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginRight: '10px', textDecoration: 'none', color: 'blue' }}
              >
                {doc.document_name}
              </a>
              <button
                onClick={() => handleDelete(doc.document_name)}
                style={{
                  maxWidth: '50px',
                  marginLeft: '100px',
                  fontSize: '12px',
                  padding: '2px 6px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  backgroundColor: '#f5222d',
                  color: 'white',
                  border: 'none',
                }}
              >
                Xóa
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div>Không có tài liệu</div>
      )}
    </div>
  );
};

export default DocumentList;
