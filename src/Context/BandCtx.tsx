import { createContext } from "react";
interface BandContext {
  bands: Array<Bands>;
  setBands: React.Dispatch<React.SetStateAction<Array<Bands>>>;
}
export type Bands = {
  rate: number | string;
  owed: string;
  min: number | string;
};

const iBandsContextState = {
  bands: [],
  setBands: () => {},
};

export const BandCtx = createContext<BandContext>(iBandsContextState);
