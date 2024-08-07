import React from "react";
import Content_i from "../component/Content_i"
import Main from "../component/Main";
import Contents from "../component/Contents";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import {
  LaptopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";



const { Header, Content, Footer, Sider } = Layout;

const items1 = ["Nontius", "İletişim"].map((key) => ({
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
    <Router>
      <Layout>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["Nontius"]}
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
    }else if (e.key === 'Nontius') {
      navigate('/'); // Ana sayfa
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
      <Route path="/" element={<Main />} />
      <Route path="/contents" element={<Contents />} />
      <Route path="/readContent/:title" element={<Content_i />} />
      
    </Routes>
  );
};

export default App;
