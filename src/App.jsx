import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  PrivateRoute,
  PublicRoute,
} from "./components/privateRouter/PrivateRoute";
import { lazy } from "react";
import Main from "./pages/Main-Page";
import Layout from "./components/layout/Layout";
import "./App.css";
import { PrivateContext } from "./components/Private-Context.jsx/Private-Context";
const Article = lazy(() => import("./pages/Articles-Page"));
const LogInForm = lazy(() => import("./pages/SignUp-Page"));
const SigIn = lazy(() => import("./pages/SigIn-Page"));
const Profile = lazy(() => import("./components/profile/Profile"));
const NewArticle = lazy(() => import("./pages/New-Article-Pages"));
const EditArticl = lazy(() => import("./pages/EditArticle-Pages"));

function App() {
  return (
    <>
      <PrivateContext>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Main />} />
              <Route path="articles/:slug" element={<Article />} />
              <Route element={<PublicRoute />}>
                <Route path="sign-in" element={<SigIn />} />
                <Route path="sign-up" element={<LogInForm />} />
              </Route>

              <Route element={<PrivateRoute />}>
                <Route path="profile" element={<Profile />} />
                <Route path="new-article" element={<NewArticle />} />
                <Route path="article/:slug/edit" element={<EditArticl />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </PrivateContext>
    </>
  );
}

export default App;
