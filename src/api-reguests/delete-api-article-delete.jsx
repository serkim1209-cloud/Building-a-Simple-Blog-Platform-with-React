import { useNavigate,useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../components/contextRouter/ContextRouter";

  function useDeleteArticle() {
    const { slug } = useParams();
    const{token}=useContext(Context);
    const navigate = useNavigate();
    const deleteArticle = async ()=>{ 
    const response  = await fetch(
      `https://realworld.habsida.net/api/articles/${slug}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
    if (response.ok) {
      alert("Статья успешно удалена");
      navigate("/");
    }
    }
    return{deleteArticle}

  };
  export default useDeleteArticle;