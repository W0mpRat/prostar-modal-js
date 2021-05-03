import React from 'react';
import './modal_w3.css';

class Modal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: true
    }
  }
  render() {
    return (
      // <div className="modal" id="modal">
      //   Hello Modal! {`${this.props.show}`}
      //   <button onClick={this.props.closeModal}>
      //     Close
      //   </button>
      // </div>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <span className="close" onClick={this.props.closeModal}>&times;</span>
            <h2>Modal Header</h2>
          </div>
          <div className="modal-body">
            <p>Some text in the Modal Body</p>
            <p>Some other text...</p>
          </div>
          <div className="modal-footer">
            <h3>Modal Footer</h3>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;