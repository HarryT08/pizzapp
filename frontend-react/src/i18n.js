export const labelRowsPerPage = 'Filas por página';

export const labelDisplayedRows = ({ from, to, count }) =>
  `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`;
