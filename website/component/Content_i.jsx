import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { listContents } from '../Services/ContentService';
import { Helmet } from 'react-helmet';
import { convertTitleToUrl } from '../Services/ConvertTitle';

const Content_i = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);

  useEffect(() => {
    allContent();
  }, []);

  function allContent() {
    listContents()
      .then((response) => {
        const data = response.data;
        setContent(data.find(d => convertTitleToUrl(d.title) === title) || null);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function helmet(c) {
    const defaultTitle = "";
    const defaultDescription = "";

    return (
      <Helmet>
        <title>{c ? c.title : defaultTitle}</title>
        <meta name="description" content={c ? c.desc : defaultDescription} />
        <meta name="keywords" content={c ? c.metaTags : ""} />
        <meta name="author" content="Nontius" />
        <link rel="canonical" href={`https://www.nontius.com/${title}`} />
      </Helmet>
    );
  }

  return (
    <>
      <div>
        {helmet(content)}
      </div>

      <div style={{
        borderRadius: "30px",
        backgroundColor: "white",
        overflow: "hidden", 
        padding: "20px", 
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" 
      }}>
        {
          Body(content)
        }
      </div>
    </>
  );

  function Body(c) {
    return (
      <>
        {
          c ? (
            <div>
              <h2>{c.title}</h2>
              <b>{c.date}</b>
              <div className='ql-snow'>
                <div className='ql-editor'
                  style={{
                    width: '100%',
                    minHeight: '100px',
                    marginTop: '20px',
                    padding: '10px',
                    boxSizing: 'border-box' 
                  }}
                  dangerouslySetInnerHTML={{ __html: c.content }}>
                </div>
              </div>
            </div>
          ) : ""
        }
      </>
    );
  }
};

export default Content_i;
