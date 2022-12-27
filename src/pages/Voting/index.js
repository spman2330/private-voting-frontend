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
    const { address } = useWeb3Context()
    const { votePoll, polls, getVotingPower } = useVotingContext();
    const poll = polls.find(e => e.id == id);
    const [power, setPower] = useState(0);
    const [openVote, setOpenVote] = useState(false);
    const [openRegister, setOpenRegister] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(4);
    const [proofsZiden, setProofsZiden] = useState([]);
    const { amounts, genGetVotingPowerCalldata, queries, factor, setQueries } = useZidenContext();

    const callDataInput = [[0, 3, 0, 0], [1, 4, 1, 1], [2, 5, 2, 2]]
    const publicKey = (poll.publicKey).toString();
    console.log(proofsZiden);
    useEffect(() => {
        const fetchPower = async () => {
            var power1 = (await getVotingPower(poll.startTimeStamp)).toString();
            console.log(power1)
            setPower(power1)
        }

        fetchPower()
    }, [address])

    const realPower = (i) => {
        console.log(queries)
        return (BigInt(queries[i].values[0]) * BigInt(factor[i])).toString();
    }
    const totalPower = () => {
        var sum = BigInt(power);
        for (var i = 0; i < queries.length; i++)
            sum += BigInt(realPower(i));
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
                <div className="h6">Your Amount: {power} </div>
                <div className="h6">Your Voting Power: {power} </div>

            </div>
        </div>
        {
            queries.map((e, i) =>
                <div className="border rounded-3 p-2 mt-2">
                    <div className="border-bottom justify-content-between d-flex  align-items-center">
                        <div className="h5">Ziden Metric {i}</div>
                        <div className="h6"> Factor: {factor[i]}</div>
                    </div>
                    {
                        queries[i].values[0] ?
                            <div className="p-2 mt-2">
                                <div className="h6">Your Amount: {amounts[i]} </div>
                                <div className="h6">Your Voting Power: {realPower(i)} </div>
                            </div>
                            : <div>
                                <button className="btn btn-outline-dark m-2" onClick={() => { setOpenRegister(i) }}> Register </button>
                            </div>
                    }

                </div>
            )
        }

        <Modal show={openRegister >= 0}>
            <Modal.Header>
                <div class="d-flex justify-content-between flex-fill">
                    <div> Ziden Metric </div>
                    <div onClick={() => setOpenRegister(-1)}> X </div>
                </div>
            </Modal.Header>
            <Modal.Body>
                {
                    <div>
                        <div class="h4 mb-4">Your Current Ziden Score: {amounts[openRegister]}</div>
                        <Input id="attest_score">Your Attest Score: </Input>
                        <div class="d-flex justify-content-center flex-fill">
                            <button className="btn btn-outline-dark" onClick={async () => {
                                const attest_score = document.getElementById("attest_score").value;
                                queries[openRegister].values[0] = BigInt(attest_score);
                                setQueries(queries);
                                const proof = await genGetVotingPowerCalldata(...callDataInput[openRegister]);

                                proof.queryId = openRegister;
                                proof.fromTimestamp = poll.startTimeStamp;
                                proof.toTimestamp = proof.fromTimestamp + 10000;
                                console.log(proof);
                                proofsZiden[openRegister] = proof
                                setProofsZiden([...proofsZiden])
                                setOpenRegister(-1);
                            }}> Confirm </button>
                        </div>

                    </div>



                }
            </Modal.Body>
        </Modal>


        <Modal show={openVote}>
            <Modal.Header>
                <div class="d-flex justify-content-between flex-fill">
                    <div> Your Option </div>
                    <div onClick={() => setOpenVote(false)}> X </div>
                </div>

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
                                <button className="btn btn-outline-dark m-2" onClick={() => { vote(1) }}> Vote Yes </button>
                                <button className="btn btn-outline-dark" onClick={() => { vote(0) }}> Vote No </button>
                            </div>
                        )}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </div>);
}





export default Voting;