import {  Result } from 'antd';
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import MainLayOut from "../Layout/mainLayout.jsx";
const ResultPage = () => {
    const navigate = useNavigate()
    const {state} = useLocation()

    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    useEffect(() => {
        // Đặt tiêu đề và subTitle dựa trên giá trị của state
        if (state === 2) {
            setTitle('Duyệt yêu cầu đấu giá thành công!');
            setSubTitle(`Yêu cầu  sẽ được đấu giá lúc .`);
        } else if (state === 13) {
            setTitle('Hủy bỏ yêu cầu đấu giá thành công');
            setSubTitle(`Yêu cầu  chưa đủ điều kiện tham gia đấu giá .`);
        }else if(state === 200){
            setTitle('Tạo phiên đấu giá cho sản phẩm thành công');
            setSubTitle(`Sản phẩm sẽ sớm được đưa ra đấu giá .`);
        }else if(state === 9 ){
            setTitle('Tạo yêu cầu trả hàng thành công');
            setSubTitle(`Yêu cầu hoàn trả hàng đã được gửi đến quản trị viên .`);
        }else if(state === 100 ){
            setTitle('Mua sản phẩm thành công');
            setSubTitle(`Hãy điền thông tin để nhận hàng sớm nhất nhé!.`);
        }else if(state === 99 ){
            setTitle('Phiên đấu giá đã kết thúc ');
            setSubTitle(`Cám ơn bạn đã quan tâm sản phẩm!.`);
        }
    }, [state]);
  return(
      <>
          <MainLayOut>
          <Result
              className="mt-24"
              status="success"
              title={title}
              subTitle={subTitle}
              extra={[
                  <button
                      onClick={() => navigate('/winOrderTracking') }
                      className="p-2 px-6 py-2 right-0 bg-orange-500 rounded text-white border-gray-400 border-none text-sm  font-medium focus:outline-0">
                      Về trang chủ
                  </button>

              ]}
          />
          </MainLayOut>
      </>
  )
}

export default ResultPage
