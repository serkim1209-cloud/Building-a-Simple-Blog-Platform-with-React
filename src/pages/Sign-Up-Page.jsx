import useSignUp from "../api-reguests/post-api-sign-Up";
import { useForm } from "react-hook-form";
function LoginForm() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { post } = useSignUp();

  return (
    <div className="flex items-center justify-center">
      <form
        className="flex flex-col items-center justify-center max-w-[500px] min-h-[538px] gap-[10px]"
        onSubmit={handleSubmit(post)}
      >
        {errors && <h1 className="text-red-500">{errors.message}</h1>}
        <div>
          <h1 className="font-bold text-[46px] ">Sign Up</h1>
        </div>

        <input
          {...register("username", {
            minLength: { value: 3, message: "Имя слишком короткое" },
            required: "Имя не может быть пустым",
          })}
          className="border-1 border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
          type="text"
          placeholder="Username"
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}
        <input
          {...register("email", {
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Введите корректный адрес электронной почты",
            },
            required: "Email не может быть пустым",
          })}
          className="border-1 border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
          type="email"
          placeholder="Email address"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <input
          {...register("password", {
            minLength: {
              value: 6,
              message: "Не меньше 6 символов",
            },
            maxLength: {
              value: 40,
              message: "Не больше 40 символов",
            },
            required: "Пароль не может быть пустым",
          })}
          className="border-1 border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <input
          {...register("repeatPassword", {
            minlength: {
              value: 6,
              message: "Не меньше 6 символов",
            },
            maxLength: {
              value: 40,
              message: "Не больше 40 символов",
            },
            validate: (value) =>
              value === watch("password") || "Пароли не совпадают",
          })}
          className="border-1 border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
          type="password"
          placeholder="Repeat password"
        />
        {errors.repeatPassword && (
          <p className="text-red-500">{errors.repeatPassword.message}</p>
        )}
        <p>Согласие на сбор личных данных</p>
        <input
          type="checkbox"
          {...register("checkbox", {
            required: "Нужно согласится справилами сбора данных",
          })}
        />
        {errors.checkbox && (
          <p className="text-red-500">{errors.checkbox.message}</p>
        )}
        <div className="flex justify-end w-[480px] h-[48px]">
          <button
            className="flex items-center justify-center w-[120px] h-[43px] bg-[#61BB61] rounded-[8px] text-[#FFFFFF] "
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
export default LoginForm;
