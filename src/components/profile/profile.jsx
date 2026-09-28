import {useForm} from "react-hook-form";
import Button from "../button/button";
import useEditProfile from "../../api-reguests/post-api-edit-profile";

function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { error, post, success } = useEditProfile(
    "https://realworld.habsida.net/api/user",
  );

  return (
    <div className="flex items-center justify-center">
      <form
        className="flex flex-col items-center justify-center max-w-[500px] min-h-[538px] gap-[10px]"
        onSubmit={handleSubmit(post)}
      >
        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {errors && <p style={{ color: "red" }}>{errors.message}</p>}

        <input
          {...register("username", {
            required: "Это поле обязательно для заполнения",
          })}
          className="border-1 border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
          type="text"
          placeholder="Username"
        />

        <input
          {...register("email", {
            required: "Это поле обязательно для заполнения",
          })}
          className="border-1 border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
          type="email"
          placeholder="Email"
        />
        <input
          {...register("password", {
            required: "Это поле обязательно для заполнения",
          })}
          className="border-1 border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
          type="password"
          placeholder="Password"
        />
        <Button type="submit" text="Edit" />
      </form>
    </div>
  );
}
export default Profile;
