import Button from "../components/button/Button";
import { useForm } from "react-hook-form";
import useNewArticle from "../api-reguests/post-api-new-article";


function NewArticle() {
  const{onSubmit,navigate,error,}=useNewArticle();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 
  return (
    <div className="flex flex-col items-center justify-center min-h-[538px] gap-[10px]">
      <form
        id="addForm"
        className="flex flex-col items-center justify-center max-w-[500px] min-h-auto gap-[10px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        {error && <p>{error}</p>}

        <input
          {...register("title", {
            validate: (value) =>
              value.trim().length === 0 ? "Title не может быть пустым" : true,
          })}
          type="text"
          placeholder="title"
          className="border-1 border-[#AAAAAA] w-[700px] min-h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        <input
          {...register("description", {
            validate: (value) =>
              value.trim().length === 0
                ? "description не может быть пустым"
                : true,
          })}
          type="text"
          placeholder="description"
          className="border-1 border-[#AAAAAA] w-[700px] min-h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
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
          className="border-1 border-[#AAAAAA] w-[700px] min-h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
        />
        {errors.body && <p className="text-red-500">{errors.body.message}</p>}
        <input
          {...register("tagList", {
            validate: (value) =>
              value.trim().length === 0 ? "tagList не может быть пустым" : true,
          })}
          type="text"
          placeholder="tagList"
          className="border-1 border-[#AAAAAA] w-[700px] min-h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
        />
        {errors.tagList && (
          <p className="text-red-500"> {errors.tagList.message} </p>
        )}
      </form>
      <div className="flex gap-[10px]">
        <Button
          type="submit"
          form="addForm"
          text="Add Article"
          className=" w-[90px] h-[32px] border-1 border-[#61BB61] text-[#61BB61] rounded-[10px] font-regular text-[12.8px]"
        />
        <Button
          onClick={() => navigate("/")}
          text="Canceled"
          className=" w-[90px] h-[32px] border-1 border-[#BB6161] text-[#BB6161] rounded-[10px] font-regular text-[12.8px]"
        />
      </div>
    </div>
  );
}
export default NewArticle;
