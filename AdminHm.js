import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../../hdash/css/style.css'

const AdminHm = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
      const confirmLogout = window.confirm('Are you sure you want to logout?');
        if (confirmLogout) {
          // Perform logout actions like clearing tokens, etc.
          navigate('/');
    };
  }

  return (
    <html lang="en">
    <head>
      <title></title>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap" rel="stylesheet"/>
      <link rel="stylesheet" href="home_dash/fonts/icomoon/style.css"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"></link>
      <link rel="stylesheet" href="home_dash/css/bootstrap.min.css"/>
      <link rel="stylesheet" href="home_dash/fonts/flaticon/font/flaticon.css"/>
      <link rel="stylesheet" href="home_dash/css/magnific-popup.css"/>
      <link rel="stylesheet" href="home_dash/css/jquery-ui.css"/>
      <link rel="stylesheet" href="home-dash/css/owl.carousel.min.css"/>
      <link rel="stylesheet" href="css/owl.theme.default.min.css"/>
    
    
      <link rel="stylesheet" href="home_dash/css/aos.css"/>
    
      <link rel="stylesheet" href="home_dash/css/style.css"/>
    
    </head>
    
    <body>
    
      <div class="site-wrap">
    
    
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

                    <li class="active"><a href="/home"> <i class="fas fa-home"></i> </a></li>
                    <li><a href="/cust">CUSTOMERS</a></li>
                    <li class="has-children">
                    </li>
                    <li><a href="/bills">BILLS</a></li>
                    <li><a href="/pay">PAYMENTS</a></li>
                    <li>
                        <a href="#" onClick={handleLogout}>
                        <i class="fas fa-sign-out-alt"></i> 
                        </a>
                      </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      
    
        <div class="owl-carousel owl-single px-0">
    <div class="site-blocks-cover overlay" style={{backgroundImage:'url(hdash/images/hero_bg.jpg)'}}>
            <div class="container">
              <div class="row">
                <div class="col-lg-12 mx-auto align-self-center">
                  <div class="site-block-cover-content text-center">
                    <h1 class="mb-0"><strong class="text-primary">New Medicine</strong> Everyday</h1>
    
                    <div class="row justify-content-center mb-5">
                      <div class="col-lg-6 text-center">
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
        </div>
      </div>
    
      <script src="js/jquery-3.3.1.min.js"></script>
      <script src="js/jquery-ui.js"></script>
      <script src="js/popper.min.js"></script>
      <script src="js/bootstrap.min.js"></script>
      <script src="js/owl.carousel.min.js"></script>
      <script src="js/jquery.magnific-popup.min.js"></script>
      <script src="js/aos.js"></script>
    
      <script src="js/main.js"></script>
    
    </body>
    
    </html>
  )
}

export default AdminHm;