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

import { createEmployee } from '../../../api/employee.api';

const CreateSchema = Yup.object().shape({
  // name: Yup.string()
  //   .min(2, 'Demasiado corto!')
  //   .max(50, 'Demasiado Largo!')
  //   .required('Este campo es obligatorio'),
  // documentType: Yup.string().required('Este campo es obligatorio'),
  // documentNumber: Yup.number()
  //   .typeError('Ingresa solo números')
  //   .required('Este campo es obligatorio'),
  // gender: Yup.string().required('Este campo es obligatorio'),
  // birthdate: Yup.date(),
  // email: Yup.string()
  //   .required('Este campo es obligatorio')
  //   .email('Escribe un email válido'),
  // password: Yup.string()
  //   .required('Este campo es obligatorio')
  //   .min(6, 'Demasiado corto!'),
  // role: Yup.string().required('Este campo es obligatorio'),
});

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
  birthdate: Yup.date(),
  email: Yup.string()
    .required('Este campo es obligatorio')
    .email('Escribe un email válido'),
});

const EmployeeForm = (props) => {
  const { employee } = props;
  const isUpdate = employee ? true : false;
  const initialData = {
    photo: null,
    name: '',
    documentType: '',
    documentNumber: '',
    gender: '',
    birthdate: '',
    phone: '',
    address: '',
    email: '',
    password: '',
    isActive: true,
  };

  const onSubmit = async (values) => {
    try {
      await createEmployee(values);
    } catch (error) {
      const errors = error.response.data.errors;
      console.log(Object.values(errors));
    }
  };

  return (
    <Formik
      initialValues={initialData}
      validationSchema={isUpdate ? UpdateSchema : CreateSchema}
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
            <div className="col-md-4">
              <Card>
                <CardBody>
                  <CardTitle className="text-primary">
                    Informacion personal
                  </CardTitle>
                  <FormGroup>
                    <Label>
                      Nombre completo <span className="req">*</span>
                    </Label>
                    <Field
                      className="form-control"
                      name="name"
                      value={values.name}
                    />
                    {errors.name && touched.name && (
                      <div className="f_error">{errors.name}</div>
                    )}
                  </FormGroup>
                  <FormGroup>
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
                    {errors.documentType && touched.documentType && (
                      <div className="f_error">{errors.documentType}</div>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      Número de documento <span className="req">*</span>
                    </Label>
                    <Field
                      className="form-control"
                      name="documentNumber"
                      value={values.documentNumber}
                    />
                    {errors.documentNumber && touched.documentNumber && (
                      <div className="f_error">{errors.documentNumber}</div>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      Género <span className="req">*</span>
                    </Label>
                    <Field
                      as="select"
                      className="form-control"
                      name="gender"
                      value={values.gender}
                    >
                      <option value="">-- Seleccione una opción --</option>
                      <option value="Hombre">Hombre</option>
                      <option value="Mujer">Mujer</option>
                    </Field>
                    {errors.gender && touched.gender && (
                      <div className="f_error">{errors.gender}</div>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>Nacionalidad</Label>
                    <Field
                      className="form-control"
                      name="nacionality"
                      value={values.nacionality}
                    />
                    {errors.nacionality && touched.nacionality && (
                      <div className="f_error">{errors.nacionality}</div>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>Fecha de nacimiento</Label>
                    <DatePicker
                      selected={
                        values.birthdate
                          ? moment(values.birthdate).toDate()
                          : null
                      }
                      name="birthdate"
                      onChange={(date) => setFieldValue('birthdate', date)}
                      placeholderText={'DD/MM/YYYY'}
                      autoComplete="off"
                      maxDate={new Date()}
                      showMonthDropdown
                      showYearDropdown
                    />
                    {errors.birthdate && touched.birthdate ? (
                      <div className="f_error">{errors.birthdate}</div>
                    ) : null}
                  </FormGroup>
                </CardBody>
              </Card>
            </div>

            <div className="col-md-4">
              <Card>
                <CardBody>
                  <CardTitle className="text-primary">
                    Informacion de la cuenta
                  </CardTitle>

                  <FormGroup>
                    <Label>
                      Nombre de usuario <span className="req">*</span>
                    </Label>
                    <Field
                      className="form-control"
                      name="username"
                      value={values.username}
                    />
                    {errors.username && touched.username && (
                      <div className="f_error">{errors.username}</div>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      Contraseña <span className="req">*</span>
                    </Label>
                    <Field
                      type="password"
                      className="form-control"
                      name="password"
                      value={values.password}
                      autoComplete="off"
                    />
                    {errors.password && touched.password ? (
                      <div className="f_error">{errors.password}</div>
                    ) : null}
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      Cargo <span className="req">*</span>
                    </Label>
                    <Field
                      as="select"
                      className="form-control"
                      name="role"
                      value={values.role}
                    >
                      <option value="">-- Seleccione una opción --</option>
                      <option value="Administrativo">Administrativo</option>
                      <option value="Analista">Analista</option>
                      <option value="Jefe de operaciones">
                        Jefe de operaciones
                      </option>
                      <option value="Coordinador logístico">
                        Coordinador logístico{' '}
                      </option>
                      <option value="Supervisor">Supervisor</option>
                      <option value="Líder de punto">Líder de punto</option>
                      <option value="Operario">Operario</option>
                    </Field>
                    {errors.role && touched.role && (
                      <div className="f_error">{errors.role}</div>
                    )}
                  </FormGroup>

                  <div className="text-right">
                    <Button
                      outline
                      type="button"
                      color="dark"
                      // onClick={this.generateCredentials}
                      // disabled={loading}
                    >
                      Generar credenciales
                    </Button>
                  </div>
                </CardBody>
              </Card>
              <br />
              <Card>
                <CardBody>
                  <CardTitle className="text-primary">
                    Datos de contacto
                  </CardTitle>

                  <FormGroup>
                    <Label>
                      Email <span className="req">*</span>
                    </Label>
                    <Field
                      className="form-control"
                      name="email"
                      value={values.email}
                    />
                    {errors.email && touched.email && (
                      <div className="f_error">{errors.email}</div>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>Teléfono</Label>
                    <Field
                      className="form-control"
                      name="phone"
                      value={values.phone}
                    />
                    {errors.phone && touched.phone && (
                      <div className="f_error">{errors.phone}</div>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>Dirección</Label>
                    <Field
                      className="form-control"
                      name="address"
                      value={values.address}
                    />
                    {errors.address && touched.address ? (
                      <div className="f_error">{errors.address}</div>
                    ) : null}
                  </FormGroup>
                </CardBody>
              </Card>
            </div>
            <div className="col-md-4">
              <Card>
                <CardBody>
                  <CardTitle className="text-primary">
                    Referencia personal
                  </CardTitle>

                  <FormGroup>
                    <Label>Nombre </Label>
                    <Field
                      className="form-control"
                      name="contact_name"
                      value={values.contact_name}
                    />
                    {errors.contact_name && touched.contact_name && (
                      <div className="f_error">{errors.contact_name}</div>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>Parentesco</Label>
                    <Field
                      className="form-control"
                      name="contact_relationship"
                      value={values.contact_relationship}
                    />
                    {errors.contact_relationship &&
                      touched.contact_relationship && (
                        <div className="f_error">
                          {errors.contact_relationship}
                        </div>
                      )}
                  </FormGroup>

                  <FormGroup>
                    <Label>Número de teléfono</Label>
                    <Field
                      className="form-control"
                      name="contact_number"
                      value={values.contact_number}
                    />
                    {errors.contact_number && touched.contact_number && (
                      <div className="f_error">{errors.contact_number}</div>
                    )}
                  </FormGroup>
                </CardBody>
              </Card>
            </div>
          </Row>
          <div className="text-right mt-3">
            <NavLink to={'/app/empleados/lista'} className="btn btn-light mr-2">
              Cancelar
            </NavLink>
            <Button type="submit" color="primary">
              Guardar
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EmployeeForm;
