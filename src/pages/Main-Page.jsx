import { useState } from "react";
import Loading from "../components/loading/Loading";
import "swiper/css";
import Article from "../components/article/Article";
import Header from "../components/header/Header";
import useGetApi from "../custom-hook/useGetApi";
import Pagination from "../components/pagination/pagination";
function Main() {
  const [page, setPage] = useState(1);
  const limit = 3;
  const offset = (page - 1) * limit;

  const {
    load: loading,
    error: isArticlError,
    data: articl,
  } = useGetApi(
    `https://realworld.habsida.net/api/articles?offset=${offset}&limit=${limit}`,
  );
  const {
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
      {isArticlError&& <h1 className="text-[35px] text-red-500">Произошла ошибка загрузки</h1>}
      <Article isArticles={articles} />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </main>
  );
}
export default Main;
