var React = require('react'),
    Input = require('react-bootstrap').Input,
    Button = require('react-bootstrap').Button;


var AddCityForm = React.createClass({

  handleSubmit: function(e){


    e.preventDefault();
    var name = this.refs.city.getInputDOMNode().value.trim();
    var interval = this.refs.interval.getInputDOMNode().value.trim();
    if (!name || !interval) {
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
          <Input type="text" label="Refresh Interval (in milliseconds)" labelClassName="col-xs-4" wrapperClassName="col-xs-4" ref="interval" required={true}/>
        </form>

        <Button bsStyle="success" onClick={this.handleSubmit}>Add City</Button>
      </div>
      );
  }
});


module.exports = AddCityForm;
