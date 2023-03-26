import { useRef, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import styled from "@emotion/styled";
import { AppBar, Avatar, Box, IconButton, Toolbar } from "@mui/material";
import { IoIosMenu } from "react-icons/io";
import { AccountPopover } from "@/components";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

const Navbar = ({ onSidebarOpen }) => {
  const settingsRef = useRef(null);
  const [userName, setUserName] = useState("");
  const [cargo, setCargo] = useState("");
  const [openAccountPopover, setOpenAccountPopover] = useState(false);
  const [avatarBackgroundColor, setAvatarBackgroundColor] = useState("");

  const decodedToken = () => {
    const token = localStorage.getItem("Authorization");
    const decoded = jwt_decode(token);
    setUserName(decoded.nombre);
    setCargo(decoded.cargo);
  };

  useEffect(() => {
    decodedToken();
    // Generar un color aleatorio en formato hexadecimal y establecerlo como color de fondo del Avatar
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    setAvatarBackgroundColor(randomColor);
  }, []);

  const getInitial = (name) => {
    const nameArray = name.split(" ");
    const firstInitial = nameArray[0].charAt(0);
    const secondInitial = nameArray.length > 1 ? nameArray[1].charAt(0) : "";
    return firstInitial + secondInitial;
  };

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <IoIosMenu />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Avatar
            onClick={() => setOpenAccountPopover(true)}
            ref={settingsRef}
            sx={{
              cursor: "pointer",
              height: 40,
              width: 40,
              ml: 1,
              backgroundColor: avatarBackgroundColor, // Establecer el color de fondo del Avatar
            }}
          >
            <p>{getInitial(userName).toUpperCase()}</p>
          </Avatar>
        </Toolbar>
      </DashboardNavbarRoot>
      <AccountPopover
        userName={userName}
        cargo={cargo}
        anchorEl={settingsRef.current}
        open={openAccountPopover}
        onClose={() => setOpenAccountPopover(false)}
      />
    </>
  );
};

export default Navbar;
