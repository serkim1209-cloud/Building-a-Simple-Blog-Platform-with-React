import useLogin from "../api-reguests/post-api-login";
import { useForm } from "react-hook-form";
function SigIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { error, post } = useLogin();

  return (
    <div className="flex items-center justify-center">
      <form
        className="flex flex-col items-center justify-center max-w-[500px] min-h-[538px] gap-[10px]"
        onSubmit={handleSubmit(post)}
      >
        <div>
          <h1 className="font-bold text-[46px]">Sign In</h1>
        </div>

        {error && <h1 className="text-red-500 font-bold">{error}</h1>}
        {errors.email && <p>{errors.email.message}</p>}
        {errors.password && <p>{errors.password.message}</p>}

        <input
          {...register("email", {
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Введите корректный email",
            },
          })}
          className="border border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]"
          type="text"
          placeholder="Email"
        />

        <input
          {...register("password", {
            validate: (value) =>
              (value.length >= 8 && value.length <= 40) ||
              "Пароль не может быть меньше 8 и не больше 40 символов",
          })}
          className="border border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]"
          type="password"
          placeholder="Password"
        />

        <div className="flex justify-end w-[480px] h-[48px]">
          <button
            className="flex items-center justify-center w-[120px] h-[43px] bg-[#61BB61] rounded-[8px] text-[#FFFFFF]"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

export default SigIn;
