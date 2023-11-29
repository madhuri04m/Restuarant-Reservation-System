import "./navbar.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";



const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            {user.img && <img src={user.img} alt="User" className="user-img" />}
          {user ? user.username : (
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
