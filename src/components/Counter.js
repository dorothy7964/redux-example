import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Value from './Value';
import Control from './Control';

class Counter extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    const { number } = this.props;
    const { handleIncrement, handleDecrement } = this.props;
    return(
      <div>
        <Value number={number} />
        <Control
          onPlus={handleIncrement}
          onSubstract={handleDecrement}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    number : state.counter.number,
    color : state.ui.color,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
		handleIncrement : () => { dispatch(actions.increment()) },
		handleDecrement : () => { dispatch(actions.decrement()) },
		handleSetColor : (color) => { dispatch(actions.setColor(color)) },
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Counter);
