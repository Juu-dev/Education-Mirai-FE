import {Button, Input, Select, Table, Upload} from "antd";
import {OBJECT_DATA, SHARE_LIST_DATA, TEMPLATE_DATA} from "../../constants/mocks/document";
import {SHARE_LIST_COLUMNS, TEMPLATE_COLUMNS} from "../../constants/document-modal";
import {UploadOutlined} from "@ant-design/icons";

export const templateModalParams = (openModal: () => void) => ({
    title: "Lựa chọn template",
    content:
        <>
            <Table
                dataSource={TEMPLATE_DATA}
                columns={TEMPLATE_COLUMNS}
                pagination={false}
            />
            <div className="flex justify-end mt-4">
                <Button type="primary" onClick={openModal}>
                    Thêm mẫu
                </Button>
            </div>
        </>
})

export const shareDocumentModalParams = {
    title: "Share Document",
    content:
        <>
            <Input.Search
                placeholder="Search by name or email"
                className="mb-4"
            />
            <Table
                dataSource={SHARE_LIST_DATA}
                columns={SHARE_LIST_COLUMNS}
                pagination={false}
            />
            <div className="flex justify-end mt-4">
                <Button type="primary">Chia sẻ</Button>
            </div>
        </>
}

export const addTemplateModalParams = {
    title: "Thêm mẫu mới",
    content:
        <>
            <div className="mb-4">
                <div className="mb-2">Tên tài liệu</div>
                <Input placeholder="Enter document name"/>
            </div>
            <div className="mb-4">
                <div className="mb-2">Đối tượng sử dụng</div>
                <Select
                    placeholder="Select user type"
                    className="w-full"
                    options={OBJECT_DATA}
                />
            </div>
            <div className="mb-4">
                <div className="mb-2">Đính kèm</div>
                <Upload>
                    <Button icon={<UploadOutlined/>}>Click to Upload</Button>
                </Upload>
            </div>
            <div className="flex justify-end mt-4">
                <Button type="primary">Thêm mẫu</Button>
            </div>
        </>
}
