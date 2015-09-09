var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Control = React.createClass({
  render: function() {
    return (
      <div className="form-group">
        <label className="col-md-2 control-label">{this.props.fieldName}: </label>
	<div className="col-md-4">
          <input className="form-control" value={this.props.fieldValue} disabled />
	</div>
	{ this.props.more ? <div className="col-md-1"><a href="#" className={this.props.showMore ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down" }
	  onClick={this.props.handleClick}></a></div> : null }
      </div>
    );
  }
});

var Person = React.createClass({
  getInitialState: function() {
    return { showMore: false };
  },
  handleClick: function() {
    this.setState({ showMore: !this.state.showMore });
  },
  render: function() {
    var more = [
      <Control key={this.props.data.last} fieldName="Last Name" fieldValue={this.props.data.last} />,
      <Control key={this.props.data.nationality} fieldName="Nationality" fieldValue={this.props.data.nationality} />,
      <Control key={this.props.data.hobby} fieldName="Hobby" fieldValue={this.props.data.hobby} />
    ];
    return (
      <form className="form-horizontal">
	<Control fieldName="Name" fieldValue={this.props.data.name} more="true" showMore={this.state.showMore} handleClick={this.handleClick} />
	<ReactCSSTransitionGroup transitionName="fade">
	{this.state.showMore ? more : null}
        </ReactCSSTransitionGroup>
      </form>
    );
  }
});

var People = React.createClass({
  render: function() {
    var personNodes = this.props.data.map(function(person, idx) {
      return (
	  <div className="row">
	    <h5>Person # {idx + 1}</h5>
	    <Person data={person} />
	  </div>
      );
    });
    return (
      <div className="people col-md-12">
	<h1>People</h1>
	{personNodes}
      </div>
    );
  }
});

React.render(
  <People data={data} />,
  document.getElementById('example')
);
