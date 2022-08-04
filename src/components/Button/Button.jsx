import React from "react";
import { Button } from "./Button.styled";
import PropTypes from 'prop-types';

export const LoadMoreBtn = ({onClick}) => {
    return (<Button type="button" onClick={onClick}>Load More</Button>
    );
}

LoadMoreBtn.propTypes = {
    onClick:PropTypes.func.isRequired,
}