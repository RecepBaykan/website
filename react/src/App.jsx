import React, { useEffect, useState } from "react";
import { useNavigate,BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Switch, Input } from "antd";
import { Layout, Menu, theme } from "antd";
import Content_i from "../component/Content_i";
import Projects from "../component/Project";
import Contents from "../component/Contents";
import AddContent from "../component/AddContent";
import "../component/App.css";
import ContentList from "../component/ContentList"
import Cookies from "js-cookie";
import MainComponent from "../component/MainComponent";
import SearchPage from "../component/Search";


const { Header, Content, Footer, Sider } = Layout;
  const {Search} = Input;

    const SearchBar = () => {

      const navigate = useNavigate();
      const search = (query) => {
        navigate('/search/' + query)
      }

    return(
      <>
        <div>
        <Search style={{margin:13, width:200}} placeholder="Arama yap" onSearch={search} enterButton />
        </div>
      
      </>
    )
}

const headerItems = [
  {
    key: "1",
    label:"Nontius",
    link: "/"
  }
]

const sideItems = [
  {
    key: "1",
    label: "Projeler",
    link: "/projects",
  },
  {
    key: "2",
    label: "İçerikler",
    link: "/contents",
  },
];

function App() {
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    const selectedItem = sideItems.find((item) => item.key === e.key);
    if (selectedItem) {
      navigate(selectedItem.link);
    }
  };

  const [bgColor, setBgColor] = useState("rgba(241, 243, 245, 1)");
  const [dark, setDark] = useState(Cookies.get("dark") === "true");

  const [textColor, setTextColor] = useState("");

  const darkMode = () => {
    const newDark = !dark;
    Cookies.set("dark", newDark);
    setDark(newDark);
  };

  useEffect(() => {
    if (dark) {
      setBgColor("rgba(30,33,34,255)");

      setTextColor("white");
    } else {
      setBgColor("rgba(241, 243, 245, 1)");

      setTextColor("");
    }
  }, [dark]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      
      <Header
        style={{  
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
        }}
      >

        <Switch
          onChange={darkMode}
          checkedChildren="dark"
          unCheckedChildren="light"
          checked={dark}
        ></Switch>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["0"]}
          items={headerItems}
          style={{
            flex: 1,
            minWidth: 0,
          }}
          selectedKeys={false}
        />
        <SearchBar ></SearchBar>
      </Header>
      <Layout style={{ flex: 1 }}>
        <Sider
          width={200}
          breakpoint="lg"
          collapsedWidth="0"
          style={{
            backgroundColor: bgColor,
            margin: 10,
            position: "fixed",
            zIndex: "1000",
            color: "white",
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            theme={dark ? "dark" : "light"}
            style={{ borderRadius: "3%", minHeight: 500 }}
            items={sideItems}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout
          style={{
            padding: "24px",

            backgroundColor: bgColor,
          }}
        >
          <Content
            className="content"
            style={{
              minHeight: "100%",
              backgroundColor: bgColor,
            }}
          >
            <Routes>
              <Route path="/" element={<MainComponent/>}></Route>
              <Route path="/contentList" element={<ContentList />} />
                <Route path="/add-content" element={<AddContent />} />
                <Route path="/contents" element={<Contents />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/updateContent/:id" element={<AddContent />} />
                <Route path="/readContent/:title" element={<Content_i />} />
                <Route path="/search/:query" element={<SearchPage/>} />
              

             
            </Routes>
          </Content>
        </Layout>
      </Layout>
      <Footer
        style={{
          backgroundColor: bgColor,
          color: textColor,
        }}
      >
        Nontius ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}

export default App;
