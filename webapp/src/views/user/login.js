import React, { Component } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { NotificationManager } from '../../components/common/react-notifications';
import { Formik, Form, Field } from 'formik';

import { loginUser } from '../../redux/actions';
import { Colxx } from '../../components/common/CustomBootstrap';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'admin@theblackps.com',
      password: 'secret',
    };
  }

  onUserLogin = (values) => {
    if (!this.props.loading) {
      if (values.email !== '' && values.password !== '') {
        this.props.loginUser(values, this.props.history);
      }
    }
  };

  validateEmail = (value) => {
    let error;
    if (!value) {
      error = 'Este campo es obligatorio';
    }
    return error;
  };

  validatePassword = (value) => {
    let error;
    if (!value) {
      error = 'Este campo es obligatorio';
    } else if (value.length < 4) {
      error = 'Value must be longer than 3 characters';
    }
    return error;
  };

  componentDidUpdate() {
    if (this.props.error) {
      NotificationManager.warning(
        this.props.error,
        'Login Error',
        3000,
        null,
        null,
        ''
      );
    }
  }

  render() {
    const { password, email } = this.state;
    const initialValues = { email, password };

    return (
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side d-none d-sm-block">
              <p className="text-white h2">THE BLACK PARKING SERVICE</p>
              <p className="white mb-0">
                Por favor ingresa tus datos de acceso.
              </p>
            </div>
            <div className="form-side">
              <NavLink to={`/`} className="white">
                <span className="logo-single" />
                <p className="text-white h2 mb-4 text-primary d-block d-sm-none">
                  THE BLACK PARKING SERVICE
                </p>
              </NavLink>
              <CardTitle className="mb-4">Iniciar sesión</CardTitle>

              <Formik initialValues={initialValues} onSubmit={this.onUserLogin}>
                {({ errors, touched }) => (
                  <Form className="av-tooltip tooltip-label-right">
                    <FormGroup className="form-group error-l-200">
                      <Field
                        className="form-control"
                        name="email"
                        placeholder="Usuario o correo electrónico"
                        validate={this.validateEmail}
                      />
                      {errors.email && touched.email && (
                        <div className="d-block text-danger">
                          {errors.email}
                        </div>
                      )}
                    </FormGroup>
                    <FormGroup className="form-group">
                      <Field
                        className="form-control"
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        validate={this.validatePassword}
                      />
                      {errors.password && touched.password && (
                        <div className="d-block text-danger">
                          {errors.password}
                        </div>
                      )}
                    </FormGroup>
                    <div className="d-flex justify-content-between align-items-center">
                      <NavLink to={`/user/olive-mi-contrasena`}>
                        ¿Olvidó su contraseña?
                      </NavLink>
                      <Button
                        color="primary"
                        className={`btn-shadow btn-multiple-state ${
                          this.props.loading ? 'show-spinner' : ''
                        }`}
                        size="lg"
                      >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label">ENTRAR</span>
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Card>
        </Colxx>
      </Row>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, loading, error } = authUser;
  return { user, loading, error };
};

export default connect(mapStateToProps, {
  loginUser,
})(Login);
