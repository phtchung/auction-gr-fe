import SideBar from "../../Components/SideBar/index.jsx";
import RequestInfo from "../../Components/Information/RequestInfo.jsx";
import BiddingInfo from "../../Components/Information/BiddingInfo.jsx";
import UpdatePopup from "../../Components/UpdatePopup/UpdatePopup.jsx";
import useReqOrderDetail from "./useReqOrderDetail.jsx";
import {convertWinStatus} from "../../Utils/constant.js";
import MainLayOut from "../../Components/Layout/mainLayout.jsx";

const ReqOrderDetail = () => {
    const {reqData, isLoading, isSuccess} = useReqOrderDetail();

    return (
        <>
            <MainLayOut>
                <div className="wrapper">
                    <SideBar/>
                    <div className="home-right bg-white">
                        {isSuccess && (
                            <>
                                <RequestInfo data={reqData}/>
                                {(reqData.status !== undefined && reqData.status !== 1 && reqData.status !== 13) ? (
                                    <BiddingInfo data={reqData}/>
                                ) : (
                                    <></>
                                )}

                                {isSuccess &&
                                    (reqData.status === 5 || reqData.status === 6)
                                    && (
                                        <>
                                            <div className="flex justify-between m-2.5 items-center px-2">
                                                <div className="text-left text-sm font-semibold ">
                                                    Thông tin giao hàng
                                                </div>
                                            </div>
                                            <div
                                                className="items-center font-medium text-sm gap-6 my-8 mx-8 px-1 space-y-6 ">
                                                <div className="grid grid-cols-6 text-left">
                                                    <div> Người nhận :</div>
                                                    <div className="font-normal col-span-2">
                                                        {reqData?.deliData?.name}
                                                    </div>
                                                    <div> Phone Number :</div>
                                                    <div className="font-normal col-span-2">
                                                        {reqData?.deliData?.phone}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-6 text-left">
                                                    <div> Địa chỉ :</div>
                                                    <div className="font-normal col-span-5">
                                                        {reqData?.deliData?.address}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-6 text-left">
                                                    <div> Ghi chú :</div>
                                                    <div className="font-normal col-span-5">
                                                        {reqData?.deliData?.note}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-6 text-left">
                                                    <div> Trạng thái đơn hiện tại :</div>
                                                    <div className="font-normal col-span-2 text-amber-400">
                                                        {convertWinStatus(reqData?.status)}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}


                                {reqData.status !== undefined &&
                                [5, 6].includes(reqData?.status) ? (
                                    <UpdatePopup state={reqData.status}/>
                                ) : (
                                    <></>
                                )}

                                {isSuccess && reqData.status === 9 && (
                                    <>
                                        <div className="flex justify-between m-2.5 items-center px-2">
                                            <div className="text-left text-sm font-semibold ">
                                                Yêu cầu trả hàng
                                            </div>
                                        </div>

                                        <div
                                            className="items-center gap-6 font-medium my-8 mx-8 px-1 text-sm space-y-6 ">
                                            <div className="grid grid-cols-6 text-left">
                                                <div> Thời gian yêu cầu :</div>
                                                <div className="font-normal  col-span-2">
                                                    {reqData?.return_time}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-6 text-left">
                                                <div> Lí do :</div>
                                                <div className="font-normal  col-span-2">Người dùng</div>
                                            </div>

                                        </div>
                                    </>
                                )}

                                {reqData.status === 11 && (
                                    <>
                                        <div className="flex justify-between m-2.5 items-center px-2">
                                            <div className="text-left text-base font-medium ">
                                                Lí do hủy
                                            </div>
                                        </div>
                                        <div
                                            className="items-center gap-6 font-medium my-8 mx-8 px-1 text-sm space-y-6 ">
                                            <div className="grid grid-cols-6 text-left">
                                                <div> Tác nhân :</div>
                                                <div className="font-normal  col-span-2">
                                                    Quản trị viên
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-6 text-left">
                                                <div> Lí do :</div>
                                                <div className="font-normal  col-span-2">
                                                    Không phù hơp, chưa vượt qua kiểm duyệt
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {reqData.status === 13 && (
                                    <>
                                        <div className="flex justify-between m-2.5 items-center px-2">
                                            <div className="text-left text-sm font-semibold ">
                                                Lí do bị từ chối
                                            </div>
                                        </div>
                                        <div
                                            className="items-center gap-6 font-medium my-8 mx-8 px-1 text-sm space-y-6 ">

                                            <div className="grid grid-cols-6 text-left">
                                                <div> Thời gian từ chối :</div>
                                                <div className="font-normal  col-span-2">
                                                    {reqData?.reject_time}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-6 text-left">
                                                <div> Từ chối bởi :</div>
                                                <div className="font-normal  col-span-2">
                                                    Quản trị viên
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-6 text-left">
                                                <div> Lí do :</div>
                                                <div className="font-normal  col-span-2">
                                                    {reqData?.reason}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </MainLayOut>

        </>
    );
};
export default ReqOrderDetail;
