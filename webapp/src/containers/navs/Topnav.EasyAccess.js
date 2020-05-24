import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const TopnavEasyAccess = () => {
  return (
    <div className="position-relative d-none d-sm-inline-block">
      <UncontrolledDropdown className="dropdown-menu-right">
        <DropdownToggle className="header-icon" color="empty">
          <i className="simple-icon-grid" />
        </DropdownToggle>
        <DropdownMenu
          className="position-absolute mt-3"
          right
          id="iconMenuDropdown"
        >
          <NavLink to="/app/dashboards/default" className="icon-menu-item">
            <i className="iconsminds-shop-4 d-block" /> Dashboard
          </NavLink>

          <NavLink to="/app/ui" className="icon-menu-item">
            <i className="iconsminds-pantone d-block" /> UI
          </NavLink>
          <NavLink to="/app/ui/charts" className="icon-menu-item">
            <i className="iconsminds-bar-chart-4 d-block" /> Charts
          </NavLink>
          <NavLink to="/app/applications/chat" className="icon-menu-item">
            <i className="iconsminds-speach-bubble d-block" /> Chat
          </NavLink>
          <NavLink to="/app/applications/survey" className="icon-menu-item">
            <i className="iconsminds-formula d-block" /> Survey
          </NavLink>
          <NavLink to="/app/applications/todo" className="icon-menu-item">
            <i className="iconsminds-check d-block" /> Todo
          </NavLink>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export default TopnavEasyAccess;
