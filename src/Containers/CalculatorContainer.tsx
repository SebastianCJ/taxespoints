import React, { useState } from "react";
import { Box } from "@mui/material";
import { BandCtx, Bands } from "../Context/BandCtx";
import { useTheme } from "@mui/material/styles";
import { TaxesForm } from "../Components/TaxesForm";
import { BandTable } from "../Components/BandTable";

export const CalculatorContainer = () => {
  const [bands, setBands] = useState<Array<Bands>>([]);
  const theme = useTheme();
  return (
    <BandCtx.Provider value={{ bands, setBands }}>
      <Box
        sx={{
          margin: theme.spacing(1),
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
        }}
      >
        <TaxesForm />
        <BandTable />
      </Box>
    </BandCtx.Provider>
  );
};
