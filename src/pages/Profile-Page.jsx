import Button from "../components/button/button";
import useEditProfile from "../api-reguests/post-api-edit-profile";

function Profile() {
  const { register, handleSubmit, navigate, user, errors, error, putProfile } =
    useEditProfile();

  return (
    <div className="flex flex-col items-center justify-center min-h-[538px] gap-[10px]">
      <form
        id="profileForm"
        className="flex flex-col items-center justify-center max-w-[500px] min-h-auto gap-[10px]"
        onSubmit={handleSubmit(putProfile)}
      >
        {error && <p style={{ color: "red" }}>{error}</p>}
        {errors.username && (
          <p style={{ color: "red" }}>{errors.username.message}</p>
        )}
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        {errors.bio && <p style={{ color: "red" }}>{errors.bio.message}</p>}
        <input
          {...register("username", {
            required: "Это поле обязательно для заполнения",
          })}
          className="border border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
          type="text"
          placeholder="Username"
        />

        <input
          {...register("email", {
            required: "Это поле обязательно для заполнения",
          })}
          className="border border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
          type="email"
          placeholder="Email"
        />
        <input
          {...register("bio", {
            required: "Это поле обязательно для заполнения",
          })}
          className="border border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
          type="text"
          placeholder="Bio"
        />
      </form>
      <div className="flex items-center justify-center gap-[10px]">
        <Button
          form="profileForm"
          type="submit"
          text="Edit"
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
export default Profile;
