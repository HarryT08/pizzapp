import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { OrdenesContext } from "@/context/ordenes/OrdenesContext";
import { useState, useContext } from "react";
import { labelDisplayedRows, labelRowsPerPage } from "@/i18n";
import { Alerta, Searchbar } from "@/components";
import { Scrollbar } from "@/components/Scrollbar";

const options = {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
};
const numberFormat = new Intl.NumberFormat("es-CO", options);

const TableOrdenes = ({ filterComandas }) => {
  const { isLoading, isError, error, getComandaById } =
    useContext(OrdenesContext);
  const comandas = filterComandas;

  const [pageOrdenes, setPageOrdenes] = useState(0);
  const [rowsOrdenes, setRowsOrdenes] = useState(10);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const searchOrdenes = () => {
    let filteredComandas = comandas?.filter((comanda) => {
      const id = comanda.id.toString();
      return typeof search === "string" && id.includes(search.toLowerCase());
    });

    const sortedComandas = filteredComandas.sort((a, b) => {
      const fechaA = new Date(a.fecha);
      const fechaB = new Date(b.fecha);

      if (sortBy === "oldest") {
        return fechaA - fechaB;
      } else {
        return fechaB - fechaA;
      }
    });

    return sortedComandas;
  };

  const fechaFormatAbrevMonth = (fecha) => {
    const date = new Date(fecha);
    const month = date.toLocaleString("es-CO", { month: "short" });
    return `${month.toUpperCase()}`;
  };

  const fechaFormatAbrevDay = (fecha) => {
    const date = new Date(fecha);
    const day = date.toLocaleString("es-CO", { day: "numeric" });
    return `${day}`;
  };

  // Paginacion tabla Ordenes
  const handleChangePageOrdenes = (event, newPage) => {
    setPageOrdenes(newPage);
  };

  const handleChangeRowsPerPageOrdenes = (event) => {
    setRowsOrdenes(+event.target.value);
    setPageOrdenes(0);
  };

  if (isLoading) return <div className="loader"></div>;
  else if (isError) return <div>{error}</div>;

  const filteredAndSortedComandas = searchOrdenes();

  return (
    <>
      {comandas.length === 0 ? (
        <Alerta alerta="info" descripcion="No hay comandas registradas" />
      ) : (
        <>
          <Card>
            <Searchbar
              search={search}
              setSearch={setSearch}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
            <Scrollbar>
              <Box sx={{ minWidth: 800, borderTop: 1, color: "divider" }}>
                <Table>
                  <TableBody>
                    {filteredAndSortedComandas
                      .slice(
                        pageOrdenes * rowsOrdenes,
                        pageOrdenes * rowsOrdenes + rowsOrdenes
                      )
                      .map((comanda) => (
                        <TableRow
                          sx={{
                            cursor: "pointer",
                          }}
                          hover
                          key={comanda.id}
                          onClick={() => getComandaById(comanda.id)}
                        >
                          <TableCell
                            align="center"
                            sx={{
                              display: "flex",
                              borderBottom: 1,
                              borderColor: "divider",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <Box
                              sx={{
                                backgroundColor: "#e5e7eb",
                                borderRadius: "16px",
                                maxWidth: "fit-content",
                                padding: "8px",
                              }}
                            >
                              <Typography variant="subtitle2">
                                {fechaFormatAbrevMonth(comanda.fecha)}
                              </Typography>
                              <Typography variant="h6">
                                {fechaFormatAbrevDay(comanda.fecha)}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                              }}
                            >
                              <Typography variant="subtitle2">
                                Orden #{comanda.id}
                              </Typography>
                              <Typography variant="caption" color="neutral.500">
                                Total de {numberFormat.format(comanda.total)}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{
                              borderBottom: 1,
                              borderColor: "divider",
                            }}
                          >
                            <span className={`${comanda.estado}`}>
                              {comanda.estado}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={comandas.length}
                  rowsPerPage={rowsOrdenes}
                  page={pageOrdenes}
                  onPageChange={handleChangePageOrdenes}
                  onRowsPerPageChange={handleChangeRowsPerPageOrdenes}
                  labelRowsPerPage={labelRowsPerPage}
                  labelDisplayedRows={labelDisplayedRows}
                />
              </Box>
            </Scrollbar>
          </Card>
        </>
      )}
    </>
  );
};

export default TableOrdenes;
