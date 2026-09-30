import { useState } from "react";
import Button from "../components/button/Button";
import { useContext } from "react";
import { Context } from "../components/publicContext/Public-Context";
import { useNavigate } from "react-router-dom";

function NewArticle() {
  const navigate = useNavigate();
  const{token}=useContext(Context)
  const [error, setError] = useState("");
  const [articl, setArticl] = useState({
    title: "",
    description: "",
    body: "",
    tagList: "",
  });

  const hendleChange = (e) => {
    const { name, value } = e.target;
    setArticl({ ...articl, [name]: value });
  };

  const PostingArticle = (e) => {
    e.preventDefault();
    setError("");
    if (
      articl.title.trim().length === 0 ||
      articl.description.trim().length === 0 ||
      articl.body.trim().length === 0 ||
      articl.tagList.trim().length === 0
    ) {
      alert("Все поля должны быть заполнены");
      return;
    }
    const post = async () => {
      console.log(token)
      try {
        const response = await fetch(
          "https://realworld.habsida.net/api/articles",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${token}`,
            },
            body: JSON.stringify({
              article: {
                title: articl.title,
                description: articl.description,
                body: articl.body,
                tagList: articl.tagList.split(",").map((tag)=>tag.trim())
              },
            }),
          },
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.errors);
        }
        alert("Статья успешно добавлена!");
       navigate("/")
      } catch (error) {
        setError(error.message);
      }
    };
    post();
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-[538px] gap-[10px]">
      <form id="addForm"
        className="flex flex-col items-center justify-center max-w-[500px] min-h-auto gap-[10px]"
        onSubmit={PostingArticle}
      >
        <input
          type="text"
          name="title"
          value={articl.title}
          onChange={hendleChange}
          placeholder="title"
          className="border-1 border-[#AAAAAA] w-[700px] min-h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
        />
        <input
          type="text"
          name="description"
          value={articl.description}
          onChange={hendleChange}
          placeholder="description"
          className="border-1 border-[#AAAAAA] w-[700px] min-h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
        />
        <input
          type="text"
          name="body"
          value={articl.body}
          onChange={hendleChange}
          placeholder="body"
          className="border-1 border-[#AAAAAA] w-[700px] min-h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
        />
        <input
          type="text"
          name="tagList"
          value={articl.tagList}
          onChange={hendleChange}
          placeholder="tagList"
          className="border-1 border-[#AAAAAA] w-[700px] min-h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
        />
         
      </form>
     <div className="flex gap-[10px]">
         <Button type="submit" form="addForm" text="Add Article"  className=" w-[90px] h-[32px] border-1 border-[#61BB61] text-[#61BB61] rounded-[10px] font-regular text-[12.8px]" />
        <Button onClick={()=>navigate("/")} text="Canceled" className=" w-[90px] h-[32px] border-1 border-[#BB6161] text-[#BB6161] rounded-[10px] font-regular text-[12.8px]"/>
    </div>
    </div>
  );
}
export default NewArticle;