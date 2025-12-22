import { Card, Button, Space, Input, Select, List, Avatar, Tag, Divider } from "antd";
import { LinkedinFilled, FacebookFilled, TwitchFilled, MailFilled, EnvironmentOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faBookmark, faFileLines, faLink, faLocationArrow, faLocationDot, faMapLocation, faSearch } from "@fortawesome/free-solid-svg-icons";

interface PropsType {
    data: any;
}

const jobs = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    title: i === 1 ? "Senior UX Designer" : "Marketing Officer",
    type: i % 2 === 0 ? "INTERNSHIP" : "FULL-TIME",
    company: "Google Inc.",
    location: "Dhaka, Bangladesh",
    salary: "$20,000 - $25,000",
}));

export const DescriptionBusiness = ({ data }: PropsType) => {
    return (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mt-16">
            <div className="lg:col-span-2">
                <div className="mb-6">
                    <h3 className="font-semibold mb-2">Mô tả về công ty</h3>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">{data.description}</p>
                </div>

                <div className="mb-6">
                    <h3 className="font-semibold mb-3">Việc làm công ty đang mở</h3>

                    <div className="mb-4 flex flex-col sm:flex-row gap-2 items-start sm:items-center p-4 border border-gray-300 rounded shadow">
                        <Input
                            prefix={<FontAwesomeIcon icon={faSearch} className="text-[#BC2228]!" />}
                            placeholder="Search job..."
                            className="flex-1 w-full! border-0!"
                            size="large"
                        />
                        <Divider orientation="vertical" className="h-10!" />
                        <Select
                            prefix={<FontAwesomeIcon icon={faLocationDot} className="text-[#BC2228]!" />}
                            placeholder="Vị trí"
                            className="min-w-40 border-0!"
                            allowClear
                            size="large"
                        />
                        <Button className="bg-[#BC2228]! border-0! text-white! font-medium!" size="large">
                            Find Job
                        </Button>
                    </div>

                    <List
                        itemLayout="horizontal"
                        dataSource={jobs}
                        renderItem={(item) => (
                            <List.Item className="mb-4">
                                <div className="w-full border border-gray-200 rounded-lg p-4 bg-white shadow-sm flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-lg">{item.title}</div>
                                        <div className="flex gap-4">
                                            <div className="flex items-center gap-3">
                                                <Tag color={item.type === "INTERNSHIP" ? "blue" : "green"} className="text-sm">
                                                    {item.type}
                                                </Tag>
                                                <div className="text-sm text-gray-500 mt-2">Salary: {item.salary}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-3">
                                            <Avatar size={56} src="" shape="square" />
                                            <div>
                                                <div>{item.company}</div>
                                            <div className="flex items-center text-xs text-gray-400">
                                                <EnvironmentOutlined className="mr-1" /> {item.location}
                                            </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <Button type="text" icon={<FontAwesomeIcon icon={faBookmark} />} />
                                    </div>
                                </div>
                            </List.Item>
                        )}
                    />
                </div>
            </div>

            <Space orientation="vertical" size={16} className="w-full">
                <Card>
                    <h4 className="font-medium! mb-3 text-[16px]!">
                        <FontAwesomeIcon icon={faLocationArrow} className="text-[#BC2228] mr-2" /> Địa chỉ công ty
                    </h4>
                    <div className="text-sm text-gray-300">{data.location}</div>
                </Card>
                <Card>
                    <h4 className="font-medium! mb-3 text-[16px]!">
                        <FontAwesomeIcon icon={faMapLocation} className="text-[#BC2228] mr-2" /> Xem bản đồ công ty
                    </h4>
                    <div className="text-sm text-gray-300">{data.location}</div>
                </Card>

                
                <Card>
                    <h4 className="font-medium! mb-3 text-[16px]!">
                        <FontAwesomeIcon icon={faAddressCard} className="text-[#BC2228] mr-2" /> Chia sẻ thông tin công ty đến mọi người:
                    </h4>
                    <Space orientation="vertical" size={8} className="w-full">
                        <div className="flex gap-2">
                            <Button
                                    type="default"
                                    size="large"
                                    className="bg-[#EFC3C4]! text-[#BC2228]! font-bold! border-0!"
                                    icon={<FontAwesomeIcon icon={faLink} />}
                                >
                                    Copy Links
                                </Button>
                                <Button
                                    type="default"
                                    size="large"
                                    className="bg-[#EFC3C4]! text-[#BC2228]! font-bold! border-0!"
                                    icon={<LinkedinFilled />}
                                />
                                <Button
                                    type="default"
                                    size="large"
                                    className="bg-[#EFC3C4]! text-[#BC2228]! font-bold! border-0!"
                                    icon={<FacebookFilled />}
                                />
                                <Button
                                    type="default"
                                    size="large"
                                    className="bg-[#EFC3C4]! text-[#BC2228]! font-bold! border-0!"
                                    icon={<TwitchFilled />}
                                />
                                <Button
                                    type="default"
                                    size="large"
                                    className="bg-[#EFC3C4]! text-[#BC2228]! font-bold! border-0!"
                                    icon={<MailFilled />}
                                />
                        </div>
                    </Space>
                </Card>

                <Card className="text-center">
                    <div className="mb-3">
                        <div className="inline-block p-3 bg-gray-50 rounded-md">
                            <FontAwesomeIcon icon={faFileLines} className="text-3xl text-[#BC2228]" />
                        </div>
                        <div className="mb-4 text-[16px] font-medium">Truy cập trang công ty để xem thêm</div>
                    </div>
                    <Button type="primary" block className="bg-[#BC2228] border-0! font-medium!" size="large">
                        Truy cập
                    </Button>
                </Card>
            </Space>
        </div>
    );
};
