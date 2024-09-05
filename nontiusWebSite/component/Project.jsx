import React, { useState, useEffect } from "react";
import { listContents } from "../Services/ContentService";
import { useNavigate } from "react-router-dom";
import "../component/Content.css";
import "../component/CardLoading.css";
import { convertTitleToUrl } from "../Services/ConvertTitle";
import { Card } from "antd";
import { Helmet } from "react-helmet-async";
import "../component/HoverCard.css"
import Cookies from "js-cookie";


const { Meta } = Card;

const Contents = () => {
  const navigate = useNavigate();
  const [contents, setContents] = useState([]);
  const [load, setLoad] = useState(true);

  
  const [cardBG, setCardBg] = useState('');
  const [borderBG, setBorderBG] = useState('');
  const [textColor, setTextColor] = useState('');

  // karanlık tema ekle

  useEffect(() => {
    if (Cookies.get("dark") === 'false') {
      setCardBg('white');
      setBorderBG('');
      setTextColor('black')
     
    } else if(Cookies.get("dark") === 'true') {
      setCardBg('rgba(13,16,22,255)');
      setBorderBG('');
      setTextColor('white')
   
    }
   
  }, [Cookies.get("dark")]);
  

  useEffect(() => {
    allContent();
  }, []);

  function allContent() {
    listContents()
      .then((response) => {
        setContents(response.data);
        setLoad(false);
      })
      .catch((error) => {
        console.error(error);
        setLoad(false);
      });
  }

  function readContent(title) {
    navigate(`/readContent/${convertTitleToUrl(title)}`);
  }

  return (
    <>
       {areas("Projeler", "GIT")}
       
    </>
  );

  function areas(name, filter) {
    return (
      <>
      <Helmet>
          <title>İçerikler</title>
      </Helmet>
        <div style={{ padding: 10 }}>
          <h2 style={{color:textColor}}>{name}</h2>
        </div>
        <div
          className="hoverContainer"
          style={{
            
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {!load ? (
            contents
              .filter(
                (content) => content.tags && content.tags.includes(filter)
              )
              .map((content, index) => (
                <div key={index} onClick={() => readContent(content.title)}>
                  <Card
                    className="hoverCard"
                    hoverable
                    style={{ width: 240, backgroundColor:cardBG, borderColor:borderBG }}
                    cover={<img style={{borderRadius:"10px" }} alt="Konu resmi" src={content.picture} />}
                  >
                   
                    <p style={{color:textColor}}><b>{content.title}</b></p>
                    <d style={{color:textColor}}>{content.desc}</d>
                    
                  </Card>
                </div>
              ))
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <div className="cards">
                <div className="card is-loading">
                  <div className="image"></div>
                  <div className="content">
                    <h2></h2>
                    <p></p>
                  </div>
                </div>
              </div>

              <div className="cards">
                <div className="card is-loading">
                  <div className="image"></div>
                  <div className="content">
                    <h2></h2>
                    <p></p>
                  </div>
                </div>
              </div>

              <div className="cards">
                <div className="card is-loading">
                  <div className="image"></div>
                  <div className="content">
                    <h2></h2>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
};

export default Contents;
