import ContentList from "../component/ContentList";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import AddContent from "../component/AddContent";
import React from "react";
import {
  LaptopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Contents from "../component/Contents";
import Content_i from "../component/Content_i"
import TEST from "../component/test"

const { Header, Content, Footer, Sider } = Layout;

const items1 = ["Ana sayfa", "İletişim"].map((key) => ({
  key,
  label: `${key}`,
}));

const item2Label = ['', 'Projeler', 'İçerikler'];
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
    <Router> {/* Router bileşenini burada yerleştiriyoruz */}
      <Layout>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["Ana sayfa"]}
            items={items1}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Header>
        <Content style={{ padding: "0 48px" }}>
          <Layout
            style={{
              padding: "24px 0",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Sider style={{ background: colorBgContainer }} width={200}>
              <SiderMenu />
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 500 }}>
              <AppRoutes />
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

// Sidebar menüsü
const SiderMenu = () => {
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    if (e.key === 'Projeler') {
      navigate('/project'); // Projeler sayfasına yönlendir
    } else if (e.key === 'İçerikler') {
      navigate('/contents'); // İçerikler sayfasına yönlendir
    }
  };

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      onClick={handleMenuClick}
      style={{ height: "100%" }}
      items={items2}
    />
  );
};

// Rotalar
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ContentList />} />
      <Route path="/contentList" element={<ContentList />} />
      <Route path="/add-content" element={<AddContent />} />
      <Route path="/contents" element={<Contents />} />
      <Route path="/updateContent/:id" element={<AddContent />} />
      <Route path="/readContent/:title" element={<Content_i />} />
      <Route path="/test" element={<TEST/>} />
      
    </Routes>
  );
};

export default App;
