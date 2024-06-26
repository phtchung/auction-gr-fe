import {Breadcrumb} from "antd";
import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import useAuctionOnline from "./useAuctionOnline.jsx";
import {docSoTiengViet, formatDateTimeMiliSecond, formatMoney, readMoney} from "../../Utils/constant.js";
import {useEffect, useState} from "react";
import {Modal} from 'antd';
import {toast} from "react-toastify";
import {sendAuctionDataOnline} from "../../Services/biddingService.jsx";
import {useParams} from "react-router-dom";
import {CheckCircleOutlined} from '@ant-design/icons';
import {useAuthContext} from "../Context/AuthContext.jsx";
import useAuctionOnlineTracking from "../../zustand/useAuctionOnlineTracking.jsx";
import useListenBidding from "../../Hooks/useListenBidding.js";
import CountDownOnline from "../../Components/Clock/countDownOnline.jsx";
import CustomSpinner from "../../Components/CustomSpinner/CustomSpinner.jsx";
import FZFNotFound from "../../Components/PageNotFound/404NotFound.jsx";

const AuctionOnline = () => {
    const {id} = useParams();
    const {selectedAuction, setSelectedAuction, setBidList, setHighestPrice} = useAuctionOnlineTracking()
    const [auctionData, setAuctionData] = useState({productId: id})
    const [state, setState] = useState(null)
    const {currentUser} = useAuthContext();
    useListenBidding()
    useEffect(() => {
        setSelectedAuction(id)
    }, [id]);

    const {
        isLoading,
        isSuccess,
        fullBidListData,
        isSc,
        isLd,
        productData,
        highestPrice,
        bidList,
        isError
    } = useAuctionOnline(state)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOnlineBidding = async (new_price) => {
        try {
            const res = await sendAuctionDataOnline({...auctionData, final_price: new_price});
            setAuctionData({productId: id})
            const data = res.data.new_bid
        } catch (error) {
            toast.error(error?.response?.data?.message, {
                position: "top-right",
            });
        }
    }
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setState(null)
        setIsModalOpen(false);
    };
    const getFullBidList = () => {
        setState(1)
        showModal()
    }

    const modalStyles = {
        body: {maxHeight: '450px', overflowY: 'auto', marginRight: '-10px'},
        header: {
            backgroundColor: '#fdb45b',
            textAlign: 'center',
            fontWeight: 700,
        },
        content: {
            backgroundColor: '#fdb45b',
            borderRadius: 0,
            color: '#363534',
        },
    };
    return (
        <><MainLayOut>
            <div className="md:container">
                {isLoading ?
                    <>
                        <CustomSpinner h={12} w={12} font={'sm'}/>
                    </> :
                    isError ?
                        <FZFNotFound btnText={'Trở về'} error={'Rất tiếc, hệ thống không tìm thấy phiên đấu giá.'}
                                     urlReturn={'/auctionRealtime'}/>
                        :
                        isSuccess &&
                        <>{
                            productData.type_of_auction === 1 ? <>
                                    <div className="mt-24">
                                        <div className="px-3 mx-2 mt-2">
                                            <Breadcrumb
                                                items={[
                                                    {
                                                        title: <a href="/auctionRealtime">Trở lại</a>,
                                                    },
                                                ]}
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-4  items-center gap-6 p-5 m-2 mt-4 "
                                             style={{backgroundColor: '#ef9731'}}>
                                            <div className="lg:col-span-2 md:col-span-4  sm:col-span-2">
                                                <div id="slider" className="image-container">
                                                    <img style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        display: 'block',
                                                        objectFit: 'cover',
                                                    }}
                                                         src={productData?.product_id?.main_image}
                                                         alt={`Image`}/>
                                                </div>
                                            </div>
                                            <div className="lg:col-span-2 md:col-span-4 sm:col-span-2">
                                                <CountDownOnline id={productData?._id}
                                                                 targetDate={productData?.finish_time}/>
                                                {/*thông tinn đấu giá*/}
                                                <div
                                                    className="flex flex-col ring-2 ring-orange-500 text-white lg:min-h-[12.625rem] md:min-h-[13rem] sm:min-h-[13.3rem]
                                                      min-[400px]:min-h-[14.8rem] shadow-lg shadow-orange-500/50 font-sans text-left mt-6 mx-10 mb-6"
                                                    style={{backgroundColor: '#f1a851'}}>
                                                    <div style={{
                                                        fontWeight: 600,
                                                        textShadow: '0px 0px 10px #ccc3b8'
                                                    }}
                                                         className="flex justify-between items-center border-b border-orange-500 shadow-blue-100 px-5   p-2 pr-6 relative">
                                                            <span className="text-base   flex  gap-3  ">
                                                               Diễn biến cuộc đấu giá
                                                            </span>
                                                        <span onClick={getFullBidList}
                                                              className="text-sm truncate hover:text-orange-700 cursor-pointer  hover:underline ">
                                                            Xem tất cả
                                                             </span>
                                                    </div>

                                                    {
                                                        bidList && bidList.length !== 0 ?
                                                            bidList.slice(0, 3).map((bid, index) => (
                                                                <>
                                                                    <div key={index} className="grid grid-cols-2 justify-between items-center ">
                                                                        <div style={{fontWeight: 600}}
                                                                             className=" px-5 p-1.5 flex flex-col  relative">
                                                                            <span className="flex gap-3">
                                                                            <h1 className={`text-base shadow-black ${index === 0 ? 'text-red-800 font-bold' : ''}`}
                                                                                style={{textShadow: '#f1a851 1px 0 10px'}}>
                                                                            {formatMoney(bid.bid_price)} VND
                                                                            </h1>
                                                                            {
                                                                                bid.username === currentUser.username &&
                                                                                <CheckCircleOutlined
                                                                                    style={{color: "green"}}/>
                                                                            }
                                                                            </span>

                                                                            <span className="text-xs text-gray-200">
                                                                            {formatDateTimeMiliSecond(bid.bid_time)}
                                                                             </span>
                                                                        </div>
                                                                        <div
                                                                            className="px-6 justify-self-end font-semibold text-base">
                                                                            {bid.username}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            ))
                                                            :
                                                            <>
                                                                <h5 className="text-sm font-medium text-center mt-10">Không
                                                                    có dữ liệu</h5>
                                                            </>
                                                    }
                                                </div>

                                                <div
                                                    className="flex flex-col ring-2 ring-orange-500 text-white bg-orange-300 shadow-lg shadow-orange-500/50 font-sans text-left  mx-10 "
                                                   >
                                                    <div style={{
                                                        fontWeight: 600,
                                                        textShadow: '0px 0px 10px #ccc3b8'
                                                    }}
                                                         className="flex justify-between items-center border-b border-orange-500 shadow-blue-100 px-5   p-2 pr-6 relative">
                                                        <span className="text-base flex gap-3  ">
                                                              <img src="https://storage.googleapis.com/auction_gr/label.png" alt=""
                                                                   style={{width: '17%'}}/>
                                                           Giá hiện tại
                                                        </span>
                                                        <span className="text-base font-semibold text-orange-800 ">
                                                              {formatMoney(highestPrice)} VND
                                                        </span>
                                                    </div>
                                                    <div className=" justify-between my-2 items-center ">
                                                        <div
                                                            onClick={() => handleOnlineBidding(highestPrice + productData.step_price)}
                                                            className="p-3 text-center cursor-pointer bg-orange-700 hover:bg-orange-500 mx-8 mt-3 mb-3 font-semibold text-lg">
                                                        <span>Trả giá <span
                                                            className='font-bold'> {formatMoney(highestPrice + productData.step_price)} VND</span> </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Modal styles={modalStyles} title="Diễn biến các lệnh trả giá"
                                           className="overflow-auto text-white"
                                           footer={null} centered open={isModalOpen}
                                           onCancel={handleCancel}>
                                        {
                                            isSc ?
                                                fullBidListData.length !== 0 ?
                                                    fullBidListData.map((bid, index) => (
                                                        <>
                                                            <div key={index}
                                                                 className="flex justify-between my-2.5 items-center ">
                                                                <div style={{fontWeight: 600}}
                                                                     className="flex flex-col  relative">
                                                                    <h1 className='text-base font-semibold shadow-black'>
                                                                        {formatMoney(bid.bid_price)} VND
                                                                    </h1>
                                                                    <span className="text-xs"
                                                                          style={{color: '#676464'}}
                                                                    >
                                                                    {formatDateTimeMiliSecond(bid.bid_time)}
                                                                </span>
                                                                </div>
                                                                <div
                                                                    className="px-6 font-medium opacity-90 text-base">
                                                                    {bid.username}
                                                                </div>
                                                            </div>
                                                        </>
                                                    ))
                                                    :
                                                    <>
                                                        <div className="text-center font-medium my-14">Không có dữ liệu
                                                        </div>
                                                    </>
                                                :
                                                <>
                                                    <CustomSpinner h={8} w={8} font={'xs'}/>
                                                </>
                                        }
                                    </Modal>
                                </>
                                :
                                <FZFNotFound btnText={'Trở về'}
                                             error={'Rất tiếc, hệ thống không tìm thấy phiên đấu giá.'}
                                             urlReturn={'/auctionRealtime'}/>
                        }
                        </>
                }
            </div>
        </MainLayOut>
        </>
    )
}
export default AuctionOnline
