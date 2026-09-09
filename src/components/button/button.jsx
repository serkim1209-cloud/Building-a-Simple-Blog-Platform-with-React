

function Button({text,className}){
    return(
        <div>
            <button className={`flex items-center justify-center ${className}`}>{text}</button>
        </div>
    )
}
export default Button;