import { useState } from "react"



function Register({ metric, setPopup }) {
    const [state, setState] = useState(0);

    const enterPassword = async (password) => {
        //// api
        setState(1);
    }

    const generatePower = async (power) => {
        ////api
        setPopup({ action: "none" })
    }
    return (<div >

        {
            state == 0
                ? <div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon3">Ziden Password</span>
                        <input type="text" class="form-control" id="ziden_password" aria-describedby="basic-addon3" />

                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-outline-dark" onClick={() => enterPassword(document.getElementById("ziden_password").value)}>Confirm</button>
                    </div>


                </div>
                : <div className="popup_content">
                    <div className="h5">Your Current Metric: {state}</div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon3">Your Attest Metric</span>
                        <input type="text" class="form-control" id="attest" aria-describedby="basic-addon3" />



                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-outline-dark" onClick={() => generatePower(document.getElementById("attest").value)}>generate</button>
                    </div>
                </div>
        }
    </div>);
}

export default Register;