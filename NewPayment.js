import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewPayment = () => {
   const [selectedCustomer, setSelectedCustomer] = useState('');
   const [customers, setCustomers] = useState([]); 
   const [PaidDate, setPaidDate] = useState('');
   const navigate = useNavigate();
   const [paidAmt, setPaidAmt] = useState('');

   const payment = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fk_cust_id', selectedCustomer);
    formData.append('paid_date', PaidDate);
    formData.append("paid_amt", paidAmt);

    fetch('http://localhost/medical/newpay.php', {
        method: "POST",
        body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'success') {
        alert(data.message);
        navigate('/pay');
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error('Error saving bill:', error);
    });
};
   const custinfo=()=>{
    axios
    .get('http://localhost/medical/customer.php')
    .then((response) => {
      if (response.data.status === 'success') {
        setCustomers(response.data.customers);
      } else {
        console.error('Failed to fetch customers:', response.data.message);
      }
    })
    .catch((error) => {
      console.error('Error fetching customer data:', error);
    });
  }
useEffect(() => {
   
custinfo()
const currentDate = new Date().toISOString().split('T')[0]; 
setPaidDate(currentDate);

}, []); 

const handleCustomerChange = (event) => {
  setSelectedCustomer(event.target.value);
};


  return (
    <html lang="en">
    <head>
      <title>Pharmative &mdash; Colorlib Template</title>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap" rel="stylesheet"/>
      <link rel="stylesheet" href="../../home_dash/fonts/icomoon/style.css"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"></link>
      <link rel="stylesheet" href="../../home_dash/css/bootstrap.min.css"/>
      <link rel="stylesheet" href="../../home_dash/fonts/flaticon/font/flaticon.css"/>
      <link rel="stylesheet" href="../../home_dash/css/magnific-popup.css"/>
      <link rel="stylesheet" href="css/jquery-ui.css"/>
      <link rel="stylesheet" href="css/owl.carousel.min.css"/>
      <link rel="stylesheet" href="css/owl.theme.default.min.css"/>
    
    
      <link rel="stylesheet" href="../../home_dash/css/aos.css"/>
    
      <link rel="stylesheet" href="../../home_dash/css/style.css"/>
    
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
                  <a href="/homel" class="js-logo-clone"><strong class="text-primary">SINA</strong>MEDICALS</a>
                </div>
              </div>
              <div class="main-nav d-none d-lg-block">
                <nav class="site-navigation text-right text-md-center" role="navigation">
                  <ul class="site-menu js-clone-nav d-none d-lg-block">

                    <li ><a href="/home"><i class="fas fa-home"></i></a></li>
                    <li><a href="/pay">PAYMENTS</a></li>
                    <li class="active"><a href="/new"> NEW PAYMENT</a></li>
                    <li class="has-children">
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>

   <div class="row">
    <div class="col-md-8 mx-auto">
        <div class="card">
        <div class="card-body">
        <div class="class-header">
        <a href="/pay" class="js-logo-clone"><h2 align="Center"><strong class="text-primary">PAYMENT</strong></h2></a> 
        <form onSubmit={payment}> 
            <div class="form-group">
            <label  for="Title" class="form-label" >CUSTOMER</label>
             <select
          id="customerSelect"
          className="form-control"
          value={selectedCustomer}
          onChange={handleCustomerChange}
          name="fk_cust_id" // Foreign key name
          aria-label="Select a customer"
        >
          <option value="">Select a customer</option>
          {/* Mapping customer names to options */}
          {customers.map((customer) => (
            <option key={customer.cust_id} value={customer.cust_id}>
              {customer.cust_name}
            </option>
          ))}
        </select>
  <br/>
  <div class="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
						<span>AMOUNT</span>
						<input 
    className="form-control"  
    type="text" 
    name="paid_amt" 
    value={paidAmt} 
    onChange={(e) => setPaidAmt(e.target.value)} 
/>
					</div>
                    <br/>
                  
						<span>DATE</span>
            <input class="form-control"  type="date" name="bill_date" value={PaidDate} onChange={(e) => setPaidDate(e.target.value)}/>
		     	<br/><br/>
                    
                    <div class="buttonHolder">  
                    <button type="submit" class="btn btn-info col-12">SAVE</button>
                    </div>

        </div> 
        </form>
        </div> 
        </div>  
        </div> 
        </div>
        </div>
        </body>
        </html>
  )
}

export default NewPayment