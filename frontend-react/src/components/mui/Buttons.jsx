import { styled } from "@mui/system";
import { Button, IconButton } from "@mui/material";

export const AddedButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 14,
  fontWeight: "bold",
  padding: "8px 32px",
  border: "1px solid",
  color: "#3366FF",
  borderColor: "rgba(51, 102, 255, 0.2)",
  fontFamily: ["Montserrat"],
  "&:hover": {
    backgroundColor: "rgba(51, 102, 255, 0.2)",
    borderColor: "#3366FF",
  },
});

export const DeletedButton = styled(IconButton)({
  boxShadow: "none",
  fontSize: 16,
  color: "#D00000",
  "&:hover": {
    backgroundColor: "rgba(208, 0, 0, 0.2)",
  }
})

export const UpdateButton = styled(IconButton)({
  boxShadow: "none",
  fontSize: 16,
  color: "#FFA500",
  "&:hover": {
    backgroundColor: "rgba(255, 165, 0, 0.2)",
  }
})
