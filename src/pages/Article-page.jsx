import { Link, useParams } from "react-router-dom";
import Loading from "../components/loading/Loading";
import profile from "../assets/profile.svg";
import useGetApi from "../custom-hook/useGetApi";
import Button from "../components/button/Button";
import { useContext, useState } from "react";
import { Context } from "../components/contextRouter/ContextRouter";
import useDeleteArticle from "../api-reguests/delete-api-article-delete";
import Tag from "../components/tag/Tag";

function Article() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { name } = useContext(Context);
  const { slug } = useParams();
  const { deleteArticle } = useDeleteArticle();
  const {
    data: article,
    isLoading,
    error: articleError,
  } = useGetApi(`https://realworld.habsida.net/api/articles/${slug}`);

  const articles = article?.article || null;

  return (
    <>
      {isLoading && <Loading />}

      <div
        key={articles?.slug}
        className="flex flex-col items-center justify-center w-full max-w-[1280px] min-h-[772px] gap-[24px]"
      >
        {isModalOpen && (
          <div className="fixed inset-0 flex w-full items-center justify-center bg-black/70">
            <div className="flex gap-4 p-6 bg-white w-full max-w-[500px] rounded-lg shadow-lg items-center justify-center">
              <h1>Вы уверены что хотите удалить статью</h1>
              <Button
                text="Да"
                onClick={() => deleteArticle()}
                className="w-[67px] h-[32px] border-1 border-[#BB6161] text-[#BB6161] rounded-[10px] font-regular text-[12.8px]"
              />
              <Button
                text="Нет"
                onClick={() => setIsModalOpen(false)}
                className=" w-[80px] h-[32px] border-1 border-[#61BB61] text-[#61BB61] rounded-[10px] font-regular text-[12.8px]"
              />
            </div>
          </div>
        )}

        <div className=" flex justify-center items-center w-full max-w-[1280px] min-h-[282px] bg-[#333333] p-7 ">
          <div>
            {articleError && (
              <h1 className="text-[35px] text-red-500">
                Произошла ошибка загрузки
              </h1>
            )}
            <h1 className="font-semibold text-[46px] text-[#FFFFFF] ">
              {articles?.title}
            </h1>
            <div className="flex items-center justify-between  h-[36px]">
              <img
                className="pr-2 w-[34px] h-[34px] "
                src="/src/assets/user.svg"
              />
              <div className="mr-auto">
                <h1 className="font-semibold text-[16px] text-[#5CB85C] ">
                  {articles?.author?.username}
                </h1>
                <p className="text-[#AAAAAA] text-[12.8px] ">
                  {new Date(articles?.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full max-w-[844px] min-h-[244px] gap-[24px]">
          <p className="font-Regular text-[16px] text-[#333333] ">
            {articles?.body}
          </p>

          <Tag tags={articles} />

          {name !== articles?.author?.username ? null : (
            <div
              className={`flex items-center justify-center w-full  max-w-[768px] max-h-[80px] gap-[10px] p-[10px] ${name ? "" : "hidden"}`}
            >
              <div className="flex items-center justify-center gap-3 w-auto h-[36px]">
                <img className="w-[16px] h-[16px]" src={profile} />
                <div>
                  <h1>{name}</h1>
                  <div className="flex font-regular text-[#AAAAAA] text-[12.8px]">
                    {new Date().toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
              <div className="flex gap-[8px]">
                <Link to={`/articles/${slug}/edit`}>
                  <Button
                    text="Edit"
                    className=" w-[54px] h-[32px] border-1 border-[#61BB61] text-[#61BB61] rounded-[10px] font-regular text-[12.8px]"
                  />
                </Link>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  text="Delete"
                  className="w-[67px] h-[32px] border-1 border-[#BB6161] text-[#BB6161] rounded-[10px] font-regular text-[12.8px]"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Article;
