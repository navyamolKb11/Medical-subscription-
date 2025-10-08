import React, { useEffect, useState } from 'react';
import '../../hdash/css/style.css'

const Customers = () => {
    const [customers, setCustomers] = useState([]); 
    const [formData, setFormData] = useState({
      cust_name: '',
      cust_address: '',
      cust_phone: '',
      email_id: '',
      pass: ''
    });
    
    const [editingCustomerId, setEditingCustomerId] = useState(null); 
    const getAllCustomers = () => {
      fetch('http://localhost/medical/getcustomer.php')
        .then(response => response.json())
        .then(data => setCustomers(data))
        .catch(error => console.error("Error fetching customers:", error));
    };
    useEffect(() => {
      getAllCustomers(); 
    }, []);
   
 
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
    const handleEditClick = (customer) => {
      setEditingCustomerId(customer.cust_id);
      setFormData({
        cust_id: customer.cust_id, 
        cust_name: customer.cust_name,
        cust_address: customer.cust_address,
        cust_phone: customer.cust_phone,
        email_id: customer.email_id,
      });
    };
    
    
    const handleSubmit = () => {
      console.log("Submitting updated customer data:", formData);
    
      const updatedCustomer = { ...formData };
    
      fetch('http://localhost/medical/updatecustomer.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCustomer),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("API response:", data);
          if (data.status === 'success') {
            // Update the local state
            setCustomers((prevCustomers) =>
              prevCustomers.map((customer) =>
                customer.cust_id === updatedCustomer.cust_id ? updatedCustomer : customer
              )
            );
            setEditingCustomerId(null);
          } else {
            console.error('Error updating customer:', data.message);
          }
        })
        .catch((error) => console.error('Error updating customer:', error));
    };
    const handleDelete = (customerId) => {
      if (window.confirm("Are you sure you want to delete this customer?")) {
        fetch('http://localhost/medical/deletecustomer.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cust_id: customerId })
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === 'success') {
              setCustomers((prevCustomers) =>
                prevCustomers.filter((customer) => customer.cust_id !== customerId)
              );
              alert(data.message);
            } else {
              alert(data.message); 
            }
          })
          .catch((error) => {
            console.error('Error deleting customer:', error);
            alert('An error occurred while deleting the customer.');
          });
      }
  };
    
  return (
    <html lang="en">
    <head>
      <title>Pharmative &mdash; Colorlib Template</title>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap" rel="stylesheet"/>
      <link rel="stylesheet" href="../../hdash/fonts/icomoon/style.css"/>
      <link rel="stylesheet" href="../../hdash/css/bootstrap.min.css"/>
      <link rel="stylesheet" href="../../hdash/fonts/flaticon/font/flaticon.css"/>
      <link rel="stylesheet" href="../../hdash/css/magnific-popup.css"/>
      <link rel="stylesheet" href="css/jquery-ui.css"/>
      <link rel="stylesheet" href="css/owl.carousel.min.css"/>
      <link rel="stylesheet" href="../../hdash/css/owl.theme.default.min.css"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"></link>

    
    
      <link rel="stylesheet" href="../../hdash/css/aos.css"/>
    
      <link rel="stylesheet" href="../../hdash/css/style.css"/>
    
    </head>
    
    <body>
    
      <div class="site-wrap"/>
    
    
        <div class="site-navbar py-2">
    
          <div class="search-wrap">
            <div class="container">
              <a href="#" class="search-close js-search-close"><span class="icon-close2"></span></a>
              <form action="#" method="post">
                <input type="text" class="form-control" placeholder="Search keyword and hit enter..."/>
              </form>
            </div>
          </div>
    
          <div class="container">
            <div class="d-flex align-items-center justify-content-between">
              <div class="logo">
                <div class="site-logo">
                  <a href="/home" class="js-logo-clone"><strong class="text-primary">SINA</strong>MEDICALS</a>
                </div>
              </div>
              <div class="main-nav d-none d-lg-block">
                <nav class="site-navigation text-right text-md-center" role="navigation">
                  <ul class="site-menu js-clone-nav d-none d-lg-block">

                    <li ><a href="/home"><i class="fas fa-home"></i></a></li>
                    <li class="active"><a href="/cust">CUSTOMERS</a></li>
                    <li class="has-children">
                    </li>
                    <li ><a href="/add"><i class="fa fa-user-plus"></i></a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      
   <div class="row">
    <div class="col-md-12 mx-auto">
        <div class="card">
        <div class="card-body">
        <a href="/cust" class="js-logo-clone"><h2 align="Center"><strong class="text-primary"></strong>CUSTOMERS</h2></a>   

        <div>
  {editingCustomerId && (
    <div>
      <h3 align="center">Edit Customer</h3><br/>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="cust_name"
          value={formData.cust_name}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          name="cust_address"
          value={formData.cust_address}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input
          type="text"
          name="cust_phone"
          value={formData.cust_phone}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email_id"
          value={formData.email_id}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <button
          type="button"  // Not a form submit
          className="btn btn-primary"
          onClick={handleSubmit}  // Call submit directly
        >
          UPDATE
        </button>
      </div>
    </div>
  )}
</div>

  <div class="col-auto">
</div>
<div className="container mt-5">
<table class="table table-bordered table-stripped">
    <thead>
        <th>CUSTOMER ID</th>
        <th>NAME</th>
        <th>ADDRESS</th>
        <th>PHONE</th>
        <th>EMAIL</th>
        <th>EDIT</th>
        <th>DELETE</th>
    </thead>
    <tbody>
          {customers.map((customer) => (
            <tr key={customer.cust_id}>
              <td>{customer.cust_id}</td>
              <td>{customer.cust_name}</td>
              <td>{customer.cust_address}</td>
              <td>{customer.cust_phone}</td>
              <td>{customer.email_id}</td>
              <td><button
                  className="btn btn-info"
                  onClick={() => handleEditClick(customer)}>
                  EDIT
                </button></td>
                <td>
                <button className="btn btn-danger" onClick={() => handleDelete(customer.cust_id)}  >DELETE</button>
  </td>
            </tr>
          ))}
        </tbody>             
</table>
</div>
       </div>
       </div>
       </div>
    </div>
    </body>
    </html>
  )
}

export default Customers