import useGetApi from "../../custom-hook/useGetApi";
import Tag from "../tag/Tag";

function TagList() {
  const { data: tag } = useGetApi("https://realworld.habsida.net/api/tags");
  const dataTags = tag?.tags?.slice(0, 5) || [];

  return (
    <div className="flex justify-center w-full max-w-[1280px] overflow-hidden  p-[10px]">
      <div className="flex flex-col p-[10px] overflow-hidden justify-center px-5 rounded-xl border-[#AAAAAA] border w-full max-w-[800px]   h-[88px] ">
        <h1 className="font-bold text-[16px]">Popular tag</h1>
        <Tag tags={dataTags} />
      </div>
    </div>
  );
}
export default TagList;
