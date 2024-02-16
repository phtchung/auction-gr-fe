import ReqOrderTracking from "../Pages/ReqOrderTracking/reqOrderTracking.jsx";
import WinOrderDetail from "../Pages/WinOrderDetail/winOrderDetail.jsx";
import ReqOrderDetail from "../Pages/ReqOrderDetail/reqOrderDetail.jsx";
import WinOrdersTracking from "../Pages/WinOrdersTracking/winOrdersTracking.jsx";
import Profile from "../Pages/Profile/profile.jsx";
import ProductBidding from "../Pages/ProductBidding/productBidding.jsx";
import AuctionHistory from "../Pages/AuctionHistory/auctionHistory.jsx";
import RequestHistory from "../Pages/RequestHistory/requestHistory.jsx";
import SaleHistory from "../Pages/SaleHistory/saleHistory.jsx";
import AucHistoryDetail from "../Components/AuctionHistoryDetail/aucHistoryDetail.jsx";
import Login from "../Pages/Login/login.jsx";
import Home from "../Pages/Home/home.jsx";
import ReqHistoryDetail from "../Pages/ReqHistoryDetail/reqHistoryDetail.jsx";
import RequestTracking from "../Pages/Admin/RequestTracking/reqTracking.jsx";
import AdminRequestDetail from "../Pages/Admin/RequestDetail/requestDetail.jsx";
import ConfirmApproved from "../Pages/Admin/ConfirmApprovedReq/confirmApproved.jsx";
import ResultPage from "../Components/ResultPage/resultPage.jsx";
import PageNotFound from "../Components/PageNotFound/pageNotFound.jsx";
import CreateProductAuction from "../Pages/Admin/CreateProductAuction/createProductAuction.jsx";

export const NormalRoutes = [{ path: "/login", element: <Login /> }];

export const UserRoutes = [
  { path: "/", element: <Home /> },
  { path: "/reqHistory", element: <RequestHistory /> },
  { path: "/reqHistory/reqHistoryDetail/:id", element: <ReqHistoryDetail /> },
  { path: "/winOrderTracking", element: <WinOrdersTracking /> },
  { path: "/winOrderTracking/winOrderDetail/:id", element: <WinOrderDetail /> },
  { path: "/user/profile", element: <Profile /> },
  { path: "/saleHistory", element: <SaleHistory /> },
  { path: "/saleHistory/reqOrderDetail/:id", element: <ReqOrderDetail /> },
  { path: "/auctionHistory", element: <AuctionHistory /> },
  { path: "/auctionHistory/auction/:id", element: <AucHistoryDetail /> },
  { path: "/reqOrderTracking", element: <ReqOrderTracking /> },
  { path: "/reqOrderTracking/reqOrderDetail/:id", element: <ReqOrderDetail /> },
  { path: "/productBid", element: <ProductBidding /> },
  { path: "/404", element: <PageNotFound /> },


  { path: "/admin/reqTracking", element: <RequestTracking /> },
  { path: "/admin/reqTracking/requestDetail/:id", element: <AdminRequestDetail /> },
  { path: "/admin/reqTracking/requestDetail/approveRequest/:id", element: <ConfirmApproved /> },
  { path: "/admin/resultSuccess", element: <ResultPage /> },
  { path: "/admin/createRequest", element: <CreateProductAuction /> },
];

