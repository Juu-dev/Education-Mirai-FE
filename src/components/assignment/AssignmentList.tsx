import { AssignmentComponent } from "./AssignmentComponent";
import { AssignmentInterface } from "./interface/assginment-interface";

interface AssignmentListProps {
    assignments: AssignmentInterface[];
    onComplete: (id: number) => void;
}

export const AssignmentList = ({ assignments, onComplete }: AssignmentListProps) => {
    // const [assignments, setAssignments] = useState(initialAssignments);

    // const handleCompleteAssignment = (id: number) => {
    //     setAssignments((prevAssignments) =>
    //         prevAssignments.map((assignment) =>
    //             assignment.id === id
    //                 ? { ...assignment, isCompleted: true }
    //                 : assignment
    //         )
    //     );
    // };

    const handleCompleteAssignment = (id: number) => {
        onComplete(id);
    }

    return (
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments.map((assignment) => (
                <AssignmentComponent
                    key={assignment.id}
                    assignment={assignment}
                    onComplete={handleCompleteAssignment}
                />
            ))}
        </div>
    );
};
