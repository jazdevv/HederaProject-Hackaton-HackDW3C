import {createBrowserRouter } from "react-router-dom";
import WalletConnect from './pages/WalletConnect';
import MainPage from "./pages/MainPage";
import CreateLottery from "./pages/CreateLotteryPage";
import CreateRaffles from "./pages/CreateRafflePage";
import ParticipationsPage from "./pages/WalletParticipationsPage";
import ContractPage from "./pages/ContractPage";

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
        },
        {
          path: "/contract/:ontractid",
          element: <ContractPage/>
        }
      ]
    }
    
]);

export default router