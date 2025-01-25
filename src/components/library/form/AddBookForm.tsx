import React from "react";
import {Input, Button, Form, Upload, message, Select} from "antd";
import { UploadOutlined } from "@ant-design/icons";

interface Props {
    form: any
}

const bookType = [
    {value: "textBooks", name: "Sách giáo khoa"},
    {value: "referenceBooks", name: "Sách tham khảo"},
    {value: "audioBooks", name: "Sách nói"},
]

const AddBookForm: React.FC<Props> = ({ form }: Props) => {
    const beforeUpload = (file: File, allowedTypes: string[]) => {
        const isAllowedType = allowedTypes.includes(file.type);
        if (!isAllowedType) {
            message.error(`Chỉ chấp nhận các file định dạng: ${allowedTypes.join(", ")}`);
        }
        return false;
    };

    return (
        <Form layout="vertical" form={form}>
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
                name="type"
                label="Loại sách"
                rules={[{ required: true, message: "Vui lòng chọn kiểu sách" }]}
            >
                <Select placeholder="Chọn kiểu sách">
                    {bookType.map(type => (
                        <Select.Option key={type.value} value={type.value}>
                            {type.name}
                        </Select.Option>
                    ))}
                </Select>
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
        </Form>
    );
};

export default AddBookForm;
