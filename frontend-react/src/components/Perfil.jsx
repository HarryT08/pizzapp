import { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import jwt_decode from "jwt-decode";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const Perfil = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState('')
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    decodedUserName();
  },[])

  const decodedUserName = () => {
    const token = localStorage.getItem("Authorization");
    const decoded = jwt_decode(token);
    console.log('Usuario decodificado',decoded)
    // return setUserName(decoded.username);
  }

  // console.log('Usuario',userName)

const logout = () => {
    localStorage.removeItem("Authorization");
    navigate('/login')
}

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Perfil" arrow>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "500",
                bgcolor: "#ba181b",
                width: 30,
                height: 30,
              }}
            >
              E
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem sx={{ fontFamily: "Montserrat" }} onClick={() => logout()}>
          <ListItemIcon>
            <BiLogOut color="#ba181b" size={20} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Perfil;
