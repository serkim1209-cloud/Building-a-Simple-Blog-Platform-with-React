import { Link} from "react-router-dom";
import user from "../../assets/user.svg";
import like from "../../assets/like.svg";
import Tag from "../tag/Tag";
import usefavorite from "../../api-reguests/post-api-article-favorite";
function ArticleList({ articles, setArticles}) {

  const {toogleFavorite}=usefavorite()
  return (
    <div className="flex flex-col gap-2 overflow-hidden">
      {articles?.map((article) => (
        <div
          key={article?.slug}
          className=" w-[800px] max-h-[278px] py-5 px-5 rounded-xl border-[1px] border-[#AAAAAA] hover:bg-green-500/50"
        >
          <div className="flex items-center justify-between  h-[36px]">
            <img className="pr-2 w-[34px] h-[34px] " src={user} />
            <div className="mr-auto">
              <h1 className="font-semibold text-[16px] text-[#5CB85C] ">
                {article.author.username}
              </h1>
              <p className="text-[#AAAAAA] text-[12.8px] ">
                {new Date(article.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex w-[77px] h-[40px] items-center justify-center justify-evenly rounded-xl border-1 border-[#5CB85C] ">
              <div>
                <button className="flex" onClick={()=>{toogleFavorite(article?.slug,article?.favorited,setArticles)}}>
                  <img src={like} />
                </button>
                
              </div>
              {article.favoritesCount}
            </div>
          </div>
          <Link to={`articles/${article.slug}`}>
            <h1 className="font-semibold text-[32px] ">{article.title}</h1>
            <p className="font-Regular text-[16px] text-[#AAAAAA] h-[72px] overflow-hidden ">
              {article.body}
            </p>
          </Link>
          <Tag tags={article.tagList} />
        </div>
      ))}
    </div>
  );
}
export default ArticleList;
