import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Loading from "./Loadinf";
import "swiper/css";
function Main() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [buttonNumbers, setButtonNumbers] = useState();
  const [loading, setLoading] = useState(false);
  const limit = 3;
  const offset = (page - 1) * limit;

  const getArticles = async () => {
    setLoading(false);
    try {
      const data = await fetch(
        `https://realworld.habsida.net/api/articles?offset=${offset}&limit=${limit}`,
      );
      if (!data.ok) throw new Error("Произошла ошибка запроса");
      const responce = await data.json();

      setArticles(responce.articles);
      setButtonNumbers(responce.articlesCount);

      await new Promise((resolve) => setTimeout(resolve, 200));
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getArticles();
  }, [page]);
  return (
    <main className="flex items-center flex-col max-w-[1280px] min-h-[978px] gap-[5px]">
      {!loading && <Loading />}
      {articles.map((article) => (
        
        <div key={article.slug} className=" border max-w-[800px] min-h-[278px]">
            
          <p>{article.author.username}</p>
          <h1>{article.title}</h1>
          <p>{article.body}</p>
        </div>
      ))}
      <Swiper slidesPerView={"auto"} spaceBetween={8} className="w-[500px]">
        {Array.from({ length: Math.ceil(buttonNumbers / 3) }, (_, index) => (
          <SwiperSlide
            key={index}
            className=" !w-[24px] !h-[24px] flex items-center justify-center rounded border border-green-500 text-green-500"
          >
            <button
              className="flex items-center justify-center w-full h-full"
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}
export default Main;
