import React, { useState, useEffect } from "react";
import { Button, Card, Form, Input } from "antd";
import {
  createContent,
  getContent,
  updateContent,
} from "../Services/ContentService";
import { useNavigate, useParams } from "react-router-dom";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import "bootstrap/dist/css/bootstrap.css";
import ImageResize from 'quill-image-resize-module-react';
import Quill from "quill";

Quill.register('modules/imageResize', ImageResize);


const AddContent = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [desc, setDesc] = useState("");
  
  const [picture, setPicture] = useState('');

  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        ["bold", "italic", "underline"],
        ["image", "code-block"],
      ],
      imageResize: {
        parchment: Quill.import('parchment'),
        modules: ["Resize", "DisplaySize"],
      },
    },
  });

  

  const navigate = useNavigate();
  const { id } = useParams();

  const [tagsIS, setTagsIS] = useState([false, false, false, false]);
  const tags = ["TECH", "GAME", "NEWS", "BLOG"];

  const handleSwitch = (e) => {
    const tagName = e.target.name;
    const isChecked = e.target.checked;

    setTagsIS((prevTagsIS) =>
      prevTagsIS.map((tag, index) =>
        tags[index] === tagName ? isChecked : tag
      )
    );
  };

  useEffect(() => {
    if (id) {
      getContent(id)
        .then((response) => {
          setTitle(response.data.title);
          setContent(response.data.content);
          setDesc(response.data.desc);
          const tagStates = tags.map((tag) => response.data.tags.includes(tag));
          setTagsIS(tagStates);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (quill && content) {
      quill.clipboard.dangerouslyPasteHTML(content);
    }
  }, [quill, content]);

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  function handleDesc(e) {
    setDesc(e.target.value);
  }

  function handlePic(event) {  // 'event' parametresini al
    
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      console.log(reader.result)
      setPicture(reader.result);
      
    }
    
}

  function saveContent(e) {
    e.preventDefault(); // sayfayı yenilemeyi engeller
    if (validateForm()) {
      const selectedTags = tagsIS.reduce((acc, isSelected, index) => {
        if (isSelected) acc.push(tags[index]);
        return acc;
      }, []);

      const date = formatDate(new Date());

      const _content = {
        title,
        content: quill.root.innerHTML,
        tags: selectedTags,
        date,
        desc,
        picture
        
      };

      if (id) {
        updateContent(id, _content).then((response) => {
          console.log(response.data);
          navigate("/contentList");
        });
      } else {
        createContent(_content).then((response) => {
          console.log(response.data);
          navigate("/contentList");
          
        });
      }
    }
  }

  const [errors, setErrors] = useState({
    title: "",
    content: "",
    desc: "",
  });

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (title.trim()) {
      errorsCopy.title = "";
    } else {
      errorsCopy.title = "Title is required!";
      valid = false;
    }

    if (title.trim()) {
      errorsCopy.desc = "";
    } else {
      errorsCopy.desc = "Title is required!";
      valid = false;
    }

    if (quill && quill.root.innerHTML.trim()) {
      errorsCopy.content = "";
    } else {
      errorsCopy.content = "Content is required!";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  return (
    <>
      <Card
        title={id ? "Update Content " : "Create Content"}
        style={{ width: 525 }}
      >
        <p>Title</p>
        <p>
          <Form.Item
            validateStatus={errors.title ? "error" : ""}
            help={errors.title}
          >
            <Input
              value={title}
              placeholder={id ? title : "Example: New Games"}
              onChange={handleTitle}
            />
          </Form.Item>
        </p>
        <p>Desc</p>
        <p>
          <Form.Item
            validateStatus={errors.desc ? "error" : ""}
            help={errors.desc}
          >
            <Input
              value={desc}
              placeholder={id ? desc : "Example: The games is super "}
              onChange={handleDesc}
            />
          </Form.Item>
        </p>
        <div class="mb-3">
          <label for="formFile" class="form-label">
           Resim Seç
          </label>
          <input class="form-control" type="file" id="formFile" onChange={handlePic}></input>
        </div>
        Select Tags:
        <br></br>
        <input
          className="form-check-input"
          type="checkbox"
          name="TECH"
          onChange={handleSwitch}
          checked={tagsIS[0]}
        />
        <span className="badge bg-primary">TECH</span>
        <br></br>{" "}
        <input
          className="form-check-input"
          type="checkbox"
          name="GAME"
          onChange={handleSwitch}
          checked={tagsIS[1]}
        />
        <span className="badge bg-danger">GAME</span>
        <br></br>{" "}
        <input
          className="form-check-input"
          type="checkbox"
          name="NEWS"
          onChange={handleSwitch}
          checked={tagsIS[2]}
        />
        <span className="badge bg-success">NEWS</span>
        <br></br>{" "}
        <input
          className="form-check-input"
          type="checkbox"
          name="BLOG"
          onChange={handleSwitch}
          checked={tagsIS[3]}
        />
        <span className="badge bg-info">BLOG</span>
        <p>Content</p>
        <p>
          <Form.Item
            validateStatus={errors.content ? "error" : ""}
            help={errors.content}
          >
            

            <div style={{ width: 500 }}>
              <div
                ref={quillRef}
                style={{ height: 300, marginBottom: "20px" }}
              />
            </div>
          </Form.Item>
        </p>
        <p>
          <Button type="primary" onClick={saveContent}>
            Save
          </Button>
        </p>
      </Card>
    </>
  );
};

export default AddContent;
