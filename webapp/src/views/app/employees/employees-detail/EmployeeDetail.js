import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row } from 'reactstrap';
import {
  Colxx,
  Separator,
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';

import EmployeeForm from '../../../../containers/forms/EmployeeForm';

import { getEmployeeById } from '../../../../api/employee.api';

const EmployeeDetail = (props) => {
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const result = await getEmployeeById(id);
        setEmployee(result.data.data);
        setIsLoading(false);
      };

      fetchData();
    } else {
      setIsLoading(false);
    }
  }, []);

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
          {isLoading ? (
            <div className="loading"></div>
          ) : (
            <>
              <EmployeeForm employee={employee} />
            </>
          )}
        </Colxx>
      </Row>
    </>
  );
};

export default EmployeeDetail;
