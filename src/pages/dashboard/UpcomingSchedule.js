import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Empty } from "antd";
import useFetchApi from "../../hooks/useFetchApi";
import { splitDateTime } from "../../helpers/date";
export const UpcomingSchedule = () => {
    const upcomingTask = useFetchApi({
        url: `/tasks/five-latest`,
        auth: true,
        presentData: (data) => transformToUpcomingSchedule(data.map(e => ({
            ...splitDateTime(e.endTime),
            event: e.title
        })))
    });
    function formatTimeTo12Hour(time) {
        const [hours, minutes] = time.split(':').map(Number);
        const period = hours >= 12 ? 'pm' : 'am';
        const formattedHours = hours % 12 || 12;
        return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    }
    const transformToUpcomingSchedule = (data) => {
        const groupedData = data.reduce((result, item) => {
            const { date, time, event } = item;
            const formattedTime = formatTimeTo12Hour(time);
            const existingDateGroup = result.find(group => group.date === date);
            if (existingDateGroup) {
                existingDateGroup.events.push({ time: formattedTime, event });
            }
            else {
                result.push({
                    date,
                    events: [{ time: formattedTime, event }]
                });
            }
            return result;
        }, []);
        return groupedData;
    };
    return (_jsx(Card, { title: "L\u1ECBch s\u1EAFp t\u1EDBi", className: "p-4", children: upcomingTask?.data.length > 0 ? upcomingTask?.data.map((schedule, index) => (_jsxs("div", { className: "mb-4", children: [_jsx("h3", { className: "font-bold text-lg mb-2", children: schedule.date }), _jsx("ul", { className: "space-y-2", children: schedule.events.map((event, idx) => (_jsxs("li", { className: "flex items-center justify-between", children: [_jsx("span", { children: event.time }), _jsx("span", { children: event.event })] }, idx))) })] }, index))) :
            _jsx("div", { className: "col-span-5 flex justify-center", children: _jsx(Empty, { image: Empty.PRESENTED_IMAGE_SIMPLE }) }) }));
};
