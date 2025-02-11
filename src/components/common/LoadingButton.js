import { jsx as _jsx } from "react/jsx-runtime";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
function LoadingButton({ loading }) {
    return loading && _jsx(Spin, { indicator: _jsx(LoadingOutlined, { className: "text-white ml-3" }) });
}
export default LoadingButton;
