import "./App.css";
import Welcome from "./components/Welcome";
import Menu from "./components/Menu";
import Question from "./components/Question";
import Leaderboards from "./components/Leaderboards";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDm4d-WH07oBAJ1DKabYVhYMkCi_Hi22Co",
  authDomain: "quizzed-cceea.firebaseapp.com",
  projectId: "quizzed-cceea",
  storageBucket: "quizzed-cceea.appspot.com",
  messagingSenderId: "527912834537",
  appId: "1:527912834537:web:08b4e78ee7a636cfb42778",
  measurementId: "G-E1XF6X48D2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App navy-background h-screen">
      {user ? <Main /> : <Welcome />}
    </div>
  );
}

function Main() {
  const [user] = useAuthState(auth);

  const getName = (user) => {
    if (user.displayName) {
      return user.displayName;
    } else {
      return "Anonymous";
    }
  };
  console.log(user);
  return (
    <Router>
      <div>
        <div className="h-16 dark-navy-background grid grid-cols-2 text-white border-b border-gray-100">
          <h1 className="my-auto lg:text-4xl md:text-3xl text-2xl text-left lg:pl-16 pl-6 ">
            Quizzed
          </h1>
          <div className="flex flex-row sm:text-lg justify-end pr-8 items-center gap-8 lg:gap-16">
            <Link to="/">Menu</Link>
            <Link to="/leaderboards">Leaderboards</Link>
          </div>
        </div>
        <div className="w-screen h-px bg-stone-900"></div>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route
            path="/quiz"
            element={<Question id={user.uid} name={getName(user)} />}
          />
          <Route
            path="/leaderboards"
            element={<Leaderboards name={user.uid} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
