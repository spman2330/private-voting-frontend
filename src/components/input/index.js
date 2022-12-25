
function Input({ id, children }) {
    return (
        <div class="input-group mb-3">
            <input
                type="text"
                class="form-control"
                id={id}
                aria-describedby="basic-addon3"
            />
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon3">
                    {children}
                </span>
            </div>
        </div>);
}

export default Input;