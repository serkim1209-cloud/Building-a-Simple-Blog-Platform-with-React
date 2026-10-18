import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import useDeleteArticle from "../../api-reguests/delete-api-article-delete";

function DeleteArticle() {
  const { deleteArticle } = useDeleteArticle();
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="flex gap-4 p-6 bg-white rounded-lg shadow-lg">
        <Button text="delete" onClick={deleteArticle} />
        <Button text="back" onClick={() => navigate(-1)} />
      </div>
    </div>
  );
}
export default DeleteArticle;
