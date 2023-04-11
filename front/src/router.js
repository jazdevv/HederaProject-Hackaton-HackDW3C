import {createBrowserRouter } from "react-router-dom";
import WalletConnect from './pages/WalletConnect';
import MainPage from "./pages/MainPage";
import CreateLottery from "./pages/CreateLotteryPage";
import CreateRaffles from "./pages/cretedRafflesPage";
import ParticipationsPage from "./pages/walletParticipationsPage";

// REACT ROUTER
const router = createBrowserRouter([
    {
      path:'/',
      element: <WalletConnect/>,
      children:[
        {
          path:"",
          element:<MainPage/>
        },
        {
          path:"/newLottery",
          element:<CreateLottery/>
        },
        {
          path:"/newRuffle",
          element:<CreateRaffles/>
        },
        {
          path:"/wallet/created/raffles",
          element:<CreateRaffles/>
        },
        {
          path:"/wallet/created/lotteries",
          element:<CreateLottery/>
        },
        {
          path:"/wallet/participations",
          element:<ParticipationsPage/>
        }
      ]
    }
    
]);

export default router