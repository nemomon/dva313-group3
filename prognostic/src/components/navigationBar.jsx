import React from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse, FormInline, Dropdown, DropdownToggle, DropdownMenu,  DropdownItem } from "mdbreact";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";


class NavigationBar extends React.Component {
  state = {
    isOpen: false
  };

  toggleCollapse = this.setState({ isOpen: !this.state.isOpen });

  render() {
    return (

      <Navbar color="black" dark expand="md">
          <NavbarBrand>
            <strong className="white-text">PROGNOSTIC</strong>
          </NavbarBrand>
          <NavbarToggler
            onClick={this.toggleCollapse}
          />
          <Collapse
            id="navbarCollapse3"
            isOpen={this.state.isOpen}
            navbar
          >
            <NavbarNav left>
              <NavItem active>
                <NavLink to="#!">People</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="#!">Projects</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="#!">Allocation</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="#!">Spending</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="#!">Remaning</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="#!">End Balance</NavLink>
              </NavItem>
              <NavItem>
                <Dropdown>
                  <DropdownToggle nav caret>
                    <div className="d-none d-md-inline">Add</div>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem href="#!">Staff</DropdownItem>
                    <DropdownItem href="#!">Project</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavItem>
            </NavbarNav>
            <NavbarNav right>
            <strong className="white-text">//</strong>
            </NavbarNav>
          </Collapse>
      </Navbar>
    );
  }
}
/* Need to type this after creating a component so other files can import it */

export default NavigationBar;
