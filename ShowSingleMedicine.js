import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShowSingleMedicine = () => {
const { billId } = useParams();
  const [billDetails, setBillDetails] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [billDate, setBillDate] = useState("");
  const [finalTotal, setFinalTotal] = useState(0);

  useEffect(() => {
    fetch(`http://localhost/medical/billdetails.php?bill_id=${billId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setCustomerName(data[0].cust_name);
          setBillDate(data[0].bill_date);
          setBillDetails(data);
          setFinalTotal(data[0].final_total);
        }
      })
      .catch((error) => console.error("Error fetching bill details:", error));
  }, [billId]);

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
                    <li ><a href="/bills">BILLS</a></li>
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
        <a href="/cust" class="js-logo-clone"><h2 align="Center"><strong class="text-primary"></strong></h2></a>   

       <form class="row g-3" >
  <div class="col-auto">
 </div>
 </form>
 <h2 align="center">BILL DETAILS</h2>
          
                  <div className="bill-info">
                  <h6>
                  <h6>
                  <strong>DATE: </strong> {billDate} </h6>   <br/>
          <strong>CUSTOMER NAME: </strong> {customerName}
        </h6>
             <br/>          
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>MEDICINE</th>
            <th>QUANTITY</th>
            <th>UNIT PRICE</th>
            <th> AMOUNT</th>
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
      <br/>
      <form>
                    <div className="mb-2">
                      <label htmlFor="finalTotal" className="form-label">
                        <h6><strong>TOTAL</strong></h6>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="finalTotal"
                        value={finalTotal}  
                        readOnly
                      />
                    </div>
                  </form>
    </div>
</div>
</div>
</div>
      </body>
      </html>
  )
}

export default ShowSingleMedicine