import React from 'react';

const NUMBER_CHANGE = 'numberChange';
const DESCRIPTION_CHANGE = 'descriptionChange';

class CabinCreateForm extends React.Component {
  constructor() {
    super();
    this.state = {
      number: '',
      description: ''
    }
  }

  handleChange = (e) => {
    switch (e.target.name) {
      case NUMBER_CHANGE:
        this.state.number = e.target.value;
      case DESCRIPTION_CHANGE:
        this.state.description = e.target.value;
    }
  }

  render() {
    return (
      <form onSubmit={e => { e.preventDefault(); }}>
        <h2>Add a new cabin</h2>
        <input name={NUMBER_CHANGE} type="text" onChange={this.handleChange} placeholder="Cabin number" />
        <input name={DESCRIPTION_CHANGE} type="text" onChange={this.handleChange} placeholder="Cabin description" />
        <button onClick={() => this.props.onCreate({ number: this.state.number, description: this.state.description})}>Save</button>
      </form>
    );
  }
};

export default CabinCreateForm;
