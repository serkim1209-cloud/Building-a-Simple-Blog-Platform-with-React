import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/button/Button";

function EditArticl() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const { slug } = useParams();
  const token = localStorage.getItem("token");
  const [error, setError] = useState("");
  const [articl, setArticl] = useState({
    title: "",
    description: "",
    body: "",
    tagList: "",
  });
  useEffect(() => {
    const getArticl = async () => {
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

        setArticl({
          title: getdata.article.title,
          description: getdata.article.description,
          body: getdata.article.body,
          tagList: getdata.article.tagList ? getdata.article.tagList.join(", ") : "",
           
        });
      } catch (error) {
        setError(error.message);
      }
    };
    getArticl();
  }, [slug]);

  const hendleChange = (e) => {
    const { name, value } = e.target;
    setArticl({ ...articl, [name]: value });
  };

  const PostingArticle = (e) => {
    e.preventDefault();
    setError("");
    if (
      articl.title.trim().length === 0 ||
      articl.description.trim().length === 0 ||
      articl.body.trim().length === 0 ||
      articl.tagList.trim().length === 0
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
              Authorization: `Token ${token}`,
            },
            body: JSON.stringify({
              article: {
                title: articl.title,
                description: articl.description,
                body: articl.body,
                tagList: articl.tagList.split(",").map((tag) => tag.trim()),
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
          value={articl.title}
          onChange={hendleChange}
          placeholder="title"
          className="border-1 border-[#AAAAAA] w-[700px] min-h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
        />
        <input
          type="text"
          name="description"
          value={articl.description}
          onChange={hendleChange}
          placeholder="description"
          className="border-1 border-[#AAAAAA] w-[700px] min-h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
        />
        <input
          type="text"
          name="body"
          value={articl.body}
          onChange={hendleChange}
          placeholder="body"
          className="border-1 border-[#AAAAAA] w-[700px] min-h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
        />
        <input
          type="text"
          name="tagList"
          value={articl.tagList}
          onChange={hendleChange}
          placeholder="tagList"
          className="border-1 border-[#AAAAAA] w-[700px] min-h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
        />
        <Button type="submit" text="Add Article" />
      </form>
    </div>
  );
}
export default EditArticl;
