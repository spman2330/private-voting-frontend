

function Button({ children, onClick }) {
    return (<button class="btn btn-outline-dark" onClick={onClick}>{children}</button>);
}

export default Button;