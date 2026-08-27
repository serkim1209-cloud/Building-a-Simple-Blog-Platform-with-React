import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "./Component/Loadinf";
import Main from "./Component/Main";
import Navigation from "./Component/Navigation";
import Header from "./Component/Header";
import Article from "./Component/Article";

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/articles/:slug" element={<Article />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
