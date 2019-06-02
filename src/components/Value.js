import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	number : PropTypes.number
};

const defaultProps = {
	number : -1
};

const Value = ({number}) => {
	return (
		<div>{number}</div>
	)
}

Value.propTypes = propTypes;
Value.defaultProps = defaultProps;

export default Value;
