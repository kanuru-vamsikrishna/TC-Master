import React from "react";
import { connect } from "react-redux";

function Account(props) {
  return (
    <div>
      <center class="p-5">
        <div class="card " style={{ width: "400px" }}>
          <div class="card-header">User Account Info</div>
          <br />
          <img
            src="https://www.kindpng.com/picc/m/269-2697881_computer-icons-user-clip-art-transparent-png-icon.png"
            width="150"
            class="rounded mx-auto d-block"
            height="100"
            alt="..."
          />
          <div class="card-body">
            <p class="fs-4 fw-normal">Name: {props.user.username}</p>
            <p class="fs-4 fw-normal">Email: {props.user.email} </p>
          </div>
        </div>
      </center>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state.user, "state") 
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Account);
