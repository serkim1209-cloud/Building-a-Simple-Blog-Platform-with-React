import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../components/contextRouter/ContextRouter";

function useEditArticle(setValue) {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { name, token } = useContext(Context);
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
          return;
        }
        setValue("title", getdata.article.title);
        setValue("description", getdata.article.description);
        setValue("body", getdata.article.body);
        setValue(
          "tagList",
          getdata.article.tagList ? getdata.article.tagList.join(", ") : "",
        );
      } catch (error) {
        setError(error.message);
      }
    };
    getArticle();
  }, [slug]);

  const onSubmit = async (formData) => {
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
              title: formData.title,
              description: formData.description,
              body: formData.body,
              tagList: formData.tagList.split(",").map((tag) => tag.trim()),
            },
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(JSON.stringify(data.errors));
      }
      setIsModalOpen(true);
    } catch (error) {
      setError(error.message);
    }
  };
  return { error, navigate, onSubmit, isModalOpen, setIsModalOpen };
}
export default useEditArticle;
