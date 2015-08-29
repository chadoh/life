import React from 'react/addons'
import ReactMixin from 'react-mixin'

let visaPattern = /^(....)(....)?(....)?(....)?(.+)?$/
let amexPattern = /^(...)(....)?(.....)?(....)?(.+)?$/

export default class CreditCardInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cc: props.valueLink.value
    }
  }

  onChange(e) {
    let cardPattern = visaPattern;
    if (/^3[47]/.test(e.target.value)) cardPattern = amexPattern;

    let value = e.target.value.
      replace(/[^\d]/g, '').
      replace(/\s/g, '').
      replace(cardPattern, (match, p0, p1, p2, p3, p4, offset, string) => {
        let parts = [p0, p1, p2, p3, p4]
        let cleaned = [p0]
        for (var i = 1; i < 5; i++) {
          if (parts[i]) cleaned.push(parts[i])
        }
        return cleaned.join(' ')
      })

    this.props.valueLink.requestChange(value)
    this.setState({cc: value})
  }

  onBlur(e) {
    this.onChange(e)
    this.props.onBlur(e)
  }

  render() {
    return (
      <input
        onChange={this.onChange.bind(this)}
        onFocus={this.props.onFocus}
        onBlur={this.onBlur.bind(this)}
        className="control"
        id="card_number"
        type="tel"
        ref={this._setAutocompleteType}
        name="card_number"
        value={this.state.cc}
        autoCorrect="off"
        spellCheck="off"
        autoCapitalize="off"
        placeholder="Card number"
        autoFocus
      />
    )
  }

  _setAutocompleteType(component) {
    let element = component.getDOMNode()
    element.setAttribute('x-autocompletetype', 'cc-number')
    element.setAttribute('autocompletetype', 'cc-number')
  }
}
