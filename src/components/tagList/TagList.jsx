import Button from "../button/Button";

function TagList({ article }) {
  return (
    <div className="flex gap-2">
      {article?.tagList?.map((tag) => (
        <Button
          key={tag}
          text={tag}
          className="px-5 border-1  min-w-[50px] h-[20px] font-semibold text-[12.8px] border-[#AAAAAA] rounded-xl text-[#AAAAAA]"
        />
      ))}
    </div>
  );
}
export default TagList;
