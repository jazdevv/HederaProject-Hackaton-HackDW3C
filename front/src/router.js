import {createBrowserRouter } from "react-router-dom";
import WalletConnect from './pages/WalletConnect';
import MainPage from "./pages/MainPage";
import CreateLottery from "./pages/CreateLotteryPage";
import CreateRaffles from "./pages/CreateRafflePage";
import ParticipationsPage from "./pages/WalletParticipationsPage";
import ContractPage from "./pages/ContractPage";
import CreatedRafflesandLotteries from './pages/WalletCreatedRafflesandLotteriesPage'
import ContractWinnersInfo from "./pages/ContractWinnersInfo";
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
          path:"/wallet/created/created",
          element:<CreatedRafflesandLotteries/>
        },
        // {
        //   path:"/wallet/participations",
        //   element:<ParticipationsPage/>
        // },
        {
          path: "/contract/:contractAddress",
          element: <ContractPage/>
        },
        {
          path: "/contractwinners/:contractAddress",
          element: <ContractWinnersInfo/>
        }
      ]
    }
    
]);

export default router