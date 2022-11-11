import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useStoreContext } from "./Store";
import { setUserData } from "./Actions";
import {
  Navbar, NavbarToggler, NavbarBrand, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle
} from "reactstrap";
import axios from "axios";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import "./CybersecCertTrackerInit.css";

function CybersecCertTrackerInit({ userData, children }) {
  const { dispatch } = useStoreContext();
  const { toggleSidebar } = useProSidebar();

  useEffect(() => {
    setUserData(dispatch, userData);
  }, []);

  const logout = () => {
    let csrf;

    if (document.querySelector("meta[name='csrf-token']"))
      csrf = document
        .querySelector("meta[name='csrf-token']")
        .getAttribute("content");

    axios({
      method: "delete",
      url: "/users/sign_out",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrf,
      },
    }).then(() => {
      window.location.href = "/users/sign_in";
    });
  };

  return (
    <>
      <Navbar color="black" dark style={{ marginBottom: "20px" }}>
        {userData.role == "admin" && (<NavbarToggler onClick={() => toggleSidebar()} className="me-2" />)}
        <NavbarBrand href="/" className="me-auto">
          CyberSec
        </NavbarBrand>
        <UncontrolledDropdown setActiveFromChild>
          <DropdownToggle tag="a" className="nav-link text-light" caret>
            {userData.first_name || "User"}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => logout()} id="logout_button" className="bg-secondary" active>Logout</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Navbar>
      <div className="sidebar">
        <Sidebar breakPoint="always" backgroundColor="rgb(0, 0, 0, 1)">
          <Menu>
            <MenuItem routerLink={<Link to="/dashboard" />} id="dashboard_nav">
              Dashboard
            </MenuItem>
            <MenuItem routerLink={<Link to="/dashboard/students" />} id="students_nav">
              Students
            </MenuItem>
            <MenuItem routerLink={<Link to="/dashboard/courses" />} id="courses_nav">
              Courses
            </MenuItem>
            <MenuItem routerLink={<Link to="/dashboard/student_courses" />} id="student_courses_nav">
              Student Courses
            </MenuItem>
            <MenuItem routerLink={<Link to="/dashboard/companies" />} id="companies_nav">
              Companies
            </MenuItem>
            <MenuItem routerLink={<Link to="/dashboard/cert_vouchers" />} id="cert_vouchers_nav">
              Certificate Vouchers
            </MenuItem>
            <MenuItem routerLink={<Link to="/dashboard/exams" />} id="exams_nav">
              Exams
            </MenuItem>
            <MenuItem routerLink={<Link to="/dashboard/vendors" />} id="vendors_nav">
              Vendors
            </MenuItem>
            <MenuItem routerLink={<Link to="/dashboard/users" />} id="users_nav">
              Users
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
      {children}
    </>
  );
}
export default CybersecCertTrackerInit;

CybersecCertTrackerInit.propTypes = {
  children: PropTypes.node,
  userData: PropTypes.shape({
    role: PropTypes.string,
  }),
};

CybersecCertTrackerInit.defaultProps = {
  children: null,
  userData: {},
};
