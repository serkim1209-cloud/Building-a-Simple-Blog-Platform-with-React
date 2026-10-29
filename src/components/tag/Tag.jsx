import Button from "../button/Button";

function Tag({tags}) {
  const list = tags?.tagList || (Array.isArray(tags) ? tags : []);

  if (list.length === 0) return null;
  return (
    <div className=" w-full max-w-[1280px]">
        <div className="flex gap-2 w-full max-w-[800px]">
      {list.map((tag) => (
        <Button
          key={tag}
          text={tag}
          className="px-5 border-1 font-semibold text-[12.8px] border-[#AAAAAA] rounded-xl text-[#AAAAAA]"
        />
      ))}
    </div>
    </div>
  
  );
}
export default Tag;
