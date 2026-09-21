import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/privateRouter/PrivateRoute";
import { lazy, createContext, useState, Suspense } from "react";
import Main from "./pages/Main-Page";
import Layout from "./components/layout/Layout";
import "./App.css";
import Loading from "./components/loading/Loading";

const Article = lazy(() => import("./pages/Article-Page"));
const LogInForm = lazy(() => import("./pages/SignUp-Page"));
const SigIn = lazy(() => import("./pages/SigIn-Page"));
const Profile = lazy(() => import("./components/profile/profile"));
const NewArticle = lazy(() => import("./pages/New-Article-Pages"));
const EditArticl = lazy(() => import("./pages/EditArticle-Pages"));
export const AuthoContext = createContext({});

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <>
      <AuthoContext.Provider value={{ token, setToken }}>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Main />} />
                <Route path="articles/:slug" element={<Article />} />
                <Route path="sign-in" element={<SigIn />} />
                <Route path="sign-up" element={<LogInForm />} />
                <Route element={<PrivateRoute />}>
                  <Route path="profile" element={<Profile />} />
                  <Route path="new-article" element={<NewArticle />} />
                  <Route path="article/:slug/edit" element={<EditArticl />} />
                </Route>
              </Route>
            </Routes>
        </BrowserRouter>
      </AuthoContext.Provider>
    </>
  );
}

export default App;
