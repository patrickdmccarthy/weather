var React = require('react'),
    Modal = require('react-bootstrap').Modal,
    Button = require('react-bootstrap').Button, 
    ModalTrigger = require('react-bootstrap').ModalTrigger

var MyModal = React.createClass({
  render: function() {
    return (
        <Modal {...this.props} title="Modal heading" animation={false}>
          <div className="modal-body">
              kkkkk
          </div>


          <div className="modal-footer">
            <Button onClick={this.props.onRequestHide}>Close</Button>
            <Button bsStyle="success" onClick={this.props.onRequestHide}>Add</Button>
          </div>
        </Modal>
      );
  }
});


module.exports = MyModal;
