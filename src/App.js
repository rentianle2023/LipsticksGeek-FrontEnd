import Header from './pages/Header'
import Home from './pages/Home'
import Footer from './pages/Footer';
import Recommendation from './pages/Recommendation';
import Encyclopedia from './pages/Encyclopedia';
import Community from './pages/Community';
import BrandDetail from './pages/BrandDetail';
import UserSpace from './pages/UserSpace';
import Management from './pages/Management';
import OAuth2RedirectHandler from './components/OAuth2RedirectHandler';
import {
  Routes,
  Route
} from "react-router-dom";
import LipstickDetail from './pages/LipstickDetail';

function App() {


  return (
    <div>
      <Header />
      <main className='mt-16'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recommendation" element={<Recommendation />} />

          <Route path="/encyclopedia" element={<Encyclopedia />} />

          <Route path='/brand/:brandId' element={<BrandDetail />} />

          <Route path='/lipstick/:lipstickId' element={<LipstickDetail />} />

          <Route path="/community" element={<Community />} />

          <Route path="/user/:username" element={<UserSpace />} />

          <Route path="/oauth2/redirect/:provider" element={<OAuth2RedirectHandler />} />

          <Route path='/management' element={<Management/>}></Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
