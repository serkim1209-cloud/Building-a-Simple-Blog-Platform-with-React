import ModalWindow from "../modalWindow/ModalWindow";
import Button from "../button/Button";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

function ArticleForm({
  modalText,
  initValue,
  onSubmit,
  navigate,
  error,
  setError,
  isModalOpen,
  setIsModalOpen,
  buttonText1,
  buttonText2,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initValue });
  {
    useEffect(() => {
      if (initValue) {
        reset(initValue);
      }
    }, [reset, initValue]);
  }
  return (
    <div className="flex flex-col items-center justify-center w-full  max-w-[1200px] min-h-[538px] gap-[10px]">
      <ModalWindow
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        text={modalText}
      />
      <form
        id="addForm"
        className="flex flex-col items-center justify-center w-full max-w-[800px]  min-h-auto gap-[10px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        {error && <p className="text-red-500">{error}</p>}

        <input
          {...register("title", {
            validate: (value) =>
              value.trim().length === 0
                ? "Заголовок не может быть пустым"
                : true,
          })}
          type="text"
          placeholder="Напишите заголовок статьи"
          className="border-1 border-[#AAAAAA] w-full max-w[700px]   min-h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
        />
        {errors?.title && (
          <p className="text-red-500">{errors?.title?.message}</p>
        )}
        <input
          {...register("description", {
            validate: (value) =>
              value.trim().length === 0
                ? "Описание не может быть пустым"
                : true,
          })}
          type="text"
          placeholder="Добавьте описание статьи"
          className="border-1 border-[#AAAAAA] w-full max-w[700px] min-h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
        />
        {errors?.description && (
          <p className="text-red-500"> {errors?.description?.message} </p>
        )}
        <textarea
          {...register("body", {
            validate: (value) =>
              value.trim().length === 0
                ? " Вы забыли ввести текст статьи"
                : true,
          })}
          type="text"
          placeholder="Напишите сюда текст статьи"
          className="border-1 border-[#AAAAAA] w-full max-w[700px] min-h-[100px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
        />
        {errors?.body && (
          <p className="text-red-500">{errors?.body?.message}</p>
        )}
        <input
          {...register("tagList", {
            validate: (value) =>
              value.trim().length === 0
                ? "Ключевые слова не могут быть пустыми"
                : true,
          })}
          type="text"
          placeholder="Добавьте сюда ключевые слова для поиска например -> ( java, react, javaScript ) "
          className="border-1 border-[#AAAAAA] w-full max-w[700px] min-h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
        />
        {errors?.tagList && (
          <p className="text-red-500"> {errors?.tagList?.message} </p>
        )}
      </form>
      <div className="flex gap-[10px]">
        <Button
          type="submit"
          form="addForm"
          text={buttonText1}
          onClick={(event) => {
            event.currentTarget.blur();
            setError("");
          }}
          className=" w-[90px] h-[32px] border-1 border-[#61BB61] text-[#61BB61] rounded-[10px] font-regular text-[12.8px]"
        />
        {
          <Button
            onClick={() => navigate("/")}
            text={buttonText2}
            className=" w-[90px] h-[32px] border-1 border-[#BB6161] text-[#BB6161] rounded-[10px] font-regular text-[12.8px]"
          />
        }
      </div>
    </div>
  );
}
export default ArticleForm;
