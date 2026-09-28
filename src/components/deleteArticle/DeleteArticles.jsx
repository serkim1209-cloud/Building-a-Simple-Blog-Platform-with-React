import Button from "../button/Button"

function DeleteArticle (){
    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="flex gap-4 p-6 bg-white rounded-lg shadow-lg" >
       <Button text="delete" />
       <Button text="back" />
            </div>
        </div>
    )
}
export default DeleteArticle;