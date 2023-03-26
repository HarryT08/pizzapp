import {
  Box,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
  TextField,
  MenuItem
} from "@mui/material";
import { MdOutlineSearch } from "react-icons/md";

const Searchbar = ({ search, setSearch, sortBy, setSortBy }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "24px",
        padding: "24px",
      }}
    >
      <OutlinedInput
        defaultValue={search}
        fullWidth
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar orden por el numero"
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              <MdOutlineSearch />
            </SvgIcon>
          </InputAdornment>
        }
        sx={{
          minWidth: "100px",
        }}
      />
      <TextField
        fullWidth
        label="Ordenar por"
        select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <MenuItem value="newest">Nuevas</MenuItem>
        <MenuItem value="oldest">Antiguas</MenuItem>
      </TextField>
    </Box>
  );
};

export default Searchbar;
