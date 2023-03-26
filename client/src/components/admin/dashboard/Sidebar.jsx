import { Box, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import {
  IoMdPizza,
  IoMdHome,
  IoMdRestaurant,
  IoIosCafe,
  IoMdListBox,
  IoMdPersonAdd,
  IoIosPaper,
} from "react-icons/io";
import { GiTabletopPlayers } from "react-icons/gi";
import { NavItem } from "@/components";
import logo from "@/assets/images/logoBohemia.png";

const items = [
  {
    href: "/admin/inicio",
    icon: <IoMdHome fontSize="small" />,
    title: "Inicio",
  },
  {
    href: "/admin/productos",
    icon: <IoMdPizza fontSize="small" />,
    title: "Productos",
  },
  {
    href: "/admin/ingredientes",
    icon: <IoMdRestaurant fontSize="small" />,
    title: "Ingredientes",
  },
  {
    href: "/admin/bebidas",
    icon: <IoIosCafe fontSize="small" />,
    title: "Bebidas",
  },
  {
    href: "/admin/ordenes",
    icon: <IoMdListBox fontSize="small" />,
    title: "Ordenes",
  },
  {
    href: "/admin/cuentas",
    icon: <IoMdPersonAdd fontSize="small" />,
    title: "Cuentas",
  },
  {
    href: "/admin/mesas",
    icon: <GiTabletopPlayers fontSize="small" />,
    title: "Mesas",
  },
  {
    href: "/admin/facturar",
    icon: <IoIosPaper fontSize="small" />,
    title: "Facturar",
  },
];

const Sidebar = ({ onClose, open }) => {
  const year = new Date().getFullYear();

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ p: 3, pb: 0 }}>
          <Box
            sx={{
              display: "inline-flex",
              height: 65,
              width: 65,
            }}
          >
            <img src={logo} alt="Logo" />
          </Box>
        </Box>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        >
          <Typography color="neutral.500" variant="caption">
            &copy; {year} ARTECH - Derechos totalmente reservados.
          </Typography>
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

export default Sidebar;
