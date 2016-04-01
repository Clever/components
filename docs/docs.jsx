import React from 'react';
import ReactDOM from 'react-dom';

import {Button} from '../src/Button/Button';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <h1>Button Sizing</h1>
        <Button type="primary" size="large" value="Large"/>
        <Button type="primary" size="regular" value="Regular"/>
        <Button type="primary" size="small" value="Small"/>
        <br/>
        <h1>Button Styles</h1>
        <Button type="primary" size="regular" value="Primary"/>
        <Button type="secondary" size="regular" value="Secondary"/>
        <Button type="destructive" size="regular" value="Destructive"/>
        <Button disabled={true} size="regular" value="Disabled"/>
        <h1>Button-as-Link</h1>
        <Button type="primary" size="regular" href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY"/>
        <Button type="secondary" size="regular" href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY"/>
        <Button type="destructive" size="regular" href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY"/>
        <Button disabled={true} size="regular" href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY"/>
        <br/>
      </div>
    );
  }
}

window.onload = function() {
  ReactDOM.render(
    <Demo/>,
    document.getElementById("content")
  );
};
