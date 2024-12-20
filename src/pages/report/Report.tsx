import React, { useState } from 'react';
import { Form, Input, Button, Select, DatePicker } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const Report: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Form values:', values);
        // Handle form submission here
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Gửi yêu cầu</h1>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Form.Item
                            name="task"
                            label="Task"
                            rules={[{ required: true, message: 'Vui lòng nhập task' }]}
                        >
                            <Input placeholder="Nhập task" />
                        </Form.Item>
                        <Form.Item
                            name="time"
                            label="Thời gian"
                            rules={[{ required: true, message: 'Vui lòng chọn thời gian' }]}
                        >
                            <DatePicker className="w-full" />
                        </Form.Item>
                        <Form.Item
                            name="type"
                            label="Loại"
                            rules={[{ required: true, message: 'Vui lòng chọn loại' }]}
                        >
                            <Select placeholder="Chọn loại">
                                <Option value="xin_hoan">Xin hoãn</Option>
                                <Option value="xin_nghi">Xin nghỉ</Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item
                            name="reason"
                            label="Reason"
                            rules={[{ required: true, message: 'Vui lòng nhập lý do' }]}
                        >
                            <TextArea
                                placeholder="Nhập lý do"
                                autoSize={{ minRows: 8, maxRows: 10 }}
                            />
                        </Form.Item>
                    </div>
                </div>
                <Form.Item className="flex justify-center">
                    <Button type="primary" htmlType="submit" className="bg-gray-400 hover:bg-gray-700 w-32">
                        Gửi
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Report;