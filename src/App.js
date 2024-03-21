import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import CreateQuiz from "./pages/CreateQuiz";
import MyQuiz from "./pages/MyQuiz";
import PlayQuiz from "./pages/PlayQuiz";
import AllQuestions from "./pages/AllQuestions";
import QuizDetails from "./pages/QuizDetails";
import GameOn from "./pages/GameOn";
import Result from "./pages/Result";
import PrivateRoute from "./components/PrivateRoute";
import AuthPrivate from "./components/AuthPrivate";

function App() {
  // destructuring the currentUser object using useSelector
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Router>
      {currentUser && <Header />}
      <Routes>
        {/* creating routes for different pages */}
        {/* logged in users can't access these two routes */}
        <Route element={<AuthPrivate />}>
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
        </Route>
        {/* not logged in users can't access these routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/create-quiz" element={<CreateQuiz />} />
          <Route path="/my-quiz" element={<MyQuiz />} />
          <Route path="/play-quiz" element={<PlayQuiz />} />
          <Route path="/play-quiz/:quizId" element={<QuizDetails />} />
          <Route path="/all-questions" element={<AllQuestions />} />
          <Route path="/game-on/:quizId" element={<GameOn />} />
          <Route path="/result/:quizId" element={<Result />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
