import useEditArticle from "../api-reguests/post-api-edit-article";
import ArticleForm from "../components/articleForm/ArticleForm";

function EditArticle() {
  const {
    error,
    navigate,
    onSubmit,
    isModalOpen,
    setIsModalOpen,
    initValue,
    setError,
  } = useEditArticle();

  return (
    <ArticleForm
      setError={setError}
      modalText={"Статья успешно изменена"}
      initValue={initValue}
      onSubmit={onSubmit}
      navigate={navigate}
      error={error}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      buttonText1={"Edit Article"}
      buttonText2={"Cancel"}
    />
  );
}
export default EditArticle;
