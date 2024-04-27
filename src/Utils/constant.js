export const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const formatMoney = (number) => {
    number = parseInt(number)
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
export const colPending = [
    {id: "request_time", name: "Thời gian yêu cầu"},
    {id: "request_id", name: "Mã yêu cầu"},
    {id: "product_name", name: "Tên sản phẩm"},
    {id: "reserve_price", name: "Giá khởi điểm"},
    {id: "sale_price", name: "Giá bán trực tiếp"},
];
export const colAppr = [
    {id: "request_time", name: "Thời gian gửi"},
    {id: "request_id", name: "Mã yêu cầu"},
    {id: "product_name", name: "Tên sản phẩm"},
    {id: "reserve_price", name: "Giá khởi điểm"},
    {id: "start_time", name: "Thời gian đấu giá"},
];
export const colBidding = [
    {id: "request_time", name: "Thời gian gửi"},
    {id: "request_id", name: "Mã yêu cầu"},
    {id: "product_name", name: "Tên sản phẩm"},
    {id: "reserve_price", name: "Giá khởi điểm"},
    {id: "start_time", name: "Thời gian đấu giá"},
    {id: "status_string", name: "Trạng thái"},

];
export const colSuccess = [
    {id: "product_id", name: "Mã sản phẩm"},
    {id: "product_name", name: "Tên sản phẩm"},
    {id: "reserve_price", name: "Giá khởi điểm"},
    {id: "final_price", name: "Giá trúng thầu"},
    {id: "victory_time", name: "Thời gian thắng"},
];
export const tabData = [
    {
        value: "2",
        name: "Approved",
        top: "Approved",
        count: 3,
        color: "bg-orange-400",
    },
    {
        value: "3",
        name: "Bidding",
        top: "Bidding",
        count: 4,
        color: "bg-lime-500",
    },
    {
        value: "4",
        name: "Success",
        top: "Success",
        count: 5,
        color: "bg-green-700",
    },
    {
        value: "5",
        name: "Failure",
        top: "Failure",
        count: 6,
        color: "bg-fuchsia-700",
    },
    {
        value: "6",
        name: "Confirm ",
        top: "Confirm ",
        count: 2,
        color: "bg-yellow-300",
    },
    {
        value: "7",
        name: "Delivery start",
        top: "Departure",
        count: 3,
        color: "bg-indigo-800",
    },
    {
        value: "8",
        name: "Completed",
        top: "Completion",
        count: 2,
        color: "bg-emerald-800",
    },
    {value: "9", name: "Return", top: "Return", count: 2, color: "bg-red-600"},
    {
        value: "10",
        name: "Reject",
        top: "Reject",
        count: 3,
        color: "bg-rose-900",
    },
];

export const tabData1 = [
    {value: "1", name: "Auction winning", top: "Win", color: "bg-yellow-500"},
    {value: "2", name: "Delivery wait", top: "Wait", color: "bg-indigo-800"},
    {value: "3", name: "Completed", top: "Completed", color: "bg-emerald-800"},
    {value: "4", name: "Cancel", top: "Cancel", color: "bg-red-600"},
    {value: "5", name: "Return", top: "Return", color: "bg-cyan-500"},
];

export const tabDataAdmin = [
    {value: "1", name: "New Request", top: "New", color: "bg-cyan-400"},
    {value: "2", name: "Approved", top: "Approved", color: "bg-amber-500"},
    {value: "3", name: "Bidding", top: "Bidding", color: "bg-indigo-800"},
    {value: "4", name: "Reject", top: "Reject", color: "bg-pink-900"},
    {value: "5", name: "Cancel", top: "Cancel", color: "bg-red-600"},
];

export const tabDataBiddingAdmin = [
    {
        value: "N",
        name: "New Product",
        top: "Up",
        color: "bg-orange-400",
    },
    {
        value: "B",
        name: "Bidding",
        top: "Bidding",
        color: "bg-lime-500",
    },
    {
        value: "S",
        name: "Success",
        top: "Success",
        color: "bg-green-700",
    },
    {
        value: "C",
        name: "Confirm",
        top: "Confirm",
        color: "bg-fuchsia-700",
    },

    {
        value: "D",
        name: "Delivery start",
        top: "Departure",
        color: "bg-indigo-800",
    },
    {
        value: "E",
        name: "Completed",
        top: "Completion",
        color: "bg-emerald-800",
    },
    {value: "R", name: "Cancel", top: "Cancel", color: "bg-red-600"},
    {
        value: "G",
        name: "Return",
        top: "Return",
        color: "bg-yellow-300",
    },
    {
        value: "F",
        name: "Failure ",
        top: "Failure",
        color: "bg-rose-900",
    },
    {
        value: "N",
        name: "New Product",
        top: "Down",
        color: "bg-orange-400",
    },
];

export const colFail = [
    {id: "product_id", name: "Mã sản phẩm"},
    {id: "product_name", name: "Tên sản phẩm"},
    {id: "reserve_price", name: "Giá khởi điểm"},
    {id: "start_time", name: "Thời gian đấu giá"},
    {id: "finish_time", name: "Thời gian kết thúc"},
];

export const colConf = [
    {id: "product_id", name: "Mã sản phẩm"},
    {id: "product_name", name: "Tên sản phẩm"},
    {id: "final_price", name: "Giá trúng thầu"},
    {id: "shipping_fee", name: "Phí vận chuyển"},
    {id: "total_price", name: "Tổng tiền"},
];

export const colDlv = [
    {id: "product_id", name: "Mã sản phẩm"},
    {id: "product_name", name: "Tên sản phẩm"},
    {id: "total_price", name: "Tổng tiền"},
    {id: "address", name: "Địa chỉ"},
];
export const colCompletion = [
    {id: "product_id", name: "Mã sản phẩm"},
    {id: "product_name", name: "Tên sản phẩm"},
    {id: "total_price", name: "Tổng tiền"},
    {id: "completed_time", name: "Thời gian nhận"},
];
export const colReturn = [
    {id: "product_id", name: "Mã sản phẩm"},
    {id: "product_name", name: "Tên sản phẩm"},
    {id: "final_price", name: "Giá trúng thầu"},
    {id: "return_time", name: "Thời gian "},
    {id: "status_string", name: "Trạng thái "},
];

export const colReject = [
    {id: "request_id", name: "Mã yêu cầu"},
    {id: "product_name", name: "Tên sản phẩm"},
    {id: "reserve_price", name: "Giá khởi điểm"},
    {id: "reject_time", name: "Thời gian từ chối"},
];
export const colWinCancel = [
    {id: "product_id", name: "Mã sản phẩm"},
    {id: "product_name", name: "Tên sản phẩm"},
    {id: "final_price", name: "Giá trúng thầu"},
    {id: "victory_time", name: "Thời gian thắng"},
    {id: "status_word", name: "Trạng thái"},
];
export const colAuctionWin = [
    {id: "product_id", name: "Mã sản phẩm"},
    {id: "product_name", name: "Tên sản phẩm"},
    {id: "reserve_price", name: "Giá khởi điểm"},
    {id: "final_price", name: "Giá trúng thầu"},
    {id: "victory_time", name: "Thời gian thắng"},
];

export const colDlvWait = [
    {id: "product_id", name: "Mã sản phẩm"},
    {id: "product_name", name: "Tên sản phẩm"},
    {id: "total_price", name: "Tổng tiền"},
    {id: "status", name: "Trạng thái đơn"},
];

export const colReqHistory = [
    {id: "id", name: "Mã yêu cầu"},
    {id: "createdAt", name: "Ngày yêu cầu"},
    {id: "product_name", name: "Tên sản phẩm"},
    {id: "rank", name: "Chất lượng"},
    {id: "status", name: "Trạng thái"},
];

export const colSaleHistory = [
    {id: "request_id", name: "Mã yêu cầu"},
    {id: "request_time", name: "Thời gian yêu cầu"},
    {id: "product_name", name: "Tên sản phẩm"},
    {id: "updatedAt", name: "Thời gian"},
    {id: "status_string", name: "Trạng thái"},
];

export const pathReqHistory = "/reqHistory/reqHistoryDetail"

export const pathSaleHistory = "/saleHistory/reqOrderDetail"


export const pending = {
    value: "1",
    name: "Pending",
    top: "Pending",
    count: 2,
    color: "bg-cyan-400",
};

export const numberToString = (state) => {
    switch (state) {
        case 1:
            return "Chờ duyệt";
        case 2:
            return "Đã duyệt";
        case 3:
            return "Đang đấu giá";
        case 4:
            return "Chờ thông tin giao hàng";
        case 5:
            return "Đấu giá thành công";
        case 6:
            return "Xác nhận";
        case 7:
            return "Giao hàng";
        case 8:
            return "Hoàn thành";
        case 10:
            return "Thất bại";
        case 11:
            return "Thất bại";
        case 9:
            return "Yêu cầu trả hàng";
        case 13:
            return "Từ chối";
        case 14:
            return "Duyệt trả hàng";
        case 15:
            return "Từ chối trả hàng";
        default:
            return "Chờ duyệt";
    }
};

export const adminChangeStateToString = (state) => {
    switch (state) {
        case 1:
            return "Mới";
        case 2:
            return "Đã Duyệt";
        case 3:
            return "Đang Đấu Giá";
        case 11:
            return "Hủy";
        case 13:
            return "Từ Chối";
        default:
            return "Yêu Cầu Mới";
    }
};
export const statusToString = (state) => {
    switch (state) {
        case 4:
            return "Thắng đấu giá";
        case 5:
            return "Chờ xác nhận";
        case 6:
            return "Đã xác nhận";
        case 7:
            return "Đang giao hàng";
        case 567:
            return "Chờ giao hàng";
        case 8:
            return "Hoàn thành";
        case 9:
            return "Yêu cầu trả hàng";
        case 11:
            return "Hủy";
        case 14:
            return "Trả hàng thành công";
        case 15:
            return "Từ chối trả hàng";
        default:
            return "Thắng đấu giá";
    }
};

export function convertStatusToData(status) {
    switch (status) {
        case 1:
            return colPending;
        case 2:
            return colAppr;
        case 34:
            return colBidding;
        case 5:
            return colSuccess;
        case 6:
            return colConf;
        case 7:
            return colDlv;
        case 8:
            return colCompletion;
        case 1011:
            return colFail;
        case 91415:
            return colReturn;
        case 13:
            return colReject;
        default:
            return colPending;
    }
}

export const formatDateTime = (inputDateString) => {
    const inputDate = new Date(inputDateString);
    const formatDateComponent = (component) => String(component).padStart(2, "0");
    const year = formatDateComponent(inputDate.getFullYear());
    const month = formatDateComponent(inputDate.getMonth() + 1);
    const day = formatDateComponent(inputDate.getDate());
    const hours = formatDateComponent(inputDate.getHours());
    const minutes = formatDateComponent(inputDate.getMinutes());
    const seconds = formatDateComponent(inputDate.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const formatDateTimeMiliSecond = (inputDateString) => {
    const inputDate = new Date(inputDateString);
    const formatDateComponent = (component) => String(component).padStart(2, "0");
    const year = formatDateComponent(inputDate.getFullYear());
    const month = formatDateComponent(inputDate.getMonth() + 1);
    const day = formatDateComponent(inputDate.getDate());
    const hours = formatDateComponent(inputDate.getHours());
    const minutes = formatDateComponent(inputDate.getMinutes());
    const seconds = formatDateComponent(inputDate.getSeconds());
    const miliseconds = formatDateComponent(inputDate.getMilliseconds());

    return `${day}-${month}-${year} - ${hours}:${minutes}:${seconds}:${miliseconds}`;
};

 export function readMoney(amount) {
    const ones = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
    const teens = ['', 'mười', 'mười một', 'mười hai', 'mười ba', 'mười bốn', 'mười lăm', 'mười sáu', 'mười bảy', 'mười tám', 'mười chín'];
    const tens = ['', 'mười', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi'];
    const scales = ['', 'nghìn', 'triệu', 'tỷ'];

    function convertBlock(number) {
        let block = '';

        const hundred = Math.floor(number / 100);
        const remainder = number % 100;

        if (hundred > 0) {
            block += ones[hundred] + ' trăm';
            if (remainder > 0) {
                block += ' ';
            }
        }

        if (remainder < 10) {
            block += ones[remainder];
        } else if (remainder < 20) {
            block += teens[remainder - 10];
        } else {
            const ten = Math.floor(remainder / 10);
            const one = remainder % 10;
            block += tens[ten];
            if (one > 0) {
                block += ' ' + ones[one];
            }
        }

        return block;
    }

    let words = '';
    let blockIndex = 0;

    do {
        const block = amount % 1000;
        if (block !== 0) {
            const blockWords = convertBlock(block) + ' ' + scales[blockIndex];
            words = blockWords + (words ? ' ' + words : '');
        }
        amount = Math.floor(amount / 1000);
        blockIndex++;
    } while (amount > 0);

    return words;
}

export function emphasizeTextAfterHash(str) {
    var words = str.split(' ');
    var emphasizedWords = words.map(function(word) {
        if (word.startsWith('#')) {
            return '<strong>' + word.substring(1) + '</strong>';
        }
        return word;
    });
    return emphasizedWords.join(' ');
}

export const formatDateTime1 = (inputDateString) => {
    const inputDate = new Date(inputDateString);
    const formatDateComponent = (component) => String(component).padStart(2, "0");
    const year = formatDateComponent(inputDate.getFullYear());
    const month = formatDateComponent(inputDate.getMonth() + 1);
    const day = formatDateComponent(inputDate.getDate());

    return `${year}-${month}-${day}`;
};

export const formatDateTimeChat = (inputDateString) => {
    if(!inputDateString)
        return ''
    const inputDate = new Date(inputDateString);
    const formatDateComponent = (component) => String(component).padStart(2, "0");
    const day = formatDateComponent(inputDate.getDate());
    const hours = formatDateComponent(inputDate.getHours());
    const minutes = formatDateComponent(inputDate.getMinutes());
    return `${hours}:${minutes}`;

};

export function isDateGreaterThanToday(date) {

    var dateParts = date.split("-");
    var year = parseInt(dateParts[0]);
    var month = parseInt(dateParts[1]) - 1; // Months are 0-indexed
    var day = parseInt(dateParts[2]);
    var givenDate = new Date(year, month, day);

    // Get the current date
    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for accurate comparison

    // Compare the dates
    return givenDate > currentDate;
}
export function processStatus(status) {
    if (
        status === 567 ||
        status === 4 ||
        status === 8 ||
        status === 9 ||
        status === 11
    ) {
        return status;
    } else {
        return 4;
    }
}

export function adminProcessStatus(status) {
    if (
        status === 1 ||
        status === 2 ||
        status === 3 ||
        status === 13 ||
        status === 11
    ) {
        return status;
    } else {
        return 1;
    }
}

export function adminProductStatus(status) {
    if (
        status === 'N' ||
        status === '-N' ||
        status === 'B' ||
        status === 'S' ||
        status === 'C' ||
        status === 'D' ||
        status === 'E' ||
        status === 'R' ||
        status === 'G' ||
        status === 'F'
    ) {
        return status;
    } else {
        return 'N';
    }
}
export function reqConvertStatus(status) {
    if (
        status === 1 ||
        status === 2 ||
        status === 3 ||
        status === 5 ||
        status === 6 ||
        status === 7 ||
        status === 8 ||
        status === 10 ||
        status === 9 ||
        status === 13
    ) {
        return status;
    } else {
        return 1;
    }
}

export const rankItems = [
    {value: "S", label: "S"},
    {value: "A", label: "A"},
    {value: "B", label: "B"},
    {value: "C", label: "C"},
    {value: "D", label: "D"},
];
export const isUsed = [
    {value: "1", label: "Đã sử dụng"},
    {value: "0", label: "Chưa sử dụng"},
];

export const canReturn = [
    {value: "1", label: "Có thể trả"},
    {value: "0", label: "Không thể trả"},
];

export const categories = [
    {value: "6590eeb91a599365d4b68951", label: "Điện tử"},
    {value: "65c1ffb748844c67a80a2156", label: "Đồ gia dụng"},
  {value: "65c1ffcb48844c67a80a2157", label: "Tài liệu học tập"},
  {value: "65c1ffe248844c67a80a2158", label: "Đồ chơi"},
  {value: "65c1fff048844c67a80a2159", label: "Dụng cụ thể thao"},
  {value: "65c2000d48844c67a80a215a", label: "Đồ trang trí"},
  {value: "65c2001b48844c67a80a215b", label: "Đồ dùng cá nhân"},
  {value: "65c2003e48844c67a80a215c", label: "Vật dụng cá nhân"},
  {value: "65c2007748844c67a80a215d", label: "Phụ kiện thời trang"},
  {value: "65c2009e48844c67a80a215e", label: "Quần áo"},
  {value: "65c200ad48844c67a80a215f", label: "Giày dép"},
  {value: "65c200bc48844c67a80a2160", label: "Nội thất"},

];

export function hideCharacters(username) {
    var hiddenPart = "";
    var visiblePart = "";

    if (username.length < 5) {
        hiddenPart = "*".repeat(2);
        visiblePart = username.slice(0, username.length - 2);
    } else {
        var hiddenCount = Math.floor(username.length / 2);
        var hiddenPositions = getRandomPositions(username.length, hiddenCount);

        hiddenPart = "";
        for (var i = 0; i < username.length; i++) {
            hiddenPart += hiddenPositions.includes(i) ? "*" : username[i];
        }

        visiblePart = "";
    }

    var hiddenUsername = visiblePart + hiddenPart;
    return hiddenUsername;
}

function getRandomPositions(length, count) {
    var positions = [];
    for (var i = 0; i < count; i++) {
        var randomPosition;
        do {
            randomPosition = Math.floor(Math.random() * length);
        } while (positions.includes(randomPosition));
        positions.push(randomPosition);
    }
    return positions;
}

export function convertWinStatus(status) {
    switch (status) {
        case 5:
            return "Chờ xác nhận";
        case 6:
            return "Đã được xác nhận bởi người bán";
        case 7:
            return "Đang giao hàng";
        case 8:
            return "Đã nhận hàng";
        case 9:
            return "Yêu cầu trả hàng";
        case 11 :
            return "Hủy thành công"
        case 14 :
            return "Trả hàng thành công"
        case 15 :
            return "Từ chối trả hàng"
        default:
            return " ";
    }
}

export function convertCanReturn(status) {
    switch (status) {
        case 'Có thể':
            return 1;
        case 'Không':
            return 0;
        case 1:
            return "Có thể";
        case 0:
            return "Không";
        default:
            return " ";
    }
}

export const newReqColumns =
    [
        {
            accessorKey: 'request_id', //access nested data with dot notation
            header: 'Mã yêu cầu',
            size: 170,
            muiTableHeadCellProps: {
                align: 'center',
            },
        },
        {
            accessorKey: 'seller_name', //access nested data with dot notation
            header: 'Tên người bán',
            size: 110,
            muiTableHeadCellProps: {
                align: 'center',
            },
        },
        {
            accessorKey: 'phone', //access nested data with dot notation
            header: 'Số điện thoại',
            size: 120,
            muiTableHeadCellProps: {
                align: 'center',
            },
        },
        {
            accessorKey: 'product_name',
            header: 'Tên sản phẩm',
            size: 170,
            muiTableHeadCellProps: {
                align: 'center',
            },
        },
        {
            accessorKey: 'reserve_price', //normal accessorKey
            header: 'Giá khởi điểm',
            size: 90,
            muiTableHeadCellProps: {
                align: 'center',
            },
        },
        {
            accessorKey: 'sale_price',
            header: 'Giá bán',
            size: 100,
            muiTableHeadCellProps: {
                align: 'center',
            },
        },
    ]



export const approvedColumns =
    [
        {
            accessorKey: 'request_id', //access nested data with dot notation
            header: 'Mã yêu cầu',
            size: 160,
            muiTableHeadCellProps: {
                align: 'center',
            },
        },
        {
            accessorKey: 'seller_name', //access nested data with dot notation
            header: 'Tên người bán',
            size: 110,
            muiTableHeadCellProps: {
                align: 'center',
            },
        },
        {
            accessorKey: 'phone', //access nested data with dot notation
            header: 'Số điện thoại',
            size: 120,
            muiTableHeadCellProps: {
                align: 'center',
            },
        },
        {
            accessorKey: 'product_name',
            header: 'Tên sản phẩm',
            size: 170,
            muiTableHeadCellProps: {
                align: 'center',
            },
        },
        {
            accessorKey: 'reserve_price', //normal accessorKey
            header: 'Giá khởi điểm',
            size: 90,
            muiTableHeadCellProps: {
                align: 'center',
            },
        },
        {
            accessorKey: 'start_time',
            header: 'Thời gian đấu giá',
            size: 130,
            muiTableHeadCellProps: {
                align: 'center',
            },
        },

    ]
export const biddingColumns =
    [
        {
            accessorKey: 'request_id', //access nested data with dot notation
            header: 'Mã sản phẩm',
            size: 160,
            muiTableHeadCellProps: {
                align: 'center',
            },
        },
        {
            accessorKey: 'seller_name', //access nested data with dot notation
            header: 'Tên người bán',
            size: 110,
            muiTableHeadCellProps: {
                align: 'center',
            },
        },
        {
            accessorKey: 'phone', //access nested data with dot notation
            header: 'Số điện thoại',
            muiTableHeadCellProps: {
                align: 'center',
            },
            size: 150,
        },
        {
            accessorKey: 'product_name',
            header: 'Tên sản phẩm',
            size: 150,
            muiTableHeadCellProps: {
                align: 'center',
            },
        },
        {
            accessorKey: 'reserve_price', //normal accessorKey
            header: 'Giá khởi điểm',
            size: 90,
            muiTableHeadCellProps: {
                align: 'center',
            },
        },
        {
            accessorKey: 'start_time',
            header: 'Thời gian đấu giá',
            size: 140,
            muiTableHeadCellProps: {
                align: 'center',
            },
        },
    ]

export const rejectColumns =
    [
        {
            accessorKey: 'request_id', //access nested data with dot notation
            header: 'Mã sản phẩm',
            size: 170,
            muiTableHeadCellProps: {
                align: 'center',
            },
        },
        {
            accessorKey: 'seller_name', //access nested data with dot notation
            header: 'Tên người bán',
            size: 110,
            muiTableHeadCellProps: {
                align: 'center',
            },
        },
        {
            accessorKey: 'phone', //access nested data with dot notation
            header: 'Số điện thoại',
            size: 120,
            muiTableHeadCellProps: {
                align: 'center',
            },
        },
        {
            accessorKey: 'product_name',
            header: 'Tên sản phẩm',
            size: 170,
            muiTableHeadCellProps: {
                align: 'center',
            },
        },
        {
            accessorKey: 'reserve_price', //normal accessorKey
            header: 'Giá khởi điểm',
            size: 90,
            muiTableHeadCellProps: {
                align: 'center',
            },
        },
        {
            accessorKey: 'sale_price',
            header: 'Giá bán',
            size: 100,
            muiTableHeadCellProps: {
                align: 'center',
            },
        },
    ]

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

export const categoriesItems = [
    getItem('Điện tử', 'dien-tu', null, [
        getItem('Máy tính', '5'),
        getItem('Điện thoại', '6'),
        getItem('Máy ảnh', '7'),
        getItem('Linh kiện máy tính', '8'),
        getItem('Ổ cứng', '13'),
        getItem('Danh mục khác', '14'),
    ]),
    {
        type: 'divider',
    },
    getItem('Đồng hồ', 'sub4', null, [
        getItem('Đồng hồ nam', '9'),
        getItem('Đồng hỗ nữ', '10'),
        getItem('Đồng hồ Unisex', '11'),
        getItem('Đồng hồ để bàn', '12'),
    ]),
    {
        type: 'divider',
    },
    getItem('Nhà cửa đời sống', 'sub5', null, [
        getItem('Dụng cụ nhà bếp', '15'),
        getItem('Đồ gia dụng', '16'),
        getItem('Dụng cụ sửa chữa', '17'),
        getItem('Đồ trang trí', '18'),
        getItem('Đồ nội thất', '19'),
        getItem('Khác', '20'),
    ]),
    getItem('Thể thao', 'sub7', null, [
        getItem('Dụng cụ thể thao', '21'),
        getItem('Thời trang thể thao', '22'),
        getItem('Thực phẩm thể thao', '23'),
        getItem('Phụ kiện thể thao', '24'),
        getItem('Khác', '25'),
    ]),
    getItem('Thời trang', 'sub8', null, [
        getItem('Thời trang nữ', '26'),
        getItem('Thời trang nam', '27'),
        getItem('Thời trang trẻ em', '28'),
        getItem('Thời trang nước ngoài', '29'),
        getItem('Thời trang handmade', '30'),
        getItem('Khác', '31'),
    ]),
    getItem('Phim, giải trí', 'sub9', null, [
        getItem('DVD', '32'),
        getItem('Đĩa CD', '33'),
        getItem('Goods', '34'),
        getItem('Băng video', '35'),
        getItem('Khác', '36'),
    ]),
    getItem('Sức khỏe và làm đẹp', 'sub10', null, [
        getItem('Mỹ phẩm', '37'),
        getItem('Chăm sóc tóc', '38'),
        getItem('Chăm sóc body', '39'),
        getItem('Thực phẩm chức năng', '40'),
        getItem('Dụng cụ Y tế', '41'),
        getItem('Dụng cụ làm đẹp', '42'),
        getItem('Khác', '43'),
    ]),
    getItem('Đồ trẻ em', 'sub11', null, [
        getItem('Đồ chơi', '44'),
        getItem('Đồ tắm', '45'),
        getItem('Sản phẩm bảo vệ bé', '46'),
        getItem('Tã, sản phẩm vệ sinh', '47'),
        getItem('Quà lưu niệm', '48'),
        getItem('Khác', '49'),
    ]),
    getItem('Sách và VPP', 'sub12', null, [
        getItem('Phụ kiện các loại bàn', '50'),
        getItem('Sách kinh doanh', '51'),
        getItem('Văn học & Tiểu thuyết', '58'),
        getItem('Văn phòng phẩm', '52'),
        getItem('Sách thiếu nhi', '54'),
        getItem('Sách tham khảo', '53'),
        getItem('Truyện tranh', '55'),
        getItem('Sách, truyện nước ngoài ', '56'),
        getItem('Khác', '57'),
    ]),
    getItem('Phương tiện', 'sub13', null, [
        getItem('Xe máy', '50'),
        getItem('Linh kiện xe', '51'),
        getItem('Phụ tùng xe ô tô', '52'),
        getItem('Ô tô', '54'),
        getItem('Xe đạp', '53'),
        getItem('Khác', '57'),
    ]),
    getItem('Khác', 'sub14', null, [
    ]),
];

export function daysRemaining(inputDateString) {
    const targetDate = new Date(inputDateString);

    const currentDate = new Date();

    // Tính toán chênh lệch thời gian
    const timeDifference = targetDate.getTime() - currentDate.getTime();

    if (timeDifference <  86400000) {
        const hoursRemaining = Math.floor(timeDifference / (1000 * 60 * 60));

        return `${hoursRemaining} giờ`;
    }

    const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return `${daysRemaining} ngày`;
}
