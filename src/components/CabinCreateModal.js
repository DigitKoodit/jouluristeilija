import React from 'react';
import './CabinCreateModal.css';

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
        break;
      case DESCRIPTION_CHANGE:
        this.state.description = e.target.value;
        break;
      default: break;
    }
  }

  render() {
    return (
      <div className="CabinCreateModal">
        <form onSubmit={e => { e.preventDefault(); }}>
          <h2>Lisää hytti</h2>
          <input name={NUMBER_CHANGE} type="text" onChange={this.handleChange} placeholder="Hytin numero" />
          <input name={DESCRIPTION_CHANGE} type="text" onChange={this.handleChange} placeholder="Kuvaus" />
          <div className="CabinCreateModal-buttons">
            <button onClick={this.props.onCancel}>Peruuta</button>
            <button onClick={() => this.props.onCreate({ number: this.state.number, description: this.state.description})}>Tallenna</button>
          </div>
        </form>
      </div>
    );
  }
};

export default CabinCreateForm;
