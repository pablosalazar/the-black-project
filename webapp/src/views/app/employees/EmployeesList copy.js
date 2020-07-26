import React, { Component } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ReactTable from 'react-table';
import classnames from 'classnames';

import DataTablePagination from '../../../components/DatatablePagination';
import axios from 'axios';

const CustomTbodyComponent = (props) => (
  <div {...props} className={classnames('rt-tbody', props.className || [])}>
    <PerfectScrollbar options={{ suppressScrollX: true }}>
      {props.children}
    </PerfectScrollbar>
  </div>
);

const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

const dataTableColumns = [
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
    Header: 'Código de empleado',
    accessor: 'code',
  },
  {
    id: 'Full name',
    Header: 'Nombre completo',
    cellClass: 'list-item-heading',
    accessor: (row) => `${row.first_name} ${row.last_name}`,
  },
  {
    Header: 'Número de documento',
    accessor: 'document_number',
    accessor: (row) => formatNumber(row),
  },
  {
    Header: 'Cargo',
    accessor: 'job_title',
  },
  {
    Header: 'Teléfono',
    accessor: 'phone',
  },
];

export default class EmployeesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
    };
  }

  componentDidMount = () => {
    this.getEmployees();
  };

  getEmployees = async () => {
    try {
      const response = await axios.get('http://localhost/api/employees');
      this.setState({
        employees: response.data.data,
      });
    } catch (error) {}
  };
  render() {
    const { employees } = this.state;

    return (
      <Card className="mb-4">
        <CardBody>
          <CardTitle>Empleados</CardTitle>
          <ReactTable
            data={employees}
            // TbodyComponent={CustomTbodyComponent}
            paginationMaxSize={3}
            columns={dataTableColumns}
            defaultPageSize={10}
            showPageJump={false}
            showPageSizeOptions={false}
            PaginationComponent={DataTablePagination}
            className={''}
          />
        </CardBody>
      </Card>
    );
  }
}
