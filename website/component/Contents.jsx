import React, { useState, useEffect } from "react";
import { listContents } from "../Services/ContentService";
import { useNavigate } from "react-router-dom";
import "../component/Content.css";
import "../component/CardLoading.css";
import { convertTitleToUrl } from "../Services/ConvertTitle";
import { Card, Button, Col, Row } from "antd";
import { Helmet } from "react-helmet";

const { Meta } = Card;

const Contents = () => {
  const navigate = useNavigate();
  const [contents, setContents] = useState([]);
  const [load, setLoad] = useState(true);

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
      {areas("Java Konuları", "TECH")}
      {areas("Oyun İncelemeleri", "GAME")}
    </>
  );

  function areas(name, filter) {
    return (
      <>
      <Helmet>
          <title>İçerikler</title>
      </Helmet>
        <div style={{ padding: 10 }}>
          <h2>{name}</h2>
        </div>
        <div
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
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="Konu resmi" src={content.picture} />}
                  >
                    <Meta title={content.title} description={content.desc} />
                    <br />
                    <br />
                  </Card>
                </div>
              ))
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <div class="cards">
                <div class="card is-loading">
                  <div class="image"></div>
                  <div class="content">
                    <h2></h2>
                    <p></p>
                  </div>
                </div>
              </div>

              <div class="cards">
                <div class="card is-loading">
                  <div class="image"></div>
                  <div class="content">
                    <h2></h2>
                    <p></p>
                  </div>
                </div>
              </div>

              <div class="cards">
                <div class="card is-loading">
                  <div class="image"></div>
                  <div class="content">
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
