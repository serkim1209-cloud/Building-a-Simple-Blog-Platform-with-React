import Button from "../components/button/Button";
import { useForm } from "react-hook-form";
import useEditArticle from "../api-reguests/post-api-edit-article";
import ModalWindow from "../components/modalWindow/ModalWindow";

function EditArticle() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { error,navigate, onSubmit, isModalOpen, setIsModalOpen } = useEditArticle(setValue);

  return (
    <div className="flex flex-col  items-center justify-center w-auto min-h-[538px] gap-[10px]">
      <ModalWindow isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} text={"Статья успешно обновлена"} />
      <form
        id="myForm"
        className="flex flex-col items-center justify-center max-w-[700px] h-auto gap-[10px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        {error && <p className="text-red-500">{error}</p>}

        <input
          {...register("title", {
            validate: (value) =>
              value.trim().length === 0 ? "Body не может быть пустым" : true,
          })}
          type="text"
          placeholder="title"
          className="border-1 border-[#AAAAAA] w-[700px] min-h-[48px] rounded-[8px] cursor-text pl-5 placeholder:text-[16px]  "
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        <input
          {...register("description", {
            validate: (value) =>
              value.trim().length === 0 ? "Body не может быть пустым" : true,
          })}
          type="text"
          placeholder="description"
          className="border-1 border-[#AAAAAA] w-[700px] min-h-[48px] rounded-[8px] cursor-text pl-5 placeholder:text-[16px]  "
        />
        {errors.description && (
          <p className="text-red-500"> {errors.description.message} </p>
        )}
        <input
          {...register("body", {
            validate: (value) =>
              value.trim().length === 0 ? "Body не может быть пустым" : true,
          })}
          type="text"
          placeholder="body"
          className="border-1 border-[#AAAAAA] w-[700px] min-h-[48px] rounded-[8px] cursor-text pl-5 placeholder:text-[16px]  "
        />
        {errors.body && <p className="text-red-500">{errors.body.message}</p>}
        <input
          {...register("tagList", {
            validate: (value) =>
              value.trim().length === 0 ? "Body не может быть пустым" : true,
          })}
          type="text"
          placeholder="tagList"
          className="border-1 border-[#AAAAAA] w-[700px] min-h-[48px] rounded-[8px] cursor-text pl-5 placeholder:text-[16px]  "
        />
        {errors.tagList && (
          <p className="text-red-500"> {errors.tagList.message} </p>
        )}
      </form>
      <div className="flex gap-[10px]">
        <Button
          type="submit"
          form="myForm"
          text="Edit Article"
          onClick={(event)=>event.currentTarget.blur()}
          className=" w-[90px] h-[32px] border-1 border-[#61BB61] text-[#61BB61] rounded-[10px] font-regular text-[12.8px]"
        />
        <Button
          onClick={() => navigate(-1)}
          text="Cancel"
          className=" w-[90px] h-[32px] border-1 border-[#BB6161] text-[#BB6161] rounded-[10px] font-regular text-[12.8px]"
        />
      </div>
    </div>
  );
}
export default EditArticle;
