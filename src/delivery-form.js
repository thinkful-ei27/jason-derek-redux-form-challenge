import React from 'react';
import './delivery-form.css';
import { reduxForm, Field } from 'redux-form';
import { required } from './validators';
import Input from './components/input';

export function DeliveryForm(props) {
  return (
    <div className="delivery-form">
      <h2>Report a problem with your delivery</h2>
      <form onSubmit={props.handleSubmit((values) => console.log(values))}>
        <div>
          <Field 
            component={Input} 
            element="input" 
            label="Tracking Number"
            validate={required} 
            type="text" 
            name="trackingNumber" 
            id="trackingNumber" />
        </div>
        <div>
          <Field 
            component={Input} 
            element="select" 
            label="What is your issue?"
            validate={required} 
            name="issue" 
            id="issue">
            <option value="not-delivered">My delivery hasn't arrived</option>
            <option value="wrong-item">The wrong item was delivered</option>
            <option value="missing-part">Part of my order was missing</option>
            <option value="damage">Some of my order arrived damaged</option>
            <option value="other">Other (give details below)</option>
          </Field>
        </div>
        <div>
          <Field 
            component={Input} 
            element="textarea" 
            label="Give more details"
            name="details" 
            id="details"></Field>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'delivery-form'
})(DeliveryForm);