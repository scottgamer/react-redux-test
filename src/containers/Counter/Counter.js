import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
  state = {
    counter: 0
  };

  render() {
    return (
      <div>
        <CounterOutput value={this.props.ctr} />
        <CounterControl
          label="Increment"
          clicked={() => this.props.onIncrementCounter}
        />
        <CounterControl
          label="Decrement"
          clicked={() => this.props.onDecrementCounter}
        />
        <CounterControl label="Add 5" clicked={() => this.props.onAddCounter} />
        <CounterControl
          label="Subtract 5"
          clicked={() => this.props.onSubtractCounter}
        />
        <hr />
        <button onClick={()=>this.props.onStoreResult(this.props.ctr)}>Store Result</button>
        <ul>
          {this.props.storedResults.map(result => (
            <li
              key={result.id}
              onClick={() => this.props.onDeleteResult(result.id)}
            >
              {result.value}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// State coming from redux
const mapStateToProps = state => {
  return {
    ctr: state.counterReducer.counter,
    storedResults: state.resultsReducer.results
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch({ type: actionTypes.ADD }),
    onDecrementCounter: () => dispatch({ type: actionTypes.DECREMENT }),
    onAddCounter: () => dispatch({ type: actionTypes.ADD, val: 10 }),
    onSubtractCounter: () => dispatch({ type: actionTypes.SUBSTRACT, val: 15 }),
    onStoreResult: (res) => dispatch({ type: actionTypes.STORE_RESULT, result: res }),
    onDeleteResult: id =>
      dispatch({ type: actionTypes.DELETE_RESULT, resultElId: id })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
