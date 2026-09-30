import Button from "../button/Button"
import { useNavigate,useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../publicContext/Public-Context";

function DeleteArticle (){
 const {token}=useContext(Context)
const navigate = useNavigate();
const {slug} = useParams()
const DeleteArticle= async()=>{
    const Delete = await fetch(`https://realworld.habsida.net/api/articles/${slug}`,{
        method:"DELETE",
        headers:{
       "Authorization": `Token ${token}`
        }
    })
  if(Delete.ok){
    alert("Статья успешно удалена")
 navigate("/")
  }
}
    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="flex gap-4 p-6 bg-white rounded-lg shadow-lg" >
       <Button text="delete" onClick={DeleteArticle} />
       <Button text="back" onClick={()=>navigate(-1)}/>
            </div>
        </div>
    )
}
export default DeleteArticle;