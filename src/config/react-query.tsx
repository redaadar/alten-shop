import {
  QueryKey as TanstackQueryKey,
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import Axios, { AxiosError } from "axios";

export type ErrorAPI = {
  args: Array<unknown>;
  champ: string;
  cle: string;
  code: string;
  complement: {
    [x: string]: unknown;
  };
  codeErreur: string;
  dataValue: number;
  message: string;
  timestamp: string;
};

export type APIQueryOptions<
  Data,
  DataFromAPI = Data,
  Params = {},
  QueryKey extends TanstackQueryKey = TanstackQueryKey
> = {
  queryKey: QueryKey;
  params?: Params;
  config?: APIQueryConfig<Data>;
} & (
  | { url?: string; mockData: DataFromAPI }
  | { url: string; mockData?: never }
);

export type APIQueryConfig<Data> = Omit<
  UseQueryOptions<Data, AxiosError<ErrorAPI>>,
  "queryKey"
>;

export type APIQueryResult<Data> = UseQueryResult<Data, AxiosError<ErrorAPI>>;

export const useAPIQuery = <
  Data,
  DataFromAPI = Data,
  Params = {},
  QueryKey extends TanstackQueryKey = TanstackQueryKey
>({
  queryKey,
  url,
  params,
  config,
}: APIQueryOptions<Data, DataFromAPI, Params, QueryKey>) =>
  useQuery({
    queryKey,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queryFn: async () =>
      (await Axios.get(url, { params }).then((result) => result.data)) as any,
    ...config,
  });
