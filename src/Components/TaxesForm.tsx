import React, { useState, useContext } from "react";
import dayjs, { Dayjs } from "dayjs";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import OutlinedInput from "@mui/material/OutlinedInput";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { currencyFormat } from "../utils";
import { BandCtx } from "../Context/BandCtx";

import {
  useGetTaxes,
  GetTaxesQueryParams,
  Rates,
} from "../Queries/useGetTaxes";

type Bands = {
  rate: number | string;
  owed: string;
  min: number | string;
};

export const TaxesForm = () => {
  const [annualIncome, setAnualIncome] = useState<number>(0);
  const [taxYear, setTaxYear] = useState<Dayjs | null>(dayjs("2019-04-17"));
  const [taxesResult, setTaxesResult] = useState("0");
  const [taxRate, setTaxRate] = useState(0);
  const { setBands } = useContext(BandCtx);

  const { isFetching, refetch } = useGetTaxes({
    taxYear: dayjs(taxYear).get("year").toString(),
  } as GetTaxesQueryParams);

  const calculateTaxes = async () => {
    try {
      const response = await refetch();
      if (response.data.code) {
        alert(`${response.data.code} ${response.data.message}`);
      }
      let curRate = 0;
      const bands: Array<Bands> = [];
      response.data.tax_brackets.forEach((bracket: Rates) => {
        bands.push({
          rate: `${(bracket.rate * 100).toFixed(2)} %`,
          owed: currencyFormat.format(curRate * annualIncome),
          min: currencyFormat.format(bracket.min),
        });
        if (annualIncome >= bracket.min) {
          curRate = bracket.rate;
          setTaxRate(bracket.rate);
        }
        setBands(bands);
      });
      setTaxesResult(currencyFormat.format(curRate * annualIncome));
    } catch (e) {}
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Taxes Form
        </Typography>
        <Box sx={{ mt: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">
            Annual Income
          </InputLabel>
          <OutlinedInput
            data-testid="annualIncome"
            id="annualIncome"
            type="number"
            fullWidth
            required
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            onChange={(income) => setAnualIncome(parseInt(income.target.value))}
            value={annualIncome}
          />
          <DatePicker
            sx={{
              width: "100%",
              marginTop: 4,
            }}
            value={taxYear}
            label="Tax Year"
            views={["year"]}
            onChange={(year) => setTaxYear(year)}
          />
          {isFetching && (
            <Box
              sx={{
                marginTop: 4,
                marginBottom: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {!isFetching && (
            <Button
              disabled={!taxYear || !annualIncome}
              onClick={calculateTaxes}
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Calculate Taxes
            </Button>
          )}

          <TextField
            fullWidth
            id="taxesResult"
            label="Taxes Owed"
            value={taxesResult}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            sx={{
              marginTop: 2,
            }}
            fullWidth
            id="effectiveRate"
            label="Tax Rate"
            value={`${(taxRate * 100).toFixed(2)} %`}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};
