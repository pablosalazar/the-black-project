import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { NavLink } from 'react-router-dom';
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

import { createEmployee } from '../../api/employee.api';

const CreateSchema = Yup.object().shape({
  firstname: Yup.string().required('Este campo es obligatorio'),
  lastname: Yup.string().required('Este campo es obligatorio'),
  document_type: Yup.string().required('Este campo es obligatorio'),
  document_number: Yup.number()
    .typeError('Ingresa solo números')
    .required('Este campo es obligatorio'),
  gender: Yup.string().required('Este campo es obligatorio'),
  code: Yup.string().required('Este campo es obligatorio'),
  role: Yup.string().required('Este campo es obligatorio'),
  birthdate: Yup.date(),
  email: Yup.string()
    .required('Este campo es obligatorio')
    .email('Escribe un email válido'),
  username: Yup.string().required('Este campo es obligatorio'),
  password: Yup.string()
    .required('Este campo es obligatorio')
    .min(6, 'Demasiado corto!'),
});

const UpdateSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Demasiado corto!')
    .max(50, 'Demasiado Largo!')
    .required('Este campo es obligatorio'),
  role: Yup.string().required('Este campo es obligatorio'),
  document_type: Yup.string().required('Este campo es obligatorio'),
  document_number: Yup.number()
    .typeError('Ingresa solo números')
    .required('Este campo es obligatorio'),
  birthdate: Yup.date(),
  email: Yup.string()
    .required('Este campo es obligatorio')
    .email('Escribe un email válido'),
});

const EmployeeForm = (props) => {
  const { employee } = props;
  const [errorCredentials, setErrorCredentiales] = useState(false);
  const [error, setError] = useState(null);
  const isUpdate = employee ? true : false;

  const initialData = {
    photo: null,
    firstname: '',
    lastname: '',
    document_type: '',
    document_number: '',
    gender: '',
    nacionality: '',
    birthdate: '',
    phone: '',
    address: '',
    code: '',
    role: '',
    email: '',
    username: '',
    password: '',
    active: true,
  };

  const data = isUpdate ? employee : initialData;

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values) => {
    setError(null);
    try {
      setIsLoading(true);
      await createEmployee(values);
      history.push(`/app/empleados/lista`);
    } catch (error) {
      let errors = Object.values(error.response.data.error);
      errors = errors.map((error) => error[0]);
      window.scrollTo(0, 0);
      setError(errors);
    } finally {
      setIsLoading(false);
    }
  };

  const generateCredentials = (data, setFieldValue) => {
    setErrorCredentiales(null);
    const { firstname, lastname, document_number, code } = data;
    let first_firstname, second_firstname, first_lastname, second_lastname;
    if (!firstname || !lastname || !document_number || !code) {
      setErrorCredentiales(true);
      return null;
    }
    first_firstname = firstname.trim().split(' ')[0];
    second_firstname = firstname.trim().split(' ')[1];
    first_lastname = lastname.trim().split(' ')[0];
    second_lastname = lastname.trim().split(' ')[1];
    // Create username
    let username = firstname.substring(0, 2) + first_firstname.substring(0, 2);
    if (second_lastname) {
      username += second_lastname.substring(0, 2);
    }
    username += code;
    username = username.toLowerCase();
    // Create password
    let initialsName = first_firstname.substring(0, 1);
    if (second_firstname) {
      initialsName += second_firstname.substring(0, 1);
    }
    initialsName += first_lastname.substring(0, 1);
    if (second_lastname) {
      initialsName += second_lastname.substring(0, 1);
    }
    const password = document_number + initialsName.toUpperCase();
    setFieldValue('username', username);
    setFieldValue('password', password);
  };

  return (
    <Formik
      initialValues={data}
      validationSchema={isUpdate ? UpdateSchema : CreateSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, setFieldValue, values, errors, touched }) => (
        <Form className="av-tooltip tooltip-label-right">
          {isLoading && <div className="loading"></div>}
          <p className="text-right">
            Los campos marcados con (<span className="req">*</span>) son
            obligatorios
          </p>
          {error && (
            <div className="alert alert-warning">
              <p>Corrige los siguientes conflictos:</p>
              <ul>
                {error.map((error, index) => {
                  return <li key={index}>{error}</li>;
                })}
              </ul>
            </div>
          )}
          <Row>
            <div className="col-md-4">
              <Card>
                <CardBody>
                  <CardTitle className="text-primary">
                    Información personal
                  </CardTitle>
                  <FormGroup>
                    <Label>
                      Nombres <span className="req">*</span>
                    </Label>
                    <Field
                      className="form-control"
                      name="firstname"
                      value={values.firstname}
                    />
                    {errors.firstname && touched.firstname && (
                      <div className="f_error">{errors.firstname}</div>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      Apellidos <span className="req">*</span>
                    </Label>
                    <Field
                      className="form-control"
                      name="lastname"
                      value={values.lastname}
                    />
                    {errors.lastname && touched.lastname && (
                      <div className="f_error">{errors.lastname}</div>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      Tipo de documento <span className="req">*</span>
                    </Label>
                    <Field
                      as="select"
                      name="document_type"
                      className="form-control"
                      value={values.document_type}
                    >
                      <option value="">Seleccione una opción...</option>
                      <option value="C.C">Cedula de ciudadanía</option>
                      <option value="C.E">Cedula de extranjería</option>
                      <option value="T.I">Tarjeta de identidad</option>
                    </Field>
                    {errors.document_type && touched.document_type && (
                      <div className="f_error">{errors.document_type}</div>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      Número de documento <span className="req">*</span>
                    </Label>
                    <Field
                      className="form-control"
                      name="document_number"
                      value={values.document_number}
                    />
                    {errors.document_number && touched.document_number && (
                      <div className="f_error">{errors.document_number}</div>
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
                    {errors.birthdate && touched.birthdate && (
                      <div className="f_error">{errors.birthdate}</div>
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
                    {errors.address && touched.address && (
                      <div className="f_error">{errors.address}</div>
                    )}
                  </FormGroup>
                </CardBody>
              </Card>
            </div>

            <div className="col-md-4">
              <Card>
                <CardBody>
                  <CardTitle className="text-primary">
                    Información de empleado
                  </CardTitle>

                  <FormGroup>
                    <Label>
                      Código de empleado <span className="req">*</span>
                    </Label>
                    <Field
                      className="form-control"
                      name="code"
                      value={values.code}
                    />
                    {errors.code && touched.code && (
                      <div className="f_error">{errors.code}</div>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      Cargo <span className="req">*</span>
                    </Label>
                    <Field
                      as="select"
                      name="role"
                      className="form-control"
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
                </CardBody>
              </Card>
              <br />
              <Card>
                <CardBody>
                  <CardTitle className="text-primary">
                    Informacion de la cuenta
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
                    {errors.password && touched.password && (
                      <div className="f_error">{errors.password}</div>
                    )}
                  </FormGroup>

                  {errorCredentials && (
                    <div className="alert alert-info">
                      Para generar el usuario y la contraseña primero debes
                      ingresar el código, nombre, apellidos y número de
                      documento del empleado.
                    </div>
                  )}

                  <div className="text-right">
                    <Button
                      outline
                      type="button"
                      color="dark"
                      onClick={() => generateCredentials(values, setFieldValue)}
                      // disabled={loading}
                    >
                      Generar credenciales
                    </Button>
                  </div>

                  <FormGroup>
                    <h6 className="mb-4 text-primary">Estado de la cuenta</h6>
                    <div className="d-flex">
                      <Switch
                        className="custom-switch custom-switch-primary-inverse"
                        checked={Boolean(values.active)}
                        onChange={(value) => setFieldValue('active', value)}
                      />
                      {Boolean(values.active) ? (
                        <p className="mt-1 text-primary ml-2">ACTIVO</p>
                      ) : (
                        <p className="mt-1 text-muted ml-2">INACTIVO</p>
                      )}
                    </div>
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
