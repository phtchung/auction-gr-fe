import {processStatus, statusToString, tabData1} from "../../Utils/constant.js";
import TabItem from "../../Components/TabItem/TabItem.jsx";
import SideBar from "../../Components/SideBar/index.jsx";
import {useNavigate} from "react-router-dom";
import Header from "../../Components/Header/header.jsx";
import AuctionTable from "../../Components/AuctionTable/auctionTable.jsx";
import useWinOrdersTracking from "./useWinOrdersTracking.jsx";
import {useState} from "react";
import {CircularProgress} from "@mui/material";

const WinOrdersTracking = () => {
    const navigate = useNavigate()



    const handleTabClick = (tabIndex) => {
        setSelectedTab(tabIndex);
        // Gọi hàm handelClick với giá trị tabIndex nếu bạn muốn thực hiện thêm logic
        handelClick(tabIndex);
    };

    const {isLoading , isSuccess, winTrackingData ,isScCount,winCount, colData,status,setStatus} = useWinOrdersTracking()

    const [selectedTab, setSelectedTab] = useState(status);
    const handelClick = (value) => {
        setStatus(processStatus(value))
        setSelectedTab(value);
        navigate(`/winOrderTracking?status=${value}`)
    }

    return (
        <>
            <Header/>
            <div className="wrapper" >
                <SideBar></SideBar>
                <div className="home-right ">
                    <div className="text-left px-5 pt-3 pb-3 text-xl font-bold text-neutral-600  bg-white">Quản Lý Đơn
                        Thắng Đấu giá
                    </div>
                    <div className="border-b border-neutral-700 "></div>
                    <div className="flex items-center font-normal justify-center pt-10 flex-wrap  ">

                        {
                           isSuccess && isScCount &&  <div className="flex justify-end">
                                <>
                                    <TabItem data={tabData1[0]}  count={winCount.count_AucW}
                                             onClick={() => handelClick(4)} isSelected={selectedTab === 4}></TabItem>
                                    <TabItem data={tabData1[1]} count={winCount.count_DlvW}
                                        onClick={() => handelClick(567)} isSelected={selectedTab === 567}></TabItem>
                                    <TabItem data={tabData1[2]} count={winCount.count_Cpl}
                                             onClick={() => handelClick(8)} isSelected={selectedTab === 8}></TabItem>
                                    <TabItem data={tabData1[3]} count={winCount.count_Can}
                                             onClick={() => handelClick(11)} isSelected={selectedTab === 11}></TabItem>
                                    <TabItem data={tabData1[4]} count={winCount.count_Ret}
                                             onClick={() => handelClick(9)} isSelected={selectedTab === 9}></TabItem>

                                </>
                            </div>
                        }
                    </div>
                    {isLoading && <> <CircularProgress color="inherit" className="mt-20" /> </>}

                    {
                        isSuccess  && <>
                            <div className="border border-gray-300">
                                <div className="flex items-center justify-between  bg-white  p-2 text-sm">
                                    <div className="text-left font-medium my-2 ml-3 ">
                                        List - {statusToString(processStatus(status))}
                                    </div>
                                </div>

                                <div className="border-b-2 border-gray-300 "></div>
                                <AuctionTable cols={colData} rows={winTrackingData}></AuctionTable>
                            </div>
                        </>
                    }


                </div>
            </div>

        </>
    )
};

export default WinOrdersTracking;
