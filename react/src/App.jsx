import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Content_i from "../component/Content_i";
import AddContent from "../component/AddContent";
import Projects from "../component/Project";
import Contents from "../component/Contents";
import ContentList from "../component/ContentList";
import Main from "../component/Main";
import "../component/App.css";

const { Header, Content, Footer, Sider } = Layout;
const items1 = ["Nontius"].map((key) => ({
  key,
  label: `${key}`,
}));



const items3 = [
  {
    key: "1",
    label:"Projeler",
    link : "/projects",
  },
  {
    key: "2",
    label: "İçerikler",
    link : "/contents",
  }
]

function App(){

  const navigate = useNavigate(); 

  const handleMenuClick = (e) => {
    const selectedItem = items3.find(item => item.key === e.key);
    if (selectedItem) {
      navigate(selectedItem.link);
    }
  };
  
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
          style={{
            flex: 1,
            minWidth: 0,
          }}
         
        />
      </Header>
      <Layout style={{ flex: 1 }}>
        <Sider
          width={200}
          breakpoint="lg"
          collapsedWidth="0"
          style={{
            background: colorBgContainer,
            backgroundColor: "rgba(241, 243, 245, 1)",
            margin: 10,
            position: "fixed",
            zIndex: "1000",
          }}
        >
          <Menu
          
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ borderRadius: "3%", minHeight: 500 }}
            items={items3}
            onClick={handleMenuClick} 
            
          />
        </Sider>
        <Layout
          style={{
            padding: "24px",
            background: colorBgContainer,
            backgroundColor: "rgba(241, 243, 245, 1)",
          }}
        >
          <Content
            className="content"
            style={{
              minHeight: "100%",
              backgroundColor: "rgba(241, 243, 245, 1)",
            }}
          >
          
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/contentList" element={<ContentList />} />
                <Route path="/add-content" element={<AddContent />} />
                <Route path="/contents" element={<Contents />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/updateContent/:id" element={<AddContent />} />
                <Route path="/readContent/:title" element={<Content_i />} />
              </Routes>
          
          </Content>
        </Layout>
      </Layout>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Nontius ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );


  

};




export default App;
