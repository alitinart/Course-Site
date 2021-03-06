import axios from "axios";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Account from "./Account/Account";
import AddContent from "./AddContent/AddContent";
import "./App.css";
import Auth from "./Auth/Auth";
import Checkout from "./Checkout/Checkout";
import CourseInfo from "./Courses/CourseInfo/CourseInfo";
import CoursesPage from "./Courses/CoursesPage/CoursesPage";
import CourseVideoRenderer from "./Courses/CourseVideos/CourseVideosRenderer";
import Home from "./Home/Home";
import Footer from "./Page-Components/Footer/Footer";
import Header from "./Page-Components/Header/Header";
import Video from "./Video/Video";

function App() {
  let user = localStorage.getItem("currentUser");
  axios
    .get("http://localhost:8000/auth/token", {
      headers: {
        authorization: `Bearer ${user}`,
      },
    })
    .then((res) => {
      if (res.data === "Forbbiden") {
        localStorage.removeItem("currentUser");
      }
    })
    .catch((err) => console.log(err));

  if (user && window.location.pathname.includes("/auth")) {
    window.location.href = "/";
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/addContent/:type" element={<AddContent />}></Route>
          <Route path="/courses" element={<CoursesPage />}></Route>
          <Route path="/courses/:courseId" element={<CourseInfo />}></Route>
          <Route path="/auth/:type" element={<Auth />}></Route>
          <Route path="/account" element={<Account />}></Route>
          <Route path="/checkout/:id" element={<Checkout />}></Route>
          <Route
            path="/course/videos/:id"
            element={<CourseVideoRenderer />}
          ></Route>
          <Route
            path="/course/videos/:id/:videoIndex"
            element={<Video />}
          ></Route>
          <Route path="*" element={<Home />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
