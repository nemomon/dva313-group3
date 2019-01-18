import React from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse, FormInline, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "mdbreact";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import PHPController from "./PHPController";

class NavigationBar extends React.Component {
  state = {
    isOpen: false
  };

  toggleCollapse = this.setState({ isOpen: !this.state.isOpen });


  render() {
    return (

      <Navbar className="navbar" dark expand="md" >
        <NavbarBrand>
          <strong className="navbarTitle">PROGNOSTIC /</strong>
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
            <NavItem>
              <NavLink to="/personTable">People</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/projectTable">Projects</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/allocationTable">Allocation</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/spendingTable">Spending</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/remaningTable">Remaning</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/endBalanceTable">End Balance</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="">Save File</NavLink>
            </NavItem>
          </NavbarNav>
          <NavItem
           onClick={() => (new PHPController()).saveAll()}
            >
            <NavLink className="navbarSave" to="#!">SAVE CHANGES /</NavLink>
          </NavItem>
        </Collapse>
      </Navbar>
    );
  }
}
/* Need to type this after creating a component so other files can import it */

export default NavigationBar;
