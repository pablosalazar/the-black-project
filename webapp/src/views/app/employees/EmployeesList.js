import React, { useState, useEffect } from 'react';
import { Card, CardBody } from 'reactstrap';
import { useTable, usePagination, useSortBy } from 'react-table';
import axios from 'axios';
import classnames from 'classnames';
import DatatablePagination from '../../../components/DatatablePagination';

const cols = [
  {
    Header: 'Foto',
    accessor: 'photo',
    Cell: (props) => (
      <figure
        className="avatar"
        style={{
          backgroundImage: `url(http://localhost/img/default.png)`,
        }}
      />
    ),
  },
  {
    Header: 'Nombres',
    accessor: 'first_name',
  },
  {
    Header: 'Apellidos',
    accessor: 'last_name',
  },
  {
    Header: 'Código de empleado',
    accessor: 'code',
  },
  {
    Header: 'Cargo',
    accessor: 'job_title',
  },
  {
    Header: 'Número de documento',
    accessor: 'document_number',
  },
  {
    Header: 'Teléfono',
    accessor: 'phone',
  },
];

const Table = ({ columns, data, divided = false, defaultPageSize = 10 }) => {
  console.log(columns);
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: defaultPageSize,
        sortBy: [
          {
            id: 'title',
          },
        ],
      },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <table
        {...getTableProps()}
        className={`r-table order-with-arrow table table-hover${classnames({
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
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
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

      <DatatablePagination
        page={pageIndex}
        pages={pageCount}
        canPrevious={canPreviousPage}
        canNext={canNextPage}
        pageSizeOptions={[4, 10, 20, 30, 40, 50]}
        showPageSizeOptions={false}
        showPageJump={false}
        defaultPageSize={pageSize}
        onPageChange={(p) => gotoPage(p)}
        onPageSizeChange={(s) => setPageSize(s)}
        paginationMaxSize={pageCount}
      />
    </>
  );
};

const EmployeesList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost/api/employees');
      console.log(result.data.data);
      setData(result.data.data);
    };

    fetchData();
  }, []);

  return (
    <Card className="mb-4">
      <CardBody>
        {/* <CardTitle>Lista de Empleados</CardTitle> */}
        <Table columns={cols} data={data} />
      </CardBody>
    </Card>
  );
};

export default EmployeesList;
