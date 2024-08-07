import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import Carousel from "react-multi-carousel";
import {Avatar, Breadcrumb, Form, Tag, Popover, InputNumber} from "antd";
import {
    baseFEUrl,
    formatDateTimeMiliSecond,
    formatMoney,
    getColorForLetter,
    getFirstLetter
} from "../../Utils/constant.js";
import CountDownFullDate from "../../Components/Clock/countDownFullDate.jsx";
import {StarFilled} from "@ant-design/icons";
import {useNavigate, useParams} from "react-router-dom";
import {Dialog, DialogContent, DialogTitle, Stack} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import {Modal} from 'antd';
import useAuctionProductDetail from "./useAuctionProductDetail.jsx";
import {toast} from "react-toastify";
import {sendAuctionData, sendBuyData} from "../../Services/biddingService.jsx";
import {
    FacebookIcon,
    TwitterShareButton,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    TelegramIcon,
    FacebookShareButton,
    XIcon,
    TelegramShareButton,
} from "react-share";
import CardNormal from "../../Components/Card/cardNormal.jsx";
import CustomSpinner from "../../Components/CustomSpinner/CustomSpinner.jsx";
import FZFNotFound from "../../Components/PageNotFound/404NotFound.jsx";

const ProductDetail = () => {
    const [state, setState] = useState(null)
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const {
        isError,
        isLoading,
        isSuccess,
        auctionProductData,
        refetch,
        bidCount,
        isSc,
        isLd,
        rf,
        ralatedPro,
        fullBidListData,
        isScFullBid,
        isLdFullBid
    } = useAuctionProductDetail(state)
    const [open1, setOpen1] = useState(false);
    const {id} = useParams()
    const [auctionData, setAuctionData] = useState({productId: id})
    const [newlist, setNewlist] = useState([])

    const handleOpen = () => {
        if (localStorage.getItem("accessToken")) {
            form.resetFields();
            setOpen(!open);
        } else {
            window.location.href = '/login';
        }
    };
    const imageRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        if (auctionProductData && auctionProductData.image_list.length > 0) {
            setSelectedImage(auctionProductData.main_image);
            setNewlist([auctionProductData.main_image, ...auctionProductData.image_list])
        }
    }, [auctionProductData]);

    const handleMouseMove = (event) => {
        if (imageRef.current) {
            const rect = imageRef.current.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;

            imageRef.current.style.setProperty('transform-origin', `${xPercent}% ${yPercent}%`);
        }
    };

    const handleMouseEnter = () => {
        if (imageRef.current) {
            imageRef.current.style.setProperty('transform', 'scale(2.5)');
        }
    };

    const handleMouseLeave = () => {
        if (imageRef.current) {
            imageRef.current.style.setProperty('transform', 'scale(1)');
        }
    };

    const handleNavigateAuction = (id) => {
        navigate(`/auction/item/${id}`)
        window.scrollTo(0, 0);
    }

    const handleOpen1 = () => {
        if (localStorage.getItem("accessToken")) {
            setOpen1(!open1);
        } else {
            window.location.href = '/login';
        }
    };

    const handleNavigate = (url) => {
        navigate(`/categories/${url}`)
        window.scrollTo(0, 0)
    }
    const handleAuctionData = (key, value) => {
        setAuctionData({...auctionData, [key]: value});
    };

    useEffect(() => {
        setAuctionData({...auctionData, final_price: auctionProductData?.quickbid})
    }, [auctionProductData]);

    const handleBuyProduct = async () => {
        try {
            const res = await sendBuyData({...auctionData, final_price: auctionProductData?.sale_price});
            setOpen1()
            setAuctionData({productId: id})
        } catch (error) {
            toast.error(error?.response?.data?.message);
            setOpen1()
        }
    }
    const handleAuction = async () => {
        try {
            const res = await sendAuctionData({...auctionData});

            toast.success("Trả giá  thành công", {
                position: toast.POSITION.TOP_RIGHT, autoClose: 500,
            });
            refetch()
            rf()
            setOpen()
            form.resetFields();
            setAuctionData({productId: id})
        } catch (error) {
            toast.error(error?.response?.data?.message, {
                position: "top-right",
            });
            refetch()
            rf()
            setOpen()
        }
    }

    const handleSubmit = async () => {
        const values = await form.validateFields();
        await handleAuction()
    }

    const handleQuickBid = async () => {
        handleAuctionData('final_price', auctionProductData.quickbid)
        await handleAuction()
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
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
        body: {maxHeight: '450px', overflowY: 'auto', marginRight: '-10px'}, header: {
            textAlign: 'center', fontWeight: 700,
        }, content: {
            boxShadow: 'inset 0 0 5px #999', borderRadius: 0,
        },
    };

    return (<>
            <MainLayOut>
                <div className="container">
                    {isSuccess && <>
                        <div className="px-3 mx-2 mt-24">
                            <Breadcrumb
                                items={[{
                                    title: <a href="/">Trang chủ</a>,
                                }, {
                                    title: <span className="cursor-pointer font-medium"
                                                 onClick={() => handleNavigate(auctionProductData.parent._id)}>{auctionProductData?.parent?.name}</span>
                                }, {
                                    title: <a href="">{auctionProductData?.category_name}</a>
                                },]}
                            />
                        </div>
                    </>}

                    {isLoading ? <>
                        <CustomSpinner h={12} w={12} font={'sm'}/>
                    </> : isError ?
                        <FZFNotFound error={'Rất tiếc, hệ thống không tìm thấy phiên đấu giá này.'} urlReturn={'/'}
                                     btnText={'Trở về'}/>
                        : isSuccess && isSc && <>
                        <div className="grid xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 min-[200px]:grid-cols-1 items-start gap-6 p-3 m-2 mt-4 ">
                            <div className="xl:col-span-4 lg:col-span-3 md:col-span-4 sm:col-span-2 min-[200px]:col-span-1 ">
                                <div
                                    className="image-magnifier-container "
                                >
                                    {selectedImage && (
                                        <img onMouseEnter={handleMouseEnter}
                                                            onMouseLeave={handleMouseLeave}
                                                            onMouseMove={handleMouseMove}
                                                            ref={imageRef} src={selectedImage}
                                                            className="zoom-image cursor-crosshair" alt="Magnified"
                                        />)}
                                </div>

                                <div id="carousel"
                                     className="flexslider mt-4 mb-4 grid xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-6 sm:grid-cols-5 min-[200px]:grid-cols-4 gap-3">
                                    {newlist.map((image, index) => (<div
                                            className={`${image.toString() === selectedImage.toString() ? 'border bg-black border-orange-500 ' : 'border border-gray-300'}  cursor-pointer`}
                                            onClick={() => setSelectedImage(image)} key={index}
                                        >
                                            <img style={{
                                                width: '100%',
                                                height: '4.7rem',
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat'
                                            }}
                                                 src={image} alt={`Image ${index}`}/>
                                        </div>))}
                                </div>
                                <div className="mt-5 bg-white  text-left mb-5 text-neutral-700 p-3">
                                    <div className="border-b pb-3 text-lg font-semibold">Mô tả sản phẩm</div>
                                    <div className="pt-2 min-h-fit" style={{ whiteSpace: 'pre-line' }}>
                                        {auctionProductData?.description}
                                    </div>
                                </div>
                                {/*các sp tương tự*/}
                                {
                                    ralatedPro?.length !== 0 &&
                                    <>
                                        <div className="flex flex-col bg-white  pt-3 p-1 mb-4">
                                            <div className="flex flex-grow items-center justify-between p-2">
                                                <div className="text-left text-lg font-semibold text-gray-900 ">Các
                                                    sản phẩm tương tự
                                                </div>
                                            </div>
                                            <div className="grid xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-6 sm:grid-cols-5 min-[200px]:grid-cols-4">
                                                {ralatedPro && <>
                                                    <Carousel
                                                        additionalTransfrom={0}
                                                        arrows
                                                        autoPlaySpeed={3000}
                                                        className=""
                                                        containerClass="carousel-container-categories"
                                                        dotListClass=""
                                                        draggable
                                                        focusOnSelect={false}
                                                        keyBoardControl
                                                        minimumTouchDrag={30}
                                                        pauseOnHover
                                                        renderArrowsWhenDisabled={false}
                                                        renderButtonGroupOutside={false}
                                                        renderDotsOutside={false}
                                                        responsive={{
                                                            desktop: {
                                                                breakpoint: {
                                                                    max: 3000, min: 1024
                                                                }, items: 2.61,
                                                            }, mobile: {
                                                                breakpoint: {
                                                                    max: 464, min: 0
                                                                }, items: 2,
                                                            }, tablet: {
                                                                breakpoint: {
                                                                    max: 1024, min: 464
                                                                }, items: 2,
                                                            }
                                                        }}
                                                        rewind
                                                        centerMode={true}
                                                        rewindWithAnimation={false}
                                                        rtl={false}
                                                        shouldResetAutoplay
                                                        showDots={false}
                                                        sliderClass=""
                                                        slidesToSlide={3}
                                                        swipeable
                                                    >
                                                        {ralatedPro.map((product, index) => (
                                                            <div
                                                                onClick={() => handleNavigateAuction(product.product_id)}
                                                                key={index} className="md:basis-1/5 p-2 ">
                                                                <CardNormal data={product}/>
                                                            </div>))}
                                                    </Carousel>
                                                </>}
                                            </div>
                                        </div>
                                    </>
                                }

                            </div>

                            <div className="xl:col-span-3  md:col-span-4 lg:col-span-2 sm:col-span-2">
                                {/*thông tinn đấu giá*/}
                                <div
                                    className="flex flex-col bg-white  text-neutral-700 font-sans text-left pt-3 p-3 mb-4">
                                    <div style={{fontWeight: 600}} className="flex pr-6 relative">
                                            <span className="text-2xl    ">
                                                {auctionProductData?.product_name}
                                            </span>

                                        <Popover content={<div className="flex items-center gap-3 py-2 px-3">
                                            <span>Chia sẻ :</span>
                                            <FacebookShareButton
                                                url={`${baseFEUrl}/auction/item/${auctionProductData.product_id}`}
                                                quote={'Dummy text!'}
                                            >
                                                <FacebookIcon size={28} round/>
                                            </FacebookShareButton>
                                            <TwitterShareButton
                                                url={`${baseFEUrl}/auction/item/${auctionProductData.product_id}`}
                                                quote={'Dummy text!'}
                                            >
                                                <XIcon size={28} round={true}/>
                                            </TwitterShareButton>
                                            <TelegramShareButton
                                                url={`${baseFEUrl}/auction/item/${auctionProductData.product_id}`}
                                                quote={'Dummy text!'}
                                            >
                                                <TelegramIcon size={28} round/>
                                            </TelegramShareButton>
                                            <FacebookMessengerShareButton
                                                url={`${baseFEUrl}/auction/item/${auctionProductData.product_id}`}
                                                appId={'https://www.facebook.com/hoangthuydung.11'}
                                            >
                                                <FacebookMessengerIcon size={28} round/>
                                            </FacebookMessengerShareButton>
                                        </div>

                                        } placement="bottomRight" trigger="click">
                                            <div className="mt-2 absolute right-0">
                                                <svg style={{width: 28, height: 28, cursor: 'pointer'}}
                                                     xmlns="http://www.w3.org/2000/svg" fill="rgb(99 95 95)"
                                                     viewBox="0 0 448 512">
                                                    <path
                                                        d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53
                                                             0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43
                                                              96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z"/>
                                                </svg>
                                            </div>
                                        </Popover>
                                    </div>
                                    <div className="flex flex-grow gap-3 items-end mt-4">
                                        <div className="text-sm mb-0.5 text-neutral-500">Hiện tại</div>
                                        <div
                                            className="text-2xl font-semibold text-red-600">{formatMoney(auctionProductData?.final_price)} VND
                                        </div>
                                    </div>
                                    <div className="flex flex-grow gap-3 items-end ">
                                        <div className="text-sm mb-0.5 text-neutral-500">Giá trực tiếp</div>
                                        <div
                                            className="text-2xl font-semibold text-neutral-900">{formatMoney(auctionProductData?.sale_price)} VND
                                        </div>
                                    </div>
                                    <div className="flex flex-grow gap-3 items-end ">
                                        <div className="text-sm mb-0.5 text-neutral-500">Bước giá</div>
                                        <div
                                            className="mt-1 text-neutral-600 text-base">{formatMoney(auctionProductData?.step_price)} VND
                                        </div>
                                    </div>
                                    <div className="flex flex-grow gap-3 items-end mt-1 mb-4">
                                        <div className="text-sm mb-0.5 text-neutral-500">Phí giao hàng</div>
                                        <div
                                            className="text-base ">{formatMoney(auctionProductData?.shipping_fee)} VND
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center gap-5 pb-0.5 pt-1">
                                        <div className="flex flex-row items-center gap-1 ">
                                            <div><img
                                                style={{width: 24, height: 24}}
                                                src="https://s.yimg.jp/images/auc/pc/search/image/2.0.1/icon_hammer.svg"
                                                alt=""/></div>
                                            <span onClick={getFullBidList}
                                                  className="text-sm cursor-pointer text-blue-800">{bidCount} lượt đấu giá
                                            </span>
                                        </div>

                                        <div className="flex flex-row items-center text-xs px-1 bg-amber-100 gap-1 ">
                                            <span
                                                className="">Kết thúc : {auctionProductData?.finish_time}
                                            </span>
                                        </div>

                                    </div>
                                    <div>
                                        <Tag className="mx-2 mt-3"
                                             color="red">{auctionProductData?.type_of_auction}</Tag>
                                        <Tag className="" color="volcano">{auctionProductData?.rank}</Tag>
                                        {auctionProductData?.is_used_interger === 0 && <>
                                            <Tag className="mr-2"
                                                 color="red">{auctionProductData?.is_used}</Tag>
                                        </>}
                                    </div>

                                    <div className="mt-5 mb-6 flex gap-1 lg:gap-3 sm:gap-6 flex-row items-center">
                                        <button type="button"
                                                onClick={handleOpen}
                                                className="text-xl hover:border-amber-600 hover:bg-amber-100 focus:outline-none  p-2.5 font-semibold  text-white rounded border-amber-500 cursor-pointer"
                                                style={{backgroundColor: '#e8680e', width: '100%'}}
                                        >
                                            Đấu Giá
                                        </button>
                                        <button
                                            onClick={handleOpen1}
                                            className="text-xl overflow_css_w_158 p-2.5 hover:border-amber-700  font-semibold text-white rounded border-amber-500 cursor-pointer"
                                            style={{backgroundColor: '#c74200', width: '100%'}}>
                                            Mua Trực Tiếp
                                        </button>
                                    </div>
                                    <div className="text-center mb-2">
                                        <CountDownFullDate id={auctionProductData?.product_id}
                                                           targetDate={auctionProductData?.countdownTime}></CountDownFullDate>
                                    </div>
                                </div>

                                {/*Dialog xem full ds đấu giá */}
                                <Modal styles={modalStyles} title="Diễn biến các lệnh trả giá"
                                       className=" text-black "
                                       footer={null} centered open={isModalOpen}
                                       onCancel={handleCancel}>
                                    {isScFullBid ? fullBidListData.length !== 0 ? fullBidListData.map((bid, index) => (<>
                                            <div key={index}
                                                 className="flex justify-between my-2.5 items-center ">
                                                <div style={{fontWeight: 600}}
                                                     className="flex flex-col  relative">
                                                    <h1 className='text-base shadow-black'>
                                                        {formatMoney(bid.bid_price)} đ
                                                    </h1>
                                                    <span className="text-xs "
                                                          style={{color: 'rgb(156 157 160)'}}
                                                    >
                                                                      {formatDateTimeMiliSecond(bid.bid_time)}
                                                                </span>
                                                </div>
                                                <div className="px-6 text-base font-medium "
                                                     style={{color: 'rgb(81 81 81)'}}>
                                                    {bid.username}
                                                </div>
                                            </div>
                                        </>)) : <>
                                        <div className="text-center font-medium my-14">Không có dữ
                                            liệu
                                        </div>
                                    </> : <>
                                        <CustomSpinner h={8} w={8} font={'sm'}/>
                                    </>}
                                </Modal>

                                {/*Dialog đấu giá */}
                                <Dialog open={open} onClose={handleOpen} maxWidth="md">
                                    <DialogTitle>
                                        <div className="flex items-center  justify-center">
                                                <span className="font-medium text-neutral-600 text-base">
                                                     Đấu giá
                                                </span>
                                        </div>
                                        <div className="border-b mt-2  border-gray-300"></div>
                                    </DialogTitle>
                                    <DialogContent>
                                        <Stack spacing={2}  margin={1}>
                                            <div
                                                className="items-center font-medium text-base gap-6 mt-7 mx-8 px-1 space-y-5 ">
                                                <div className="grid md:grid-cols-3 min-[200px]:grid-cols-2 text-sm items-center">
                                                    <div className="">Giá đấu thầu tối thiểu</div>
                                                    <span
                                                        className="text-red-400">{formatMoney(auctionProductData?.min_auction_price)} VND</span>
                                                    <button
                                                        type="primary"
                                                        onClick={handleQuickBid}
                                                        className="p-2 min-[200px]:mt-5 md:col-span-1 md:mt-0 min-[200px]:col-span-2 px-6 bg-[#c74200] py-2 w-full right-0 active:bg-orange-500 rounded text-white
                                                         border-none text-base hover:border-orange-700 hover:bg-orange-600 focus:outline-0">
                                                        Trả giá nhanh
                                                    </button>
                                                </div>

                                                <div className=" items-center ">
                                                    <Form form={form} scrollToFirstError>
                                                        <Form.Item
                                                            name='final_price'
                                                            label='Giá đấu thầu mới'
                                                            rules={[{
                                                                required: true, message: 'Hãy điền giá bạn muốn trả!',
                                                            }, () => ({
                                                                validator(_, value) {
                                                                    if (auctionProductData.sale_price < value) {
                                                                        return Promise.reject(new Error('Giá phải nhỏ hơn giá quyết định!'));
                                                                    } else if (auctionProductData.final_price  + auctionProductData.step_price > value) {
                                                                        return Promise.reject(new Error('Giá phải lớn hơn giá tối thiểu!'));
                                                                    } else if (!value || auctionProductData.sale_price > value) {
                                                                        return Promise.resolve();
                                                                    }
                                                                    return Promise.reject(new Error('Giá phải nhỏ hơn giá quyết định!'));
                                                                },
                                                            }),]}
                                                        >
                                                            <InputNumber
                                                                onChange={(value) => handleAuctionData('final_price', value)}
                                                                rootClassName='hover:border-orange-500 w-full'
                                                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                                                suffix="VND"/>
                                                        </Form.Item>

                                                        <Form.Item>
                                                            <div className="flex gap-4 mt-4  ">
                                                                <button
                                                                    onClick={handleOpen}
                                                                    className="p-2 px-6 py-2 w-full right-0 bg-white rounded text-orange-500 border-orange-500 hover:bg-zinc-50  text-base hover:border-orange-500 font-medium focus:outline-0">
                                                                    Hủy
                                                                </button>

                                                                <button
                                                                    type="primary"
                                                                    onClick={handleSubmit}
                                                                    className="p-2 px-6 py-2 w-full right-0 bg-orange-500 active:bg-orange-400 rounded text-white  border-none text-base hover:border-orange-700 hover:bg-orange-600  font-semibold focus:outline-0">
                                                                    Trả giá
                                                                </button>
                                                            </div>
                                                        </Form.Item>
                                                    </Form>
                                                </div>
                                            </div>
                                        </Stack>
                                    </DialogContent>
                                </Dialog>

                                {/*dialog mua trực tiếp */}
                                <Dialog open={open1} onClose={handleOpen1} maxWidth="sm">
                                    <DialogTitle>
                                        <div className="flex items-center justify-center">
                                                    <span className="font-medium font_fml text-base">
                                                        Mua trực tiếp sản phẩm
                                                    </span>
                                        </div>
                                        <div className="border-b mt-2  border-gray-300"></div>
                                    </DialogTitle>
                                    <DialogContent>
                                        <Stack spacing={2} margin={1} minWidth={350}>
                                            <div
                                                className="items-center  font-medium text-base gap-6 my-4 mx-8 px-1 space-y-6 ">
                                                <div className="flex gap-8 items-center">
                                                    <div className="">Giá bán trực tiếp</div>
                                                    <span
                                                        className="text-red-400">{formatMoney(auctionProductData?.sale_price)} VND</span>
                                                </div>

                                            </div>
                                            <div className="flex m-6 gap-5  mr-10">
                                                <button
                                                    onClick={handleOpen1}
                                                    className="p-2 px-5 py-2 w-full right-0 bg-white rounded text-orange-700 border-orange-700 hover:bg-zinc-50  text-base hover:border-orange-700   font-medium focus:outline-0">
                                                    Hủy
                                                </button>

                                                <button
                                                    onClick={handleBuyProduct}
                                                    className="p-2 px-2 py-2 w-full right-0 bg-orange-700 rounded text-white  border-none text-base hover:border-orange-700 hover:bg-orange-700  font-medium focus:outline-0">
                                                    Mua trực tiếp
                                                </button>
                                            </div>
                                        </Stack>
                                    </DialogContent>
                                </Dialog>

                                {/*người dùng */}
                                <div style={{backgroundColor: "white"}}
                                     className="pt-1 pb-1 mb-5 font-medium text-neutral-700 font-sans text-left">
                                    <div className="flex flex-row p-3 pb-1 justify-between items-center">
                                        <div className="flex flex-row items-center gap-2">
                                            <Avatar
                                                style={{
                                                    backgroundColor: getColorForLetter(getFirstLetter(auctionProductData.seller_name)),
                                                    verticalAlign: 'middle',
                                                }}
                                                size='large'
                                            >
                                                <span
                                                    className="font-medium text-lg">{getFirstLetter(auctionProductData.seller_name)}</span>
                                            </Avatar>
                                            <div
                                                className=" text-neutral-600 text-base font-sans"> {auctionProductData?.seller_name}
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="grid min-[200px]:grid-cols-3  text-center 0 my-2 gap-4 px-5 p-2  items-center">
                                        <div className="flex-col pl-8 gap-1">
                                            <span className="font-medium">{auctionProductData?.average_rating} </span>
                                            <StarFilled className="text-yellow-500"/>
                                        </div>
                                        <div className="pl-4 border-x border-neutral-200 items-center gap-1">
                                            <span
                                                className="font-medium">{auctionProductData?.rate_count} đánh giá </span>
                                        </div>
                                        <div className="items-center gap-1 pr-5 ">
                                              <span
                                                  className="font-medium">{auctionProductData?.product_done_count} đơn hàng </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-row gap-1 px-4 p-3 pb-2 items-center">
                                        <img
                                            src="https://s.yimg.jp/images/auc/pc/item/image/1.0.2/icon_delivery.svg"
                                            alt=""/>
                                        Nơi gửi hàng : {auctionProductData?.delivery_from}
                                    </div>
                                    <div
                                        className="flex flex-row border-t border-neutral-300 mx-4 text-blue-800  gap-1 py-2  pb-2 items-center">
                                        <div className="cursor-pointer font-medium"
                                             onClick={() => navigate(`/seller/${auctionProductData?.seller_user_name}`)}>
                                            Các sản phẩm đang bán
                                        </div>
                                    </div>
                                </div>
                                {/*Thông tin sản phẩm*/}
                                <div style={{backgroundColor: "white"}}
                                     className="pt-1 pb-1  mb-5 text-neutral-700 font-sans text-left">
                                    <div
                                        className="flex border-b border-neutral-300 flex-row py-3 pb-3 mx-4 items-center gap-2">
                                        <div
                                            className=" text-neutral-600 text-lg font-semibold"> Thông tin sản phẩm
                                        </div>
                                    </div>
                                    <div className="0 gap-4 px-4 p-3 pb-2 font-sans text-neutral-600">
                                        <div className="flex-row flex gap-3 mb-3">
                                            <div className="basis-2/5 font-medium">Danh mục</div>
                                            <div
                                                className="basis-3/5">{auctionProductData?.parent?.name} - {auctionProductData?.category_name}</div>
                                        </div>
                                        <div className="flex-row flex gap-3 mb-3">
                                            <div className="basis-2/5 font-medium">Thương hiệu</div>
                                            <div className="basis-3/5">{auctionProductData?.brand}</div>
                                        </div>
                                        <div className="flex-row flex gap-3 mb-3">
                                            <div className="basis-2/5 font-medium">Trạng thái</div>
                                            <div className="basis-3/5">{auctionProductData?.is_used}</div>
                                        </div>
                                        <div className="flex-row flex gap-3 mb-3">
                                            <div className="basis-2/5 font-medium">Chất lượng</div>
                                            <div className="basis-3/5">{auctionProductData?.rank}</div>
                                        </div>
                                        <div className="flex-row flex gap-3 mb-3">
                                            <div className="basis-2/5 font-medium">Trả lại</div>
                                            <div className="basis-3/5">{auctionProductData?.can_return}</div>
                                        </div>
                                        <div className="flex-row flex gap-3 mb-3">
                                            <div className="basis-2/5 font-medium">Giá khởi điểm</div>
                                            <div
                                                className="basis-3/5">{formatMoney(auctionProductData?.reserve_price)} VND
                                            </div>
                                        </div>
                                        <div className="flex-row flex gap-3 mb-3">
                                            <div className="basis-2/5 font-medium">Giá bán trực tiếp</div>
                                            <div
                                                className="basis-3/5">{formatMoney(auctionProductData?.sale_price)} VND
                                            </div>
                                        </div>
                                        <div className="flex-row flex gap-3 mb-3">
                                            <div className="basis-2/5 font-medium">Thời gian bắt đầu</div>
                                            <div className="basis-3/5">{auctionProductData?.start_time}</div>
                                        </div>
                                        <div className="flex-row flex gap-3 mb-3">
                                            <div className="basis-2/5 font-medium">Thời gian bắt đầu</div>
                                            <div className="basis-3/5">{auctionProductData?.finish_time}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>}
                </div>
            </MainLayOut>
        </>)
}

export default ProductDetail
