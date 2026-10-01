import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/button/Button";
import { useForm } from "react-hook-form";

function EditArticle() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const { slug } = useParams();
  const token = localStorage.getItem("token");
  const [error, setError] = useState("");

  useEffect(() => {
    const getArticle = async () => {
      try {
        const getresponse = await fetch(
          `https://realworld.habsida.net/api/articles/${slug}`,
        );
        if (!getresponse.ok) {
          throw new Error("Не удалось загрузить статью с сервера");
        }
        const getdata = await getresponse.json();
        if (getdata.article.author.username !== name) {
          setError("Вы не можете редактировать чужую статью");
          navigate("/");
          return;
        }
        setValue("title", getdata.article.title);
        setValue("description", getdata.article.description);
        setValue("body", getdata.article.body);
        setValue(
          "tagList",
          getdata.article.tagList ? getdata.article.tagList.join(", ") : "",
        );
      } catch (error) {
        setError(error.message);
      }
    };
    getArticle();
  }, [slug]);

  const onSubmit = async (formData) => {
    try {
      const response = await fetch(
        `https://realworld.habsida.net/api/articles/${slug}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
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
        throw new Error(JSON.stringify(data.errors));
      }

      alert("Статья успешно изменена!");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col  items-center justify-center w-auto min-h-[538px] gap-[10px]">
      <form
        id="myForm"
        className="flex flex-col items-center justify-center max-w-[700px] h-auto gap-[10px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        {error && <p className="text-red-500">{error}</p>}
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
          className="border-1 border-[#AAAAAA] w-[700px] min-h-[48px] rounded-[8px] cursor-text pl-5 placeholder:text-[16px]  "
        />
        <input
          {...register("description", {
            validate: (value) =>
              value.trim().length === 0 ? "Body не может быть пустым" : true,
          })}
          type="text"
          placeholder="description"
          className="border-1 border-[#AAAAAA] w-[700px] min-h-[48px] rounded-[8px] cursor-text pl-5 placeholder:text-[16px]  "
        />
        <input
          {...register("body", {
            validate: (value) =>
              value.trim().length === 0 ? "Body не может быть пустым" : true,
          })}
          type="text"
          placeholder="body"
          className="border-1 border-[#AAAAAA] w-[700px] min-h-[48px] rounded-[8px] cursor-text pl-5 placeholder:text-[16px]  "
        />
        <input
          {...register("tagList", {
            validate: (value) =>
              value.trim().length === 0 ? "Body не может быть пустым" : true,
          })}
          type="text"
          placeholder="tagList"
          className="border-1 border-[#AAAAAA] w-[700px] min-h-[48px] rounded-[8px] cursor-text pl-5 placeholder:text-[16px]  "
        />
      </form>
      <div className="flex gap-[10px]">
        <Button
          type="submit"
          form="myForm"
          text="Edit Article"
          className=" w-[90px] h-[32px] border-1 border-[#61BB61] text-[#61BB61] rounded-[10px] font-regular text-[12.8px]"
        />
        <Button
          onClick={() => navigate(-1)}
          text="Canceled"
          className=" w-[90px] h-[32px] border-1 border-[#BB6161] text-[#BB6161] rounded-[10px] font-regular text-[12.8px]"
        />
      </div>
    </div>
  );
}
export default EditArticle;
