import React from "react";
import { QueryClient, QueryClientProvider, QueryCache } from "react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CalculatorContainer } from "./Containers/CalculatorContainer";
import HeaderLogo from "./Components/HeaderLogo";

import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
    },
  },
  queryCache: new QueryCache({
    onError: (error: any) => alert(`Something went wrong: ${error.message}`),
  }),
});
const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <QueryClientProvider client={queryClient}>
          <Box
            sx={{
              margin: theme.spacing(1),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: 3,
              borderRadius: 2,
              px: 4,
              py: 6,
            }}
          >
            <HeaderLogo />
            <CalculatorContainer />
          </Box>
        </QueryClientProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
