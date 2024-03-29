import SideBar from "../../Components/SideBar/index.jsx";
import {useNavigate} from "react-router-dom";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import {Button} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import {DialogContent, DialogTitle, Dialog, Stack} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {convertWinStatus, formatMoney, statusToString} from "../../Utils/constant.js";
import useWinOrderDetail from "./useWinOrderDetail.jsx";
import {toast} from "react-toastify";
import {sendDeliveryInfor} from "../../Services/deliveryService.jsx";
import useWinOrdersTracking from "../WinOrdersTracking/useWinOrdersTracking.jsx";
import UpdatePopup from "../../Components/UpdatePopup/UpdatePopup.jsx";
import {Image, Radio, Spin} from "antd";
import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import {StarFilled} from "@ant-design/icons";

const WinOrderDetail = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const {isLoading, isSuccess, winDetailData,isError} = useWinOrderDetail();
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
            });
        }
    }, [isSuccess, winDetailData]);
    const handleDlvInfor = (key, value) => {
        setDlvInfor({...dlvInfor, [key]: value});
        console.log(dlvInfor)
    };

    const handleSendDlvInfor = async () => {
        try {
            if (!dlvInfor) {
                toast.error("Chưa điền thông tin");
                return;
            }
            const res = await sendDeliveryInfor({...dlvInfor});
            setOpen(false);
            console.log(res)
            window.location.href = res.data.payUrl;
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    if (isLoading) {
        return (
           <>
                <Spin className="text-center mt-60"  tip="Loading" size="large"/>
           </>
        )
    }
    if(isError){
        return navigate('/404')
    }
    return (
        <>
            <MainLayOut>
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
                                <div className="text-base"> Trở lại</div>
                            </div>

                            <div className="flex items-center text-base gap-2">
                                <div className="text-left  ">Danh sách {stateStr} </div>
                                <ArrowForwardIosOutlinedIcon
                                    sx={{fontSize: 18}}
                                    fontSize="small"
                                    color="gray"
                                ></ArrowForwardIosOutlinedIcon>
                                <div className="">Chi tiết</div>
                            </div>
                        </div>
                        <div className="border-b border-gray-400  mx-5"></div>
                        <div className="flex justify-between m-2.5 items-center px-2">
                            <div className="text-left text-sm font-semibold ">
                                Thông tin sản phẩm
                            </div>
                            <div className="text-base font-medium mr-10 bg-amber-300 p-1 px-4">
                                {stateStr}
                            </div>
                        </div>
                        {/*Thông tin sp */}
                        {isSuccess && (
                            <>
                                <div className="items-center font-medium text-sm gap-6 my-8 mx-8 px-1 space-y-6 ">
                                    <div className="grid grid-cols-6 text-left">
                                        <div> Người bán :</div>
                                        <div className="font-normal col-span-2">
                                            {winDetailData?.name}
                                        </div>
                                        <div> Số điện thoại :</div>
                                        <div className="font-normal col-span-2">
                                            {winDetailData?.phone}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-6 text-left">
                                        <div> Tên sản phẩm :</div>
                                        <div className="font-normal  col-span-5">
                                            {winDetailData?.product_name}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 text-left">
                                        <div> Danh mục :</div>
                                        <div className="font-normal col-span-2">
                                            {winDetailData?.category_name}
                                        </div>
                                        <div> Chất lượng :</div>
                                        <div className="font-normal col-span-2">
                                            {winDetailData?.rank}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-6 text-left">
                                        <div> Thương hiệu :</div>
                                        <div className="font-normal col-span-2">
                                            {winDetailData?.brand}
                                        </div>
                                        <div> Tình trạng :</div>
                                        <div className="font-normal col-span-2"> {winDetailData?.is_used} </div>
                                    </div>

                                    <div className="grid grid-cols-6 text-left">
                                        <div> Giá khởi điểm :</div>
                                        <div className="font-normal col-span-2">
                                            {formatMoney(winDetailData?.reserve_price)} VND
                                        </div>
                                        <div> Giá bán trực tiếp :</div>
                                        <div className="font-normal col-span-2"> {formatMoney(winDetailData?.sale_price)} VND</div>
                                    </div>

                                    <div className="grid grid-cols-6 text-left ">
                                        <div> Bước giá :</div>
                                        <div className="font-normal col-span-2"> {formatMoney(winDetailData?.step_price)} VND</div>
                                        <div> Phí vận chuyển :</div>
                                        <div className="font-normal col-span-2"> {formatMoney(winDetailData?.shipping_fee)} VND</div>
                                    </div>
                                    <div className="grid grid-cols-6 text-left">
                                        <div> Trả hàng :</div>
                                        <div className="font-normal col-span-2">
                                            {winDetailData?.can_return}
                                        </div>
                                        <div> Nơi gửi hàng :</div>
                                        <div className="font-normal col-span-2"> {winDetailData?.delivery_from} </div>
                                    </div>

                                    <div className="grid grid-cols-6 text-left">
                                        <div> Mô tả sản phẩm :</div>
                                        <div className="font-normal col-span-5"> {winDetailData?.description}</div>
                                    </div>

                                    <div className="grid grid-cols-6 text-left">
                                        <div> Hỉnh ảnh sản phẩm :</div>
                                    </div>
                                    {winDetailData.main_image &&
                                        <>
                                            <div className="grid grid-cols-6 text-left mb-4">
                                                <Image.PreviewGroup
                                                    preview={{
                                                        onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                                                    }}
                                                >
                                                    <div className="font-normal col-span-1 mb-2">
                                                        <Image height={150} width={150}
                                                               src={winDetailData.main_image}/>
                                                    </div>

                                                </Image.PreviewGroup>
                                            </div>
                                        </>
                                    }
                                    <div className="grid grid-cols-6 text-left">
                                        <div> Các hình ảnh liên quan :</div>
                                    </div>
                                    {
                                        winDetailData.image_list &&
                                        <>
                                            <div className="grid grid-cols-6 text-left mb-4">
                                                <Image.PreviewGroup
                                                    preview={{
                                                        onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                                                    }}>
                                                    {winDetailData?.image_list.map((imageUrl, index) => (
                                                        <>
                                                            <div className="font-normal col-span-1 mb-2">
                                                                <Image key={index} height={150} width={150}
                                                                       src={imageUrl}/>
                                                            </div>
                                                        </>
                                                    ))}
                                                </Image.PreviewGroup>
                                            </div>
                                        </>
                                    }
                                </div>
                            </>
                        )}
                        {/*thông tin đấu giá*/}
                        {isSuccess && (
                            <>
                                <div className="flex justify-between m-2.5 items-center px-2">
                                    <div className="text-left text-sm font-semibold ">
                                    Thông tin đấu giá
                                    </div>
                                </div>
                                <div className="items-center font-medium text-sm gap-6 my-8 mx-8 px-1 space-y-6 ">
                                    <div className="grid grid-cols-6 text-left">
                                        <div> Hình thức :</div>
                                        <div className="font-normal  col-span-2">
                                            {winDetailData?.type_of_auction === 1 ? "Đấu giá tăng" : "Đấu giá giảm "}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 text-left">
                                        <div> Thời gian bắt đầu :</div>
                                        <div className="font-normal  col-span-2">
                                            {winDetailData?.start_time}
                                        </div>
                                        <di> Thời gian kết thúc :</di>
                                        <div className=" col-span-2 font-normal">
                                            {winDetailData?.finish_time}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 text-left">
                                        <div> Thời gian thắng :</div>
                                        <div className="font-normal  col-span-2">
                                            {winDetailData?.victory_time}
                                        </div>
                                        <di> Hoàn thành thủ tục :</di>
                                        <div className=" col-span-2 font-bold">
                                            {winDetailData?.procedure_complete_time}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-6 text-left">
                                        <div> Giá trúng thầu :</div>
                                        <div className="font-normal col-span-2">
                                            {formatMoney(winDetailData?.final_price)} VND
                                        </div>
                                        <div> Phí ship :</div>
                                        <div className="font-normal col-span-2">
                                            {formatMoney(winDetailData?.shipping_fee)} VND
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-6 text-left font-medium">
                                        <div> Tổng tiền :</div>
                                        <div className="font-normal col-span-2">
                                            <strong>{formatMoney(winDetailData?.total_price)} VND</strong>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/*thông tin giao hàng*/}
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
                                        {
                                            winDetailData.status === 8 && <>
                                                <div className="grid grid-cols-6 text-left">
                                                    <div> Thời gian nhận hàng :</div>
                                                    <div className="font-normal col-span-5">
                                                        {winDetailData.completed_time}
                                                    </div>
                                                </div>
                                            </>
                                        }

                                        <div className="grid grid-cols-6 text-left">
                                            <div> Người nhận :</div>
                                            <div className="font-normal col-span-2">
                                                {winDetailData.receiver}
                                            </div>
                                            <div> Số điện thoại :</div>
                                            <div className="font-normal col-span-2">
                                                {winDetailData.phone_receiver}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-6 text-left">
                                            <div> Địa chỉ :</div>
                                            <div className="font-normal col-span-5">
                                                {winDetailData.address}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-6 text-left">
                                            <div> Trạng thái đơn hiện tại :</div>
                                            <div className="font-normal col-span-2 text-amber-400">
                                                {convertWinStatus(winDetailData.status)}
                                            </div>
                                        </div>
                                        {
                                            winDetailData.status === 6 &&
                                            <>
                                                <div className="grid grid-cols-6 text-left">
                                                    <div> Thời gian xác nhận :</div>
                                                    <div className="font-normal col-span-2 ">
                                                        {winDetailData?.confirm_time}
                                                    </div>
                                                </div>
                                            </>
                                        }
                                        {
                                            winDetailData.status === 7 &&
                                            <>
                                                <div className="grid grid-cols-6 text-left">
                                                    <div> Bắt đầu giao hàng :</div>
                                                    <div className="font-normal col-span-2 ">
                                                        {winDetailData?.delivery_start_time}
                                                    </div>
                                                </div>
                                            </>
                                        }
                                        {
                                            winDetailData.status === 8 &&
                                            <>
                                                <div className="grid grid-cols-6 text-left">
                                                    <div> Thời gian nhận hàng :</div>
                                                    <div className="font-normal col-span-2 ">
                                                        {winDetailData?.completed_time}
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </>
                            )}

                        {/*điền tt giao hàng*/}
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

                                    <div className="grid grid-cols-6 text-left items-center">
                                        <div>Hình thức thanh toán :</div>
                                        <div className="flex flex-col item-center ">
                                            <Radio.Group className="flex flex-col gap-y-1" onChange={(e) =>
                                                handleDlvInfor("payment_method", e.target.value)}>
                                            <Radio value={0}>
                                                <div className="flex-row gap-2 mt-0.5 items-center flex ">
                                                    <img src="https://minio.thecoffeehouse.com/image/tchmobileapp/1000_photo_2021-04-06_11-17-08.jpg" style={{maxWidth: "25%"}} alt=""/>
                                                    Tiền mặt
                                                </div>
                                            </Radio>
                                            <Radio value={1}>
                                                <div className="flex-row mt-0.5 gap-2 items-center flex ">
                                                    <img src="https://minio.thecoffeehouse.com/image/tchmobileapp/386_ic_momo@3x.png" style={{maxWidth: "25%"}} alt=""/>
                                                    Momo
                                                </div>
                                            </Radio>
                                            <Radio value={2}>
                                                <div className="flex-row gap-2 mt-0.5 items-center flex ">
                                                    <img src="https://minio.thecoffeehouse.com/image/tchmobileapp/388_ic_zalo@3x.png" style={{maxWidth: "25%"}} alt=""/>
                                                    Zalopay
                                                </div>
                                            </Radio>
                                            </Radio.Group>
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
                                {/*xác nhận thông tin giao hàng*/}
                                <Dialog open={open} onClose={handleOpen} maxWidth="md">
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
                                        <Stack spacing={2} margin={1} minWidth={500}>
                                            <div
                                                className="items-center font-medium text-sm gap-6 my-8 mx-8 px-1 space-y-6 ">
                                                <div className="grid grid-cols-12 text-left">
                                                    <div className="col-span-3"> Tên :</div>
                                                    <div className=" col-span-9">
                                                        {dlvInfor?.name || null}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-12 text-left">
                                                    <div className="col-span-3"> Số điện thoại :</div>
                                                    <div className=" col-span-9">
                                                        {dlvInfor?.phone || null}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-12 text-left">
                                                    <div className="col-span-3"> Địa chỉ :</div>
                                                    <div className=" col-span-9">
                                                        {dlvInfor?.address || null}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-12 text-left">
                                                    <div className="col-span-3"> Thanh toán :</div>
                                                    {dlvInfor?.payment_method === 0 ? 'Tiền mặt' : dlvInfor?.payment_method === 1 ? 'Momo' : 'Zalopay' || null}
                                                    <div className=" col-span-9">  </div>
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
                            <UpdatePopup state={winDetailData.status} canReturn={winDetailData?.can_return}/>
                        )}

                        {isSuccess && (winDetailData.status === 9 ||winDetailData.status === 14 || winDetailData.status === 15) && (
                            <>
                                <div className="flex justify-between m-2.5 items-center px-2">
                                    <div className="text-left text-sm font-semibold ">
                                        Yêu cầu trả hàng
                                    </div>
                                </div>

                                <div className="items-center gap-6 font-medium my-8 mx-8 px-1 text-sm space-y-6 ">
                                    <div className="grid grid-cols-6 text-left">
                                        <div> Thời gian yêu cầu :</div>
                                        <div className="font-normal  col-span-2">
                                            {winDetailData?.return_time}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 text-left">
                                        <div> Lí do :</div>
                                        <div className="font-normal  col-span-2">
                                            {winDetailData?.return_reason}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 text-left">
                                        <div> Ảnh minh chứng :</div>
                                        {
                                            winDetailData.return_image &&
                                            <>
                                                <div className="grid grid-cols-6 text-left mb-4">
                                                    <Image.PreviewGroup
                                                        preview={{
                                                            onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                                                        }}>
                                                        {winDetailData?.return_image.map((imageUrl, index) => (
                                                            <>
                                                                <div className="font-normal col-span-1 mb-2">
                                                                    <Image key={index} height={150} width={150}
                                                                           src={imageUrl}/>
                                                                </div>
                                                            </>
                                                        ))}
                                                    </Image.PreviewGroup>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </MainLayOut>
        </>
    );
};
export default WinOrderDetail;
