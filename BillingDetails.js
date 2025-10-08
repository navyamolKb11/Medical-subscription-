import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const BillingDetails = () => {
  const navigate = useNavigate();
  const [billingData, setBillingData] = useState([]);
  const userEmail = localStorage.getItem("user_name");

  useEffect(() => {
    if (userEmail) {
      fetch(`http://localhost/medical/billingDetails.php?user_name=${userEmail}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data && data.billing_details) {
            setBillingData(data.billing_details);
          } else {
            console.error('No billing details received from API');
          }
        })
        .catch(error => console.error('Error fetching billing details:', error));
    }
  }, [userEmail]);
  const handleShow = (billId) => {
    navigate(`/shusr-bill/${billId}`);
  };
  return (
    <div lang="en" className="billing-page">
      <header className="top-bar">
        <h1>SINA MEDICALS</h1>
      </header>
      <div className="layout">
        <aside className="side-menu">
          <nav>
            <ul>
              <li>
                <a href="/user">HOME</a>
              </li>
              <li>
                <a href="/bd">BILLING DETAILS</a>
              </li>
              <li>
                <a href="/pd">PAYMENT</a>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="main-content">
          <div className="table-container">
            <h2 className="table-title">BILLING DETAILS</h2>
            <table className="table table-bordered table-striped large-table">
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>ID</th>
                  <th>AMOUNT</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
              {billingData.length > 0 ? (
                  billingData.map((bill, index) => (
                    <tr key={index}>
                      <td>{bill.bill_date}</td>
                      <td>{bill.bill_id}</td>
                      <td>₹{bill.total_amt}</td>
                      <td>
                        <button className="btn-info" onClick={() => handleShow(bill.bill_id)} >SHOW</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No billing details available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BillingDetails;
