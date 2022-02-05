import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import AddContent from "./AddContent/AddContent";
import "./App.css";
import Auth from "./Auth/Auth";
import CourseInfo from "./CourseInfo/CourseInfo";
import CoursesPage from "./CoursesPage/CoursesPage";
import Home from "./Home/Home";
import Footer from "./Page-Components/Footer/Footer";
import Header from "./Page-Components/Header/Header";

function App() {
  let user = JSON.parse(localStorage.getItem("currentUser"));

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
          <Route path="*" element={<Home />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
