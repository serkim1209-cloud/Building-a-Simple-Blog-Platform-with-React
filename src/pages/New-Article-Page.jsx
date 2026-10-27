import useNewArticle from "../api-reguests/post-api-new-article";
import ArticleForm from "../components/articleForm/ArticleForm";

function NewArticle() {
  const { onSubmit, navigate, error, isModalOpen, setIsModalOpen } =
    useNewArticle();
  return (
    <ArticleForm
      modalText={"Статья успешно добавлена"}
      onSubmit={onSubmit}
      navigate={navigate}
      error={error}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      buttonText1={"Add Article"}
      buttonText2={"cancel"}
    />
  );
}
export default NewArticle;
