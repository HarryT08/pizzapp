import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const BtnAgg = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  fontWeight: 600,
  padding: "6px 12px",
  border: "2px solid",
  borderRadius: 6,
  lineHeight: 1.5,
  backgroundColor: "#3366FF",
  color: "#fff",
  borderColor: "#3366FF",
  transition: "all .3s ease-in-out",
  "&:hover": {
    backgroundColor: "rgba(0, 105, 217, .1)",
    color: "#3366FF",
    boxShadow: "none",
  },
  "&:active": {
    backgroundColor: "rgba(0, 105, 217, .1)",
    color: "#3366FF",
    boxShadow: "none",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

export const BtnEdit = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  fontWeight: 600,
  padding: "6px 12px",
  border: "2px solid",
  borderRadius: 6,
  lineHeight: 1.5,
  backgroundColor: "#FFA500",
  color: "#fff",
  borderColor: "#FFA500",
  transition: "all .3s ease-in-out",
  "&:hover": {
    backgroundColor: "rgba(255, 165, 0, .2)",
    color: "#FFA500",
    boxShadow: "none",
  },
  "&:active": {
    backgroundColor: "rgba(255, 165, 0, .2)",
    color: "#FFA500",
    boxShadow: "none",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(255, 165, 0, .2)",
  },
})

export const BtnDelete = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  fontWeight: 600,
  padding: "6px 12px",
  border: "2px solid",
  borderRadius: 6,
  lineHeight: 1.5,
  backgroundColor: "#D00000",
  color: "#fff",
  borderColor: "#D00000",
  transition: "all .3s ease-in-out",
  "&:hover": {
    backgroundColor: "rgba(208, 0, 0, .2)",
    color: "#D00000",
    boxShadow: "none",
  },
  "&:active": {
    backgroundColor: "rgba(208, 0, 0, .2)",
    color: "#D00000",
    boxShadow: "none",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(208, 0, 0, .2)",
  },
})
