import React from 'react';

export default function ValidationError(props) {
  if(props.Namemessage || props.Contentmessage || props.message) {
    return (
      <div className="error" id="error">
      {props.Namemessage}
      
      {props.Contentmessage}
      {props.message}</div>
    );
  }

  return <></>
}