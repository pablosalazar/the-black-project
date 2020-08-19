import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { NavLink, useHistory } from 'react-router-dom';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Button,
} from 'reactstrap';
import * as Yup from 'yup';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const UpdateSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Demasiado corto!')
    .max(50, 'Demasiado Largo!')
    .required('Este campo es obligatorio'),
  role: Yup.string().required('Este campo es obligatorio'),
  documentType: Yup.string().required('Este campo es obligatorio'),
  documentNumber: Yup.number()
    .typeError('Ingresa solo números')
    .required('Este campo es obligatorio'),
  birthDate: Yup.date(),
  email: Yup.string()
    .required('Este campo es obligatorio')
    .email('Escribe un email válido'),
});

const onSubmit = async (values) => {};

const EmployeeForm = () => {
  const data = {};
  return (
    <Formik
      initialValues={data}
      validationSchema={UpdateSchema}
      onSubmit={onSubmit}
    >
      {({
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        values,
        errors,
        touched,
        isSubmitting,
      }) => (
        <Form className="av-tooltip tooltip-label-right">
          <p className="text-right">
            Los campos marcados con (<span className="req">*</span>) son
            obligatorios
          </p>
          <Row>
            <div className="col-md-6">
              <Card>
                <CardBody>
                  <CardTitle className="text-primary">
                    Informacion personal
                  </CardTitle>
                  <FormGroup className="error-l-75">
                    <Label>
                      Nombre completo <span className="req">*</span>
                    </Label>
                    <Field
                      className="form-control"
                      name="name"
                      value={values.name}
                    />
                    {errors.name && touched.name ? (
                      <div className="invalid-feedback d-block">
                        {errors.name}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup className="error-l-75">
                    <Label>
                      Tipo de documento <span className="req">*</span>
                    </Label>
                    <Field
                      as="select"
                      name="documentType"
                      className="form-control"
                      value={values.documentType}
                    >
                      <option value="">Seleccione una opción...</option>
                      <option value="C.C">Cedula de ciudadanía</option>
                      <option value="C.E">Cedula de extranjería</option>
                      <option value="T.I">Tarjeta de identidad</option>
                    </Field>
                    {errors.documentType && touched.documentType ? (
                      <div className="invalid-feedback d-block">
                        {errors.documentType}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup className="error-l-75">
                    <Label>
                      Número de documento <span className="req">*</span>
                    </Label>
                    <Field
                      className="form-control"
                      name="documentNumber"
                      value={values.documentNumber}
                    />
                    {errors.documentNumber && touched.documentNumber ? (
                      <div className="invalid-feedback d-block">
                        {errors.documentNumber}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup className="error-l-75">
                    <Label>Número de teléfono</Label>
                    <Field
                      className="form-control"
                      name="phone"
                      value={values.phone}
                    />
                    {errors.phone && touched.phone ? (
                      <div className="invalid-feedback d-block">
                        {errors.phone}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup className="error-l-75">
                    <Label>Dirección</Label>
                    <Field
                      className="form-control"
                      name="address"
                      value={values.address}
                    />
                    {errors.address && touched.address ? (
                      <div className="invalid-feedback d-block">
                        {errors.address}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup className="error-l-75">
                    <Label>Fecha de nacimiento</Label>
                    <DatePicker
                      selected={
                        values.birthDate
                          ? moment(values.birthDate).toDate()
                          : null
                      }
                      name="birthdate"
                      onChange={(date) => setFieldValue('birthDate', date)}
                      placeholderText={'DD/MM/YYYY'}
                      autoComplete="off"
                      maxDate={new Date()}
                      showMonthDropdown
                      showYearDropdown
                    />
                    {errors.birthDate && touched.birthDate ? (
                      <div className="invalid-feedback d-block">
                        {errors.birthDate}
                      </div>
                    ) : null}
                  </FormGroup>
                </CardBody>
              </Card>
            </div>

            <div className="col-md-6">
              <Card>
                <CardBody>
                  <CardTitle className="text-primary">
                    Informacion de la cuenta
                  </CardTitle>
                  <FormGroup className="error-l-75">
                    <Label>
                      Email <span className="req">*</span>
                    </Label>
                    <Field
                      type="email"
                      className="form-control"
                      name="email"
                      value={values.email}
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="error-l-75">
                    <Label>
                      Contraseña <span className="req">*</span>
                    </Label>
                    <Field
                      type="password"
                      className="form-control"
                      name="password"
                      value={values.password}
                    />
                    {errors.password && touched.password ? (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    ) : null}
                  </FormGroup>
                </CardBody>
              </Card>
            </div>
          </Row>
          <div className="text-right">
            <NavLink to={'/app/empleados/lista'} className="btn btn-light mr-2">
              Cancelar
            </NavLink>
            <Button color="primary" type="submit">
              Guardar
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EmployeeForm;
