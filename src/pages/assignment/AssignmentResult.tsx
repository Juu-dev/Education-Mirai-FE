import {Button, Result} from "antd";

export const AssignmentResult = () => {
    return (
        <Result
            status="success"
            title="Bạn đã hoàn thành bài tập!"
            subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
            extra={[
                <Button type="primary" key="console">
                    Quay lại trang bài tập
                </Button>,
                <Button key="buy">Làm lại bài tập</Button>,
            ]}
        />
    );
};

export default AssignmentResult;
