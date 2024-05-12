import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";

export const CheckPermission = ({ component, role }) => {
    const {user} = useSelector(state => state.user);

    console.log(user.role);
    console.log("role", role);

    if (user.role == role) {
        return component;
    }

    return null; 
}

CheckPermission.propTypes = {
    component: PropTypes.element.isRequired,
    role: PropTypes.string.isRequired
}