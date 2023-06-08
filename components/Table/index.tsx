import React from "react";
import styles from "./Table.module.css";
import { CryptoType } from "./types";

interface CryptoTableProps {
  data: CryptoType;
}
// Users must be able to sort the entries using market_cap, name, price, and
// circulating_supply

const CryptoTable = ({ data }: CryptoTableProps) => {
  const headers = [
    { id: "name" },
    { id: "symbol" },
    { id: "price" },
    { id: "percent_change_24h" },
    { id: "market_cap" },
    { id: "circulating_supply" },
  ];
  const handleRowClick = (id: number) => {
    console.log(`Clicked row with id ${id}`);
  };

  const handleHeaderClick = (header: string) => {
    console.log("header", header);
  };

  const handleFormatString = (s: string) =>
    s.charAt(0).toUpperCase() + s.replaceAll("_", " ").slice(1);

  const handleNumberFormat = (c: number) => new Intl.NumberFormat().format(c);

  const handlePercentStyle = (p: number) => `${p.toFixed(2)}%`;

  const handleCurrencyFormat = (c: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(c);

  return (
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
        {data.map((row) => (
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
  );
};

export default CryptoTable;
