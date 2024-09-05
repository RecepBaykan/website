import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { queryContents } from "../Services/ContentService";
import Link from "antd/es/typography/Link";
import { convertTitleToUrl } from "../Services/ConvertTitle";
import Cookies from "js-cookie";

const SearchPage = () => {
  const [bgColor, setBg] = useState("");
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    
    if (Cookies.get("dark") === 'false') {
      setBg("white");
      setTextColor("black");
    } else if (Cookies.get("dark") === 'true') {
      setBg("rgba(13,16,22,255)");
      setTextColor("white");
    }
  }, []);

  const navigate = useNavigate();

  const { query } = useParams();

  const [queryList, setQueryList] = useState([]);

  useEffect(() => {
    getContent();
  }, [query]);

  function getContent() {
    queryContents(query)
      .then((response) => {
        setQueryList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function goContent(title) {
    navigate(`/readContent/${convertTitleToUrl(title)}`);
  }

  return (
    <>
      <div>
        <h2 style={{color: textColor}}>Aranan Kelime: {query}</h2>{" "}
      </div>
      {queryList.length > 0 ? "" : <h3>Hiç bir konu bulunamadı</h3>}
      {queryList.map((q) => (
        <Link onClick={() => goContent(q.title)}>
          <div
            style={{
             
              backgroundColor: bgColor,
              padding: "3px",
              width: 400,
              borderRadius: "10px",
            }}
          >
            <h4 style={{ color:textColor}}>{q.title}</h4>
          </div>
        </Link>
      ))}
    </>
  );
};

export default SearchPage;
