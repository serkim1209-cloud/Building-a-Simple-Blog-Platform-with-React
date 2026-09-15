import { Link } from "react-router-dom";
import Profile from "../../assets/Profile.svg";
import settings from "../../assets/settings.svg";
import newPost from "../../assets/New post.svg";



function Navigation({vision,setVision}) {
 
  const profile = localStorage.getItem("name");
  return (
    <div className="flex items-center justify-center max-w-[1280px] h-[54px] ">
      <div className="  flex gap-5  w-[800px] h-[34px]">
        <h1 className="text-[24px] text-[#61BB61] mr-auto">Realworld</h1>
        <button >
          <Link to="/">Home</Link>
        </button>
        <button className={!vision ? "block" : "hidden"}>
          <Link to="sigIn">Sign In</Link>
        </button>
        <button className={!vision ? "block" : "hidden"}>
          <Link to="signup">Sign Up</Link>
        </button>
        <div className={`flex gap-4  ${vision ? "block" : "hidden"}`}>
          <button className="flex justify-center items-center gap-2">
            <img className=" w-[16px]h-[16px]" src={newPost} /><Link to="new-article">New Post</Link>
          </button>
          <button className="flex justify-center items-center gap-2">
            <img className=" w-[16px]h-[16px]" src={settings} /> Settings
          </button>
          <button className="flex justify-center items-center gap-2">
            <img className=" w-[16px]h-[16px]" src={Profile} />
            <Link to="profile">{profile}</Link>
          </button>
           <button onClick={()=>{localStorage.clear()
            setVision(false)
           }} className={vision ?"block" : "hidden"}>log out</button>
        </div>
      </div>
    </div>
  );
}
export default Navigation;
