import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { use } from "react";
import Loading from "./Loadinf";

function Article() {
  const [articl, setArticl] = useState({});
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();
  const getArticl = async () => {
    setLoading(true);
    try {
      const data = await fetch(
        `https://realworld.habsida.net/api/articles/${slug}`,
      );
      if (!data.ok) throw new Error("Произошла ошибка запроса");
      const response = await data.json();
      setArticl(response.article);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getArticl();
  }, [slug]);
  return (
    <div className="flex relative items-center flex-col max-w-[1280px] min-h-[978px] gap-5 py-5">
      {loading && <Loading />}
      {
        <div
          key={articl.slug}
          className=" w-[800px] max-h-[278px] py-5 px-5 rounded-xl border-[1px] border-[#AAAAAA]"
        >
          <div className="flex items-center justify-between  h-[36px]">
            <img
              className="pr-2 w-[34px] h-[34px] "
              src="/src/assets/user.svg"
            />
            <div className="mr-auto">
              <h1 className="font-semibold text-[16px] text-[#5CB85C] ">
                {articl.author?.username}
              </h1>
              <p className="text-[#AAAAAA] text-[12.8px] ">
                {new Date(articl.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex w-[77px] h-[40px] items-center justify-center justify-evenly rounded-xl border-1 border-[#5CB85C] ">
              <div>
                <img src="/src/assets/like.svg" />
              </div>
              {articl.favoritesCount}
            </div>
          </div>

          <h1 className="font-semibold text-[32px] ">{articl.title}</h1>
          <p className="font-Regular text-[16px] text-[#AAAAAA] ">
            {articl.body}
          </p>

          <div className="flex gap-2">
            {articl.tagList?.map((tag) => (
              <button
                key={tag}
                className="flex items-center justify-center px-5 border-1  min-w-[50px] h-[20px] font-semibold text-[12.8px] border-[#AAAAAA] rounded-xl text-[#AAAAAA] "
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      }
    </div>
  );
}
export default Article;
