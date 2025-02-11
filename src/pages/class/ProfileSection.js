import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, Card, Typography } from "antd";
const { Title, Text } = Typography;
const ProfileSection = ({ teacher }) => {
    return (_jsx(Card, { className: "mb-4", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(Avatar, { size: 64, src: "https://i.pravatar.cc/150?img=4", style: { marginBottom: "auto" } }), _jsxs("div", { className: "flex-grow", children: [_jsx(Title, { level: 3, className: "text-gray-800 mb-0", children: teacher.name }), _jsxs("div", { className: "grid grid-cols-5 gap-2 mt-2", children: [_jsx(Text, { strong: true, className: "col-span-1", children: "L\u1EDBp ch\u1EE7 nhi\u1EC7m:" }), _jsx(Text, { className: "col-span-4", children: teacher.class }), _jsx(Text, { strong: true, className: "col-span-1", children: "S\u1ED1 l\u01B0\u1EE3ng h\u1ECDc sinh:" }), _jsx(Text, { className: "col-span-4", children: teacher.studentCount }), _jsx(Text, { strong: true, className: "col-span-1", children: "Ng\u00E0y sinh:" }), _jsx(Text, { className: "col-span-4", children: teacher.birthDate }), _jsx(Text, { strong: true, className: "col-span-1", children: "Email:" }), _jsx(Text, { className: "col-span-4", children: teacher.email })] })] })] }) }));
};
export default ProfileSection;
