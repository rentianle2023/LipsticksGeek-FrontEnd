import Header from './pages/Header'
import Home from './pages/Home'
import Footer from './pages/Footer';
import Recommendation from './pages/Recommendation';
import Wiki from './pages/Wiki';
import Community from './pages/Community';
import BrandDetail from './pages/wiki/BrandDetail';
import UserSpace from './pages/UserSpace';
import Management from './pages/Management';
import OAuth2RedirectHandler from './components/OAuth2RedirectHandler';
import LipstickDetail from './pages/wiki/LipstickDetail';
import {
  Routes,
  Route
} from "react-router-dom";

function App() {


  return (
    <div>
      <Header />
      <main className='mt-[60px]'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recommendation/*" element={<Recommendation />} />

          <Route path="/wiki" element={<Wiki />} />

          <Route path='/wiki/brand/:brandId' element={<BrandDetail />} />

          <Route path='/wiki/lipstick/:lipstickId' element={<LipstickDetail />} />

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
