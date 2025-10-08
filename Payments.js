import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Payments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
   
    axios.get('http://localhost/medical/payment.php')
      .then(response => {
        setPayments(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const delete_payment = (pay_id) => {
    const data = new FormData();
    data.append("pay_id", pay_id);
  
    if (!window.confirm("Are you sure you want to delete this payment?")) return;
  
    fetch('http://localhost/medical/delete_payment.php', {
      method: "POST",
      body: data
    })
    .then((response) => response.json())
    .then((result) => {
      if (result.Status === "success") {
        setPayments((prevPayments) => prevPayments.filter(payment => payment.pay_id !== pay_id));
        alert('Payment deleted successfully');
      } else {
        alert(result.Message || 'Failed to delete payment');
      }
    })
    .catch(error => {
      alert('An error occurred: ' + error.message);
    });
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
                    <li class="active"><a href="/pay">PAYMENTS</a></li>
                    <li class="has-children">
                    </li>
                    <li><a href="/new">NEW PAYMENT</a></li>
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
        <a href="/cust" class="js-logo-clone"><h2 align="Center"><strong class="text-primary"></strong></h2></a>   

       <form class="row g-3" >
  <div class="col-auto">

</div>
</form>
<table class="table table-bordered table-stripped">
    <thead>
    <tr>
            <th>CUSTOMER</th>
            <th>TOTAL BILL</th>
            <th>TOTAL PAID</th>
            <th>BALANCE</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={index}>
              <td>{payment.cust_name}</td>
              <td>₹{payment.total_bill || 0}</td>
              <td>₹{payment.total_paid || 0}</td>
              <td>₹{payment.balance || 0}</td>
              <td>
                <button className="btn btn-danger" onClick={() => delete_payment(payment.pay_id)}>DELETE</button>
              </td>
                        </tr>
                      ))}
                    </tbody>
</table>
</div>
       </div>
       </div>
    </div>
    </body>
    </html>
  )
}

export default Payments;