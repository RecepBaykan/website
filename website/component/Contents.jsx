  import React from "react";
  import { listContents } from "../Services/ContentService";
  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import '../component/Content.css'; // CSS dosyanızı dahil edin
  import { Tag } from "antd";



  const Contents = () => {
    const [cont, setCont] = useState([]);
    const navigate = useNavigate();
    const [contents, setContents] = useState([]);

    useEffect(() => {
      allContent();
    }, []);

    function allContent() {
      listContents()
        .then((response) => {
          setContents(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function readContent(title){
      navigate(`/readContent/${encodeURIComponent(title)}`)
      

    
    }

    return (
      <>
          {areas("Oyun İncelemeleri", "GAME")}
          {areas("Java Dersleri", "TECH")}
      </>
    );

   


    function areas(name, filter){
      return(
          <>
          <h2>{name}</h2>
        <div className="card-container">
          {contents
            .filter(content => content.tags && content.tags.includes(filter))
            .map((content, index) => (
              <div className="card" key={index} style={{ width: '18rem' }}>
                <img className="card-img-top" src={content.picture} alt="Konu resmi"></img>
                <div className="card-body">
                  <h5 className="card-title">{content.title}</h5>
                  <p>{content.date}</p>
                  <p className="card-text">
                    {content.desc}
                  </p>
                  <a onClick={() => readContent(content.title)} className="btn btn-primary">
                    Okumaya Devam
                  </a>
                </div>
              </div>
            ))}
        </div>
          </>
      )
    }
  };

  export default Contents;
