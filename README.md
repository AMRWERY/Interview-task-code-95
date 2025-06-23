# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.




## Project Structure

### Components

- **navbar.vue**: Responsive navigation bar with logo, links, and search. Handles mobile menu toggling.
- **card-filter.vue**: Filter card for step-based (e.g., usage intensity, transport distance) or slider-based (e.g., load capacity) filtering. Emits changes to parent via v-model.
- **display-filters.vue**: Shows active filter tags. Users can remove tags to reset filters, which updates the store.
- **products-list.vue**: Displays a grid of product cards using data from the products store. Shows a skeleton loader (`product-cards-skeleton.vue`) while loading. Uses the `product-card.vue` component for each product.
- **product-card.vue**: Displays a single product’s image, name, code, and capacity. Receives a `product` prop.
- **product-cards-skeleton.vue**: Skeleton placeholder for product cards during loading.

### Pages

- **index.vue**: Main page. Renders the title and divider, filter cards, active filters, and filtered product list. Uses refs and watchers to sync filter UI with the products store.

### Store

- **stores/productsStore.ts**: Pinia store managing product/filter data and filter state.
  - **State:** Holds products, filters, selected filter values, and loading/error states.
  - **Actions:**
    - `fetchProducts`: Loads products from a remote JSON endpoint.
    - `fetchFilters`: Loads filter options from a remote endpoint.
    - `updateSelectedFilter`: Updates a filter value in the state.
  - **Getters:**
    - `filteredProducts`: Returns products filtered by the selected filter values.

### Types

- **types/products.ts**: TypeScript interfaces for product, API response, and filter response data structures.

---

## Application Flow

1. On page load, the main page fetches products and filter options via the store.
2. Users interact with filter cards. Changes are synced to the store.
3. The store computes `filteredProducts` based on selected filters, and the product list updates automatically.
4. Active filters are shown as tags, which can be removed to reset filters. Skeleton cards are shown while loading.

All UI is styled with Tailwind CSS and is responsive.

---
