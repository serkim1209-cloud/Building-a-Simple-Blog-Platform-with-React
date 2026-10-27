import { useContext } from "react";
import { Context } from "../components/contextRouter/ContextRouter";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useNewArticle() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const { token } = useContext(Context);
  const onSubmit = async (formData) => {
    try {
      const response = await fetch(
        "https://realworld.habsida.net/api/articles",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            article: {
              title: formData.title,
              description: formData.description,
              body: formData.body,
              tagList: formData.tagList.split(/[,\s\.]+/),
            },
          }),
        },
      );
      const data = await response.json();
      if (data?.errors?.body[0].includes("articles.slug")) {
        setError("Такой Title уже занят");
        return;
      }

      if (!response.ok) {
        throw new Error(data.error.message);
      }
      setError("");
      setIsModalOpen(true);
      console.log(data);
    } catch (error) {
      setError("");
      setError(error.message);
    }
  };
  return { onSubmit, navigate, error, isModalOpen, setIsModalOpen };
}
export default useNewArticle;
