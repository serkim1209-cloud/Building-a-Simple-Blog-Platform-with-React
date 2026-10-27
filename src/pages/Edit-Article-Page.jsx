import useEditArticle from "../api-reguests/post-api-edit-article";
import ArticleForm from "../components/articleForm/ArticleForm";
import { useForm } from "react-hook-form";

function EditArticle() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { error, navigate, onSubmit, isModalOpen, setIsModalOpen, dataForm } =
    useEditArticle(setValue);

  return (
    <ArticleForm
      dataForm={dataForm}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
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
