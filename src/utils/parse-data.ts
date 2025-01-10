import {formatDate} from "../helpers/date.ts";

export const parseTeacherData  = (data: any) => ({
    avatar: "https://i.pravatar.cc/150?img=4",
    name: data?.name,
    class: data?.class?.name,
    studentCount: data?.class?._count.user,
    code: data?.id,
    birthDate: formatDate(data?.dob),
    email: data?.email,
})

export const parseStudentData = (data: any) => data?.map((e: any) => ({
    key: e.id,
    id: e.id,
    userId: e.userId,
    classId: e?.user?.class.id,
    metadataUrl: e.metadataUrl,
    name: e?.user?.name,
    birthDate: formatDate(e?.user?.birthDate),
    parentName: e.parentName,
    level: e.level,
}))
