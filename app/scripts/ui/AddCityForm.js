/**
    Please, look at the comments in the <App> component before.
*/

var React = require('react'),
    Input = require('react-bootstrap').Input,
    Button = require('react-bootstrap').Button;

var AddCityForm = React.createClass({

  handleSubmit: function(e){
    e.preventDefault();
    var name = this.refs.city.getInputDOMNode().value.trim();
    var interval = this.refs.interval.getInputDOMNode().value.trim() * 1000;
    if (!name || interval === 'select') {
      return;
    }
    this.props.addCity({name: name, interval: interval});
    this.refs.city.getInputDOMNode().value = '';
    this.refs.interval.getInputDOMNode().value = '';

  },
  render: function() {
    return (
      <div className="center text-center">
        <form className="form-horizontal">
          <Input type="text" label="City" labelClassName="col-xs-4" wrapperClassName="col-xs-4" ref="city" required={true}/>
          <Input type="select" label="Refresh Interval (in seconds)" labelClassName="col-xs-4" wrapperClassName="col-xs-4" ref="interval" required={true} defaultValue="select">
            <option value="select">select</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </Input>
        </form>

        <Button bsStyle="success" onClick={this.handleSubmit}>Add City</Button>
      </div>
      );
  }
});


module.exports = AddCityForm;
