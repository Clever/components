import moment from "moment";
import React, {Component} from "react";

import Example from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {Button, DatePicker, FlexBox, FlexItem, Justify} from "src";
import FontAwesome from "react-fontawesome";


export default class DatePickerView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {cssClass} = DatePickerView;

    return (
      <View className={cssClass.CONTAINER} title="DatePicker" sourcePath="src/DatePicker/DatePicker.jsx">
        <p>DatePickers can be rendered simply, with an onClose action similar to modals and an onChange similar to buttons. Onchange values are returned as momentjs dates.</p>
        <Example
          code={`
            {this.state.showPicker1 && <DatePicker
              title="Pick a date"
              onChange={(date) => console.log(date)}
              onClose={() => this.setState({showPicker1: false})}
            />}
          `}
        >
          <Button value="Show Picker" type="primary" onClick={() => this.setState({showPicker1: true})} />
          {this.state.showPicker1 && <DatePicker
            title="Pick a date"
            onChange={(date) => console.log(date)}
            onClose={() => this.setState({showPicker1: false})}
          />}
        </Example>

        <p>The default date is today, but you can also pass in a string or Date object. You can also pass in a custom title.</p>
        <Example
          code={`
            {this.state.showPicker2 && <DatePicker
              title="Date in the past"
              onChange={(date) => console.log(date)}
              onClose={() => this.setState({showPicker2: false})}
              value="3/12/2017"
            />}
          `}
        >
          <Button value="Show Picker" type="primary" onClick={() => this.setState({showPicker2: true})} />
          {this.state.showPicker2 && <DatePicker
            title="Date in the past"
            onChange={(date) => console.log(date)}
            onClose={() => this.setState({showPicker2: false})}
            value="3/12/2017"
          />}
        </Example>

        <p>You have quite a bit of flexibility; you can pass in a React node to the title, add in a footer, or pass props directly to the datepicker for things like min/max dates.</p>
        <Example
          code={`
            {this.state.showPicker3 && <DatePicker
              title={(<div>Set Launch Date <FontAwesome name="question-circle" /> </div>)}
              onChange={(date) => console.log(date)}
              onClose={() => this.setState({showPicker3: false})}
              footer={
          <FlexBox className={cssClass.BUTTON_BAR} justify={Justify.BETWEEN}>
            <FlexItem>
              <Button
                size="small"
                type="link"
                value="Launch Now"
                onClick={()=>console.log("Launch Now")}
              />
            </FlexItem>
            <FlexItem>
              <Button
                className={cssClass.RIGHT_BUTTON}
                size="small"
                type="primary"
                value="Reschedule"
                onClick={()=>console.log("Reschedule")}
              />
            </FlexItem>
          </FlexBox>
              }
              datePickerProps={{
          minDate: moment().add(1, "day"),
          maxDate: moment().add(6, "months"),
              }}
          `}
        >
          <Button value="Show Picker" type="primary" onClick={() => this.setState({showPicker3: true})} />
          {this.state.showPicker3 && <DatePicker
            title={(<div>Set Launch Date <FontAwesome name="question-circle" /> </div>)}
            onChange={(date) => console.log(date)}
            onClose={() => this.setState({showPicker3: false})}
            footer={
              <FlexBox className={cssClass.BUTTON_BAR} justify={Justify.BETWEEN}>
          <FlexItem>
            <Button
              size="small"
              type="link"
              value="Launch Now"
              onClick={() => console.log("Launch Now")}
            />
          </FlexItem>
          <FlexItem>
            <Button
              className={cssClass.RIGHT_BUTTON}
              size="small"
              type="primary"
              value="Reschedule"
              onClick={() => console.log("Reschedule")}
            />
          </FlexItem>
              </FlexBox>
            }
            datePickerProps={{
              minDate: moment().add(1, "day"),
              maxDate: moment().add(6, "months"),
            }}
          />}
        </Example>

        <PropDocumentation
          availableProps={[
            {
              name: "className",
              type: "string",
              description: "Optional additional classname to apply to the datepicker container.",
            },
            {
              name: "title",
              type: "string OR node",
              description: "Header for the datepicker. Required.",
            },
            {
              name: "value",
              type: "string OR Date",
              description: "Optional default date for the datepicker",
              defaultValue: "Today's date",
            },
            {
              name: "onClose",
              type: "function",
              description: "Called when the close button is clicked. Like with a modal, this should remove the datePicker from the DOM",
            },
            {
              name: "onChange",
              type: "function",
              description: "Called when a new date is selected. By default the datepicker does not close when a new date is entered, but you could close it in this function.",
            },
            {
              name: "footer",
              type: "node",
              description: "Optional content to place beneath the datepicker in the popover. This is a good place for action buttons, for instance.",
            },
            {
              name: "datePickerProps",
              type: "object",
              description: "Set of properties to pass along to the wrapped react-datepicker object. This can be used for additional customization.",
            },
          ]}
          className={cssClass.PROPS}
        />
      </View>
    );
  }
}

DatePickerView.cssClass = {
  CONTAINER: "DatePickerView",
};
