import React from 'react';

export default function ValidationError(props) {
  console.log(props);
  if(props.Namemessage || props.Contentmessage || props.message) {
    return (
      <div className="error">
      {props.Namemessage}
      
      {props.Contentmessage}
      {props.message}</div>
    );
  }

  return <></>
}