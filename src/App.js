import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddVehiclePage from './pages/AddVehiclePage';
import SearchPage from './pages/SearchPage';
import Navbar from './components/Navbar';
import BookingHistoryPage from './pages/BookingHistoryPage';
import AllVehicles from './components/AllVehicles';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/add-vehicle" element={<AddVehiclePage />} />
        <Route path="/bookings" element={<BookingHistoryPage
         />} />
         <Route path="/vehicles" element={<AllVehicles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
