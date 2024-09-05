import React, { useEffect } from "react";
import { useState } from "react";
import { Card } from "antd";
import {
  listContents,
  deleteContent,
  updateContent,
} from "../Services/ContentService";
import { Button, Flex } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const ContentList = () => {
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

  const navigate = useNavigate();

  function addContent() {
    navigate("/add-content");
  }

  function updateContent(id) {
    navigate(`/updateContent/${id}`);
  }

  function deleteC(id) {
    deleteContent(id)
      .then((response) => {
        getAllEmployee();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function selectTag(tag){
    let tagType = "badge bg-success";
    if(tag == "TECH"){
      tagType = "badge bg-primary";
    }

    if(tag == "GAME"){
      tagType = "badge bg-danger";
    }

    if(tag == "BLOG"){
      tagType = "badge bg-info";
    }

    if(tag == "NEW"){
      tagType = "badge bg-succes";
    }

    if(tag == "ENG"){
      tagType = "badge bg-succes";
    }
    
    return( 
      <>
          <span className={tagType}>{tag}</span>
      </>
    )
  }

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {contents.map((content) => (
          <Card 
            key={content.id}
            title={"ID: " + content.id}
            style={{
              width: 300,
              border: "2px solid black",
            }}
          >
            <p>{content.title}</p>
            <p>{content.tags ? content.tags.map((tag) => ( 
              
              
              selectTag(tag)
              
              
              
            )): "No Tags" }</p>
            <p style={{
              height: "100px",
              overflow: "hidden"
            }}>{content.content}</p>
            <p>
              <Button
                type="primary"
                style={{ backgroundColor: "green" }}
                onClick={() => updateContent(content.id)}
              >
                Edit
              </Button>
              <Button
                type="primary"
                style={{ backgroundColor: "red" }}
                onClick={() => deleteC(content.id)}
              >
                Delete
              </Button>
            </p>
          </Card>
        ))}
      </div>
      <br></br>
      <Button type="primary" onClick={addContent}>
        Create Content
      </Button>
    </>
  );
};

export default ContentList;


/*


  import ContentList from "../component/ContentList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom" ;
import AddContent from "../component/AddContent";

 <Router>
              <Routes>
                <Route path="/" element={<ContentList />} />
                <Route path="/contentList" element={<ContentList />} />
                <Route path="/add-content" element={<AddContent />}></Route>
                <Route
                  path="/updateContent/:id"
                  element={<AddContent />}
                ></Route>
              </Routes>
            </Router>

*/