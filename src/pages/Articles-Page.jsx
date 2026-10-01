import { Link, useParams, useNavigate } from "react-router-dom";
import Loading from "../components/loading/Loading";
import Profile from "../assets/Profile.svg";
import useGetApi from "../custom-hook/useGetApi";
import Button from "../components/button/Button";
import { useContext, useState } from "react";
import { Context } from "../components/publicContext/Public-Context";

function Article() {
  const [isModaOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { token } = useContext(Context);
  const profile = localStorage.getItem("name");
  const { slug } = useParams();
  const DeleteArticle = async () => {
    const Delete = await fetch(
      `https://realworld.habsida.net/api/articles/${slug}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
    if (Delete.ok) {
      alert("Статья успешно удалена");
      navigate("/");
    }
  };
  const {
    data: article,
    load,
    error: isArticleError,
  } = useGetApi(`https://realworld.habsida.net/api/articles/${slug}`);
  const Article = article?.article || [];
  return (
    <>
      {load && <Loading />}

      <div
        key={Article.slug}
        className="flex flex-col items-center justify-center max-w-[1280px] min-h-[772px] gap-[24px]"
      >
        {isModaOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70">
            <div className="flex gap-4 p-6 bg-white rounded-lg shadow-lg items-center justify-center">
              <h1>Вы уверены что хотите удалить статью</h1>
              <Button
                text="Да"
                onClick={DeleteArticle}
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

        <div className=" flex justify-center items-center w-full min-h-[282px] bg-[#333333]">
          <div>
            {isArticleError && (
              <h1 className="text-[35px] text-red-500">
                Произошла ошибка загрузки
              </h1>
            )}
            <h1 className="font-semibold text-[46px] text-[#FFFFFF] ">
              {Article.title}
            </h1>
            <div className="flex items-center justify-between  h-[36px]">
              <img
                className="pr-2 w-[34px] h-[34px] "
                src="/src/assets/user.svg"
              />

              <div className="mr-auto">
                <h1 className="font-semibold text-[16px] text-[#5CB85C] ">
                  {Article.author?.username}
                </h1>
                <p className="text-[#AAAAAA] text-[12.8px] ">
                  {new Date(Article.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col max-w-[844px] min-h-[244px] gap-[24px]">
          <p className="font-Regular text-[16px] text-[#333333] ">
            {Article.body}
          </p>
          <div className="flex gap-2">
            {Article.tagList?.map((tag) => (
              <Button
                key={tag}
                text={tag}
                className="px-5 border-1  min-w-[50px] h-[20px] font-semibold text-[12.8px] border-[#AAAAAA] rounded-xl text-[#AAAAAA]"
              />
            ))}
          </div>
          {profile !== Article?.author?.username ? null : (
            <div
              className={`flex items-center justify-center w-[768px] max-h-[80px] gap-[10px] p-[10px] ${profile ? "" : "hidden"}`}
            >
              <div className="flex items-center justify-center gap-3 w-auto h-[36px]">
                <img className="w-[16px] h-[16px]" src={Profile} />
                <div>
                  <h1>{profile}</h1>
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
                <Link to={`/article/${slug}/edit`}>
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
