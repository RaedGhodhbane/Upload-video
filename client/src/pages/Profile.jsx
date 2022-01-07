import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
function Profile({ auth: { isAutenticated, loading, user } }) {
  if (loading) {
    return <div>Loading...!</div>;
  }

  return (
    <div className="container">
      <div className="profile">
        <div className="profile_bar">
          <h6>
            Welcome {user.name} {user.lastname}{" "}
          </h6>
          <div className="">
            <Link to="/editProfile">edit Profile</Link>
            <Link to="/login">Delete Account</Link>
          </div>{" "}
        </div>
        <div
          className="card border-dark mt-5 mb-3 pofile_header"
          style={{ maxWidth: "50rem", margin: "auto" }}
        >
          <div className="card-header">Profile</div>
          <div className="card-body text-dark">
            <h5 className="card-title">Dark card title</h5>
            <div className="card-text">
              <div>
                <strong>Name</strong> : {user.name}
              </div>
              <div>
                <strong>Last Name</strong> : {user.name}
              </div>
              <div>
                <strong>User Name</strong> : {user.username}
              </div>
              <div>
                <strong>Email</strong> : {user.email}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Profile.prototype = {
  auth: PropTypes.func.isRequired,
};
const mapStateToPrps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToPrps)(Profile);
