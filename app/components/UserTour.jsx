import React from "react";
import Tour from "react-user-tour";

export default class UserTour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tourStep: 1
    }
  }

  render() {
    return (
        <Tour
          active={this.props.show}
          step={this.state.tourStep}
          onNext={(step) => this.setState({tourStep: step})}
          onBack={(step) => this.setState({tourStep: step})}
          onCancel={this.props.onCancel}
          steps={[
            {
              step: 1,
              selector: ".life a:first-child",
              position: "right",
              title: <div>The First Week Of Your Life</div>,
              body: <div>Welcome to the world! This dot represents the week you were born! Mouse over it to see the date.</div>
            },
            {
              step: 2,
              selector: ".life a:nth-child(5201)",
              position: "right",
              title: <div>Your Hundreth Birthday</div>,
              body: <div>Congrats! 100! That's a lot of years.</div>
            }
          ]}
        />
    )
  }
}
