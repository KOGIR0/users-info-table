import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import UsersInfoApp from './components/UsersInfoApp';

class DataChoice extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      smallDataURL: 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D',
      bigDataURL: 'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D',
      chosenDataURL: ''
    }
  }

  render()
  {
    return (
      this.state.chosenDataURL === '' ?
      <div style={{textAlign: 'center'}}>
        <button onClick={() => this.setState({chosenDataURL: this.state.smallDataURL})}>Маленький размер данных</button>
        <button onClick={() => this.setState({chosenDataURL: this.state.bigDataURL})}>Большой размер данных</button>
      </div>
      : <UsersInfoApp dataURL={this.state.chosenDataURL}/>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <DataChoice />
  </React.StrictMode>,
  document.getElementById('root')
);