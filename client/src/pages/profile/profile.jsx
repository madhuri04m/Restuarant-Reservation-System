import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "./profile.scss"
const Profile = () => {
    const { user, dispatch } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get("/auth/user", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                const userProfile = response.data;
                dispatch({ type: "UPDATE_USER", payload: userProfile });
                setLoading(false);
            } catch (error) {
                setError(error.response.data.message || "Error fetching user profile");
                setLoading(false);
            }
        };

        if (user && user.token) {
            fetchUserProfile();
        } else {
            setLoading(false);
        }
    }, [user, dispatch]);

    return (
        <div className="new">

          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {user && (
            <div className="main">
              <h2>User Profile</h2>
              <div className="img">
                {user.img && <img src={user.img} alt="User" className="user-img" />}
              </div>
              <div className="details">
              <table className="user-table">
                <tbody>
                  <tr>
                    <td>Name:</td>
                    <td>{user.username}</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <td>Phone Number:</td>
                    <td>{user.phone}</td>
                  </tr>
                  <tr>
                    <td>City:</td>
                    <td>{user.city}</td>
                  </tr>
                  <tr>
                    <td>Country:</td>
                    <td>{user.country}</td>
                  </tr>
                  <tr>
                    <td>Admin:</td>
                    <td>Yes</td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
          )}
        </div>
    );
};

export default Profile;
