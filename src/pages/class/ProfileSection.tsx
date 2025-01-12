import React from "react";
import {Avatar, Card, Typography} from "antd";
const { Title, Text } = Typography;

const ProfileSection: React.FC<{ teacher: any }> = ({ teacher }) => {
    return (
        <Card className="mb-4">
            <div className="flex items-center space-x-4">
                <Avatar
                    size={64}
                    src="https://i.pravatar.cc/150?img=4"
                    style={{ marginBottom: "auto" }}
                />
                <div className="flex-grow">
                    <Title level={3} className="text-gray-800 mb-0">
                        {teacher.name}
                    </Title>
                    <div className="grid grid-cols-5 gap-2 mt-2">
                        <Text strong className="col-span-1">
                            Lớp chủ nhiệm:
                        </Text>
                        <Text className="col-span-4">{teacher.class}</Text>

                        <Text strong className="col-span-1">
                            Số lượng học sinh:
                        </Text>
                        <Text className="col-span-4">
                            {teacher.studentCount}
                        </Text>

                        {/*<Text strong className="col-span-1">*/}
                        {/*    Mã số:*/}
                        {/*</Text>*/}
                        {/*<Text className="col-span-4">{teacher.code}</Text>*/}

                        <Text strong className="col-span-1">
                            Ngày sinh:
                        </Text>
                        <Text className="col-span-4">{teacher.birthDate}</Text>

                        <Text strong className="col-span-1">
                            Email:
                        </Text>
                        <Text className="col-span-4">{teacher.email}</Text>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ProfileSection;
