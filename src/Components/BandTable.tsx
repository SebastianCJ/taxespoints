import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { BandCtx } from "../Context/BandCtx";

export const BandTable = () => {
  const { bands } = useContext(BandCtx);
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {bands?.length > 0 && (
        <>
          <Typography component="h1" variant="h5">
            Taxes Form
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: "100%" }} aria-label="bands table">
              <TableHead>
                <TableRow>
                  <TableCell>Salary</TableCell>
                  <TableCell align="right">Owed</TableCell>
                  <TableCell align="right">Rate</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bands?.map((band) => (
                  <TableRow
                    key={band.min}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {`${band.min} <= `}
                    </TableCell>
                    <TableCell align="right">{band.owed}</TableCell>
                    <TableCell align="right">{band.rate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};
