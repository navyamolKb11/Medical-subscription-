import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleUserMedicine = () => {
     const { billId } = useParams();
  const [billDetails, setBillDetails] = useState([]);
  const [billDate, setBillDate] = useState("");
  const [finalTotal, setFinalTotal] = useState(0);

  useEffect(() => {
    fetch(`http://localhost/medical/userbilldetails.php?bill_id=${billId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setBillDate(data[0].bill_date);
          setBillDetails(data);
          setFinalTotal(data[0].final_total);
        }
      })
      .catch((error) => console.error("Error fetching bill details:", error));
  }, [billId]);
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
          <div className="row">
            <div className="col-md-6 mx-auto">
              <div className="card">
                <div className="card-body">
                  <a href="/cust" className="js-logo-clone">
                    <h2 align="center"><strong className="text-primary"></strong></h2>
                  </a>
                  <form className="row g-3">
                    <div className="col-auto"></div>
                  </form>
                  <h2 align="center">BILL DETAILS</h2>

                  <div className="bill-info">
                    <h4>
                      <strong>DATE: </strong> {billDate}<br></br>
                    </h4>
                    <br />
                  </div>
                  <table className="table table-bordered table-striped large-table">
                    <thead>
                      <tr>
                        <th>MEDICINE</th>
                        <th>QUANTITY</th>
                        <th>UNIT PRICE</th>
                        <th>AMOUNT</th>
                      </tr>
                    </thead>
                    <tbody>
          {billDetails.map((item, index) => (
            <tr key={index}>
              <td>{item.med_title}</td>
              <td>{item.qty}</td>
              <td>{item.unit_price}</td>
              <td>{item.total_amt}</td>
            </tr>
          ))}
        </tbody>
                  </table>
                  <br />
                  <form>
                    <div className="mb-2">
                    <div className="info-box">
                      <label htmlFor="finalTotal" className="form-label">
                        <h6><strong>TOTAL:</strong></h6>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="finalTotal"
                        value={finalTotal}  
                        readOnly
                      />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default SingleUserMedicine;
