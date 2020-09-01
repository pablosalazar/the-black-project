import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TopNav from '../containers/navs/Topnav';
import Sidebar from '../containers/navs/Sidebar';
import Footer from '../containers/navs/Footer';

import { NotificationManager } from '../components/common/react-notifications';
import { setErrorMessageApp, setSuccessMessageApp } from '../redux/actions';

class AppLayout extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (
        this.props.error_message_app &&
        prevProps.error_message_app != this.props.error_message_app
      ) {
        NotificationManager.warning(
          this.props.error_message_app,
          'Algo salió mal',
          4000,
          null,
          null,
          ''
        );
        this.props.setErrorMessageApp('');
      }

      if (
        this.props.success_message_app &&
        prevProps.success_message_app != this.props.success_message_app
      ) {
        NotificationManager.success(
          this.props.success_message_app,
          'Operación exitosa',
          4000,
          null,
          null,
          ''
        );
        this.props.setSuccessMessageApp('');
      }
    }
  }

  render() {
    const { containerClassnames } = this.props;
    return (
      <div id="app-container" className={containerClassnames}>
        <TopNav history={this.props.history} />
        <Sidebar />
        <main>
          <div className="container-fluid">{this.props.children}</div>
        </main>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = ({ menu, app }) => {
  const { containerClassnames } = menu;
  const { error_message_app, success_message_app } = app;
  return { containerClassnames, error_message_app, success_message_app };
};
const mapActionToProps = { setErrorMessageApp, setSuccessMessageApp };

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(AppLayout)
);
