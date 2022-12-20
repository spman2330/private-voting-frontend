import React from "react";
import { convertTime } from "../../helper/api";

const Menu = ({ polls, setPage, setPollId }) => {
  return (
    <div id="menu">
      <div id="title" class="h2 mb-4">
        Proposals
      </div>

      {/* <div className="justify-content-center border rounded-2 p-2 mb-2 ">
        <h1 className="justify-content-center"> Create Poll form</h1>
        <div class="input-group mb-1">
          <input
            type="text"
            class="form-control"
            id="title"
            aria-describedby="basic-addon3"
          />
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon3">
              Title
            </span>
          </div>
        </div>

        <div class="input-group mb-1">
          <input
            type="text"
            class="form-control"
            id="privateKey"
            aria-describedby="basic-addon3"
          />
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon3">
              PrivateKey
            </span>
          </div>
        </div>
        <button className="btn btn-outline-dark mb-2" onClick={async () => {}}>
          Create Poll{" "}
        </button>
      </div> */}
      <div class="list-group list-group-checkable d-grid gap-2 border-0 ">
        {polls.map((poll) => (
          <Poll
            key={poll.id}
            poll={poll}
            setPage={setPage}
            setPollId={setPollId}
          />
        ))}
      </div>
    </div>
  );
};

const Poll = ({ poll, setPage, setPollId }) => {
  const handleClick = () => {
    setPage("Poll");
    setPollId(poll.id);
  };
  var css_status;
  if (poll.status == "Succeeded") css_status = "text-success";
  else if (poll.status == "Done") css_status = "text-danger";
  else css_status = "text-primary";
  return (
    <div
      id={"poll-" + poll.id}
      class="list-group-item rounded-3 py-3"
      onClick={handleClick}
    >
      <div>
        <div class="h5">{poll.title}</div>
        <div class={css_status + " h6"}>{poll.status}</div>
      </div>
      <div class="align-items-center d-flex">
        <div class="col-8">
          <div>start: {convertTime(poll.start)}</div>
          <div>end: {convertTime(poll.end)}</div>
        </div>

        {poll.status !== "Done" ? (
          <div class="text-secondary">
            Voting results will be announced only after done
          </div>
        ) : (
          <div>
            <div class="h6"> value vote: {poll.for}</div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Menu;
