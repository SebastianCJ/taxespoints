import { useQuery } from "react-query";
import { ApiClient } from "../api/apiClient";

export type Rates = {
  max?: number;
  min: number;
  rate: number;
};

export type GetTaxesQueryParams = {
  taxYear: string | number;
};

const QUERY_KEY = ["taxYear"];

const fetchTaxes = async (
  params: GetTaxesQueryParams
): Promise<Array<Rates> | any> => {
  const { data } = await ApiClient.GET(
    `/tax-calculator/tax-year/${params.taxYear}`
  );
  if (data.errors) {
    return data.errors[0];
  }
  return data;
};

export const useGetTaxes = (params: GetTaxesQueryParams) => {
  return useQuery<any, Error>(QUERY_KEY, () => fetchTaxes(params), {
    enabled: false,
  });
};
