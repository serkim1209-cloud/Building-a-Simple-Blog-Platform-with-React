import { useState, useEffect } from "react";
import Loading from "../components/loading/Loading";
import "swiper/css";
import ArticleList from "../components/articleList/ArticleList";
import Header from "../components/header/Header";
import useGetApi from "../custom-hook/useGetApi";
import Pagination from "../components/pagination/Pagination";
import Taglist from "../components/tagList/TagList";
function Main() {
  const [page, setPage] = useState(1);
  const limit = 3;
  const offset = (page - 1) * limit;

  const {
    load: loading,
    error: articleError,
    data: article,
  } = useGetApi(
    `https://realworld.habsida.net/api/articles?offset=${offset}&limit=${limit}`,
  );
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    if (article?.articles) {
      setArticles(article.articles);
    }
  }, [article]);
  const totalPages = Math.ceil((article?.articlesCount || 0) / limit);

  return (
    <main>
      <Header />
      {loading && <Loading />}
      <Taglist/>

      {articleError && (
        <h1 className="text-[35px] text-red-500">Произошла ошибка загрузки</h1>
      )}

      <ArticleList
        articles={articles}
        slug={articles.slug}
        setArticles={setArticles}
      />

      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </main>
  );
}
export default Main;
