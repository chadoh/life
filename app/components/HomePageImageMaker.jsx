import React from 'react'
import ReactMixin from 'react-mixin'
import ReactEmoji from 'react-emoji'

const dots = (count, props) => {
  let dots = [];
  for(var i = 0; i < count; i++) {
    dots.push(<a key={i} {...props}>●</a>)
  }
  return dots
}

const Fade = ({to}) => {
  let style = {
    position: 'absolute',
    width: 85,
    top: 0,
    height: 25,
    backgroundImage: `linear-gradient(to ${to}, transparent, white)`
  }
  style[to] = 0;
  return (
    <div style={style}/>
  )
}

const BottomLabel = ({pointing, label, width, className}) => {
  let arrowStyle = {
    position: 'absolute',
    top: -5,
  }
  arrowStyle[pointing] = -2;

  const lineStyle = {
    position: 'relative',
    height: 10,
    borderBottom: '3px solid #20221F',
    borderRadius: pointing === 'left' ? '0 0 30px' : '0 0 0 30px',
  }

  return (
    <div style={{width, display: 'inline-block'}} className={className}>
      <div style={lineStyle}>
        <span style={arrowStyle}>
          {pointing === 'left' ? <span>&larr;</span> : <span>&rarr;</span>}
        </span>
      </div>
      <div className="centered" >
        <div>&uarr;</div>
        <div>{label}</div>
      </div>
    </div>
  )
}

export default class Scratch extends React.Component {
  render() {
    return (
      <div className="life">
        <br/>
        <div className="container" style={{maxWidth: 480}}>
          <div className="centered">
            <h3 className="brand" style={{paddingBottom: 0, position: 'relative'}}>This Week!<br/> The Present!</h3>
            <div style={{position: 'relative'}}>&darr;</div>
          </div>
        </div>
        <div className="year-wrap">
          <div className="container year" style={{position: 'relative', maxWidth: 480}}>
            {dots(9, {className: 'past', style: {width: '5.263157895%'}})}
            <a style={{width: '5.263157895%'}}>{this.emojify(':gift:', {attributes: {className: 'emoji'}})}</a>
            {dots(9, {style: {width: '5.263157895%'}})}
            <Fade to="left"/>
            <Fade to="right"/>
            <BottomLabel pointing="left" label="Your Past" width={'47%'}/>
            <BottomLabel className="pull-right" pointing="right" label="Your Future" width={'47%'}/>
          </div>
        </div>
      </div>
    )
  }
}

ReactMixin(Scratch.prototype, ReactEmoji)
