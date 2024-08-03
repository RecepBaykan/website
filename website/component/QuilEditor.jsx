import React, { useRef, useState } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

export default () => {
  const { quill, quillRef } = useQuill();
  const [content, setContent] = useState('');
  
  const handleSave = () => {
    if (quill) {
      // Quill'in mevcut içeriğini al
      setContent(quill.root.innerHTML);
    }
  };

  /*

    <div
        style={{ width: '100%', minHeight: '100px', marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>

  */

  return (
    <>
      <div style={{ width: 500 }}>
        <div ref={quillRef} style={{ height: 300, marginBottom: '20px' }} />
        <button onClick={handleSave}>Kaydet</button>
        
      </div>
     
    </>
  );
};
