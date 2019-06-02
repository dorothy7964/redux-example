import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	onPlus : PropTypes.func,
	onSubstract : PropTypes.func,
	onRandomizeColor : PropTypes.func,
};

function createWarning(funcName) {
	return () => console.warn(funcName + ' is not defined');
}

const defaultProps = {
	onPlus : createWarning('onPlus'),
	onSubstract : createWarning('onSubstract'),
	onRandomizeColor : createWarning('onRandomizeColor'),
};

const Control = ({ onPlus, onSubstract, onRandomizeColor }) => {
	return (
		<div>
			<button onClick={onPlus}>+</button>
			<button onClick={onSubstract}>-</button>
			<button onClick={onRandomizeColor}>Randomize Color</button>
		</div>
	);
}

Control.propTypes = propTypes;
Control.defaultProps = defaultProps;

export default Control;
