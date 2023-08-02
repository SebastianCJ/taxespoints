import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import user from "@testing-library/user-event";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { TaxesForm } from "./TaxesForm";
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
          <TaxesForm />
        </BandCtx.Provider>
      </QueryClientProvider>
    </LocalizationProvider>
  );
}

test("calculate btn starts disabled", () => {
  renderBandContext([{ rate: 0.15, owed: "$ 7,500", min: 50000 }]);
  expect(screen.getByText(/Calculate Taxes/i)).toBeDisabled();
});

test("Bttn enabled when proper data is input", () => {
  const mockValues = {
    amount: "15000",
    year: "2022",
  };
  renderBandContext([{ rate: 0.15, owed: "$ 7,500", min: 50000 }]);
  act(() => {
    user.type(screen.getByTestId("annualIncome"), mockValues.amount);
    user.type(screen.getByLabelText("Tax Year"), mockValues.year);
  });

  expect(screen.getByText(/Calculate Taxes/i)).not.toBeDisabled();
});

test("Calculates owed tax", () => {
  const mockValues = {
    amount: "15000",
    year: "2022",
  };
  renderBandContext([{ rate: 0.15, owed: "$ 7,500", min: 50000 }]);
  fireEvent.click(screen.getByRole("button", { name: /Calculate Taxes/i }));
});
