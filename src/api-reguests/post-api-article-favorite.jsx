import { useState } from "react";

function usefavorite() {
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);
  const token = localStorage.getItem("token");
  const toogleFavorite = async (slug, isFavorited, setArticles) => {
    try {
      if (!token) {
        setError("Нужно войти в акаунт");
        return;
      }
      const method = isFavorited ? "DELETE" : "POST";

      const response = await fetch(
        `https://realworld.habsida.net/api/articles/${slug}/favorite`,
        {
          method: method,
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      const result = await response.json();
      console.log(isFavorited);
      console.log(method);
      if (response.ok) {
        console.log(result);
        setArticles((articles) =>
          articles.map((article) =>
            article.slug === slug ? { ...article, ...result.article } : article,
          ),
        );
        setModal(true);
      } else if (!response.ok) {
        setError("");
        setError("Произошла ошибка запроса");
      }
    } catch (error) {
      setError("");
      setError(error.message);
    }
  };
  return { setModal, modal, toogleFavorite, error };
}
export default usefavorite;
