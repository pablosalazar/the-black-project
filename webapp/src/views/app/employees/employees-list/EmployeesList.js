import React, { useState, useEffect } from 'react';
import { Row, CardTitle } from 'reactstrap';
import {
  Colxx,
  Separator,
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { NavLink } from 'react-router-dom';
import Datatable from '../../../../components/common/datatable/Datatable';

import { getEmployees } from '../../../../api/employee.api';
import cols from './Columns';

function EmployeesList(props) {
  const [employees, setEmployees] = useState(null);
  const [totalRows, setTotalRows] = useState(0);
  const [totalFilteredRows, setTotalFilteredRows] = useState(0);
  const [search, setSearch] = useState('');
  const [paginator, setPaginator] = useState({
    pages: 0,
    page: 0,
    pageSize: 10,
    orderBy: 'id',
    order: 'asc',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getEmployees({ ...paginator }, search);
      setEmployees(result.data.data.data);
      setTotalRows(result.data.data.total);
      setIsLoading(false);
    };
    fetchData();
  }, [paginator]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getEmployees(
        {
          ...paginator,
          page: 0,
        },
        search
      );
      setEmployees(result.data.data.data);
      setTotalFilteredRows(result.data.data.total);
      setIsLoading(false);
    };

    fetchData();
  }, [search]);

  function handlePageChange(page) {
    setIsLoading(true);
    setPaginator({
      ...paginator,
      page: page,
    });
  }

  function handleSortChange(data) {
    if (data.length) {
      setIsLoading(true);
      setPaginator({
        ...paginator,
        orderBy: data[0].id,
        order: data[0].desc ? 'desc' : 'asc',
      });
    }
  }

  function handlePageSizeChange(size) {
    setIsLoading(true);
    setPaginator({
      ...paginator,
      page: 0,
      pageSize: size,
    });
  }

  function handleOnSearchKey(e) {
    if (e.key === 'Enter') {
      setIsLoading(true);
      setSearch(e.target.value.toLowerCase());
    }
  }

  function goToDetailPage(id) {
    props.history.push(`usuario/${id}`);
  }

  if (!employees) return <div className="loading" />;

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Empleados" match={props.match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <CardTitle>
            <h2 className="text-uppercase">Lista de usuarios</h2>
          </CardTitle>
          <div className="d-flex justify-content-between align-items-center my-4">
            <div className="search ">
              <input
                type="text"
                name="keyword"
                id="search"
                placeholder={'buscar...'}
                onKeyPress={(e) => handleOnSearchKey(e)}
                autoComplete="off"
              />
            </div>
            <NavLink to={'nuevo'} className="btn btn-primary">
              AGREGAR NUEVO <i className="fas fa-plus"></i>
            </NavLink>
          </div>
          <div className="separator mb-5" />
          <p className="text-right">
            {search.length === 0 ? (
              <span>Total usuarios: {totalRows}</span>
            ) : (
              <span>
                Se encontrarón {totalFilteredRows} de un total de {totalRows} de
                registros
              </span>
            )}
          </p>
          {isLoading && <div className="loading" />}
          <Datatable
            columns={cols}
            data={employees}
            pageCount={
              search.length
                ? Math.ceil(totalFilteredRows / paginator.pageSize)
                : Math.ceil(totalRows / paginator.pageSize)
            }
            defaultPageSize={paginator.pageSize}
            currentPage={paginator.page}
            startSortBy={paginator.orderBy}
            onSortChange={handleSortChange}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            goToDetailPage={(id) => goToDetailPage(id)}
            divided
          />
        </Colxx>
      </Row>
    </>
  );
}

export default EmployeesList;
