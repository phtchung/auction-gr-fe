import SideBar from "../../Components/SideBar/index.jsx";
import {useEffect, useState} from "react";
import ProductBiddingCpn from "../../Components/ProductBiddingCpn/productBiddingCpn.jsx";
import useProductBidding from "./useProductBidding.jsx";
import MainLayOut from "../../Components/Layout/mainLayout.jsx";
import {useInView} from 'react-intersection-observer';
import CustomSpinner from "../../Components/CustomSpinner/CustomSpinner.jsx";
import FZFNotFound from "../../Components/PageNotFound/404NotFound.jsx";

const ProductBidding = () => {
    const [keyword, setKeyword] = useState('')
    const {
        isLoading,
        isSuccess,
        data,
        isError,
        fetchNextPage,
        isFetchingNextPage,
        queryString,
        setQueryString
    } = useProductBidding();
    const onChange = ({target}) => {
        setKeyword(target.value)
    }
    const handleSearch = () => {
        setQueryString({...queryString, keyword: keyword})
    }

    const {ref, inView} = useInView();

    useEffect(() => {
        console.log(inView)
        if (inView) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView]);
    return (
        <>
            <MainLayOut>
                <div className="wrapper">
                    <span className="w-[16.8%] min-[400px]:hidden min-[900px]:block"><SideBar/></span>

                    <div className="home-right w-[81.2%]">
                        {isLoading ?
                            <>
                                <CustomSpinner h={12} w={12} font={'sm'}/>
                            </>
                            :
                            isSuccess ?
                                <>
                                    <div
                                        className="text-left px-5 pt-3 pb-3 text-xl font-bold text-neutral-600  bg-white">
                                        Đang tham gia đấu giá
                                    </div>
                                    <div className="border-b border-neutral-300 "></div>
                                    <div className=" flex h-10 flex-row justify-between ">
                                        <input
                                            type="text"
                                            style={{backgroundColor: "#eaeaea"}}
                                            defaultValue={queryString.keyword ? queryString.keyword : keyword}
                                            onChange={onChange}
                                            placeholder="Bạn có thể tìm kiếm theo tên hoặc mã sản phẩm"
                                            className=" pl-5 w-full outline-none"
                                        />
                                        <button
                                            onClick={handleSearch}
                                            className={`w-[7rem]  text-white border-none text-sm font-semibold focus:outline-0  rounded ${
                                                keyword === "" ? "bg-gray-300 cursor-not-allowed " : "bg-orange-500 cursor-pointer "
                                            }`}
                                        >
                                            Tìm kiếm
                                        </button>
                                    </div>
                                    {data.pages.map((page) => (
                                        <>
                                            {
                                                page.data.data.length !== 0 ?
                                                    <>
                                                        <div className="flex flex-col gap-3">
                                                            {page.data.data.map((item) => (
                                                                <>
                                                                    <ProductBiddingCpn key={item._id} data={item}/>
                                                                </>
                                                            ))}
                                                        </div>

                                                        <div ref={ref} className="text-orange-500 mt-4">{isFetchingNextPage && 'Đang tải...'}</div>
                                                    </>
                                                    :
                                                    <>
                                                        <div className="flex flex-col mb-7 mt-5 items-center">
                                                            <img
                                                                style={{width: '30%'}}
                                                                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/search/a60759ad1dabe909c46a.png"
                                                                alt=""/>
                                                            <div
                                                                className="text-gray-500 -mt-3 font-medium text-base">Không
                                                                có sản phẩm nào.
                                                            </div>
                                                        </div>
                                                    </>
                                            }
                                        </>
                                    ))}
                                </>
                                :
                                <>
                                    <FZFNotFound margin={'-mt-20'} error={'Rất tiếc, đã có lỗi xảy ra.'}
                                                 urlReturn={'/'} btnText={'Về trang chủ'}/>
                                </>
                        }
                    </div>
                </div>
            </MainLayOut>
        </>
    )
}
export default ProductBidding;
