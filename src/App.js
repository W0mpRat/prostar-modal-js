import { Component } from 'react';
import Modal from './Component/Modal/modal'
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      showModal: false,
    }
  }
  render() {
    // let modal;
    // if (this.state.showModal) {
    //   modal = <Modal show={this.state.showModal}></Modal>
    // }
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={() => this.setState({ showModal: !this.state.showModal })}>
            {this.state.showModal ? 'Hide' : 'Show'} Modal
          </button>
          {/* {modal} */}
        </header>
        {this.state.showModal === true &&
          <Modal show={this.state.showModal} closeModal={() => this.setState({ showModal: false })}></Modal>
        }
      </div>
    );
  }
}

export default App;
