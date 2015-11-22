import React from 'react';

const weeks = () => {
  let weeks = [];
  for(var i = 0; i < 52; i++) {
    weeks.push(<span key={i}/>)
  }
  return weeks;
}

const years = () => {
  let years = []
  for(var i = 0; i < 20; i++) {
    years.push(<div className="year" key={i}>{weeks()}</div>)
  }
  return years;
}

export default () => {
  return (
    <div>
      <div className="life">
        {years()}
      </div>
    </div>
  );
}
