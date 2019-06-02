import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Value from './Value';
import Control from './Control';

class Counter extends Component {
  setRandomColor = () => {
    const color = [
      Math.floor((Math.random()*55) + 200),
      Math.floor((Math.random()*55) + 200),
      Math.floor((Math.random()*55) + 200)
    ];
    this.props.handleSetColor(color);
  }

  render() {
    const { number,color } = this.props;
    const { handleIncrement, handleDecrement } = this.props;

    const style = {
      background : `rgb(${color[0]},${color[1]},${color[2]})`
    }
    return(
      <div style={style}>
        <Value number={number} />
        <Control
          onPlus={handleIncrement}
          onSubstract={handleDecrement}
          onRandomizeColor={this.setRandomColor}
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
