import React from 'react/addons'
import ReactMixin from 'react-mixin'
import MaskedInput from 'react-input-mask'

export default class CreditCardInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cc: props.valueLink.value,
      mask: "9999 9999 9999 9999 99999999"
    }
  }

  onChange(e) {
    this.props.valueLink.requestChange(e.target.value)
    let newState = {
      cc: e.target.value,
      mask: "9999 9999 9999 9999 99999999"
    }
    if (/^3[47]/.test(e.target.value)) newState.mask = "999 9999 99999 9999"
    this.setState(newState)
  }

  render() {
    return (
      <MaskedInput
        onChange={this.onChange.bind(this)}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        mask={this.state.mask}
        maskChar={null}
        className="control"
        id="card_number"
        type="tel"
        x-autocompletetype="cc-number"
        autocompletetype="cc-number"
        autoCorrect="off"
        spellCheck="off"
        autoCapitalize="off"
        placeholder="Card number"
        autoFocus
      />
    )
  }
}
