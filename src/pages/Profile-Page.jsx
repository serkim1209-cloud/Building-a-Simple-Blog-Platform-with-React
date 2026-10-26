import ProfileHeader from "../components/profileHeader/profileHeader";
import Article from "../components/articleList/ArticleList";
import TagList from "../components/tagList/TagList";
import Pagination from "../components/pagination/Pagination";
import useGetApi from "../custom-hook/useGetApi";
import { useState } from "react";

function Profile() {
  const authorName = localStorage.getItem("name");
  const [page, setPage] = useState(1);
  const limit = 3;
  const offset = (page - 1) * limit;

  const { data: article } = useGetApi(
    `https://realworld.habsida.net/api/articles?offset=${offset}&limit=${limit}&author=${authorName}`,
  );

  const articles = article?.articles || [];

  const totalPages = Math.ceil((article?.articlesCount || 0) / limit);

  return (
    <div className="flex flex-col justify-center items-center gap-2 my-4">
      <ProfileHeader />
      <TagList />
      <Article articles={articles} />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
}
export default Profile;
