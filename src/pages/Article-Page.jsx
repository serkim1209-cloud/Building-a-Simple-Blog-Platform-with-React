import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/loading/Loading";
import Profile from "../assets/Profile.svg";
import useGetApi from "../custom-hook/useGetApi";

function Article() {
  const { slug } = useParams();
  const {
    data: article,
    loading,
    error,
  } = useGetApi(`https://realworld.habsida.net/api/articles/${slug}`);
  const articl = article?.article || [];

  return (
    <>
      {loading && <Loading />}
      <div
        key={articl.slug}
        className="flex flex-col items-center justify-center max-w-[1280px] min-h-[772px] gap-[24px]"
      >
        <div className=" flex justify-center items-center w-full min-h-[282px] bg-[#333333]">
          <div>
            <h1 className="font-semibold text-[46px] text-[#FFFFFF] ">
              {articl.title}
            </h1>
            <div className="flex items-center justify-between  h-[36px]">
              <img
                className="pr-2 w-[34px] h-[34px] "
                src="/src/assets/user.svg"
              />
              <div className="mr-auto">
                <h1 className="font-semibold text-[16px] text-[#5CB85C] ">
                  {articl.author?.username}
                </h1>
                <p className="text-[#AAAAAA] text-[12.8px] ">
                  {new Date(articl.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col max-w-[844px] min-h-[244px] gap-[24px]">
          <p className="font-Regular text-[16px] text-[#333333] ">
            {articl.body}
          </p>
          <div className="flex gap-2">
            {articl.tagList?.map((tag) => (
              <button
                key={tag}
                className="flex items-center justify-center px-5 border-1  min-w-[50px] h-[20px] font-semibold text-[12.8px] border-[#AAAAAA] rounded-xl text-[#AAAAAA] "
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-center w-[768px] max-h-[80px] gap-[10px] p-[10px]">
            <div className="flex items-center justify-center gap-3 w-auto h-[36px]">
              <img className="w-[16px] h-[16px]" src={Profile} />
              <div>
                <h1>Profile</h1>
                <div className="flex font-regular text-[#AAAAAA] text-[12.8px]">
                  {new Date().toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
            <div className="flex gap-[8px]">
              <button className="flex items-center justify-center w-[54px] h-[32px] border-1 border-[#61BB61] text-[#61BB61] rounded-[10px] font-regular text-[12.8px]">
                Edit
              </button>
              <button className="flex items-center justify-center w-[67px] h-[32px] border-1 border-[#BB6161] text-[#BB6161] rounded-[10px] font-regular text-[12.8px]">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Article;
