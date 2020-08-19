import React, { useState, useEffect } from 'react';
import { Row, Card, CardBody, CardTitle } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { NavLink } from 'react-router-dom';
// import Datatable from '../../../../../components/common/datatable/Datatable';

import { getEmployees } from '../../../api/employee.api';
// import cols from './columns';

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

  useEffect(() => {
    // const fetchData = async () => {
    //   const result = await getUsers({ ...paginator }, search);
    //   setUsers(result.data.data);
    //   setTotalRows(result.data.total);
    // };
    // fetchData();
  }, [paginator]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUsers(
        {
          ...paginator,
          page: 0,
        },
        search
      );
      setUsers(result.data.data);
      setTotalRows(result.data.total);
      setTotalFilteredRows(result.data.filteredTotal);
    };

    // fetchData();
  }, [search]);

  function handlePageChange(page) {
    setPaginator({
      ...paginator,
      page: page,
    });
  }

  function handleSortChange(data) {
    if (data.length) {
      setPaginator({
        ...paginator,
        orderBy: data[0].id,
        order: data[0].desc ? 'desc' : 'asc',
      });
    }
  }

  function handlePageSizeChange(size) {
    setPaginator({
      ...paginator,
      page: 0,
      pageSize: size,
    });
  }

  function handleOnSearchKey(e) {
    if (e.key === 'Enter') {
      setSearch(e.target.value.toLowerCase());
    }
  }

  function goToDetailPage(id) {
    props.history.push(`usuario/${id}`);
  }

  // if (!users) return <div className="loading" />;

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
          {/* <Card>
            <CardBody> */}
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
          {/* <Datatable
                columns={cols}
                data={users}
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
              /> */}
          {/* </CardBody>
          </Card> */}
        </Colxx>
      </Row>
    </>
  );
}

export default EmployeesList;
