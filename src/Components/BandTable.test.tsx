import React from "react";
import { render, screen, act } from "@testing-library/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { BandTable } from "./BandTable";
import { BandCtx, Bands } from "../Context/BandCtx";
import { QueryClient, QueryClientProvider, QueryCache } from "react-query";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
const setBands = jest.fn();
const bands: Array<Bands> = [];

function renderBandContext(band: Array<Bands>) {
  return render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryClientProvider client={queryClient}>
        <BandCtx.Provider value={{ bands, setBands }}>
          <BandTable />
        </BandCtx.Provider>
      </QueryClientProvider>
    </LocalizationProvider>
  );
}
// renderBandContext([{ rate: 0.15, owed: "$ 7,500", min: 50000 }]);
test("table is initially hidden", () => {
  renderBandContext([]);
  expect(screen.queryByText(/Taxes Form/i)).not.toBeInTheDocument();
});

test("table is shown with data", () => {
  renderBandContext([{ rate: 0.15, owed: "$ 7,500", min: 50000 }]);
  expect(screen.getByRole("th", { hidden: true })).toBeInTheDocument();
});
