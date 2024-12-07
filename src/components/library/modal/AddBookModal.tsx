import React from "react";
import { Modal, Input, Button, Form, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import useCreateApiFormData from "../../../hooks/useCreateApiFormData.ts";

interface Props {
    isVisible: boolean;
    onCancel: () => void;
    onUploadSuccess: () => void;
}

const AddBookModal: React.FC<Props> = ({ isVisible, onCancel, onUploadSuccess }: Props) => {
    const [form] = Form.useForm();

    // Sử dụng hook để tạo API upload
    const { creating, handleCreate } = useCreateApiFormData({
        url: "/books",
        fullResp: true,
        successMsg: "Thêm sách thành công",
        errorMsg: "Thêm sách thất bại",
    });

    const handleSubmit = async (values: any) => {
        const { cover, pdf, ...rest } = values;

        // Tạo FormData để gửi file và dữ liệu khác
        const formData = new FormData();
        formData.append("title", rest.title);
        formData.append("author", rest.author);
        formData.append("description", rest.description || "");
        formData.append("publishingHouse", rest.nxb);
        formData.append("evaluate", rest.rating);

        // Đảm bảo chỉ gửi file đầu tiên từ danh sách file
        if (cover?.[0]?.originFileObj) {
            formData.append("files", cover[0].originFileObj);
        }
        if (pdf?.[0]?.originFileObj) {
            formData.append("files", pdf[0].originFileObj);
        }

        const success = await handleCreate(formData);
        if (success) {
            onCancel();
            form.resetFields();
            onUploadSuccess();
        }
    };

    const beforeUpload = (file: File, allowedTypes: string[]) => {
        const isAllowedType = allowedTypes.includes(file.type);
        if (!isAllowedType) {
            message.error(`Chỉ chấp nhận các file định dạng: ${allowedTypes.join(", ")}`);
        }
        return isAllowedType || Upload.LIST_IGNORE;
    };

    return (
        <Modal
            title="Thêm sách mới"
            visible={isVisible}
            onCancel={onCancel}
            footer={null}
        >
            <Form layout="vertical" form={form} onFinish={handleSubmit}>
                <Form.Item
                    name="title"
                    label="Tên sách"
                    rules={[{ required: true, message: "Vui lòng nhập tên sách" }]}
                >
                    <Input placeholder="Nhập tên sách" />
                </Form.Item>

                <Form.Item
                    name="author"
                    label="Tác giả"
                    rules={[{ required: true, message: "Vui lòng nhập tác giả" }]}
                >
                    <Input placeholder="Nhập tên tác giả" />
                </Form.Item>

                <Form.Item name="description" label="Mô tả">
                    <Input.TextArea rows={4} placeholder="Nhập mô tả sách" />
                </Form.Item>

                <Form.Item
                    name="nxb"
                    label="Nhà xuất bản"
                    rules={[{ required: true, message: "Vui lòng nhập NXB" }]}
                >
                    <Input placeholder="Nhập nhà xuất bản" />
                </Form.Item>

                <Form.Item
                    name="rating"
                    label="Đánh giá"
                    rules={[{ required: true, message: "Vui lòng nhập đánh giá (1-5)" }]}
                >
                    <Input type="number" min={1} max={5} placeholder="Nhập đánh giá (1-5)" />
                </Form.Item>

                <Form.Item
                    name="cover"
                    label="Ảnh bìa"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                    rules={[{ required: true, message: "Vui lòng tải ảnh bìa" }]}
                >
                    <Upload
                        name="cover"
                        listType="picture"
                        beforeUpload={(file) => beforeUpload(file, ["image/jpeg", "image/png"])}
                        maxCount={1}
                        multiple={false}
                    >
                        <Button icon={<UploadOutlined />}>Tải ảnh bìa</Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    name="pdf"
                    label="Sách PDF"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                    rules={[{ required: true, message: "Vui lòng tải sách PDF" }]}
                >
                    <Upload
                        name="pdf"
                        beforeUpload={(file) => beforeUpload(file, ["application/pdf"])}
                        maxCount={1}
                        multiple={false}
                    >
                        <Button icon={<UploadOutlined />}>Tải sách PDF</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type="primary"
                            htmlType="submit"
                            loading={creating}
                            className="w-full">
                        {creating ? "Đang thêm sách..." : "Thêm sách"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddBookModal;
