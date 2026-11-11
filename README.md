# FlowStock WMS — React 3PL / Fulfillment Admin Starter

A responsive **React + TypeScript** admin dashboard for multi-client, multi-warehouse 3PL fulfillment workflows. **Demo only:** a browser-based asynchronous mock API with localStorage persistence; no real backend, authentication, tenant isolation or carrier integration.

## Features

- Operations dashboard with inbound/outbound progress, inventory and low-stock warnings
- Client and warehouse filters across pages
- Product/SKU master (color, size, barcode)
- Inbound: expected → inspected → putaway (stock increments at putaway)
- Outbound: pending → picking → packing → shipped (available stock reserved at picking, deducted at shipment)
- Inventory: on-hand, allocated, available, manual adjustment with audit history in mock data
- Returns: received → inspected → restocked (stock increments at restock)
- Search, pagination, CSV export (UTF-8 BOM for Excel), add dialogs, responsive layout
- Mock data reset from Settings

## Requirements

- Node.js **20.19+ or 22.12+** and npm
- Git (for GitHub upload)

## Quick start

```bash
unzip wms-admin-starter.zip
cd wms-admin-starter
npm install
npm run dev
```

Open **http://localhost:5173**. No database or API server is required. On first visit, the app reads built-in sample data. Changes are saved to browser localStorage. Reset them under **시스템 설정 → 샘플 데이터 초기화**.

## Verification

```bash
npm run typecheck
npm run build
npm test
npm run preview
```

## Source layout

```
src/
  App.tsx                 # Router, mock state, filters
  components/Layout.tsx   # Navigation, client/warehouse filters
  components/UI.tsx       # Shared UI primitives
  data/types.ts           # Domain types
  data/seed.ts            # Deterministic demo dataset
  lib/mockApi.ts          # Async mock API, workflows, CSV export
  pages/Dashboard.tsx     # Operations overview
  pages/Operations.tsx    # Products/inbound/inventory/outbound/returns
  styles.css              # Responsive styling
```

## Demo workflow

1. Select a client and warehouse at the top (or choose All).
2. Create a product under **상품 / SKU**.
3. Create an inbound under **입고 관리**; press **검수 완료**, then **적치 확정**. Inventory increases on putaway.
4. Create an outbound under **출고 관리**; press **피킹 시작**, **패킹 시작**, **출고 확정**. Picking reserves stock; shipment deducts it.
5. Use **재고 관리** to review and adjust stock.
6. Use **반품 관리** to create a return against a *shipped* outbound, inspect and restock it.
7. Download filtered data as CSV. Refresh the page to verify localStorage persistence.

## Business rules and limitations

- Demo workflow is single-SKU per inbound/outbound order, not full multi-line order handling.
- Inventory is aggregated per product/warehouse/location. The sample does not implement FIFO/FEFO, lot/serial tracking, barcode scanning, wave picking, cross-docking or financial settlement.
- Picking checks available stock and reserves quantity. Shipment decreases both on-hand and reserved quantities.
- Inbound and return restocking increase stock once per state transition. A single-browser mock cannot provide concurrency guarantees.
- Returns are linked to a shipped outbound; quantity validation against historical shipped/returned quantities is not implemented.
- The top-level client selector is a UI filter **not a security boundary**. Never use this mock as a real multi-tenant backend.
- LocalStorage is browser-local and not suitable for real warehouse operations.
- The application does not process personal customer data from external systems; sample names are fictional.

## License

MIT. See `LICENSE`.
