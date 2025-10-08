import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddBill = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [medilist, setMediList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
 const [medicine, setMedicine] = useState(null);

  const [billDate, setBillDate] = useState('');
  const savebill = (e) => {
    e.preventDefault();

  
    const totalAmt = rows.reduce((sum, row) => sum + (row.quantity * row.unitPrice), 0);


    const formData = new FormData();
    formData.append('fk_cust_id', selectedCustomer);
    formData.append('bill_date', billDate);
    formData.append('total_amt', totalAmt);
    formData.append('med_list', JSON.stringify(rows.map((row) => ({
        med_id: row.med_id,
        qty: row.quantity,
        unit_price: row.unitPrice,
        total_amt: row.quantity * row.unitPrice, 
    }))));


    fetch('http://localhost/medical/savebill.php', {
        method: "POST", 
        body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'success') {
        alert(data.message);
        navigate('/bills'); 
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
    .get('http://localhost/medical/customer.php') // Replace with your actual API endpoint
    .then((response) => {
      if (response.data.status === 'success') {
        setCustomers(response.data.customers); // Store the fetched customers
      } else {
        console.error('Failed to fetch customers:', response.data.message);
      }
    })
    .catch((error) => {
      console.error('Error fetching customer data:', error);
    });
  }

  const medInfo=()=>{
    axios
    .get('http://localhost/medical/medi.php') // Replace with your actual API endpoint
    .then((response) => {
      setMediList(response.data); 
    })
    .catch((error) => {
      console.error('Error fetching customer data:', error);
    });
  }

  useEffect(() => {
   
custinfo()
medInfo()
      const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
      setBillDate(currentDate);
  }, []); 
  
  // Handle customer selection change
  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.value); // Set selected customer's cust_id
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (!selectedCustomer || !billDate || rows.length === 0) {
      alert('Please select a customer, date, and add at least one medicine.');
      return;
    }


  }
  
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [rows, setRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const handleMedicineChange = (e) => {
    const selectedMedId = e.target.value;
    const selectedMedicine = medilist.find(med => med.med_id === selectedMedId);
    setMedicine(selectedMedicine); 
  };
 
  const handleQuantityChange = (e) => setQuantity(e.target.value);
  const handleUnitPriceChange = (e) => setUnitPrice(e.target.value);

 
  const handleSave = () => {
    if (quantity && unitPrice && medicine) {
        const total_amt = quantity * unitPrice;
        setRows([...rows, { 
            med_id: medicine.med_id, 
            med_title: medicine.med_title, 
            quantity, 
            unitPrice, 
            total_amt
        }]);
        setQuantity('');  
        setUnitPrice('');
        setIsModalOpen(false);
    } else {
        alert('Please fill out all fields');
    }
};

  const handleAddRowClick = (e) => {
    e.preventDefault(); 
    setIsModalOpen(true);
};

  
  return (
    <html lang="en">
    <head>
      <title>Pharmative &mdash; Colorlib Template</title>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap" rel="stylesheet"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"></link>
      <link rel="stylesheet" href="../../home_dash/fonts/icomoon/style.css"/>
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
                  <a href="/home" class="js-logo-clone"><strong class="text-primary">SINA</strong>MEDICALS</a>
                </div>
              </div>
              <div class="main-nav d-none d-lg-block">
                <nav class="site-navigation text-right text-md-center" role="navigation">
                  <ul class="site-menu js-clone-nav d-none d-lg-block">

                    <li ><a href="/home"><i class="fas fa-home"></i></a></li>
                    <li><a href="/bills">BILLS</a></li>
                    <li class="active"><a href="/addbills">ADD BILL</a></li>
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
        <a href="/pay" class="js-logo-clone"><h2 align="Center"><strong class="text-primary"></strong></h2></a> 
        <form onSubmit={savebill}>
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
                    <br/>
                    <div  data-validate = "Username is reauired">
						<span >DATE</span>
						<input class="form-control"  type="date" name="bill_date" value={billDate} onChange={(e) => setBillDate(e.target.value)}/>
					</div><br/><br/>

          <table className="table table-bordered">
        <thead>
          <tr>
            <th>Medicine</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
  {rows.map((row, index) => (
    <tr key={index}>
      <td>{row.med_title}</td>
      <td>{row.quantity}</td>
      <td>{row.unitPrice}</td>
      <td>{row.total_amt}</td>
    </tr>
  ))}
</tbody>

      </table>

      <button className="btn btn-info" onClick={handleAddRowClick}>
                    Add Row
                  </button>


                  {isModalOpen && (
  <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Medicine</h5>
          <button type="button" className="close" onClick={() => setIsModalOpen(false)} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {/* Log medicines to verify data */}
          

          <div className="form-group">
            <label>Medicine</label>
            <div className="form-group">
            <select onChange={handleMedicineChange} value={medicine?.med_id || ''} className="form-control">
  {medilist && medilist.length > 0 ? (
    medilist.map((item, index) => (
      <option key={index} value={item.med_id}>{item.med_title}</option>
    ))
  ) : (
    <option>No medicines available</option>
  )}
</select>

</div>

                </div>
                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    value={quantity}
                    onChange={handleQuantityChange}
                    />
                </div>
                <div className="form-group">
                <div className="form-group">
                  <label>Unit Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={unitPrice}
                    onChange={handleUnitPriceChange} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
          </div>
          </div> 
              )}
                <br/><br/> <br/> 
              <div class="buttonHolder">  
                    <button type="submit" class="btn btn-info col-12">SAVE</button><br/>
                    <br/>
                  
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


export default AddBill;