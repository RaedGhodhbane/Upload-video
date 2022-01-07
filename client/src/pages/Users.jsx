import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../redux/actions/alert";
import { deleteUserAction, getUsersAction } from "../redux/actions/users";

function Users() {
  const { loading, allUsers } = useSelector((state) => state.users);
  const { isAdmin, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAdmin) {
      dispatch(getUsersAction());
    } else {
      setAlert("Opps...!", "warnnig");
    }
  }, [dispatch, isAdmin]);

  // if (loading) {
  //   return <div>Loading...!</div>;
  // }

  const deleteUser = (id) => {
    if (user._id === id) {
      console.log("nope");
    } else {
      dispatch(deleteUserAction(id));
      dispatch(getUsersAction());
    }
  };

  return (
    <div className="container">
      {isAdmin ? (
        <>
          {" "}
          <h4 className="text-center mt-3 mb-5">ALL USERS</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name / Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => (
                <tr key={user.username}>
                  <th scope="row">{user.username}</th>
                  <td>{user.name + " " + +" " + user.lastname}</td>
                  <td>{user.email}</td>
                  <td>
                    <i
                      style={{ cursor: "pointer", color: "red" }}
                      className="fas fa-trash-alt "
                      onClick={() => deleteUser(user._id)}
                    ></i>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>Sorry Only Admin have Access To This Page..? </>
      )}
    </div>
  );
}

export default Users;
