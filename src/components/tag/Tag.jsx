import useGetApi from "../../custom-hook/useGetApi"

function Tag(){

 const { data: tag } = useGetApi("https://realworld.habsida.net/api/tags");
 const tags = tag?.tags || [];

 return(
     <div className="flex flex-col justify-center justify-evenly px-5 rounded-xl border-[#AAAAAA] border w-[800px] h-[88px] ">
        <h1 className="font-bold text-[16px]">Popular tag</h1>
        <div className="flex gap-2">
          {tags.slice(0, 7).map((tag) => (
            <button
              key={tag}
              className="flex items-center px-3 px-1 min-w-[50px] h-[20px] rounded-xl border-1 border-[#AAAAAA] text-[#AAAAAA] font-semibold text-[12.8px]"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
 )
}
export default Tag;