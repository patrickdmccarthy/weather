/**
    Please, look at the comments in the <App> component before.
*/

var React = require('react');

var City = React.createClass({
  propTypes:{
    cities: React.PropTypes.number.isRequired,
    data: React.PropTypes.object.isRequired
    },
  getInitialState: function(){
    return {}
  },
  enableShowRemove: function(e){
    this.setState({showRemove : true});
  },
  disableShowRemove: function(e){
    this.setState({showRemove : false});
  },
  render: function() {
    /**
        Please, don't set styles directly in the component
    */
    var style = {
      width: 100/this.props.cities + '%',
      display: 'inline-block',
      height: '800px'
    };
    var innerStyle = {

    }
    return (
      <div style={style} className="clearfix" onMouseEnter={this.enableShowRemove} onMouseLeave={this.disableShowRemove} >
        <div style={innerStyle}>
          <h2>{this.props.data.name}</h2>
          <p className="lead">{this.props.data.description}</p>
          <img src={"http://openweathermap.org/img/w/" + this.props.data.icon +".png"}/>
          <p className="lead"><strong>{this.props.data.temp}C</strong></p>
          <p><small>Last updated {this.props.data.date}</small></p>
        </div>

        /**
            Just hide this button via css.
            Please, look at the http://facebook.github.io/react/docs/class-name-manipulation.html
        */
        { this.state.showRemove ? <a onClick={this.props.remove.bind(null, this.props.data.name)}><p><small>Remove City</small></p></a> : ''}
      </div>
      );
  }
});



module.exports = City;
