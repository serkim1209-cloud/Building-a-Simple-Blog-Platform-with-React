import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/privateRouter/PrivateRoute";
import PublicRoute from "./components/publicRoute/PublicRoute";
import { lazy } from "react";
import Main from "./pages/Main-Page";
import Layout from "./components/layout/Layout";
import "./App.css";
import { ContextRoute } from "./components/contextRouter/ContextRouter";
const Article = lazy(() => import("./components/article/Article"));
const SignUp = lazy(() => import("./pages/Sign-Up-Page"));
const SigIn = lazy(() => import("./pages/Sig-In-Page"));
const Profile = lazy(() => import("./pages/Profile-Page"));
const NewArticle = lazy(() => import("./pages/New-Article-Pages"));
const EditArticle = lazy(() => import("./pages/Edit-Article-Pages"));

function App() {
  return (
    <>
      <ContextRoute>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Main />} />
              <Route path="articles/:slug" element={<Article />} />
              <Route element={<PublicRoute />}>
                <Route path="sign-in" element={<SigIn />} />
                <Route path="sign-up" element={<SignUp />} />
              </Route>

              <Route element={<PrivateRoute />}>
                <Route path="profile" element={<Profile />} />
                <Route path="new-article" element={<NewArticle />} />
                <Route path="articles/:slug/edit" element={<EditArticle />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ContextRoute>
    </>
  );
}

export default App;
