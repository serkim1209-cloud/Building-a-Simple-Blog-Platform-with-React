import { useState } from "react";
import Button from "../components/button/Button";
import { useContext } from "react";
import { Context } from "../components/publicContext/Public-Context";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function NewArticle() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { token } = useContext(Context);
  const [error, setError] = useState("");

  const onSubmit = async (formData) => {
    console.log(token);
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
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[538px] gap-[10px]">
      <form
        id="addForm"
        className="flex flex-col items-center justify-center max-w-[500px] min-h-auto gap-[10px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        {error && <p>{error}</p>}
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        {errors.description && (
          <p className="text-red-500"> {errors.description.message} </p>
        )}
        {errors.body && <p className="text-red-500">{errors.body.message}</p>}
        {errors.tagList && (
          <p className="text-red-500"> {errors.tagList.message} </p>
        )}
        <input
          {...register("title", {
            validate: (value) =>
              value.trim().length === 0 ? "Body не может быть пустым" : true,
          })}
          type="text"
          placeholder="title"
          className="border-1 border-[#AAAAAA] w-[700px] min-h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
        />
        <input
          {...register("description", {
            validate: (value) =>
              value.trim().length === 0 ? "Body не может быть пустым" : true,
          })}
          type="text"
          placeholder="description"
          className="border-1 border-[#AAAAAA] w-[700px] min-h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
        />
        <input
          {...register("body", {
            validate: (value) =>
              value.trim().length === 0 ? "Body не может быть пустым" : true,
          })}
          type="text"
          placeholder="body"
          className="border-1 border-[#AAAAAA] w-[700px] min-h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
        />
        <input
          {...register("tagList", {
            validate: (value) =>
              value.trim().length === 0 ? "Body не может быть пустым" : true,
          })}
          type="text"
          placeholder="tagList"
          className="border-1 border-[#AAAAAA] w-[700px] min-h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
        />
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
