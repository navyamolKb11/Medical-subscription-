import { BrowserRouter, Route, Routes} from 'react-router-dom';
import AdminHm from './pages/Admin/AdminHm';
import Customers from './pages/Admin/Customers';
import AddCustomer from './pages/Admin/AddCustomer';
import EditCustomer from './pages/Admin/EditCustomer';
import Login from './Login';
import Bills from './pages/Admin/Bills';
import AddBill from './pages/Admin/AddBill';
import ShowSingleMedicine from './pages/Admin/ShowSingleMedicine';
import Payments from './pages/Admin/Payments';
import NewPayment from './pages/Admin/NewPayment';
import UserHome from './pages/customer/UserHome';
import BillingDetails from './pages/customer/BillingDetails';
import PaymentDetails from './pages/customer/PaymentDetails';
import SingleUserMedicine from './pages/customer/SingleUserMedicine';


function App() {
  return (
    <div class="app">
      <BrowserRouter>
      <Routes>
        <Route index element={<Login/>}/ > 
        <Route path='/home' element={<AdminHm/>}/ > 
        <Route path='/cust' element={<Customers/>}/ > 
        <Route path='/add' element={<AddCustomer/>}/ > 
        <Route path='/edit' element={<EditCustomer/>}/ > 
        <Route path='/bills' element={<Bills/>}/ > 
        <Route path='/addbill' element={<AddBill/>}/ > 
        <Route path='//show-bill/:billId' element={<ShowSingleMedicine/>}/ > 
        <Route path='/pay' element={<Payments/>}/ > 
        <Route path='/new' element={<NewPayment/>}/ >  

        <Route path='/user' element={<UserHome/>}/ > 
        <Route path='/bd' element={<BillingDetails/>}/ >
        <Route path='/pd' element={<PaymentDetails/>}/ > 
        <Route path='/shusr-bill/:billId' element={<SingleUserMedicine/>}/ > 


      </Routes>
      </BrowserRouter>
    </div>

  );
}
export default App;
