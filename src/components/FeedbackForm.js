import React, { useState } from 'react';
import './FeedbackForm.css';

function FeedbackForm() {
  // State for form fields (name, email, rating, comment)
  const [form, setForm] = useState({
    name: '',
    email: '',
    rating: '',
    comment: '',
  });

  // State for form errors
  const [errors, setErrors] = useState({});

  // State for form submission
  const [submitted, setSubmitted] = useState(false);

  const isFormValid = form.name && form.email && form.rating && Object.keys(errors).length === 0;

  // Function to handle input changes
  const handleChange = (e) => {
     const {name, value} = e.target;
     setForm({...form, [name]: value})
  };

  // Function to validate form fields
  const validate = (form) => {
    const {name, email, rating, comment} = form;
    const validationSummary = {};

    // Check for an empty string
    if(!name.trim()) {
      validationSummary.name = "Name is required!";
    } else if(name.length <= 3) {
      validationSummary.name = "Enter full name!";
    } else if(!isValidName(name)){
      validationSummary.name = "Name is not valid!";
    }
    
    // Check for an empty email field / validate email if exists with a helper function
    if(!email.trim()) {
      validationSummary.email = "Email is required!";
    } else if(!isValidEmail(email)) {
      validationSummary.email = "Email is not valid!";
    }

    // Check if rating was selected
    if(!rating) {
      validationSummary.rating = "Please select a rating!";
    }
  
    return validationSummary;
  };

  // Helper function to validate name
  function isValidName(name) {
    const validName = /^[a-zA-Z\s\-']+$/;
    return validName.test(name);
  }

  // Helper function to validate email with regular expression
  function isValidEmail(email) {
    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return validEmail.test(email); 
  }


  // Function to handle form submission
  // Showing errors after submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Start form validation
    const errors = validate(form);

    // If errors found, update error state
    if(Object.keys(errors).length > 0){
      setErrors(errors);
      return;

    } else {

      // If no errors found, reset inputs and errors states after submission
      setSubmitted(true);
      setForm({ name: '', email: '', rating: '', comment: ''});
      setErrors({});
    }
  };

  return (

  <div className="main-container">

    {submitted ? (


      <div className="success-message">
         <p>Submission successful!</p>

        <button onClick={() => setSubmitted(false)}>Submit another</button>

      </div>
     

    ) : (

      <form className="feedback-form" onSubmit={handleSubmit}>

      {/* Name field */}
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <span>{errors.name}</span>}
      </div>

      {/* Email field */}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>

      {/* Rating field */}
      <div>
        <label htmlFor="rating">Rating (1-5):</label>
        <select
          id="rating"
          name="rating"
          value={form.rating}
          onChange={handleChange}
        >
          <option value="">Select</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
        {errors.rating && <span>{errors.rating}</span>}
      </div>

      {/* Comment field */}
      <div>
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          name="comment"
          value={form.comment}
          onChange={handleChange}
        />
      </div>

      {/* Submit button */}
      <button type="submit" disabled={!isFormValid}>Submit Feedback</button>
    </form>
    )}

  </div>
    
  );
}

export default FeedbackForm; 