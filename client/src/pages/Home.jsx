import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Home({ auth: { isAutenticated, loading }, history }) {
  // const history = useHis
  return (
    <div className="homeContainer">
      {!loading && isAutenticated ? (
        <div className="homeMovie"></div>
      ) : (
        <div className="homeContainerNoLoged">
          <img
            src="https://www.lepointdufle.net/ia/cinema1.jpg"
            alt=""
            title="video_image"
          />

          <div className="link-page">
            {" "}
            <Link to="/login">Please Login</Link>{" "}
          </div>
        </div>
      )}
    </div>
  );
}

Home.prototype = {
  auth: PropTypes.object.isRequired,
};

const mapStateToPrps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToPrps)(Home);
