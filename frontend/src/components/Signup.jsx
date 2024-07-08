import React , {useState} from 'react';
import './Signup.css'; // Create a CSS file for styles
import axios from 'axios';

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const response = await axios
      .post("http://localhost:5000/auth/createuser",
         { name, email, role, password})
      .then((response) => {
        console.log(response.data);
        alert("Account has been created successfully!");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>DOC LINK</h2>
        <form>
          <label>
            Name
            <input type="text" name="name" value={name} 
            onChange={}/>
          </label>
          <label>
            Email
            <input type="email" name="email"  />
          </label>
          <label>
            Password
            <input type="password" name="password" />
          </label>
          <label>
            Confirm Password
            <input type="password" name="confirmPassword" />
          </label>
          <div>
            <input type="radio" id="doctor" name="role" value="doctor" />
            <label for="doctor">Doctor</label>
            <input type="radio" id="patient" name="role" value="patient" />
            <label for="patient">Patient</label>
          </div>
          <button type="submit">Signup</button>
        </form>
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
}

export default Signup;
