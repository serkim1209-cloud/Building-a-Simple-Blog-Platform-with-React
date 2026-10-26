import Button from "../components/button/Button";
import useEditProfile from "../api-reguests/post-api-edit-profile";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { Context } from "../components/contextRouter/ContextRouter";
import ModalWindow from "../components/modalWindow/ModalWindow";

function ProfileSettings() {
  const { setToken } = useContext(Context);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { navigate, putProfile, error, isModalOpen, setIsModalOpen } =
    useEditProfile();
  const userInfo = JSON.parse(localStorage.getItem("user"));

  setValue("username", userInfo?.username);
  setValue("email", userInfo?.email);
  setValue("bio", userInfo?.bio);

  return (
    <div className="flex flex-col items-center justify-center min-h-[538px] gap-[10px]">
      <ModalWindow isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} text={"Данные обновлены"} />
      <form
        id="profileForm"
        className="flex flex-col items-center justify-center max-w-[500px] min-h-auto gap-[10px]"
        onSubmit={handleSubmit(putProfile)}
      >
        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          {...register("username", {
            required: "Это поле обязательно для заполнения",
          })}
          className="border border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
          type="text"
          placeholder="Username"
        />
        {errors.username && (
          <p style={{ color: "red" }}>{errors.username?.message}</p>
        )}

        <input
          {...register("email", {
            required: "Это поле обязательно для заполнения",
          })}
          className="border border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
          type="email"
          placeholder="Email"
        />
        {errors.email && (
          <p style={{ color: "red" }}>{errors.email?.message}</p>
        )}
        <textarea
          {...register("bio", {
            required: "Это поле обязательно для заполнения",
          })}
          className="border border-[#AAAAAA] w-[480px] h-[100px] rounded-[8px] cursor-pointer pl-5 pt-3 placeholder:text-[16px] resize-none"
          placeholder="Bio"
        />
        {errors.bio && <p style={{ color: "red" }}>{errors.bio?.message}</p>}
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="border border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]"
        />
      </form>
      <div className="flex items-center justify-center gap-[10px]">
        <Button
          form="profileForm"
          type="submit"
          text="Update Settings"
          onClick={(event)=>event.currentTarget.blur()}
          className=" w-[144px] h-[32px] border-1 border-[#61BB61] text-[#61BB61] rounded-[10px] font-regular text-[12.8px]"
        />
        <Button
          onClick={() => navigate(-1)}
          text="Cancel"
          className=" w-[90px] h-[32px] border-1 border-[#BB6161] text-[#BB6161] rounded-[10px] font-regular text-[12.8px]"
        />
      </div>
      <button
        className="text-[#BB6161]"
        onClick={() => {
          setToken("");
          localStorage.clear();
        }}
      >
        Or click here to logout
      </button>
    </div>
  );
}
export default ProfileSettings;
