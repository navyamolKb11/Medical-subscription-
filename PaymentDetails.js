import React, { useEffect, useState } from 'react';

const PaymentDetails = () => {
  const [paymentData, setPaymentData] = useState([]);
  const userEmail = localStorage.getItem("user_name");

  useEffect(() => {
    if (userEmail) {
      fetch(`http://localhost/medical/paydetails.php?user_name=${userEmail}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data && data.payment_details) {
            setPaymentData(data.payment_details);
          } else {
            console.error('No payment details received from API');
          }
        })
        .catch(error => console.error('Error fetching payment details:', error));
    }
  }, [userEmail]);

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
                <a href="/bd">BILL DETAILS</a>
              </li>
              <li>
                <a href="/pd">PAYMENT DETAILS</a>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="main-content">
          <div className="table-container">
            <h2 className="table-title">Payment Details</h2>
            <table className="table table-bordered table-striped large-table">
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>ID</th>
                  <th>PAID AMOUNT</th>
                </tr>
              </thead>
              <tbody>
              {paymentData.length > 0 ? (
                  paymentData.map((payment, index) => (
                    <tr key={index}>
                      <td>{payment.paid_date}</td>
                      <td>{payment.pay_id}</td>
                      <td>₹{payment.paid_amt}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No payment details available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}

export default PaymentDetails