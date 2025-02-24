import { APIQueryConfig, useAPIQuery } from "@/config/react-query";

import { ProductItem } from "@/components/Product/Product.type";

export const FAKER_ENDPOINT = "https://fakestoreapi.com";

export const useProducts = (config?: APIQueryConfig<Array<ProductItem>>) => {
  return useAPIQuery({
    queryKey: ["products"],
    url: `${FAKER_ENDPOINT}/products`,
    config: {
      ...config,
    },
  });
};
