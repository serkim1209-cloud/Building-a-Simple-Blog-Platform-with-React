import useLogin from "../../custom-hook/postLogin/postLogin";

function LoginForm() {
  const { user, error, hendlChange, submit } = useLogin(
    "https://realworld.habsida.net/api/users",
  );

  return (
    <div className="flex items-center justify-center">
      <form
        className="flex flex-col items-center justify-center max-w-[500px] min-h-[538px] gap-[10px]"
        onSubmit={submit}
      >
        {error && <h1>{error}</h1>}
        <div>
          <h1 className="font-bold text-[46px] ">Sign Up</h1>
        </div>

        <input
          className="border-1 border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
          type="text"
          name="username"
          value={user.username}
          onChange={hendlChange}
          placeholder="Username"
        />
        <input
          className="border-1 border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
          type="email"
          name="email"
          value={user.email}
          onChange={hendlChange}
          placeholder="Email address"
        />
        <input
          className="border-1 border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
          type="password"
          name="password"
          value={user.password}
          onChange={hendlChange}
          placeholder="Password"
        />
        <input
          className="border-1 border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
          type="password"
          name="repeatpassword"
          value={user.repeatpassword}
          onChange={hendlChange}
          placeholder="Repeat password"
        />
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
