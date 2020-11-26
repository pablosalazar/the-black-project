import React, { useEffect } from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import DatatablePagination from './DatatablePagination';
import classnames from 'classnames';

const Datatable = ({
  columns,
  data,
  divided = false,
  defaultPageSize = 10,
  pageCount: controlledPageCount,
  currentPage,
  onSortChange,
  onPageChange,
  onPageSizeChange,
  startSortBy,
  goToDetailPage,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    setPageSize,
    state: { pageIndex, pageSize, sortBy },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: defaultPageSize,
        sortBy: [
          {
            id: startSortBy,
            desc: false,
          },
        ],
      },
      manualSortBy: true,
      manualPagination: true,
      pageCount: controlledPageCount,
    },
    useSortBy,
    usePagination,
  );

  useEffect(() => {
    onSortChange(sortBy);
  }, [sortBy]);

  return (
    <>
      <table
        {...getTableProps()}
        className={`table r-table ${classnames({
          'table-divided': divided,
        })}`}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  key={`th_${columnIndex}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? 'sorted-desc'
                        : 'sorted-asc'
                      : ''
                  }
                >
                  {column.render('Header')}
                  <span />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length}>
                <div className="alert alert-info mt-2">
                  No se encontrarón registros
                </div>
              </td>
            </tr>
          )}
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={() => goToDetailPage(row.values.id)}
              >
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={`td_${cellIndex}`}
                    {...cell.getCellProps({
                      className: cell.column.cellClass,
                    })}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      {data.length > 0 && (
        <DatatablePagination
          page={currentPage}
          pages={controlledPageCount}
          canPrevious={currentPage > 0}
          canNext={currentPage < controlledPageCount - 1}
          pageSizeOptions={[10, 20, 30, 40, 50]}
          showPageSizeOptions={true}
          showPageJump={true}
          defaultPageSize={pageSize}
          onPageChange={(p) => onPageChange(p)}
          onPageSizeChange={(s) => onPageSizeChange(s)}
          paginationMaxSize={8}
        />
      )}
    </>
  );
};

export default Datatable;
