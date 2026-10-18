import useGetApi from "../../custom-hook/useGetApi"
import Tag from "../tag/Tag"

function TagList(){

 const { data: tag } = useGetApi("https://realworld.habsida.net/api/tags");
 const dataTags = tag?.tags?.slice(0,7) || [];

 return(
  <div  className="flex flex-col justify-center justify-evenly px-5 rounded-xl border-[#AAAAAA] border w-[800px] h-[88px] ">
    <h1 className="font-bold text-[16px]">Popular tag</h1>
    <Tag tags={dataTags} />
  </div>
 )
}
export default TagList;