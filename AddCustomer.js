import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../hdash/css/style.css'

const AddCustomer = () => {
  let [formData,setFormData]=useState({
    cust_name: '',
    cust_address: '',
    cust_phone: '',
    email_id: '',
    pass: ''

});
let [errors, setErrors] = useState({
  pass: '',
});

const navigate = useNavigate();
const handleChange =(e)=>{
let name=e.target.name;
let value=e.target.value;
setFormData({
    ...formData,
    [name]:value,
});
if (name === 'pass') {
  if (value.length < 8) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      pass: 'Password must be at least 8 characters long.',
    }));
  } else {
    setErrors((prevErrors) => ({
      ...prevErrors,
      pass: '',
    }));
  }
}
};

const savecustomer = (e) => {
  e.preventDefault();
  const data = new FormData();
  data.append("cust_name", formData.cust_name); 
  data.append("cust_address", formData.cust_address); 
  data.append("cust_phone", formData.cust_phone); 
  data.append("email_id", formData.email_id); 
  data.append("pass", formData.pass); 
  fetch('http://localhost/medical/savecustomer.php', {
      method: "POST",
      body: data,
  })
  .then((result) => result.json())
  .then((data) => {
    if (data.status === "true") {
      alert("Customer added successfully!");
      setFormData({
        cust_name: '',
        cust_address: '',
        cust_phone: '',
        email_id: '',
        pass: ''
      });
 
      navigate('/cust'); 
    } else {
      alert(data.message || "Error occurred");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
    alert("Failed to add customer.");
  });
};


  return (
    <html lang="en">
    <head>
      <title>Pharmative &mdash; Colorlib Template</title>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap" rel="stylesheet"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"></link>
      <link rel="stylesheet" href="../../hdash/fonts/icomoon/style.css"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"></link>
      <link rel="stylesheet" href="../../hdash/css/bootstrap.min.css"/>
      <link rel="stylesheet" href="../../hdash/fonts/flaticon/font/flaticon.css"/>
      <link rel="stylesheet" href="../../hdash/css/magnific-popup.css"/>
      <link rel="stylesheet" href="css/jquery-ui.css"/>
      <link rel="stylesheet" href="css/owl.carousel.min.css"/>
      <link rel="stylesheet" href="css/owl.theme.default.min.css"/>
    
    
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
                    <li><a href="/cust"> CUSTOMERS</a></li>
                    <li class="active"><a href="/add"><i class="fa fa-user-plus"></i></a></li>
                    <li class="has-children">
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={savecustomer}>
   <div class="row">
    <div class="col-md-6 mx-auto">
        <div class="card">
        <div class="card-body">
        <div class="class-header">
        <a href="/cust" class="js-logo-clone"><h2 align="Center"><strong class="text-primary"></strong>ADD CUSTOMERS</h2></a>   
           </div>
           <div class="container">
        <div class="row">
        <div class="col-md-12 mx-auto">
        <div class="card-body">

        <div class="" data-validate = "Username is reauired">
						<span>NAME</span>
						<input class="form-control" onChange={handleChange}  type="text" name="cust_name" />
					</div>
                 
          <div class="" data-validate = "Username is reauired">
						<span>ADDRESS</span>
						<input  class="form-control" onChange={handleChange}  type="text" name="cust_address" />
					</div>

          <div class="" data-validate = "Username is reauired">
						<span>PHONE</span>
						<input class="form-control" onChange={handleChange}  type="text" name="cust_phone" />
					</div>
                
          <div class="" data-validate = "Username is reauired">
						<span>EMAIL</span>
						<input  class="form-control" onChange={handleChange}  type="text" name="email_id" />
					</div>

          <div>
                        <span>PASSWORD</span>
                        <input
                          className="form-control"
                          onChange={handleChange}
                          type="password"
                          name="pass"
                          value={formData.pass}
                        />
                        {errors.pass && (
                          <small className="text-danger">{errors.pass}</small>
                        )}
                      </div><br/>
                    </div>
                  
                    <div class="buttonHolder">  
                    <button type="submit" class="btn btn-info col-12">SAVE</button><br/>
                    <br/>
                  
      </div>
 
      </div>
  
      </div>
      </div>
   
</div>

</div>

</div>

</div>
</form>
</body>
</html>
  )
}

export default AddCustomer;