import React from 'react'

let visaPattern = /^(....)(....)?(....)?(....)?(.+)?$/
let amexPattern = /^(...)(....)?(.....)?(....)?(.+)?$/

export default class CreditCardInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cc: props.valueLink.value,
      cardType: ''
    }
  }

  onChange(e) {
    let value = this.formatValue(e.target.value, /^3[47]/.test(e.target.value) ? amexPattern : visaPattern)

    this.props.valueLink.requestChange(value)
    this.setState({cc: value, cardType: this.detectType(value)})
  }

  formatValue(value, pattern) {
    return value.
      replace(/[^\d]/g, '').
      replace(/\s/g, '').
      replace(pattern, (match, p0, p1, p2, p3, p4, offset, string) => {
        let parts = [p0, p1, p2, p3, p4]
        let cleaned = [p0]
        for (var i = 1; i < 5; i++) {
          if (parts[i]) cleaned.push(parts[i])
        }
        return cleaned.join(' ')
      })
  }

  detectType(value) {
    if (/^4/.test(value)) return 'visa'
    if (/^5[1-5]/.test(value)) return 'mastercard'
    if (/^3[47]/.test(value)) return 'amex'
    if (/^3(?:0[0-5]|[68])/.test(value)) return 'diners'
    if (/^6(?:011|5)/.test(value)) return 'discover'
    if (/^(?:2131|1800|35)/.test(value)) return 'jcb'
    return ''
  }

  onBlur(e) {
    this.onChange(e)
    this.props.onBlur(e)
  }

  _setAutocompleteType(component) {
    if(component) {
      component.setAttribute('x-autocompletetype', 'cc-number')
      component.setAttribute('autocompletetype', 'cc-number')
      component.setAttribute('autocomplete', 'cc-number')
    }
  }

  render() {
    return (
      <input
        onChange={this.onChange.bind(this)}
        onFocus={this.props.onFocus}
        onBlur={this.onBlur.bind(this)}
        className={'control ' + this.state.cardType}
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
}
