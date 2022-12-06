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
    return (<div className="popup">
        <div className="popup_inner">
            <div className="popup_header">
                Register {metric.name} with Ziden
            </div>
            {
                state == 0
                    ? <div className="popup_content">
                        <div className="h_left">Enter Ziden Password</div>
                        <input id="password" placeholder="password"></input>
                        <div className="popup_button">
                            <button className="confirm" onClick={() => enterPassword(document.getElementById("password").value)}>Confirm</button>
                        </div>
                    </div>
                    : <div className="popup_content">
                        <div className="h_left">Your Current {metric.name}: </div>
                        <div className="h_right">{state}</div>
                        <div className="h_left">Your Attest {metric.name}</div>
                        <input id="attest"></input>
                        <div className="popup_button">
                            <button className="generate" onClick={() => generatePower(document.getElementById("attest").value)}>generate</button>
                        </div>
                    </div>
            }
        </div>
    </div>);
}

export default Register;