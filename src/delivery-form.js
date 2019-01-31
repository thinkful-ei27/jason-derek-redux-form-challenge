import React from 'react';
import './delivery-form.css';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { required, trackingLength, mustBeNumber } from './validators';
import Input from './components/input';

export class DeliveryForm extends React.Component {
  onSubmit(values) {
    return fetch('https://us-central1-delivery-form-api.cloudfunctions.net/api/report', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          if (
            res.headers.has('content-type') &&
            res.headers
              .get('content-type')
              .startsWith('application/json')
          ) {
            // It's a nice JSON error returned by us, so decode it
            return res.json().then(err => Promise.reject(err));
          }
          // It's a less informative error returned by express
          return Promise.reject({
            code: res.status,
            message: res.statusText
          });
        }
        return;
      })
      .catch(err => {
        const { reason, message, location } = err;
        if (reason === 'ValidationError') {
          // Convert ValidationErrors into SubmissionErrors for Redux Form
          return Promise.reject(
            new SubmissionError({
              [location]: message
            })
          );
        }
        return Promise.reject(
          new SubmissionError({
            _error: message
          })
        );
      });
  }

  render() {
    let successMessage;
    let errorMessage;

    if (this.props.submitSucceeded) {
      successMessage = (
        <div className="message message-success">
          Message submitted successfully.
        </div>
      );
    }
    if (this.props.error) {
      errorMessage = (
        <div className="message message-error">
          {this.props.error}
        </div>
      );
    }
    return (
      <div className="delivery-form">
        <h2>Report a problem with your delivery</h2>
        <form onSubmit={this.props.handleSubmit((values) => this.onSubmit(values))}>
        {successMessage}
        {errorMessage}
          <div>
            <Field
              component={Input}
              element="input"
              label="Tracking Number"
              validate={[required, trackingLength, mustBeNumber]}
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
              <option value="damaged">Some of my order arrived damaged</option>
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
  }
};

export default reduxForm({
  form: 'delivery-form'
})(DeliveryForm);