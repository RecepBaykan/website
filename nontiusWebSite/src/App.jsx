import React, { useEffect, useState } from "react";
import {
  useNavigate,
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Card, Switch } from "antd";
import { Input, Layout, Menu, theme } from "antd";
import Content_i from "../component/Content_i";
import Projects from "../component/Project";
import Contents from "../component/Contents";
import "../component/App.css";
import Cookies from "js-cookie";
import MainComponent from "../component/MainComponent";
import SearchPage from "../component/Search";
import { Helmet } from "react-helmet-async";
import English_Lesson from "../component/English_Lesson";
import MainPage from "../component/MainPage";
import Social from "../component/Social";
import SocialTwo from "../component/Social2";
import { contents, english, mainPage, project } from "../Services/Data";

const { Search } = Input;
const SearchBar = () => {
  const navigate = useNavigate();
  const search = (query) => {
    navigate("/search/" + query);
  };

  return (
    <>
      <div>
        <Search
          style={{ margin: 13, width: 200 }}
          placeholder="Arama yap"
          onSearch={search}
          enterButton
        />
      </div>
    </>
  );
};

const { Header, Content, Footer, Sider } = Layout;

const headerItems = [
  {
    key: "1",
    label: "Nontius",
    link: "/",
  },
];

const sideItems = [
  {
    key: "1",
    label: "Ana Sayfa",
    link: "/",
  },
  {
    key: "2",
    label: "Projeler",
    link: "/projects",
  },
  {
    key: "3",
    label: "İçerikler",
    link: "/contents",
  },
  {
    key: "4",
    label: "İngilizce Dersleri",
    link: "/english",
  },
];

function App() {


  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1];



  const [isContent, setIsContent] = useState('');
  const [obj, setObj] = useState([]);

   useEffect(() => {
  
    switch (lastSegment) {
      case 'contents':
        setObj(contents);
        break; // break eklemeyi unutmayın
      case 'projects':
        setObj(project);
        break; // break eklemeyi unutmayın
      case 'english':
        setObj(english);
        break; // break eklemeyi unutmayın
      default:
        setObj(mainPage);
        break; // break eklemeyi unutmayın
    }
    console.log(lastSegment)
  }, [location.pathname]); 

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
    <>
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
          <SearchBar></SearchBar>
        </Header>
        <Layout style={{ flex: 1 }}>
          <div
            className="con"
          >
            
              <div className="social">
                <Card
                  title={
                    <div style={{ color: dark ? "white" : "" }}>Hoşgeldin</div>
                  }
                  bordered={false}
                  style={{
                    width:300,
                    backgroundColor: dark ? "rgba(0,20,40,255)" : "white",
                    color: dark ? "#fff" : "#000",
                  }}
                >
                  {obj.map(o => {
                    <p>{o}</p>
                  })}
                  <p>İletişim ve diğer mecralardan takip etmek için aşağıdaki platformlardan ulaşabilirsin</p>
                  <p>
                    <Social />
                  </p>
                </Card>
              </div>
              <div className="social2">
                <SocialTwo></SocialTwo>
              </div>
            
          </div>

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
                minWidth: "95%",
                maxWidth: "95%",

                minHeight: "100%",
                backgroundColor: bgColor,
              }}
            >
              <Routes>
                <Route path="/" element={<MainPage />}></Route>
                <Route path="/contents" element={<Contents />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/english" element={<English_Lesson />} />
                <Route path="/readContent/:title" element={<Content_i />} />
                <Route path="/search/:query" element={<SearchPage />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
        <Footer
          style={{
            textAlign: "center",
            backgroundColor: bgColor,
            color: textColor,
          }}
        >
          Nontius ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </>
  );
}

export default App;
