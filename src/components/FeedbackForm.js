import React, { useState } from 'react';

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


    // Helper function to validate name
    function isValidName(name) {
      const validName = /^[a-zA-Z\s\-']+$/;
      return validName.test(name);
    }

    // Check for an empty email field / validate email if exists with a helper function
    if(!email.trim()) {
      validationSummary.email = "Email is required!";
    } else if(!isValidEmail(email)) {
      validationSummary.email = "Email is not valid!";
    }


    // Check for empty rating
  

    return validationSummary;
  };


  // Helper function to validate email with regular expression
  function isValidEmail(email) {
    // allow first part to start with lowercase letter, continue with letters / numbers
    // allow special character '@', and after domain name 
    const validEmail = /^[a-z][a-z0-9]*@[a-z]+\.[a-z]+$/;
    return validEmail.test(email); 
  }


  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(form);
    if(Object.keys(errors).length > 0){
      setErrors(errors);
      return;
    }
  };

  return (
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
        {/* TODO: Show error for rating if present */}
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
        {/* TODO: Show error for comment if present */}
      </div>

      {/* Submit button */}
      <button type="submit">Submit Feedback</button>
    </form>
  );
}

export default FeedbackForm; 