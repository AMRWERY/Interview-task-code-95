import type { Product, ApiResponse } from "@/types/products";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [] as Product[],
    isLoading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchProducts() {
      this.isLoading = true;
      this.error = null;

      try {
        const config = useRuntimeConfig();
        const res = await $fetch<ApiResponse>(config.public.PRODUCTS_JSON_URL);
        this.products = res.data;
      } catch (error: any) {
        this.error = error?.message || "Failed to fetch products";
      } finally {
        this.isLoading = false;
      }
    },
  },
});
