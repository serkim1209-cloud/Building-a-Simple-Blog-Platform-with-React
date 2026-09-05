import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import user from "../assets/user.svg";
import like from "../assets/like.svg";
import Loading from "../components/loading/Loading";
import "swiper/css";
import { useParams } from "react-router-dom";
import Header from "../components/header/Header";
import useGetApi from "../custom-hook/useGetApi";
import Pagination from "../components/pagination/pagination";
function Main() {
  const [page, setPage] = useState(1);
  const limit = 3;
  const offset = (page - 1) * limit;

  const {
    load: loading,
    error: articlError,
    data: articl,
  } = useGetApi(
    `https://realworld.habsida.net/api/articles?offset=${offset}&limit=${limit}`,
  );
  const {
    load: tagLoad,
    error: tagError,
    data: tag,
  } = useGetApi("https://realworld.habsida.net/api/tags");
  const articles = articl?.articles || [];
  const tags = tag?.tags || [];
  const totalPages = Math.ceil((articl?.articlesCount || 0) / limit);

  return (
    <main className="flex relative items-center flex-col max-w-[1280px] min-h-[978px] gap-5 py-5">
      <Header />

      {loading && <Loading />}
      <div className="flex flex-col justify-center justify-evenly px-5 rounded-xl border-[#AAAAAA] border-1 w-[800px] h-[88px] ">
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
      {articles.map((article) => (
        <div
          key={article.slug}
          className=" w-[800px] max-h-[278px] py-5 px-5 rounded-xl border-[1px] border-[#AAAAAA]"
        >
          <div className="flex items-center justify-between  h-[36px]">
            <img className="pr-2 w-[34px] h-[34px] " src={user} />
            <div className="mr-auto">
              <h1 className="font-semibold text-[16px] text-[#5CB85C] ">
                {article.author.username}
              </h1>
              <p className="text-[#AAAAAA] text-[12.8px] ">
                {new Date(article.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex w-[77px] h-[40px] items-center justify-center justify-evenly rounded-xl border-1 border-[#5CB85C] ">
              <div>
                <img src={like} />
              </div>
              {article.favoritesCount}
            </div>
          </div>
          <Link to={`articles/${article.slug}`}>
            <h1 className="font-semibold text-[32px] ">{article.title}</h1>
            <p className="font-Regular text-[16px] text-[#AAAAAA] ">
              {article.body}
            </p>
          </Link>
          <div className="flex gap-2">
            {article.tagList.map((tag) => (
              <button
                key={tag}
                className="flex items-center justify-center px-5 border-1  min-w-[50px] h-[20px] font-semibold text-[12.8px] border-[#AAAAAA] rounded-xl text-[#AAAAAA] "
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      ))}
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </main>
  );
}
export default Main;
