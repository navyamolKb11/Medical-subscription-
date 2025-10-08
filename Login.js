import './lp/css/main.css'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

const Login = () => {
    let [formData,setFormData]=useState({
        user_name:'',
        password:''


    });
  let [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
  

  const getlogin = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("user_name", formData.user_name);
    data.append("password", formData.password);

    fetch('http://localhost/medical/getlogin.php', {
        method: "POST",
        body: data
    })
        .then((result) => result.json())
        .then((data) => {
            if (data.Status === "true") {
                localStorage.setItem("user_name", formData.user_name);
                alert("welcome!")
                if (data.Role === "admin") {
                    navigate("/home");
                } else if (data.Role === "user") {
                    navigate("/user");
                }
            } else {
                alert(data.Message);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        });
};

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};
const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};

  return (
    <html lang="en">
    <head>
      <title>Login V8</title>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>

      <link rel="icon" type="image/png" href="lp/images/icons/favicon.ico"/>

      <link rel="stylesheet" type="text/css" href="lp/vendor/bootstrap/css/bootstrap.min.css"/>

      <link rel="stylesheet" type="text/css" href="lp/fonts/font-awesome-4.7.0/css/font-awesome.min.css"/>

      <link rel="stylesheet" type="text/css" href="lp/vendor/animate/animate.css"/>

      <link rel="stylesheet" type="text/css" href="lp/vendor/css-hamburgers/hamburgers.min.css"/>

      <link rel="stylesheet" type="text/css" href="lp/vendor/animsition/css/animsition.min.css"/>

      <link rel="stylesheet" type="text/css" href="lp/vendor/select2/select2.min.css"/>

      <link rel="stylesheet" type="text/css" href="lp/vendor/daterangepicker/daterangepicker.css"/>

      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>


      <link rel="stylesheet" type="text/css" href="lp/css/util.css"/>
      <link rel="stylesheet" type="text/css" href="lp/css/main.css"/>

    </head>
    <body>
      
      <div class="limiter">
        <div class="container-login100">
          <div class="wrap-login100">
            <form class="login100-form validate-form p-l-55 p-r-55 p-t-178" onSubmit={getlogin}>
              <span class="login100-form-title">
               LOG IN
              </span>
    
              <div class="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
                <input class="input100" type="text" onChange={handleChange} name="user_name" placeholder="Username"/>
                <span class="focus-input100"></span>
              </div>
    
              <div className="wrap-input100 validate-input" data-validate="Please enter password">
             <input
                                className="input100"
                                type={showPassword ? "text" : "password"}
                                onChange={handleChange}
                                name="password"
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="toggle-password"
                            >
                                <span className="material-icons">
                                    {showPassword ? "visibility_off" : "visibility"}
                                </span>
                            </button>
             </div>
    
              <div class="text-right p-t-13 p-b-23">
               
              </div>
    
              <div class="container-login100-form-btn">
                <button class="login100-form-btn">
                  LOG IN
                </button>
              </div>
    
              <div class="flex-col-c p-t-90 p-b-40">
              </div>
            </form>
          </div>
        </div>
      </div>
      
      

      <script src="lp/vendor/jquery/jquery-3.2.1.min.js"></script>
   
      <script src="lp/vendor/animsition/js/animsition.min.js"></script>

      <script src="lp/vendor/bootstrap/js/popper.js"></script>
      <script src="lp/vendor/bootstrap/js/bootstrap.min.js"></script>

      <script src="lp/vendor/select2/select2.min.js"></script>

      <script src="lp/vendor/daterangepicker/moment.min.js"></script>
      <script src="lp/vendor/daterangepicker/daterangepicker.js"></script>

      <script src="lp/vendor/countdowntime/countdowntime.js"></script>

      <script src="lp/js/main.js"></script>
    
    </body>
    </html>
    
  )
}

export default Login