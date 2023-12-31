import SideBar from "../../Components/SideBar/index.jsx";
import {useNavigate} from "react-router-dom";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import Header from "../../Components/Header/header.jsx";
import {Button} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import {DialogContent, DialogTitle, Dialog, Stack} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {convertWinStatus, processStatus, statusToString} from "../../Utils/constant.js";
import useWinOrderDetail from "./useWinOrderDetail.jsx";
import {toast} from "react-toastify";
import {sendDeliveryInfor} from "../../Services/deliveryService.jsx";
import useWinOrdersTracking from "../WinOrdersTracking/useWinOrdersTracking.jsx";
import UpdatePopup from "../../Components/UpdatePopup/UpdatePopup.jsx";

const WinOrderDetail = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const {isLoading, isSuccess, winDetailData} = useWinOrderDetail();
    const {refetch, refetch1} = useWinOrdersTracking();

    const [dlvInfor, setDlvInfor] = useState(null);
    const navigate = useNavigate();

    const stateStr =
        isSuccess && (statusToString(winDetailData.status));

    useEffect(() => {
        if (isSuccess) {
            setDlvInfor({
                ...dlvInfor,
                product_id: winDetailData?.product_id,
                payment_method: "Tiền mặt",
            });
        }
    }, [isSuccess, winDetailData]);
    const handleDlvInfor = (key, value) => {
        setDlvInfor({...dlvInfor, [key]: value});
    };

    const handleSendDlvInfor = async () => {
        try {
            if (!dlvInfor) {
                toast.error("Chưa điền thông tin");
                return;
            }
            const res = await sendDeliveryInfor({...dlvInfor});
            toast.success("Gửi yêu cầu thành công", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 500,
            });
            refetch();
            refetch1();
            setOpen(false);
            navigate("/winOrderTracking?status=567");
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };
    return (
        <>
            {" "}
            <Header/>
            <div className="wrapper">
                <SideBar/>
                <div className="home-right bg-white">
                    <div className="flex m-4 gap-2 items-center px-2 justify-between">
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => navigate(-1)}
                        >
                            <ArrowBackIosOutlinedIcon
                                sx={{fontSize: 20}}
                                color="rgb(212,212,212)"
                            ></ArrowBackIosOutlinedIcon>
                            <div className="text-sm"> TRỞ LẠI</div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="text-left text-lg ">List - {stateStr} </div>
                            <ArrowForwardIosOutlinedIcon
                                sx={{fontSize: 18}}
                                fontSize="small"
                                color="gray"
                            ></ArrowForwardIosOutlinedIcon>
                            <div className="">{stateStr} Detail</div>
                        </div>
                    </div>
                    <div className="border-b border-gray-400  mx-5"></div>
                    <div className="flex justify-between m-2.5 items-center px-2">
                        <div className="text-left text-sm font-semibold ">
                            Thông tin sản phẩm
                        </div>
                        <div className="text-base font-medium mr-10 bg-amber-300 p-1 px-4">
                            {" "}
                            {stateStr}
                        </div>
                    </div>

                    {isSuccess && (
                        <>
                            <div className="items-center font-medium text-sm gap-6 my-8 mx-8 px-1 space-y-6 ">
                                <div className="grid grid-cols-6 text-left">
                                    <div> Người bán :</div>
                                    <div className="font-normal col-span-2">
                                        {winDetailData.name}
                                    </div>
                                    <div> Số điện thoại :</div>
                                    <div className="font-normal col-span-2">
                                        {" "}
                                        {winDetailData.phone}
                                    </div>
                                </div>

                                <div className="grid grid-cols-6 text-left">
                                    <div> Tên sản phẩm :</div>
                                    <div className="font-normal  col-span-5">
                                        {winDetailData.product_name}
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 text-left">
                                    <div> Danh mục :</div>
                                    <div className="font-normal col-span-2">
                                        {winDetailData.category_name}
                                    </div>
                                    <div> Chất lượng :</div>
                                    <div className="font-normal col-span-2">
                                        {winDetailData.rank}
                                    </div>
                                </div>

                                <div className="grid grid-cols-6 text-left">
                                    <div> Giá khởi điểm :</div>
                                    <div className="font-normal col-span-2">
                                        {winDetailData.reserve_price} VND
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {isSuccess && (
                        <>
                            <div className="flex justify-between m-2.5 items-center px-2">
                                <div className="text-left text-sm font-semibold ">
                                    Thông tin đấu giá{" "}
                                </div>
                            </div>
                            <div className="items-center font-medium text-sm gap-6 my-8 mx-8 px-1 space-y-6 ">
                                <div className="grid grid-cols-6 text-left">
                                    <div> Thời gian bắt đầu :</div>
                                    <div className="font-normal  col-span-2">
                                        {" "}
                                        {winDetailData?.start_time}
                                    </div>
                                    <di> Thời gian kết thúc :</di>
                                    <div className=" col-span-2 font-normal">
                                        {" "}
                                        {winDetailData?.finish_time}
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 text-left">
                                    <div> Thời gian thắng :</div>
                                    <div className="font-normal  col-span-2">
                                        {" "}
                                        {winDetailData?.victory_time}
                                    </div>
                                    <di> Hạn hoàn thành thủ tục :</di>
                                    <div className=" col-span-2 font-bold">
                                        {" "}
                                        {winDetailData?.procedure_complete_time}
                                    </div>
                                </div>

                                <div className="grid grid-cols-6 text-left">
                                    <div> Giá trúng thầu :</div>
                                    <div className="font-normal col-span-2">
                                        {" "}
                                        {winDetailData?.final_price} VND
                                    </div>
                                    <div> Phí ship :</div>
                                    <div className="font-normal col-span-2">
                                        {" "}
                                        {winDetailData?.shipping_fee} VND
                                    </div>
                                </div>

                                <div className="grid grid-cols-6 text-left font-medium">
                                    <div> Tổng tiền :</div>
                                    <div className="font-normal col-span-2">
                                        <strong>{winDetailData?.total_price} VND</strong>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {isSuccess &&
                        winDetailData.status !== 4 &&
                        winDetailData.status !== 11 && (
                            <>
                                <div className="flex justify-between m-2.5 items-center px-2">
                                    <div className="text-left text-sm font-semibold ">
                                        Thông tin giao hàng
                                    </div>
                                </div>
                                <div className="items-center font-medium text-sm gap-6 my-8 mx-8 px-1 space-y-6 ">
                                    <div className="grid grid-cols-6 text-left">
                                        <div> Người nhận :</div>
                                        <div className="font-normal col-span-2">
                                            {" "}
                                            {winDetailData.receiver}
                                        </div>
                                        <div> Phone Number :</div>
                                        <div className="font-normal col-span-2">
                                            {" "}
                                            {winDetailData.phone_receiver}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 text-left">
                                        <div> Địa chỉ :</div>
                                        <div className="font-normal col-span-5">
                                            {" "}
                                            {winDetailData.address}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 text-left">
                                        <div> Ghi chú :</div>
                                        <div className="font-normal col-span-5">
                                            {" "}
                                            {winDetailData.note}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 text-left">
                                        <div> Trạng thái đơn hiện tại :</div>
                                        <div className="font-normal col-span-2 text-amber-400">
                                            {convertWinStatus(winDetailData.status)}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    {isSuccess && winDetailData.status === 4 && (
                        <>
                            <div className="flex justify-between m-2.5 items-center px-2 ">
                                <div className="text-left text-sm font-semibold ">
                                    Thông tin giao hàng
                                </div>
                            </div>
                            <div className="items-center font-medium text-sm gap-6 my-8 mx-8 px-1 space-y-6  ">
                                <div className="grid grid-cols-6 text-left items-center">
                                    <div> Tên :</div>
                                    <div className="font-normal col-span-2">
                                        <input
                                            type="text"
                                            name="price"
                                            id="name"
                                            onChange={(e) => handleDlvInfor("name", e.target.value)}
                                            className="block  w-11/12 focus:outline-none focus:border-none border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300  focus:ring-1 focus:ring-inset  sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 items-center text-left">
                                    <div> Số điện thoại :</div>
                                    <div className="font-normal col-span-2">
                                        <input
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            placeholder="Số điện thoại"
                                            onChange={(e) => handleDlvInfor("phone", e.target.value)}
                                            className="block  w-11/12 focus:outline-none focus:border-none border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300  focus:ring-1 focus:ring-inset  sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 items-center text-left">
                                    <div> Địa chỉ :</div>
                                    <div className="font-normal col-span-2">
                                        <input
                                            type="text"
                                            name="address"
                                            id="address"
                                            placeholder="Địa chỉ"
                                            onChange={(e) =>
                                                handleDlvInfor("address", e.target.value)
                                            }
                                            className="block  w-11/12 focus:outline-none focus:border-none border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300  focus:ring-1 focus:ring-inset  sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 items-center text-left">
                                    <div> Ghi chú :</div>
                                    <div className="font-normal col-span-2">
                                        <input
                                            type="text"
                                            name="note"
                                            id="note"
                                            placeholder="Ghi chú"
                                            onChange={(e) => handleDlvInfor("note", e.target.value)}
                                            className="block  w-11/12 focus:outline-none focus:border-none border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300  focus:ring-1 focus:ring-inset  sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 text-left items-center">
                                    <div> Hình thức thanh toán :</div>
                                    <div className="font-normal col-span-2">
                                        <input
                                            type="text"
                                            name="method"
                                            id="method"
                                            disabled
                                            value="Tiền mặt"
                                            className="block  w-11/12 focus:outline-none focus:border-none border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300  focus:ring-1 focus:ring-inset  sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 mb-6">
                                <span className="w-2/5 "></span>
                                <Button
                                    onClick={handleOpen}
                                    className="bg-black"
                                    variant="filled"
                                >
                                    Gửi
                                </Button>
                            </div>

                            <Dialog open={open} onClose={handleOpen} fullWidth maxWidth="md">
                                <DialogTitle>
                                    <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">
                      Xác nhận thông tin giao hàng
                    </span>
                                        <div
                                            onClick={handleOpen}
                                            className="bg-gray-800 rounded cursor-pointer text-sm text-white hover:bg-neutral-600 border-none font-medium focus:outline-0"
                                        >
                                            <CloseIcon></CloseIcon>
                                        </div>
                                    </div>
                                    <div className="border-b mt-2  border-gray-300"></div>
                                </DialogTitle>
                                <DialogContent>
                                    <Stack spacing={2} margin={1}>
                                        <div
                                            className="items-center font-medium text-sm gap-6 my-8 mx-8 px-1 space-y-6 ">
                                            <div className="grid grid-cols-6 text-left">
                                                <div> Tên :</div>
                                                <div className=" col-span-2">
                                                    {" "}
                                                    {dlvInfor?.name || null}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-6 text-left">
                                                <div> Số điện thoại :</div>
                                                <div className=" col-span-2">
                                                    {" "}
                                                    {dlvInfor?.phone || null}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-6 text-left">
                                                <div> Địa chỉ :</div>
                                                <div className=" col-span-5">
                                                    {dlvInfor?.address || null}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-6 text-left">
                                                <div> Ghi chú :</div>
                                                <div className=" col-span-5">
                                                    {dlvInfor?.note || null}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-6 text-left">
                                                <div> Thanh toán :</div>
                                                <div className=" col-span-2"> Tiền mặt</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 justify-end my-2">
                                            <Button
                                                onClick={handleOpen}
                                                className="bg-red-500 border-none py-1 px-8"
                                                variant="filled"
                                            >
                                                Hủy
                                            </Button>
                                            <Button
                                                onClick={handleSendDlvInfor}
                                                className="bg-black py-3 border-none px-8"
                                                variant="filled"
                                            >
                                                Gửi
                                            </Button>
                                        </div>
                                    </Stack>
                                </DialogContent>
                            </Dialog>
                        </>
                    )}

                    {isSuccess && winDetailData.status === 7 && (
                        <UpdatePopup state={winDetailData.status} />
                    ) }

                    {isSuccess && winDetailData.status === 11 && (
                        <>
                            <div className="flex justify-between m-2.5 items-center px-2">
                                <div className="text-left text-sm font-semibold ">
                                    Lí do hủy
                                </div>
                            </div>

                            <div className="items-center gap-6 font-medium my-8 mx-8 px-1 text-sm space-y-6 ">
                                <div className="grid grid-cols-6 text-left">
                                    <div> Tác nhân :</div>
                                    <div className="font-normal  col-span-2">Người dùng</div>
                                </div>

                                <div className="grid grid-cols-6 text-left">
                                    <div> Lí do :</div>
                                    <div className="font-normal  col-span-2">
                                        Quá thời gian điền thông tin nhận hàng
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};
export default WinOrderDetail;
