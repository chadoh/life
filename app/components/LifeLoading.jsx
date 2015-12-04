import React from 'react';
import spinner from '../images/icon-loading-spinner.gif';

export default () => {
  return (
    <div className="life" style={{textAlign: 'center'}}>
      <img src={spinner} alt="loading" style={{width: '100px', marginTop: '100px'}}/>
    </div>
  );
}
