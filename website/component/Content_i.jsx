import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { listContents } from '../Services/ContentService';

const Content = () => {
  const { title } = useParams();
  const [cont, setCont] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    allContent();
  }, []);

  function allContent() {
    listContents()
      .then((response) => {
        const data = response.data;
        setCont(data.find(content => content.title === title) || null);
      })
      .catch((error) => {
        console.error(error);
      });
  }



  return (
    <>
      
      {
        cont ? <div>
          <h2>{cont.title}</h2>
          <h7>{cont.date}</h7>

          <div
          style={{ width: '100%', minHeight: '100px', marginTop: '20px', padding: '10px' }}
          dangerouslySetInnerHTML={{ __html: cont.content }}
        ></div></div>
        
        
        
        : "Böyle bir sayfa mevcut değildir"
      }

      
      
    </>
  );
};

export default Content;
