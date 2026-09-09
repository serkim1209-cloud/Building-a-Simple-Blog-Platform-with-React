        <div
          key={article.slug}
          className=" w-[800px] max-h-[278px] py-5 px-5 rounded-xl border-[1px] border-[#AAAAAA]"
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
                <img src={like} />
              </div>
              {article.favoritesCount}
            </div>
          </div>
          <Link to={`articles/${article.slug}`}>
            <h1 className="font-semibold text-[32px] ">{article.title}</h1>
            <p className="font-Regular text-[16px] text-[#AAAAAA] ">
              {article.body}
            </p>
          </Link>
          <div className="flex gap-2">
            {article.tagList.map((tag) => (
              <button
                key={tag}
                className="flex items-center justify-center px-5 border-1  min-w-[50px] h-[20px] font-semibold text-[12.8px] border-[#AAAAAA] rounded-xl text-[#AAAAAA] "
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      ))}