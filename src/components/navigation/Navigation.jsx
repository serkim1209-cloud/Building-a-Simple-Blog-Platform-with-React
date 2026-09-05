import { Link,useLocation} from "react-router-dom";
import Profile from "../../assets/Profile.svg"
import settings from "../../assets/settings.svg"
import newPost from "../../assets/New post.svg"

function Navigation() {
    const location=useLocation()
  return (
    <div className="flex items-center justify-center max-w-[1280px] h-[54px] ">
      <div className="  flex gap-5  w-[800px] h-[34px]">
        <h1 className="text-[24px] text-[#61BB61] mr-auto">Realworld</h1>
        <button>
          <Link to="/">Home</Link>
        </button>
        
        <button className={`${location.pathname.startsWith("/articles")? "hidden" : "block"}`}>Sign In</button>
        <button className={` ${location.pathname.startsWith("/articles")? "hidden" : "block"}`}>Sign Up</button>
        <button className={`flex justify-center items-center gap-2 ${location.pathname.startsWith("/articles")? "block" : "hidden"}`}><img className=" w-[16px]h-[16px]" src={newPost}/> New Post</button>
        <button className={`flex justify-center items-center gap-2  ${location.pathname.startsWith("/articles")? "block" : "hidden"}`}><img className=" w-[16px]h-[16px]" src={settings}/> Settings</button>
        <button className={`flex justify-center items-center gap-2  ${location.pathname.startsWith("/articles")? "block" : "hidden"}`}><img className=" w-[16px]h-[16px]" src={Profile}/> Profile</button>
      </div>
    </div>
  );
}
export default Navigation;