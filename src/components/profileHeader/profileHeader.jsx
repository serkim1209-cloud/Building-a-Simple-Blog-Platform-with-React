import { useContext } from "react";
import { Context } from "../contextRouter/ContextRouter";
import Cheker from "../../assets/Cheker.svg"

function ProfileHeader() {
  const { name } = useContext(Context);
  return (
    <div className="flex w-full max-w-[1280px]  h-[194px] flex-col justify-center items-center bg-[#333333]">
        <div className="w-[90px] h-[90px]">
            <img src={Cheker}/>
        </div>
      <h2 className="text-[#FFFFFF] text-[32px]">{name}</h2>
    </div>
  );
}
export default ProfileHeader;
