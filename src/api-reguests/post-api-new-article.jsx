import { useContext } from "react";
import { Context } from "../components/contextRouter/ContextRouter";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useNewArticle (){
const navigate = useNavigate();
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
              tagList: formData.tagList.split(",").map((tag) => tag.trim()),
            },
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message);
      }
      alert("Статья успешно добавлена!");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  }
  return{onSubmit,navigate,error,}
}
export default useNewArticle;