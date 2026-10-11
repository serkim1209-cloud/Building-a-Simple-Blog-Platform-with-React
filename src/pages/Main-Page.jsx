import { useState } from "react";
import Loading from "../components/loading/Loading";
import "swiper/css";
import Article from "../components/articleList/ArticleList";
import Header from "../components/header/Header";
import useGetApi from "../custom-hook/useGetApi";
import Pagination from "../components/pagination/Pagination";
import Tag from "../components/tag/Tag";
function Main() {
  const [page, setPage] = useState(1);
  const limit = 3;
  const offset = (page - 1) * limit;

  const {
    load: loading,
    error: ArticleError,
    data: article,
  } = useGetApi(
    `https://realworld.habsida.net/api/articles?offset=${offset}&limit=${limit}`,
  );

  const articles = article?.articles || [];

  const totalPages = Math.ceil((article?.articlesCount || 0) / limit);

  return (
    <main className="flex relative items-center flex-col max-w-[1280px] min-h-[978px] gap-5 py-5">
      <Header />

      {loading && <Loading />}
      <Tag />

      {ArticleError && (
        <h1 className="text-[35px] text-red-500">Произошла ошибка загрузки</h1>
      )}
      <Article Articles={articles} />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </main>
  );
}
export default Main;
