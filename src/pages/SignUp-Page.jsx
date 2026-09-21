import useSignUp from "../components/api-reguests/post-api-signUp";

function LoginForm() {
  const { register, errors, handleSubmit, post, watch } = useSignUp(
    "https://realworld.habsida.net/api/users",
  );

  const onSubmit = (data) => {
    const { repeatPassword, ...restUsers } = data;

    post(restUsers);
  };

  return (
    <div className="flex items-center justify-center">
      <form
        className="flex flex-col items-center justify-center max-w-[500px] min-h-[538px] gap-[10px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        {errors && <h1>{errors.message}</h1>}
        <div>
          <h1 className="font-bold text-[46px] ">Sign Up</h1>
        </div>

        <input
          {...register("username", {
            minLength: { value: 3, message: "Имя слишком короткое" },
          })}
          className="border-1 border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
          type="text"
          placeholder="Username"
        />
        {errors.username && <p>{errors.username.message}</p>}
        <input
          {...register("email")}
          className="border-1 border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
          type="email"
          placeholder="Email address"
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          {...register("password")}
          className="border-1 border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
          type="password"
          placeholder="Password"
        />
        <input
          {...register("repeatPassword", {
            validate: (value) =>
              value === watch("password") || "Пароли не совпадают",
          })}
          className="border-1 border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
          type="password"
          placeholder="Repeat password"
        />
        {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}
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
