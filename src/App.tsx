import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Customer, Dashboard, DevOps, KingdomShop } from './pages/dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />}>
          <Route index path='customers' element={<Customer />} />
          <Route path='shop' element={<KingdomShop />} />
          <Route path='devops' element={<DevOps />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
