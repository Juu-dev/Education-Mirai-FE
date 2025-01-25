import {Card} from "antd";

export const SummaryStatistics = () => {
    return (<div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
            <div className="text-center">
                <div className="text-2xl font-bold">45/45</div>
                <div>Tổng số lớp</div>
            </div>
        </Card>
        <Card>
            <div className="text-center">
                <div className="text-2xl font-bold">25/25</div>
                <div>Tổng số sinh viên</div>
            </div>
        </Card>
        <Card>
            <div className="text-center">
                <div className="text-2xl font-bold">01/10</div>
                <div>Tổng số học sinh</div>
            </div>
        </Card>
    </div>)
}
