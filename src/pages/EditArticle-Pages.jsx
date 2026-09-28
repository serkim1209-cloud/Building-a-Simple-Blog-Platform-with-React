import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/button/Button";

function EditArticle() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const { slug } = useParams();
  const token = localStorage.getItem("token");
  const [error, setError] = useState("");
  const [article, setArticle] = useState({
    title: "",
    description: "",
    body: "",
    tagList: "",
  });
  useEffect(() => {
    const getArticle = async () => {
      try {
        const getresponse = await fetch(
          `https://realworld.habsida.net/api/articles/${slug}`,
        );
        if (!getresponse.ok) {
          throw new Error("Не удалось загрузить статью с сервера");
        }
        const getdata = await getresponse.json();
        if (getdata.article.author.username !== name) {
          setError("Вы не можете редактировать чужую статью");
          navigate("/");
          
        }

        setArticle({
          title: getdata.article.title,
          description: getdata.article.description,
          body: getdata.article.body,
          tagList: getdata.article.tagList ? getdata.article.tagList.join(", ") : "",
           
        });
      } catch (error) {
        setError(error.message);
      }
    };
    getArticle();
  }, [slug]);

  const hendleChange = (e) => {
    const { name, value } = e.target;
    setArticle({ ...articl, [name]: value });
  };

  const PostingArticle = (e) => {
    e.preventDefault();
    setError("");
    if (
      article.title.trim().length === 0 ||
      article.description.trim().length === 0 ||
      article.body.trim().length === 0 ||
      article.tagList.trim().length === 0
    ) {
      alert("Все поля должны быть заполнены");
      return;
    }
    const post = async () => {
      try {
        const response = await fetch(
          `https://realworld.habsida.net/api/articles/${slug}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
              "Authorization": `Token ${token}`,
            },
            body: JSON.stringify({
              article: {
                title: article.title,
                description: article.description,
                body: article.body,
                tagList: article.tagList.split(",").map((tag) => tag.trim()),
              },
            }),
          },
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(JSON.stringify(data.errors));
        }

        alert("Статья успешно добавлена!");
      } catch (error) {
        setError(error.message);
      }
    };
    post();
  };
  return (
    <div className="flex items-center justify-center">
      <form
        className="flex flex-col items-center justify-center max-w-[500px] min-h-[538px] gap-[10px]"
        onSubmit={PostingArticle}
      >
        {error && <h1>{error}</h1>}
        <input
          type="text"
          name="title"
          value={article.title}
          onChange={hendleChange}
          placeholder="title"
          className="border-1 border-[#AAAAAA] w-[700px] min-h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
        />
        <input
          type="text"
          name="description"
          value={article.description}
          onChange={hendleChange}
          placeholder="description"
          className="border-1 border-[#AAAAAA] w-[700px] min-h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
        />
        <input
          type="text"
          name="body"
          value={article.body}
          onChange={hendleChange}
          placeholder="body"
          className="border-1 border-[#AAAAAA] w-[700px] min-h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
        />
        <input
          type="text"
          name="tagList"
          value={article.tagList}
          onChange={hendleChange}
          placeholder="tagList"
          className="border-1 border-[#AAAAAA] w-[700px] min-h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
        />
        <Button type="submit" text="Add Article" />
      </form>
    </div>
  );
}
export default EditArticle;
