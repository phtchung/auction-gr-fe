import privateHttp from "../Http/privateHttp.config.js";

export const AdminGetReqCount = async () => {
    return privateHttp({
        method: "GET",
        url: `/admin/product/reqCount`,
    });
};

export const AdminGetReqTracking = async (status) => {
    return privateHttp({
        method: "POST",
        url: "/admin/product/reqList",
        data: {
            status: status,
        },
    });
};

export const AdminGetReqDetail = async (reqId) => {
    return privateHttp({
        method: "GET",
        url: `/admin/request/${reqId}`,
    });
};

export const sendApproveData = async (approvedData) => {
    return privateHttp({
        method: "POST",
        url: "/admin/approvedData",
        data: approvedData,
    });
};


export const rejectRequest = async (rejectData) => {
    return privateHttp({
        method: "POST",
        url: "/admin/rejectRequest",
        data: rejectData,
    });
};