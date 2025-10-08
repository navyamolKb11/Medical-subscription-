import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '.././customer/user/css/mainn.css'

const UserHome = () => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    cust_id: '',
    user_name: '',
    total_amt: '0',
    paid_amt: '0',
    balance: '0'
  });
  

  const userEmail = localStorage.getItem("user_name"); 

  useEffect(() => {
    if (userEmail) {
      fetch(`http://localhost/medical/userpage.php?user_name=${userEmail}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data) {
            setUserData({
              cust_id: data.cust_id || '',
              user_name: data.user_name || '',
              total_amt: data.total_amt || '0',
              paid_amt: data.paid_amt || '0',
              balance: data.balance || '0'
            });
          } else {
            console.error('No data received from API');
          }
        })
        .catch(error => console.error('Error fetching data:', error));
    } else {
      console.log("User email not found in localStorage.");
    }
  }, [userEmail]);
  

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      localStorage.removeItem("email_id");
      navigate('/');
    }
  };

  return (

    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>User Dashboard </title>
      <link rel="stylesheet"/>
    </head>
    <body>
      <header class="top-bar">
        <h1>SINA MEDICALS</h1>
        <div className="user-info">
  <span><strong>CUSTOMER ID: </strong><strong>{userData.cust_id}</strong></span>
  <span><strong>{userData.user_name}</strong></span>
  </div>

      </header>
      <div class="layout">
        <aside class="side-menu">
          <nav>
            <ul>
              <li><a href="/bd">BILLING DETAILS</a></li>
              <li><a href="/pd">PAYMENT DETAILS</a></li>
              <li><a href="/" onClick={handleLogout}>LOG OUT</a></li>
            </ul>
          </nav>
        </aside>
        <main class="content-area">
                <section class="card">
                <h2>TOTAL BILL</h2>
              <p className="details">₹{userData.total_amt}</p>
            </section>
            <section class="card">
              <h2>TOTAL PAID</h2>
              <p className="details">₹{userData.paid_amt}</p>
            </section>
            <section class="card">
              <h2>BALANCE</h2>
              <p className="details">₹{userData.balance}</p>
              </section>
        </main>
      </div>
    </body>
    </html>
    
    )
}

export default UserHome;