import useNewArticle from "../api-reguests/post-api-new-article";
import ArticleForm from "../components/articleForm/ArticleForm";
import { useForm } from "react-hook-form";

function NewArticle() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { onSubmit, navigate, error, isModalOpen, setIsModalOpen } =
    useNewArticle();
  return (
    <ArticleForm
      errors={errors}
      register={register}
      handleSubmit={handleSubmit}
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
