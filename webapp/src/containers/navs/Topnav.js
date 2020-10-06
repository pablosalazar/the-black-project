import React, { Component } from 'react';
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Input,
} from 'reactstrap';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  setContainerClassnames,
  clickOnMobileMenu,
  logoutUser,
} from '../../redux/actions';

import { menuHiddenBreakpoint } from '../../constants/defaultValues';

import { MobileMenuIcon, MenuIcon } from '../../components/svg';
import TopnavEasyAccess from './Topnav.EasyAccess';
import TopnavNotifications from './Topnav.Notifications';
import Avatar from 'react-avatar';

class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInFullScreen: false,
      searchKeyword: '',
    };
  }

  isInFullScreen = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };

  toggleFullScreen = () => {
    const isInFullScreen = this.isInFullScreen();

    var docElm = document.documentElement;
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    this.setState({
      isInFullScreen: !isInFullScreen,
    });
  };

  handleLogout = () => {
    this.props.logoutUser(this.props.history);
  };

  menuButtonClick = (e, menuClickCount, containerClassnames) => {
    e.preventDefault();

    setTimeout(() => {
      var event = document.createEvent('HTMLEvents');
      event.initEvent('resize', false, false);
      window.dispatchEvent(event);
    }, 350);
    this.props.setContainerClassnames(
      ++menuClickCount,
      containerClassnames,
      this.props.selectedMenuHasSubItems
    );
  };
  mobileMenuButtonClick = (e, containerClassnames) => {
    e.preventDefault();
    this.props.clickOnMobileMenu(containerClassnames);
  };

  render() {
    const { containerClassnames, menuClickCount } = this.props;

    return (
      <nav className="navbar fixed-top">
        <div className="d-flex align-items-center navbar-left">
          <NavLink
            to="#"
            location={{}}
            className="menu-button d-none d-md-block"
            onClick={(e) =>
              this.menuButtonClick(e, menuClickCount, containerClassnames)
            }
          >
            <MenuIcon />
          </NavLink>
          <NavLink
            to="#"
            location={{}}
            className="menu-button-mobile d-xs-block d-sm-block d-md-none"
            onClick={(e) => this.mobileMenuButtonClick(e, containerClassnames)}
          >
            <MobileMenuIcon />
          </NavLink>

          <div className="position-relative d-none d-none d-lg-inline-block align-items-center">
            <div>
              <h3 className="mb-0 text-primary font-weight-bold">THE BLACK</h3>
              VALET PARKING SERVICE
            </div>
          </div>
        </div>
        <a className="navbar-logo" href="/">
          <span className="logo d-none d-xs-block" />
          <span className="logo-mobile d-block d-xs-none" />
        </a>
        <div className="navbar-right d-flex justify-content-end">
          <div className="header-icons d-inline-block align-middle">
            <TopnavEasyAccess />
            <TopnavNotifications />
            <button
              className="header-icon btn btn-empty d-none d-sm-inline-block"
              type="button"
              id="fullScreenButton"
              onClick={this.toggleFullScreen}
            >
              {this.state.isInFullScreen ? (
                <i className="simple-icon-size-actual d-block" />
              ) : (
                <i className="simple-icon-size-fullscreen d-block" />
              )}
            </button>
          </div>
          <div className="user d-inline-block">
            <UncontrolledDropdown className="dropdown-menu-right">
              <DropdownToggle className="d-flex p-0" color="empty">
                <div className="name text-right mr-3">
                  <div>{this.props.user.firstname}</div>
                  <div className="text-primary">{this.props.user.role}</div>
                </div>
                <span>
                  <Avatar
                    size="40"
                    maxInitials={2}
                    name={this.props.user.name}
                    round={true}
                  />
                </span>
              </DropdownToggle>
              <DropdownMenu className="mt-3" right>
                <DropdownItem
                  onClick={() => this.props.history.push(`/perfil`)}
                >
                  Configurar perfil
                </DropdownItem>

                <DropdownItem divider />
                <DropdownItem onClick={() => this.handleLogout()}>
                  Cerrar sesión
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ menu, authUser }) => {
  const { user } = authUser;
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    user,
  };
};
export default connect(mapStateToProps, {
  setContainerClassnames,
  clickOnMobileMenu,
  logoutUser,
})(TopNav);
