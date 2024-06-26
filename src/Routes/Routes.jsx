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
import Home from "../Pages/Home/home.jsx";
import ReqHistoryDetail from "../Pages/ReqHistoryDetail/reqHistoryDetail.jsx";
import ResultPage from "../Components/ResultPage/resultPage.jsx";
import PageNotFound from "../Components/PageNotFound/pageNotFound.jsx";
import ReturnProduct from "../Pages/ProductReturn/productReturn.jsx";
import CategoriesFilter from "../Pages/CategoriesFilter/categoriesFilter.jsx";
import SellerHome from "../Pages/Seller/sellerHome.jsx";
import ProductDetail from "../Pages/ProductDetail/productDetail.jsx";
import Blog from "../Pages/Blog/blog.jsx";
import BlogDetail from "../Pages/Blog/blogDetail.jsx";
import ProductOnlineDetail from "../Pages/AuctionOnlineDetail/productOnlineDetail.jsx";
import AuctionOnline from "../Pages/AuctionOnline/auctionOnline.jsx";
import MessageContainer from "../Components/Message/messageContainer.jsx";
import AuctionRealTimeHome from "../Pages/AuctionRealtimeHome/auctionRealTimeHome.jsx";
import AuctionStreamHome from "../Pages/AuctionStreamHome/auctionStreamHome.jsx";
import CheckOut from "../Pages/CheckOut/checkout.jsx";
import ConfirmCheckOut from "../Pages/CheckOut/ConfirmCheckOut.jsx";
import ProductStreamDetail from "../Pages/AuctionStreamDetail/productStreamDetail.jsx";
import StreamGeneral from "../Pages/StreamGeneral/StreamGeneral.jsx";
import AuctionStream from "../Pages/AuctionStream/auctionStream.jsx";
import SearchPage from "../Pages/SearchPage/searchPage.jsx";
import CreateRequest from "../Pages/CreateRequest/createRequest.jsx";
import DepositRegistration from "../Pages/DepositRegistration/depositRegistration.jsx";
import ConfirmRegistration from "../Pages/DepositRegistration/confirmRegistration.jsx";
import ConfirmWithdrawRegistration from "../Pages/DepositRegistration/confirmWithdrawRegistration.jsx";
import AuctionStreamPriceDown from "../Pages/AuctionStreamPriceDown/auctionStreamPriceDown.jsx";


export const NormalRoutes = [
  { path: "/", element: <Home /> },
  { path:"/categories/:id", element: <CategoriesFilter /> },
  { path:"/seller/:name", element: <SellerHome /> },
  { path:"/auction/item/:id", element: <ProductDetail /> },
  { path:"/auction/online/item/:id", element: <ProductOnlineDetail /> },
  { path:"/auction/stream/item/:id", element: <ProductStreamDetail /> },
  { path:"/articles/news", element: <Blog /> },
  { path:"/articles/news/:id", element: <BlogDetail /> },
  { path:"/search", element: <SearchPage /> },

];

export const UserRoutes = [
  { path: "/mess", element: <MessageContainer /> },
  { path: "/reqHistory", element: <RequestHistory /> },
  { path: "/reqHistory/reqHistoryDetail/:id", element: <ReqHistoryDetail /> },
  { path: "/winOrderTracking", element: <WinOrdersTracking /> },
  { path: "/winOrderTracking/winOrderDetail/:id", element: <WinOrderDetail /> },
  { path: "/winOrderTracking/winOrderDetail/return/:id", element: <ReturnProduct /> },
  { path: "/user/profile", element: <Profile /> },
  { path: "/saleHistory", element: <SaleHistory /> },
  { path: "/saleHistory/reqOrderDetail/:id", element: <ReqOrderDetail /> },
  { path: "/auctionHistory", element: <AuctionHistory /> },
  { path: "/auctionHistory/auction/:id", element: <AucHistoryDetail /> },
  { path: "/reqOrderTracking", element: <ReqOrderTracking /> },
  { path: "/reqOrderTracking/reqOrderDetail/:id", element: <ReqOrderDetail /> },
  { path: "/productBid", element: <ProductBidding /> },
  { path: "/404", element: <PageNotFound /> },
  { path: "/resultSuccess", element: <ResultPage /> },
  { path: "/bidding/:id", element: <AuctionOnline /> },
  { path: "/biddingStream/:id", element: <AuctionStream /> },
  { path: "/biddingStreamDown/:id", element: <AuctionStreamPriceDown /> },
  { path: "/auctionRealtime", element: <AuctionRealTimeHome /> },
  { path: "/auctionStream", element: <AuctionStreamHome /> },
  { path: "/checkout/:id", element: <CheckOut /> },
  { path: "/confirm/:id", element: <ConfirmCheckOut /> },
  { path: "/streamGeneral", element: <StreamGeneral /> },
  { path: "/create", element: <CreateRequest /> },
  { path: "/depositRegistration", element: <DepositRegistration /> },
  { path: "/confirmRegistration", element: <ConfirmRegistration /> },
  { path: "/confirmWithdrawRegistration", element: <ConfirmWithdrawRegistration /> },
];

