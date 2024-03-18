// TableComponent.js
import React from 'react';
import { useTable, useBlockLayout } from 'react-table';
import { VariableSizeList } from 'react-window';

const TableComponent = ({ data }) => {
  const columns = React.useMemo(
    () => {
      if (data.length === 0) return [];

      // Generate columns dynamically based on keys in the first data entry
      return Object.keys(data[0]).map(key => ({
        Header: key,
        accessor: key,
        // Add filtering options if needed
      }));
    }, 
    [data]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useBlockLayout);

  return (
    <div {...getTableProps()} style={{ height: '500px', overflowY: 'auto' }}>
      <VariableSizeList
        height={500}
        itemCount={rows.length}
        itemSize={index => 35} // Adjust as needed
        width={1000} // Adjust as needed
      >
        {({ index, style }) => {
          const row = rows[index];
          prepareRow(row);
          return (
            <div {...row.getRowProps()} style={style}>
              {row.cells.map(cell => (
                <div {...cell.getCellProps()}>{cell.render('Cell')}</div>
              ))}
            </div>
          );
        }}
      </VariableSizeList>
    </div>
  );
};

export default TableComponent;
