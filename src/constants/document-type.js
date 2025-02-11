export const MENU_UPLOAD = [{
        key: "lecture-plan",
        value: "Kế hoạch bài dạy"
    }, {
        key: "continuation-education",
        value: "Bồi dưỡng thường xuyên"
    }, {
        key: "meeting-plan",
        value: "Hội họp"
    }, {
        key: "lecture-note",
        value: "Ghi chú"
    }, {
        key: "group-profile",
        value: "Hồ sơ tổ"
    }, {
        key: "others",
        value: "Khác"
    }];
export const getValueFromMenuUploadByKey = (key) => {
    const menuItem = MENU_UPLOAD.find(item => item.key === key);
    return menuItem ? menuItem.value : undefined;
};
