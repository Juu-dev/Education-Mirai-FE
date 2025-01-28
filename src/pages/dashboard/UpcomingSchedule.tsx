import {Card, Empty} from "antd";
import useFetchApi from "../../hooks/useFetchApi";
import {splitDateTime} from "../../helpers/date";

export const UpcomingSchedule = () => {
    const upcomingTask = useFetchApi({
        url: `/tasks/five-latest`,
        auth: true,
        presentData: (data) => transformToUpcomingSchedule(data.map(e => ({
            ...splitDateTime(e.endTime),
            event: e.title
        })))
    })

    function formatTimeTo12Hour(time: string): string {
        const [hours, minutes] = time.split(':').map(Number);
        const period = hours >= 12 ? 'pm' : 'am';
        const formattedHours = hours % 12 || 12;
        return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    }

    const transformToUpcomingSchedule = (data: { date: string; time: string; event: string }[]) => {
        const groupedData = data.reduce((result, item) => {
            const { date, time, event } = item;
            const formattedTime = formatTimeTo12Hour(time);
            const existingDateGroup = result.find(group => group.date === date);

            if (existingDateGroup) {
                existingDateGroup.events.push({ time: formattedTime, event });
            } else {
                result.push({
                    date,
                    events: [{ time: formattedTime, event }]
                });
            }

            return result;
        }, [] as { date: string; events: { time: string; event: string }[] }[]);

        return groupedData;
    }

    return (<Card title="Lịch sắp tới" className="p-4">
        {upcomingTask?.data.length> 0 ? upcomingTask?.data.map((schedule, index) => (
            <div key={index} className="mb-4">
                {/* Render the date */}
                <h3 className="font-bold text-lg mb-2">{schedule.date}</h3>

                {/* Render the events for this date */}
                <ul className="space-y-2">
                    {schedule.events.map((event, idx) => (
                        <li className="flex items-center justify-between" key={idx}>
                            <span>{event.time}</span>
                            <span>{event.event}</span>
                        </li>
                    ))}
                </ul>
            </div>
        )) :
        <div className="col-span-5 flex justify-center">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
        </div>}
    </Card>)
}
