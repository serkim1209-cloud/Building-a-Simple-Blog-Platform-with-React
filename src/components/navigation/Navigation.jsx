import { Link } from "react-router-dom";
import profile from "../../assets/profile.svg";
import settings from "../../assets/settings.svg";
import newPost from "../../assets/new post.svg";
import { useContext } from "react";
import { Context } from "../contextRouter/ContextRouter";

function Navigation() {
  const { token, setToken, name } = useContext(Context);

  return (
    <div className="flex items-center justify-center max-w-[1280px] h-[54px] ">
      <div className="  flex gap-5 w-full max-w-[800px] h-[34px]">
        <h1 className="text-[24px] text-[#61BB61] mr-auto">Realworld</h1>
        <button>
          <Link to="/">Home</Link>
        </button>

        {token ? (
          <div className="flex gap-4 ">
            <button className="flex justify-center items-center gap-2">
              <img className=" w-[16px]h-[16px]" src={newPost} />
              <Link to="new-article">New Post</Link>
            </button>
            <button className="flex justify-center items-center gap-2">
              <img className=" w-[16px]h-[16px]" src={settings} /><Link to="settings">Settings</Link> 
            </button>
            <button className="flex justify-center items-center gap-2">
              <img className=" w-[16px]h-[16px]" src={profile} />
              <Link to="profile">{name}</Link>
            </button>

          </div>
        ) : (
          <div className="flex gap-4">
            <button>
              <Link to="sign-in">Sign In</Link>
            </button>
            <button>
              <Link to="sign-up">Sign Up</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Navigation;
