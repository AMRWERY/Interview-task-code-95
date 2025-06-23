import type { Product, ApiResponse, FilterResponse } from "@/types/products";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [] as Product[],
    filters: [] as FilterResponse[],
    selectedFilters: {
      usageIntensity: null as number | null,
      transportDistance: null as number | null,
      loadCapacityMin: 0,
      loadCapacityMax: 12000,
    },
    filtersLoading: false,
    filtersError: null as string | null,
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

    async fetchFilters() {
      this.filtersLoading = true;
      this.filtersError = null;
      try {
        const config = useRuntimeConfig();
        const res = await $fetch<{ status: boolean; data: FilterResponse[] }>(
          config.public.PRODUCTS_FILTERS_URL
        );
        this.filters = res.data;
      } catch (error: any) {
        this.filtersError = error?.message || "Failed to fetch filters";
      } finally {
        this.filtersLoading = false;
      }
    },

    updateSelectedFilter(key: keyof typeof this.selectedFilters, value: any) {
      this.selectedFilters[key] = value;
    },
  },

  getters: {
    filteredProducts: (state) => {
      return state.products.filter((product) => {
        const usageIntensity = state.selectedFilters.usageIntensity;
        const transportDistance = state.selectedFilters.transportDistance;

        const matchesUsage =
          usageIntensity === null ||
          product.selectTypes.some(
            (s) =>
              s.slug === "usage-intensity" &&
              Number(s.values?.value) === usageIntensity
          );

        const matchesDistance =
          transportDistance === null ||
          product.selectTypes.some(
            (s) =>
              s.slug === "transport-distance" &&
              Number(s.values?.value) === transportDistance
          );

        const loadCap = product.numericTypes.find(
          (n) => n.slug === "load-capacity"
        );
        const numericCapacity = loadCap ? parseFloat(loadCap.value) : null;

        const matchesCapacity =
          numericCapacity !== null &&
          numericCapacity >= state.selectedFilters.loadCapacityMin &&
          numericCapacity <= state.selectedFilters.loadCapacityMax;

        return matchesUsage && matchesDistance && matchesCapacity;
      });
    },

    activeFilterTags(state) {
      const tags = [];
      if (state.selectedFilters.usageIntensity !== null) {
        tags.push({
          key: "usageIntensity",
          label: `Usage Intensity: ${
            ["Low", "", "Medium", "", "High"][
              state.selectedFilters.usageIntensity
            ]
          }`,
        });
      }
      if (state.selectedFilters.transportDistance !== null) {
        tags.push({
          key: "transportDistance",
          label: `Transport Distance: ${
            ["Short", "", "Medium", "", "Long"][
              state.selectedFilters.transportDistance
            ]
          }`,
        });
      }
      if (
        state.selectedFilters.loadCapacityMin > 0 ||
        state.selectedFilters.loadCapacityMax < 12000
      ) {
        tags.push({
          key: "loadCapacity",
          label: `Load Capacity: ${state.selectedFilters.loadCapacityMin} - ${state.selectedFilters.loadCapacityMax} Kg`,
        });
      }
      return tags;
    },
  },
});
