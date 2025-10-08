import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../../hdash/css/style.css'

const EditCustomer = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cust_name: "",
    cust_address: "",
    cust_phone: "",
    email_id: "",
  });

  useEffect(() => {
    fetch(`http://localhost/medical/getcustomer.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost/medical/updatecustomer.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, cust_id: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Customer updated successfully");
        navigate("/cus"); // Redirect back to customer table
      })
      .catch((err) => console.error(err));
  };

  return (
    <div class="row">
<div class="col-md-12 mx-auto">
         <div class="card">
         <div class="card-body">
      <h2>Edit Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="cust_name"
            value={formData.cust_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            name="cust_address"
            value={formData.cust_address}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label>Phone</label>
          <input
            type="text"
            className="form-control"
            name="cust_phone"
            value={formData.cust_phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label>Email</label>
          <input
            type="email"
            class="form-control"
            name="email_id"
            value={formData.email_id}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Update
        </button>
      </form>
    </div>
    </div>
    </div>
    </div>
  );
};

export default EditCustomer;
