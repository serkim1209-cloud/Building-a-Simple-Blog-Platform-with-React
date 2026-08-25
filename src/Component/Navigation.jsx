function Navigation() {
  return (
    <div className="flex items-center justify-center max-w-[1280px] h-[54px]">
      <div className="flex gap-2  w-[800px] h-[34px]">
        <h1 className="text-[24px] text-green-500 mr-auto">Realworld</h1>
        <button>Home</button>
        <button>Sign In</button>
        <button>Sign Up</button>
        <button>New Post</button>
        <button>Settings</button>
        <button>Profile</button>
      </div>
    </div>
  );
}
export default Navigation;
