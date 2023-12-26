import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loader from "react-top-loading-bar"
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { useState } from "react";
import Categories from "./Components/Categories";
import Questions from "./Components/Questions";
import Answers from "./Components/Answers";
import Alert from "./Components/Alert";
import CreateForum from "./Components/CreateForum";
import MobileMenuList from "./Components/MobileMenuList";
import Footer from "./Components/Footer";

function App() {
  const [alert, setAlert] = useState(null);
  const [progress, setProgress] = useState(0);
  const [selectedType, setSelectedType] = useState("Computer Science");
  const [selectedQuestion, setSelectedQuestion] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedMobileMenuOption, setSelectedMobileMenuOption] = useState();
  const [selectedOption, setSelectedOption] = useState("Questions");

  const showAlert = (type, message) => {
    setAlert({
      message: message,
      type: type
    })

    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }

  return (
    <>
      <Router>
        <Loader color="#FF0000" height={4} progress={progress} />
        <Navbar />
        <Alert alert={alert} />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup setProgress={setProgress} showAlert={showAlert} />} />
          <Route exact path="/login" element={<Login setProgress={setProgress} showAlert={showAlert} />} />
          <Route exact path="/answers" element={<Answers setSelectedMobileMenuOption={setSelectedMobileMenuOption} setProgress={setProgress} showAlert={showAlert} selectedType={selectedType} setSelectedQuestion={setSelectedQuestion} setSelectedCategory={setSelectedCategory} selectedQuestion={selectedQuestion} selectedCategory={selectedCategory} />} />
          <Route exact path="/categories" element={<Categories setSelectedMobileMenuOption={setSelectedMobileMenuOption} setProgress={setProgress} showAlert={showAlert} selectedType={selectedType} setSelectedCategory={setSelectedCategory} setSelectedType={setSelectedType} />} />
          <Route exact path="/questions" element={<Questions setProgress={setProgress} setSelectedOption={setSelectedOption} selectedOption={selectedOption} setSelectedMobileMenuOption={setSelectedMobileMenuOption} showAlert={showAlert} setSelectedQuestion={setSelectedQuestion} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} selectedType={selectedType} />} />
          <Route exact path="/createForum" element={<CreateForum setSelectedType={setSelectedType} showAlert={showAlert} setProgress={setProgress} selectedType={selectedType} />} />
          <Route exact path="/mobile-menu" element={<MobileMenuList setSelectedOption={setSelectedOption} selectedOption={selectedOption} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} selectedType={selectedType} selectedMobileMenuOption={selectedMobileMenuOption} setProgress={setProgress} setSelectedQuestion={setSelectedQuestion} setSelectedType={setSelectedType} />} />
        </Routes>

        <Footer />
      </Router>

    </>
  );
}

export default App;
