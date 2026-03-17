import { useState, useMemo, useCallback } from "react";
import {
  ComponentPage,
  Section,
  ExampleGrid,
} from "../docs/component-page";
import {
  HxTable,
  HxTablePagination,
  type HxColumnDef,
  type SortDirection,
} from "../ui/hx-table";
import { Badge } from "../ui/hx-badge";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

/* ═══════════════════════════════════════════════════════
   Mock data
   ═══════════════════════════════════════════════════════ */

interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  price: string;
  change24h: number;
  marketCap: string;
  volume: string;
  supply: string;
  category: string;
}

const cryptoData: CryptoAsset[] = [
  { id: "1", name: "Bitcoin", symbol: "BTC", price: "$67,842.30", change24h: 2.34, marketCap: "$1.33T", volume: "$28.4B", supply: "19.6M", category: "Layer 1" },
  { id: "2", name: "Ethereum", symbol: "ETH", price: "$3,521.18", change24h: -1.12, marketCap: "$423.1B", volume: "$14.2B", supply: "120.2M", category: "Layer 1" },
  { id: "3", name: "Tether", symbol: "USDT", price: "$1.00", change24h: 0.01, marketCap: "$110.6B", volume: "$52.3B", supply: "110.6B", category: "Stablecoin" },
  { id: "4", name: "BNB", symbol: "BNB", price: "$608.45", change24h: 1.87, marketCap: "$91.2B", volume: "$1.8B", supply: "149.5M", category: "Layer 1" },
  { id: "5", name: "Solana", symbol: "SOL", price: "$172.33", change24h: 5.62, marketCap: "$76.8B", volume: "$3.1B", supply: "445.8M", category: "Layer 1" },
  { id: "6", name: "XRP", symbol: "XRP", price: "$0.5234", change24h: -0.45, marketCap: "$28.9B", volume: "$1.2B", supply: "55.2B", category: "Payment" },
  { id: "7", name: "USDC", symbol: "USDC", price: "$1.00", change24h: 0.0, marketCap: "$26.1B", volume: "$5.8B", supply: "26.1B", category: "Stablecoin" },
  { id: "8", name: "Cardano", symbol: "ADA", price: "$0.4512", change24h: -2.31, marketCap: "$16.0B", volume: "$420.5M", supply: "35.4B", category: "Layer 1" },
  { id: "9", name: "Dogecoin", symbol: "DOGE", price: "$0.1623", change24h: 3.18, marketCap: "$23.2B", volume: "$1.5B", supply: "143.2B", category: "Meme" },
  { id: "10", name: "Avalanche", symbol: "AVAX", price: "$35.82", change24h: 4.21, marketCap: "$13.6B", volume: "$680.2M", supply: "379.2M", category: "Layer 1" },
  { id: "11", name: "Polkadot", symbol: "DOT", price: "$7.12", change24h: -1.55, marketCap: "$9.8B", volume: "$310.4M", supply: "1.4B", category: "Layer 0" },
  { id: "12", name: "Chainlink", symbol: "LINK", price: "$14.83", change24h: 2.76, marketCap: "$8.7B", volume: "$520.1M", supply: "587.1M", category: "Oracle" },
  { id: "13", name: "TRON", symbol: "TRX", price: "$0.1178", change24h: 0.92, marketCap: "$10.3B", volume: "$340.8M", supply: "87.4B", category: "Layer 1" },
  { id: "14", name: "Polygon", symbol: "MATIC", price: "$0.7124", change24h: -3.45, marketCap: "$6.6B", volume: "$290.3M", supply: "9.3B", category: "Layer 2" },
  { id: "15", name: "Uniswap", symbol: "UNI", price: "$7.52", change24h: 1.23, marketCap: "$4.5B", volume: "$180.7M", supply: "598.7M", category: "DeFi" },
  { id: "16", name: "Litecoin", symbol: "LTC", price: "$82.41", change24h: 0.67, marketCap: "$6.1B", volume: "$450.2M", supply: "74.1M", category: "Payment" },
  { id: "17", name: "Cosmos", symbol: "ATOM", price: "$8.93", change24h: -0.89, marketCap: "$3.5B", volume: "$145.6M", supply: "389.1M", category: "Layer 0" },
  { id: "18", name: "Near Protocol", symbol: "NEAR", price: "$5.82", change24h: 6.12, marketCap: "$6.3B", volume: "$380.4M", supply: "1.1B", category: "Layer 1" },
  { id: "19", name: "Aave", symbol: "AAVE", price: "$92.17", change24h: 3.44, marketCap: "$1.4B", volume: "$120.3M", supply: "14.9M", category: "DeFi" },
  { id: "20", name: "Stellar", symbol: "XLM", price: "$0.1134", change24h: -1.78, marketCap: "$3.2B", volume: "$95.1M", supply: "28.5B", category: "Payment" },
];

/* ── Simple team table data ─────────────────────────── */

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  location: string;
  status: string;
}

const teamData: TeamMember[] = [
  { id: "1", name: "Alice Chen", role: "Lead Engineer", department: "Engineering", location: "San Francisco", status: "Active" },
  { id: "2", name: "Bob Williams", role: "Designer", department: "Design", location: "New York", status: "Active" },
  { id: "3", name: "Carol Martinez", role: "PM", department: "Product", location: "London", status: "On Leave" },
  { id: "4", name: "David Kim", role: "Backend Dev", department: "Engineering", location: "Seoul", status: "Active" },
  { id: "5", name: "Eva Müller", role: "QA Lead", department: "Engineering", location: "Berlin", status: "Active" },
];

/* ═══════════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════════ */

export function TablePage() {
  /* ── Pagination state ──────────────────────────────── */
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(cryptoData.length / pageSize);
  const paginatedData = useMemo(
    () =>
      cryptoData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      ),
    [currentPage]
  );

  /* ── Sort state ────────────────────────────────────── */
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);
  const handleSort = useCallback(
    (colId: string, dir: SortDirection) => {
      setSortCol(dir ? colId : null);
      setSortDir(dir);
    },
    []
  );
  const sortedPageData = useMemo(() => {
    if (!sortCol || !sortDir) return paginatedData;
    return [...paginatedData].sort((a, b) => {
      const av = a[sortCol as keyof CryptoAsset];
      const bv = b[sortCol as keyof CryptoAsset];
      if (typeof av === "number" && typeof bv === "number")
        return sortDir === "asc" ? av - bv : bv - av;
      return sortDir === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
  }, [paginatedData, sortCol, sortDir]);

  /* ── Selection state ───────────────────────────────── */
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
    new Set()
  );
  const handleRowSelect = useCallback(
    (key: string | number, selected: boolean) => {
      setSelectedRows((prev) => {
        const next = new Set(prev);
        selected ? next.add(key) : next.delete(key);
        return next;
      });
    },
    []
  );
  const handleSelectAll = useCallback(
    (selected: boolean) => {
      if (selected) {
        setSelectedRows(new Set(sortedPageData.map((r) => r.id)));
      } else {
        setSelectedRows(new Set());
      }
    },
    [sortedPageData]
  );

  /* ── Columns ───────────────────────────────────────── */
  const cryptoColumns: HxColumnDef<CryptoAsset>[] = useMemo(
    () => [
      {
        id: "name",
        header: "Asset",
        sticky: true,
        minWidth: 160,
        sortable: true,
        cell: (row) => (
          <div className="flex flex-col">
            <span
              style={{
                fontWeight: "var(--font-weight-medium)",
                color: "var(--table-cell-fg)",
                fontFamily: "var(--font-family-supreme)",
              }}
            >
              {row.name}
            </span>
            <span
              style={{
                fontSize: "12px",
                color: "var(--table-cell-secondary-fg)",
                fontFamily: "var(--font-family-supreme)",
              }}
            >
              {row.symbol}
            </span>
          </div>
        ),
      },
      {
        id: "price",
        header: "Price",
        align: "right" as const,
        minWidth: 140,
        sortable: true,
        numeric: true,
      },
      {
        id: "change24h",
        header: "24h Change",
        align: "right" as const,
        minWidth: 140,
        numeric: true,
        cell: (row) => {
          const positive = row.change24h >= 0;
          return (
            <span
              className="inline-flex items-center gap-1"
              style={{
                color: positive
                  ? "var(--alert-success-icon)"
                  : "var(--danger-default)",
                fontFamily: "var(--font-family-mono)",
                fontWeight: "var(--font-weight-medium)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {positive ? (
                <ArrowUpRight size={14} />
              ) : (
                <ArrowDownRight size={14} />
              )}
              {positive ? "+" : ""}
              {row.change24h.toFixed(2)}%
            </span>
          );
        },
      },
      {
        id: "marketCap",
        header: "Market Cap",
        align: "right" as const,
        minWidth: 160,
        sortable: true,
        numeric: true,
      },
      {
        id: "volume",
        header: "Volume (24h)",
        align: "right" as const,
        minWidth: 160,
        numeric: true,
      },
      {
        id: "supply",
        header: "Circ. Supply",
        align: "right" as const,
        minWidth: 160,
        numeric: true,
      },
      {
        id: "category",
        header: "Category",
        minWidth: 110,
        cell: (row) => (
          <Badge
            variant={
              row.category === "Layer 1"
                ? "informational"
                : row.category === "Stablecoin"
                ? "success"
                : row.category === "DeFi"
                ? "purple"
                : row.category === "Meme"
                ? "warning"
                : row.category === "Payment"
                ? "olive"
                : "neutral-gray"
            }
          >
            {row.category}
          </Badge>
        ),
      },
    ],
    []
  );

  /* ── Simple columns (no sticky first col) ──────────── */
  const teamColumns: HxColumnDef<TeamMember>[] = useMemo(
    () => [
      { id: "name", header: "Name", minWidth: 160, sortable: true },
      { id: "role", header: "Role", minWidth: 140 },
      { id: "department", header: "Department", minWidth: 130 },
      { id: "location", header: "Location", minWidth: 130 },
      {
        id: "status",
        header: "Status",
        minWidth: 100,
        cell: (row) => (
          <Badge
            variant={row.status === "Active" ? "success" : "warning"}
            indicator={row.status === "Active" ? "green" : "yellow"}
          >
            {row.status}
          </Badge>
        ),
      },
    ],
    []
  );

  /* ── Wide columns for horizontal scroll demo ──────── */
  const wideColumns: HxColumnDef<CryptoAsset>[] = useMemo(
    () => [
      {
        id: "name",
        header: "Asset",
        sticky: true,
        minWidth: 180,
        cell: (row) => (
          <div className="flex flex-col">
            <span
              style={{
                fontWeight: "var(--font-weight-medium)",
                color: "var(--table-cell-fg)",
                fontFamily: "var(--font-family-supreme)",
              }}
            >
              {row.name}
            </span>
            <span
              style={{
                fontSize: "12px",
                color: "var(--table-cell-secondary-fg)",
                fontFamily: "var(--font-family-supreme)",
              }}
            >
              {row.symbol}
            </span>
          </div>
        ),
      },
      { id: "price", header: "Price", align: "right" as const, minWidth: 140, numeric: true },
      {
        id: "change24h",
        header: "24h Change",
        align: "right" as const,
        minWidth: 140,
        numeric: true,
        cell: (row) => {
          const positive = row.change24h >= 0;
          return (
            <span
              className="inline-flex items-center gap-1"
              style={{
                color: positive
                  ? "var(--alert-success-icon)"
                  : "var(--danger-default)",
                fontFamily: "var(--font-family-mono)",
                fontWeight: "var(--font-weight-medium)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {positive ? (
                <ArrowUpRight size={14} />
              ) : (
                <ArrowDownRight size={14} />
              )}
              {positive ? "+" : ""}
              {row.change24h.toFixed(2)}%
            </span>
          );
        },
      },
      { id: "marketCap", header: "Market Cap", align: "right" as const, minWidth: 160, numeric: true },
      { id: "volume", header: "Volume (24h)", align: "right" as const, minWidth: 160, numeric: true },
      { id: "supply", header: "Circ. Supply", align: "right" as const, minWidth: 160, numeric: true },
      {
        id: "category",
        header: "Category",
        minWidth: 130,
        cell: (row) => (
          <Badge
            variant={
              row.category === "Layer 1"
                ? "informational"
                : row.category === "Stablecoin"
                ? "success"
                : row.category === "DeFi"
                ? "purple"
                : row.category === "Meme"
                ? "warning"
                : row.category === "Payment"
                ? "olive"
                : "neutral-gray"
            }
          >
            {row.category}
          </Badge>
        ),
      },
    ],
    []
  );

  return (
    <ComponentPage
      name="Table"
      description="Tables display structured data in rows and columns. They support sticky headers, a sticky first column for horizontal scrolling, sorting, row selection, striped/bordered variants, and integrated pagination."
    >
      {/* ── Basic ──────────────────────────────────── */}
      <Section
        title="Basic"
        description="A simple table with hover highlighting and default styling."
      >
        <ExampleGrid label="Default">
          <HxTable columns={teamColumns} data={teamData} rowKey={(r) => r.id} />
        </ExampleGrid>
      </Section>

      {/* ── Striped & Bordered ─────────────────────── */}
      <Section
        title="Variants"
        description="Striped rows improve readability for dense data. Bordered cells add visual separation."
      >
        <ExampleGrid label="Striped">
          <HxTable
            columns={teamColumns}
            data={teamData}
            rowKey={(r) => r.id}
            striped
          />
        </ExampleGrid>
        <ExampleGrid label="Bordered">
          <HxTable
            columns={teamColumns}
            data={teamData}
            rowKey={(r) => r.id}
            bordered
          />
        </ExampleGrid>
        <ExampleGrid label="Dense">
          <HxTable
            columns={teamColumns}
            data={teamData}
            rowKey={(r) => r.id}
            dense
            striped
          />
        </ExampleGrid>
      </Section>

      {/* ── Sticky first column ────────────────────── */}
      <Section
        title="Sticky First Column"
        description="When the table overflows horizontally, the first column stays pinned so users can always identify each row. Scroll right to see the shadow effect."
      >
        <ExampleGrid label="Scroll horizontally">
          <div style={{ maxWidth: "100%" }}>
            <HxTable
              columns={wideColumns}
              data={cryptoData.slice(0, 10)}
              rowKey={(r) => r.id}
            />
          </div>
        </ExampleGrid>
      </Section>

      {/* ── Sticky header (vertical scroll) ────────── */}
      <Section
        title="Sticky Header"
        description="Set a max height to enable vertical scrolling with a sticky header row."
      >
        <ExampleGrid label="Max height 340px">
          <HxTable
            columns={wideColumns}
            data={cryptoData}
            rowKey={(r) => r.id}
            maxHeight="340px"
            striped
          />
        </ExampleGrid>
      </Section>

      {/* ── Sorting ────────────────────────────────── */}
      <Section
        title="Sorting"
        description="Click a sortable column header to cycle through ascending, descending, and unsorted states."
      >
        <ExampleGrid label="Sortable columns">
          <div className="flex flex-col w-full" style={{ gap: "var(--space-5)" }}>
            <HxTable
              columns={cryptoColumns}
              data={sortedPageData}
              rowKey={(r) => r.id}
              sortColumn={sortCol}
              sortDirection={sortDir}
              onSort={handleSort}
            />
            <HxTablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={cryptoData.length}
              pageSize={pageSize}
            />
          </div>
        </ExampleGrid>
      </Section>

      {/* ── Row Selection ──────────────────────────── */}
      <Section
        title="Row Selection"
        description="Checkboxes on each row allow single or bulk selection. The header checkbox supports select-all and indeterminate states."
      >
        <ExampleGrid label="Selectable rows">
          <div className="flex flex-col w-full" style={{ gap: "var(--space-5)" }}>
            <HxTable
              columns={cryptoColumns}
              data={sortedPageData}
              rowKey={(r) => r.id}
              selectedRows={selectedRows}
              onRowSelect={handleRowSelect}
              onSelectAll={handleSelectAll}
              sortColumn={sortCol}
              sortDirection={sortDir}
              onSort={handleSort}
            />
            <div className="flex items-center justify-between">
              <span
                style={{
                  fontSize: "var(--text-label)",
                  color: "var(--color-text-tertiary)",
                  fontFamily: "var(--font-family-supreme)",
                }}
              >
                {selectedRows.size} row{selectedRows.size !== 1 ? "s" : ""}{" "}
                selected
              </span>
              <HxTablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={cryptoData.length}
                pageSize={pageSize}
              />
            </div>
          </div>
        </ExampleGrid>
      </Section>

      {/* ── Loading ────────────────────────────────── */}
      <Section
        title="Loading State"
        description="A skeleton animation fills each cell while data is being fetched."
      >
        <ExampleGrid label="Loading">
          <HxTable
            columns={teamColumns}
            data={[]}
            loading
            loadingRows={4}
          />
        </ExampleGrid>
      </Section>

      {/* ── Empty ──────────────────────────────────── */}
      <Section
        title="Empty State"
        description="An empty table shows a centered fallback message."
      >
        <ExampleGrid label="No data">
          <HxTable columns={teamColumns} data={[]} />
        </ExampleGrid>
      </Section>

      {/* ── Pagination standalone ──────────────────── */}
      <Section
        title="Pagination"
        description="The pagination bar can be used independently below any table. It shows item ranges, page numbers with ellipsis, and first/last/prev/next controls."
      >
        <ExampleGrid label="Standalone pagination">
          <HxTablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={cryptoData.length}
            pageSize={pageSize}
          />
        </ExampleGrid>
      </Section>
    </ComponentPage>
  );
}