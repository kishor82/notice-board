import React, { useState, useEffect } from "react";
import SortData from "../../utils/sortData";
import "./index.css";

const TableListing = ({ sortBy, direction = "DESC", data, columns = [] }) => {
  const [tableData, setTableData] = useState([]);
  const TableRow = ({ rowData, index }) => {
    return (
      <tr key={`table-${index}`}>
        {columns.map((currentRow, innerIndex) => {
          if (currentRow.render) {
            return (
              <td key={`table-td-${index}-${innerIndex}`}>
                <b>{currentRow.title}</b>
                {currentRow.render(rowData)}
              </td>
            );
          } else {
            return (
              <td key={`table-td-${index}-${innerIndex}`}>
                <b>{currentRow.title}</b>
                {rowData[currentRow.value] || "-"}
              </td>
            );
          }
        })}
      </tr>
    );
  };

  useEffect(() => {
    setTableData(SortData(data, sortBy, direction));
  }, []);

  return (
    <div>
      <table id="balanceTable0" className="respTable">
        <thead>
          <tr className="top">
            {columns.map((column, index) => (
              <th key={`${column.title}-${index}`} align="left">
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody id="accumTable">
          {tableData.map((tableData, index) => (
            <TableRow
              key={`table-row-${index}`}
              rowData={tableData}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableListing;
