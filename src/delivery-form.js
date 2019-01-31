import React from 'react';
import './delivery-form.css';
import { reduxForm, Field } from 'redux-form';

export function DeliveryForm(props) {
  return (
    <div className="delivery-form">
      <h2>Report a problem with your delivery</h2>
      <form>
        <div>
          <label htmlFor="trackingNumber">Tracking Number</label>
          <Field component="input" type="text" name="trackingNumber" id="trackingNumber" />
        </div>
        <div>
          <label htmlFor="issue">What is your issue?</label>
          <Field component="select" name="issue" id="issue">
            <option value="not-delivered">My delivery hasn't arrived</option>
            <option value="wrong-item">The wrong item was delivered</option>
            <option value="missing-part">Part of my order was missing</option>
            <option value="damage">Some of my order arrived damaged</option>
            <option value="other">Other (give details below)</option>
          </Field>
        </div>
        <div>
          <label htmlFor="details">Give more details</label>
          <Field component="textarea" name="details" id="details" cols="30" rows="10"></Field>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'delivery-form'
})(DeliveryForm);