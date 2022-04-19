import React, { useState, useEffect } from "react";
import SortData from "../../utils/sortData";
import "./index.css";

const TableListing = ({ sortBy, direction = "DESC", data, columns = [] }) => {
  const [tableData, setTableData] = useState([]);

  function responsiveTable() {
    // Cycle each table with class respTable
    const respTable = document.getElementsByClassName("respTable");
    for (let i = 0; i < respTable.length; i++) {
      // Each Heading in row
      const tableHeader = respTable[i].getElementsByTagName("TH");
      for (let h = 0; h < tableHeader.length; h++) {
        // Each row in header column
        const header = tableHeader[h].innerHTML.trim();
        const tableRow = respTable[i].getElementsByTagName("TR");
        for (let r = 0; r < tableRow.length; r++) {
          // Same column as header column
          const tableCol = tableRow[r].getElementsByTagName("TD");
          for (let c = 0; c < tableCol.length; c++) {
            let skip = false;
            if (c == h) {
              if (skip) continue;
              const cellInner = tableCol[h].innerHTML;
              let respCell = "";
              respCell += "<b>" + header + "</b>";
              respCell += cellInner;
              tableCol[h].innerHTML = respCell;
              skip = true;
            }
          }
        }
      }
    }
  }

  const TableRow = ({ rowData, index }) => {
    return (
      <tr key={`table-${index}`}>
        {columns.map((currentRow, innerIndex) => {
          if (currentRow.render) {
            return (
              <td key={`table-td-${index}-${innerIndex}`}>
                {currentRow.render.call(rowData)}
              </td>
            );
          } else {
            return (
              <td key={`table-td-${index}-${innerIndex}`}>
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

  useEffect(() => {
    // For responsive table view
    responsiveTable();
  }, [tableData]);

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
