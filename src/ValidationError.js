import React from 'react';

export default function ValidationError(props) {
  if(props.Namemessage || props.Contentmessage) {
    return (
      <div className="error">
      {props.Namemessage}
      
      {props.Contentmessage}</div>
    );
  }

  return <></>
}