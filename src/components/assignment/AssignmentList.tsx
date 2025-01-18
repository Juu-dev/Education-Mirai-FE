import { AssignmentComponent } from "./AssignmentComponent";
import useFetchApi from "../../hooks/useFetchApi.ts";
import {useNavigate} from "react-router-dom";

export const AssignmentList = () => {
    const documentsApi = useFetchApi({url: `/exercises/pagination/class`, auth: true})
    const navigate = useNavigate();
    const gotoAssignmentDetail = (id: string) => navigate(`/student/assignments/${id}`);

    return (
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentsApi?.data.map((assignment) => (
                <AssignmentComponent
                    assignment={assignment}
                    gotoDetailPage={gotoAssignmentDetail}
                />
            ))}
        </div>
    );
};
