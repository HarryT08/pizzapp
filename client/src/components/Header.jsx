import { useMediaQuery, Typography } from "@mui/material";

const Header = ({ title, subtitle }) => {
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"), {
    defaultMatches: true,
    noSsr: false,
  });

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          fontSize: smUp ? "2rem" : "1.25rem",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="subtitle2"
        color="textSecondary"
        sx={{
          fontSize: smUp ? "1rem" : "0.75rem",
        }}
      >
        {subtitle}
      </Typography>
    </>
  );
};

export default Header;
