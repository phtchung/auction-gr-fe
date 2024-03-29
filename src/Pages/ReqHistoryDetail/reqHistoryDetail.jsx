import SideBar from "../../Components/SideBar/index.jsx";
import RequestInfo from "../../Components/Information/RequestInfo.jsx";
import BiddingInfo from "../../Components/Information/BiddingInfo.jsx";
import UpdatePopup from "../../Components/UpdatePopup/UpdatePopup.jsx";
import useReqHistoryDetail from "./useReqHistoryDetail.jsx";
import MainLayOut from "../../Components/Layout/mainLayout.jsx";

const ReqHistoryDetail = () => {
    const {reqData, isLoading, isSuccess} = useReqHistoryDetail();
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
                                {reqData.status !== undefined &&
                                [5, 6].includes(reqData.status) ? (
                                    <UpdatePopup state={reqData.status}/>
                                ) : (
                                    <></>
                                )}
                                {reqData.status === 11 && (
                                    <>
                                        <div className="flex justify-between m-2.5 items-center px-2">
                                            <div className="text-left text-base font-medium ">
                                                Lí do hủy
                                            </div>
                                        </div>
                                        <div
                                            className="items-center gap-6 font-medium my-8 mx-8 px-1 text-xs space-y-6 ">
                                            <div className="grid grid-cols-6 text-left">
                                                <div> Tác nhân :</div>
                                                <div className="font-normal  col-span-2">
                                                    {" "}
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
                                                Lí do từ chối yêu cầu
                                            </div>
                                        </div>
                                        <div
                                            className="items-center gap-6 font-medium my-8 mx-8 px-1 text-sm space-y-6 ">
                                            <div className="grid grid-cols-6 text-left">
                                                <div> Thời gian từ chối :</div>
                                                <div className="font-normal  col-span-2">
                                                    {reqData.reject_time}
                                                </div>
                                            </div>
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
                            </>
                        )}
                    </div>
                </div>
            </MainLayOut>

        </>
    );
};
export default ReqHistoryDetail;
