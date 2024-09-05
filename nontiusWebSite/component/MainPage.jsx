import React, { useState, useEffect } from "react";
import { listContents } from "../Services/ContentService";
import { useNavigate } from "react-router-dom";
import "../component/Content.css";
import "../component/CardLoading.css";
import { convertTitleToUrl } from "../Services/ConvertTitle";
import { Card } from "antd";
import "../component/HoverCard.css";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet-async";

const { Meta } = Card;

const MainPage = () => {
  const navigate = useNavigate();
  const [contents, setContents] = useState([]);
  const [load, setLoad] = useState(true);

  const [cardBG, setCardBg] = useState("");
  const [borderBG, setBorderBG] = useState("");
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    if (Cookies.get("dark") === "false") {
      setCardBg("white");
      setBorderBG("");
      setTextColor("black");
    } else if (Cookies.get("dark") === "true") {
      setCardBg("rgba(13,16,22,255)");
      setBorderBG("");
      setTextColor("white");
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

  // Rastgele elemanları seçen fonksiyon
  const getRandomElements = (array, count) => {
    const result = [];
    const seenIndices = new Set();

    while (result.length < count && seenIndices.size < array.length) {
      const randomIndex = Math.floor(Math.random() * array.length);

      if (!seenIndices.has(randomIndex)) {
        seenIndices.add(randomIndex);
        result.push(array[randomIndex]);
      }
    }

    return result;
  };

  
  const randomContents = getRandomElements(contents, 3);

  return (
    <>
      {areas("Rastgele Konular")}
    </>
  );

  function areas(name) {
    return (
      <>
        <Helmet>
          <title>blog: Nontius</title>
          <meta
            name="description"
            content="Yazılım, Oyun, Sanat üzerine bir blog sitesi"
          />
          <meta
            name="keywords"
            content="java, unity3D, english, blog, yazılım, oyun, sanat, game, art, app, software, news, github, git"
          />
          <meta name="author" content="Nontius" />
        </Helmet>

       <div style={{ padding: 10 }}>
      <h2 style={{ color: textColor }}>{name}</h2>
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
            randomContents.map((content, index) => (
              <div key={index} onClick={() => readContent(content.title)}>
                <Card
                  className="hoverCard"
                  hoverable
                  style={{
                    width: 240,
                    backgroundColor: cardBG,
                    borderColor: borderBG,
                  }}
                  cover={
                    <img
                      style={{ borderRadius: "10px" }}
                      alt="Konu resmi"
                      src={content.picture}
                    />
                  }
                >
                  <p style={{ color: textColor }}>
                    <b>{content.title}</b>
                  </p>
                  <d style={{ color: textColor }}>{content.desc}</d>
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

export default MainPage;
