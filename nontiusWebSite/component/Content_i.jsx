import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { listContents } from '../Services/ContentService';
import { Helmet } from 'react-helmet-async';
import { convertTitleToUrl } from '../Services/ConvertTitle';
import Cookies from 'js-cookie';
import { Card } from 'antd';
import DOMPurify from 'dompurify';
import '../component/codeblock.css'


const Content_i = () => {

  const { title } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);

  const [cardBG, setCardBg] = useState('');
  const [borderBG, setBorderBG] = useState('');
  const [textColor, setTextColor] = useState('');

  
  useEffect(() => {
    if (Cookies.get("dark") === 'false') {
      setCardBg('white');
      setBorderBG('');
      setTextColor('black')
     
    } else if(Cookies.get("dark") === 'true') {
      setCardBg('rgba(13,16,22,255)');
      setBorderBG('black');
      setTextColor('white')
   
    }
   
  }, [Cookies.get("dark")]);

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

      <Card 
        title={content ? <h2 style={{color:textColor}}>{ content.title}</h2> : ""}
      style={{
        
        borderRadius: "30px",
        backgroundColor: cardBG,
        overflow: "hidden", 
        padding: "20px", 
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" 
      }}>
        {
          Body(content)
        }
      </Card>
    </>
  );

  function Body(c) {
    return (
      <>
        {
          c ? (
            <div style={{color:textColor}}>

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
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(c.content ) }}>
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
