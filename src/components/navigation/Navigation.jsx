import { Link } from "react-router-dom";
import profile from "../../assets/profile.svg";
import settings from "../../assets/settings.svg";
import newPost from "../../assets/new post.svg";
import { useContext } from "react";
import { Context } from "../contextRouter/ContextRouter";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const { token,name } = useContext(Context);
  const navigate =useNavigate("/")

  return (
    <div className="flex items-center p-[5px] justify-center max-w-[1280px] max-h-[54px] md:h-[34px] ">
      <div className="  flex gap-5 w-full max-w-[800px] h-[34px]">
        <button className=" mr-auto cursor-pointer" onClick={()=>navigate("/")}>
          <h1 className="xl:text-[25px] md:text-[20px] text-[#61BB61]"> Realworld</h1>
        </button>
        
        <button>
          <Link to="/" className="text-[12px]">Home</Link>
        </button>

        {token ? (
          <div className="flex gap-4 ">
            <button className="flex justify-center items-center gap-2">
              <img className=" max-w-[16px] max-h-[16px]" src={newPost} />
              <Link to="new-article" className="text-[12px]">New Post</Link>
            </button>
            <button className="flex justify-center items-center gap-2">
              <img className=" max-w-[16px] max-h-[16px]" src={settings} /><Link to="settings" className="text-[12px]">Settings</Link> 
            </button>
            <button className="flex justify-center items-center gap-2">
              <img className=" max-w-[16px] max-h-[16px]" src={profile} />
              <Link to="profile" className="text-[12px]">{name}</Link>
            </button>

          </div>
        ) : (
          <div className="flex gap-4">
            <button>
              <Link to="sign-in" className="text-[12px]">Sign In</Link>
            </button>
            <button>
              <Link to="sign-up" className="text-[12px]">Sign Up</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Navigation;
