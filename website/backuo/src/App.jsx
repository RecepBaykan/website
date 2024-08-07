import ContentList from "../component/ContentList";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import AddContent from "../component/AddContent";
import React from "react";
import { LaptopOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Contents from "../component/Contents";
import Content_i from "../component/Content_i";
import "../component/App.css"
import Main from "../component/Main";
import Projects from "../component/Project";
import { Helmet } from "react-helmet";

const { Header, Content, Footer, Sider } = Layout;

const items1 = ["Nontius"].map((key) => ({
  key,
  label: `${key}`,
}));

const item2Label = ["", "Projeler", "İçerikler"];
const items2 = [UserOutlined, LaptopOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `${item2Label[key]}`,
    icon: React.createElement(icon),
    label: `${item2Label[key]}`,
  };
});

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
   
    <Router>
       <Helmet>
          <title>blog: Nontius</title>
      </Helmet>
      <Layout style={{ backgroundColor: "rgba(241, 243, 245, 1)"}}>
        <Header
          style={{
            position: "fixed",
            display: "flex",
            zIndex: 1001,
            alignItems: "center",
            minWidth: "100%",
            backgroundColor: "rgba(241, 243, 245, 1)",
          }}
        >
          <div className="demo-logo" />
          <HeaderMenu />
        </Header>
        <Content style={{ padding: "0 48px" }}>
          <Layout
            style={{
              marginTop:50,
              padding: "24px 0",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              backgroundColor: "rgba(241, 243, 245, 1)",
              
            }}
          >
            <Sider
              style={{
                top: 80,
                borderRadius: "5%",
                background: colorBgContainer,
                minHeight: 600,
                maxHeight: 600,
                position: "fixed",
                zIndex: 1000,
              }}
              width={200}
            >
              <SiderMenu />
            </Sider>
            <Content style={{padding: "0 240px", minHeight: 600, backgroundColor: "rgba(241, 243, 245, 1)",}}>
              <AppRoutes style/>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Nontius ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Router>
  );
};

// Header menüsü
const HeaderMenu = () => {
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    if (e.key === "Nontius") {
      navigate("/"); // Ana sayfa
    } else if (e.key === "İletişim") {
      navigate("/contact"); // İletişim sayfası
    }
  };

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["Nontius"]}
      items={items1}
      style={{ flex: 1, minWidth: 0 }}
      onClick={handleMenuClick}
    />
  );
};

// Sidebar menüsü
const SiderMenu = () => {
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    if (e.key === "Projeler") {
      navigate("/projects"); // Projeler sayfasına yönlendir
    } else if (e.key === "İçerikler") {
      navigate("/contents"); // İçerikler sayfasına yönlendir
    } else if (e.key === "Nontius") {
      navigate("/"); // Ana sayfa
    }
  };

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      onClick={handleMenuClick}
      style={{ borderRadius:"5%", height: "100%" }}
      items={items2}
    />
  );
};

// Rotalar
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/contentList" element={<ContentList />} />
      <Route path="/add-content" element={<AddContent />} />
      <Route path="/contents" element={<Contents />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/updateContent/:id" element={<AddContent />} />
      <Route path="/readContent/:title" element={<Content_i />} />
      
      
      
      {/* İletişim sayfası */}
    </Routes>
  );
};

export default App;
