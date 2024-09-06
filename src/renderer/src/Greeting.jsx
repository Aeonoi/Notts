import React from "react";

class Greeting extends React.Component {
  state = {
    hour: null,
  };

  componentDidMount() {
    this.getHour();
  }

  getHour = () => {
    const date = new Date();
    const hour = date.getHours();
    this.setState({
      hour,
    });
  };

  render() {
    const { hour } = this.state;
    const { username } = this.props;

    const greeting = () => {
      if (5 <= hour && hour < 12) {
        return "Good Morning ";
      } else if (12 <= hour && hour < 18) {
        return "Good Afternoon ";
      } else {
        return "Good evening ";
      }
    };
    return (
      <p>
        {greeting()} {username}
      </p>
    );
  }
}

export default Greeting;
