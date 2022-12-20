import { useState } from "react";
import { votePoll } from "../../../helper/api";

function Option({ id, voting_power, setPopup }) {
  const [loading, setLoading] = useState(false);
  const closeModal = () => {
    setPopup({ action: "none" });
  };

  return (
    <div className="popup_content">
      <div className="h4 mb-4">Your Voting Power: {voting_power}</div>

      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          id="vote_value"
          aria-describedby="basic-addon3"
        />
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon3">
            Value
          </span>
        </div>
      </div>

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
            <button
              id="vote_button"
              className="btn btn-outline-dark m-2"
              onClick={async () => {
                const vote = document.getElementById("vote_value").value;

                try {
                  setLoading(true);
                  await votePoll(id, vote, 0);
                  setPopup({ action: "done" });
                } catch (error) {
                  console.log(error);
                  alert(error);
                  setPopup({ action: "none" });
                }
              }}
            >
              Vote Yes
            </button>
            <button
              id="vote_button"
              className="btn btn-outline-dark"
              onClick={async () => {
                const vote = document.getElementById("vote_value").value;

                try {
                  setLoading(true);
                  await votePoll(id, 0, vote);
                  setPopup({ action: "done" });
                } catch (error) {
                  console.log(error);
                  alert(error);
                  setPopup({ action: "none" });
                }
              }}
            >
              Vote No
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Option;
