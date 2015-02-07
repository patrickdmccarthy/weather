var React = require('react'),
    AddCityForm = require("./AddCityForm"),
    Modal = require('react-bootstrap').Modal,
    Button = require('react-bootstrap').Button, 
    ModalTrigger = require('react-bootstrap').ModalTrigger

var MyModal = React.createClass({
  render: function() {
    return (
        <Modal {...this.props} title="Modal heading" animation={false}>
          <AddCityForm cancel={this.props.onRequestHide} add={this.props.addCity} />
          <Button bsStyle="success" onClick={this.props.addCity}>Add</Button>

        </Modal>
      );
  }
});


module.exports = MyModal;
