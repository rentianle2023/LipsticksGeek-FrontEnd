import Header from './pages/Header'
import Home from './pages/Home'
import Footer from './pages/Footer';
import Recommendation from './pages/Recommendation';
import Encyclopedia from './pages/Encyclopedia';
import Community from './pages/Community';
import BrandDetail from './pages/BrandDetail';
import {UserContextProvider} from './context/UserContextProvider';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LipstickDetail from './pages/LipstickDetail';

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Header />

        <main className='mt-16'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recommendation" element={<Recommendation />} />

            <Route path="/encyclopedia" element={<Encyclopedia />} />

            <Route path='/brand/:brandId' element={<BrandDetail />} />

            <Route path='/lipstick/:lipstickId' element={<LipstickDetail />} />

            <Route path="/community" element={<Community />} />
          </Routes>
        </main>

        <Footer />
      </Router>
    </UserContextProvider>
  );
}

export default App;
