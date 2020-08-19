import React from 'react';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';

import EmployeeForm from './EmployeeForm';

const EmployeeDetail = (props) => {
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
          <EmployeeForm />
        </Colxx>
      </Row>
    </>
  );
};

export default EmployeeDetail;
