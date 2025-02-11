import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Card, Pagination, Table } from "antd";
import PageTitle from "../../components/common/SectionTitle";
import { columnsStudent } from "./column";
import { parseStudentData } from "../../utils/parse-data";
import { useEffect, useState } from "react";
import useModal from "../../hooks/modal/useModal";
import StudentProfileForm from "../../components/admin/modal/StudentProfileForm";
import useFetchApi from "../../hooks/useFetchApi";
import useAuth from "../../hooks/useAuth";
import useConfirmModal from "../../hooks/modal/useConfirmModal";
import useDeleteApi from "../../hooks/useDeleteApi";
export const StudentSection = ({ classId }) => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const { me } = useAuth();
    const url = `/students/class/${classId || me?.class.id}`;
    const studentsFetchApi = useFetchApi({ url: url, auth: true });
    const deleteStudentApi = useDeleteApi({ url: `/users/${selectedStudent?.userId}` });
    const handlePageChange = (page) => {
        studentsFetchApi?.fetchApi(url, { params: { page, pageSize: studentsFetchApi.pagination?.pageSize || 5 } });
    };
    const studentProfile = useModal({
        title: selectedStudent ? selectedStudent.name : "Student Profile",
        content: _jsx(StudentProfileForm, { studentData: selectedStudent }),
    });
    const attendanceFooter = [
        _jsx(Button, { type: "primary", children: "\u0110i\u1EC3m danh" }, "check"),
        _jsx(Button, { type: "primary", children: "\u0110i\u1EC3m danh t\u1EA5t c\u1EA3" }, "checkAll"),
    ];
    const attendance = useModal({
        title: "Danh sách học sinh",
        content: _jsx(StudentProfileForm, { studentData: parseStudentData(studentsFetchApi.data) }),
        handleOk: () => { },
        footer: attendanceFooter
    });
    const confirmDeleteStudent = useConfirmModal({
        content: (_jsxs("p", { children: ["B\u1EA1n c\u00F3 ch\u1EAFc ch\u1EAFn mu\u1ED1n x\u00F3a h\u1ECDc sinh", " ", _jsx("strong", { children: selectedStudent?.name }), "?", _jsx("br", {}), "Thao t\u00E1c n\u00E0y kh\u00F4ng th\u1EC3 ho\u00E0n t\u00E1c."] })),
        handleOk: async () => {
            if (selectedStudent) {
                await deleteStudentApi.handleDelete();
                studentsFetchApi.setFetched(false);
                confirmDeleteStudent.closeModal();
            }
        }
    });
    useEffect(() => {
        if (me?.class.id || classId) {
            studentsFetchApi.fetchApi(url);
        }
    }, [me?.class.id, classId]);
    return (_jsxs(_Fragment, { children: [_jsxs(Card, { className: "flex-grow mb-4 overflow-auto", children: [_jsx(PageTitle, { title: "Danh s\u00E1ch h\u1ECDc sinh", className: "mb-3" }), _jsx(Table, { columns: columnsStudent(studentProfile, confirmDeleteStudent), dataSource: parseStudentData(studentsFetchApi.data), pagination: false, onRow: (record) => ({
                            onClick: () => {
                                setSelectedStudent(record);
                            },
                        }) }), _jsx(Pagination, { align: "end", current: studentsFetchApi?.pagination?.page, total: studentsFetchApi?.count, pageSize: studentsFetchApi?.pagination?.pageSize, onChange: handlePageChange, showSizeChanger: false, className: "custom-pagination mt-3" })] }), studentProfile.modal, attendance.modal, confirmDeleteStudent.modal] }));
};
