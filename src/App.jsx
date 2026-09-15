import { BrowserRouter, Route, Routes,} from "react-router-dom";
import { lazy } from "react";
import Main from "./pages/Main-Page";
import Layout from "./components/layout/Layout";
import "./App.css";
const Article = lazy(() => import("./pages/Article-Page"));
const LogInForm = lazy(() => import("./components/authentication/SignUp"));
const SigIn = lazy(() => import("./components/authentication/SigIn"));
const Profile =lazy(()=>import("./components/profile/profile"));
const CreateArticle =lazy(()=>import("./components/createAticle/createArticl"))
const EditArticl =lazy(()=>import("./components/editArticle/editArticle"))
import { useState } from "react";

function App() {
  const[vision,setVision]=useState(true);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout vision={vision} setVision={setVision} />}>
            <Route index element={<Main vision={vision} />} />
            <Route path="articles/:slug" element={<Article />} />
            <Route path="sigIn" element={<SigIn setVision={setVision} />} />
            <Route path="signup" element={<LogInForm />} />
            <Route path="profile" element={<Profile/>} />
            <Route path="new-article" element={<CreateArticle/>} />
            <Route path="/article/:slug/edit" element={<EditArticl/>} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
