import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useVotingContext } from "../../contexts/voting-context";
import { Modal } from "react-bootstrap";
import Input from "../../components/input"
import { useZidenContext } from "../../contexts/ziden-context";
import { useWeb3Context } from "../../contexts/web3-context";

const BigInt = window.BigInt
function Voting() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { votePoll, polls, getVotingPower, getTotalPower } = useVotingContext();
    const poll = polls[polls.length - id]
    const [power, setPower] = useState([0, 0]);
    const [openVote, setOpenVote] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(4);
    const [proofsZiden, setProofsZiden] = useState();
    const { amounts, genGetVotingPowerCalldata, queries } = useZidenContext();

    const callDataInput = [[0, 3, 0, 0], [1, 4, 1, 1], [2, 5, 2, 2]]
    const publicKey = (poll.publicKey).toString();
    console.log(proofsZiden);
    useEffect(() => {
        const fetchPower = async () => {
            power[0] = (await getVotingPower(poll.startTimeStamp)).toString();
            setPower([...power])
        }

        fetchPower()
    }, [user])
    useEffect(() => {
        if (user < 4) {
            power[1] = queries[user].values[0].toString();
            setPower([...power]);
        }
    }, [user])
    const totalPower = () => {
        var sum = 0n;
        for (var i = 0; i < power.length; i++)
            sum += BigInt(power[i]);
        return sum.toString();
    }
    const vote = async (sign) => {
        const vote = document.getElementById("vote_value").value;
        try {
            setLoading(true);
            await votePoll(id, vote, sign, publicKey, totalPower(), proofsZiden);
        } catch (error) {
            console.log(error);
            alert(error);

        }
        setLoading(false);
        setOpenVote(false);
    }

    return (<div>
        <button class="btn btn-outline-dark" onClick={() => { navigate("../../" + id) }}>Back</button>
        <div className="d-flex justify-content-between">
            <div class="h3">Your total Vote: {totalPower()}</div>
            <button class="btn btn-outline-dark" onClick={() => { setOpenVote(true) }}>Vote</button>
        </div>

        <div className="border rounded-3 p-2 mt-2">
            <div className="border-bottom justify-content-between d-flex  align-items-center">
                <div className="h5">Token</div>
                <div className="h6"> Factor: 1</div>
            </div>
            <div className="p-2 mt-2">
                <div className="h6">Your Amount: {power[0]} </div>
                <div className="h6">Your Voting Power: {power[0]} </div>

            </div>
        </div>
        <div className="border rounded-3 p-2 mt-2">
            <div className="border-bottom justify-content-between d-flex  align-items-center">
                <div className="h5">Ziden Metric</div>
                <div className="h6"> Factor: 1</div>
            </div>
            {
                power[1] ?
                    <div className="p-2 mt-2">
                        <div className="h6">Your Amount: {power[1]} </div>
                        <div className="h6">Your Voting Power: {power[1]} </div>
                    </div>
                    : <div>
                        <button className="btn btn-outline-dark m-2" onClick={() => { setOpenRegister(true) }}> Register </button>
                    </div>
            }

        </div>
        <Modal show={openRegister}>
            <Modal.Header>
                Ziden metric
            </Modal.Header>
            <Modal.Body>
                {user < 4 ?
                    <div>
                        <div class="h4 mb-4">Your Current Ziden Score: {amounts[user]}</div>
                        <div class="h4 mb-4">Your Attest Score: {power[1]}</div>
                        <button className="btn btn-outline-dark" onClick={async () => {
                            const proof = await genGetVotingPowerCalldata(...callDataInput[user]);
                            proof.queryId = user;
                            proof.fromTimestamp = poll.startTimeStamp;
                            proof.toTimestamp = proof.fromTimestamp + 10000;
                            console.log((await getTotalPower(id, [proof])).toString())
                            setProofsZiden([proof])
                            setOpenRegister(false);
                        }}> Confirm </button>
                    </div>
                    :
                    <div>
                        <select class="form-select form-select-sm mb-2" aria-label=".form-select-sm example" id="select_user">
                            <option value="0">user 1</option>
                            <option value="1">user 2</option>
                            <option value="2">user 3</option>
                        </select>
                        <div class="justify-content-end d-flex">
                            <button className="btn btn-outline-dark" onClick={() => {
                                setUser(document.getElementById("select_user").value);

                            }}> Confirm </button>
                        </div>

                    </div>
                }
            </Modal.Body>
        </Modal>


        <Modal show={openVote}>
            <Modal.Header>
                Your Option
            </Modal.Header>
            <Modal.Body>
                <div >
                    <div class="h4 mb-4">Your Voting Power: {totalPower()}</div>
                    <Input id="vote_value">Amount</Input>
                    <div className="d-flex justify-content-center">
                        {loading ? (
                            <button class="btn btn-outline-dark" type="button" disabled>
                                <span
                                    class="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                                Loading...
                            </button>
                        ) : (
                            <div className="">
                                <button className="btn btn-outline-dark m-2" onClick={() => { vote(0) }}> Vote Yes </button>
                                <button className="btn btn-outline-dark" onClick={() => { vote(1) }}> Vote No </button>
                            </div>
                        )}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </div>);
}

export default Voting;