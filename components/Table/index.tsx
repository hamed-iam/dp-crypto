import { useEffect, useState } from "react";
import styles from "./Table.module.css";
import { CryptoStatusType, CryptoType } from "./types";
import { useRouter } from "next/router";
import Pagination from "../Pagination";

interface CryptoTableProps {
  data: CryptoType;
  status: CryptoStatusType;
}
// Users must be able to sort the entries using market_cap, name, price, and
// circulating_supply
const headers = [
  { id: "name" },
  { id: "symbol" },
  { id: "price" },
  { id: "percent_change_24h" },
  { id: "market_cap" },
  { id: "circulating_supply" },
];

const CryptoTable = ({ data, status }: CryptoTableProps) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState("100");
  const [filteredCryptos, setFilteredCryptos] = useState(data);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleRowClick = (id: number) => {
    console.log(`Clicked row with id ${id}`);
  };

  const handleHeaderClick = async (header: string) => {
    router.replace({
      query: { ...router.query, sort: header, sort_dir: "desc" },
    });
    setIsRefreshing(true);
  };

  useEffect(() => {
    setIsRefreshing(false);
    setFilteredCryptos(data);
  }, [data]);

  // TODO: these functions can probably be moved into a utils dir, and combine all of them into one, but since this is just a test, did not do it.

  const handleFormatString = (s: string) =>
    s.charAt(0).toUpperCase() + s.replaceAll("_", " ").slice(1);

  const handleNumberFormat = (c: number) => new Intl.NumberFormat().format(c);

  const handlePercentStyle = (p: number) => `${p.toFixed(2)}%`;

  const handleCurrencyFormat = (c: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(c);

  const handleFilterFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuery(event.target.value);
    const value = event.target.value.toLowerCase();
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(value) ||
        item.symbol.toLowerCase().includes(value)
    );
    setFilteredCryptos(filtered);
  };

  const handleCalcPageNumber = (page: string | number) => {
    // const totalPages = Math.ceil(status.total_count / +itemsPerPage);

    const start = (currentPage - 1) * +itemsPerPage + 1;
    return start;
  };

  const handlePageChange = (page: any) => {
    setCurrentPage(page);

    router.replace({
      query: {
        ...router.query,
        start: handleCalcPageNumber(page),
        limit: +itemsPerPage,
      },
    });
    setIsRefreshing(true);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (+event.target.value > 5000) {
      return setItemsPerPage("5000");
    }
    if (+event.target.value < 10) {
      return setItemsPerPage("10");
    }
    return setItemsPerPage(event.target.value);
  };

  return (
    <div className={`${styles.tableCTR} ${isRefreshing ? styles.active : ""}`}>
      <input
        type="text"
        value={query}
        onChange={handleFilterFieldChange}
        placeholder="Filter by name or symbol"
      />
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                className={styles.header}
                key={header.id}
                onClick={() => handleHeaderClick(header.id)}
              >
                {handleFormatString(header.id)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredCryptos.map((row) => (
            <tr
              key={row.id}
              className={styles.row}
              onClick={() => handleRowClick(row.id)}
            >
              <td className={styles.cell}>{row.name}</td>
              <td className={styles.cell}>{row.symbol}</td>
              <td className={styles.cell}>
                {handleCurrencyFormat(row.quote.USD.price)}
              </td>
              <td className={styles.cell}>
                {handlePercentStyle(row.quote.USD.percent_change_24h)}
              </td>
              <td className={styles.cell}>
                {handleCurrencyFormat(row.quote.USD.market_cap)}
              </td>
              <td className={styles.cell}>
                {handleNumberFormat(row.circulating_supply)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <input
        type="number"
        max={2}
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
        placeholder="Items per page"
      />

      <Pagination
        totalPages={Math.ceil(status.total_count / 100)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CryptoTable;
