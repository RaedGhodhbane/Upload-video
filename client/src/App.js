import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import Videos from "./pages/Videos";
import Footer from "./components/Footer";
import { useEffect } from "react";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./redux/actions/auth";
import store from "./redux/store";
import Alert from "./components/Alert";
import EditProfile from "./pages/EditProfile";
import { useSelector } from "react-redux";
import NotFound from "./pages/NotFound";
if (typeof window !== "undefined" && localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const { isAutenticated, isAdmin } = useSelector((state) => state.auth);
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.token) {
      store.dispatch(loadUser());
    }
  }, []);

  return (
    <div className="App">
      <NavBar />

      <div className="main">
        <Alert />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route
            exact
            path="/profile"
            element={isAutenticated ? <Profile /> : <Login />}
          />
          <Route
            exact
            path="/users"
            element={isAutenticated ? <Users /> : <Login />}
          />

          <Route
            exact
            path="/editProfile"
            element={isAutenticated ? <EditProfile /> : <Login />}
          />
          <Route
            exact
            path="/videos"
            element={isAutenticated ? <Videos /> : <Login />}
          />
          {/* <Route exact element={<NotFound />} /> */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
