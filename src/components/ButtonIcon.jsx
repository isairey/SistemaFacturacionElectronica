const ButtonIcon = (prop) => {
    return (
        <button name={prop.name} className="button-icon" onClick={prop.onClick}>
            <img name={prop.name} src={prop.icon}></img>
        </button>
    )
}

export default ButtonIcon