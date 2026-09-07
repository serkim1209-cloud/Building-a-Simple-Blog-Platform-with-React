import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "./components/loading/Loading";
import Main from "./pages/Main-Page";
import Layout from "./components/layout/Layout";
import "./App.css";
const Article = lazy(()=> import("./pages/Article-Page"));
const LogInForm = lazy(()=> import("./components/authentication/LogInForm"));



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="articles/:slug" element={<Article />} />
            <Route path="sigIn" element={<LogInForm/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
