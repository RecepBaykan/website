import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { listContents } from '../Services/ContentService';
import { Helmet } from 'react-helmet';
import { convertTitleToUrl } from '../Services/ConvertTitle';


const Content = () => {
  const { title } = useParams();
  const navigate = useNavigate();




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
        {helmet(window.content)}
      </div>

      <div>
        {
          Body(window.content)
        }
      </div>
      
    
    </>
  );

  function Body(c){
    return(
      <>
      {
        c ? (
          <div>
            <h2>{c.title}</h2>
            <b>{c.date}</b>
            <div
              style={{ width: '100%', minHeight: '100px', marginTop: '20px', padding: '10px' }}
              dangerouslySetInnerHTML={{ __html: c.content }}
            ></div>
          </div>
        ) : "Böyle bir sayfa mevcut değildir"
      }
  </>
    )
  }

};

export default Content;
