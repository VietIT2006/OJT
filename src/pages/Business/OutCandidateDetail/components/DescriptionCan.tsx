import { Card, Button, Space} from "antd";
import { LinkedinFilled, FacebookFilled, TwitchFilled, MailFilled } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faFileLines, faLink, faLocationArrow, faTools } from "@fortawesome/free-solid-svg-icons";

interface PropsType {
    data: any;
}

export const DescriptionCan = ({ data }: PropsType) => {
    return (
        <>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="mb-6 border-0!">
                        <h3 className="font-semibold mb-2">Mô tả và bản thân</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            Velistar is a Shopify Plus agency, and we partner with brands to help them grow, we also do the work with our people! Here
                            at Velistar, we don’t just make websites, we create exceptional digital experiences that consumers love. Our team of
                            designers, developers, strategists, and creators work together to push brands to the next level. From Platform Migration,
                            User Experience &amp; User Interface Design, to Digital Marketing, we have a proven track record in delivering outstanding
                            eCommerce solutions and driving sales for our clients.
                        </p>
                    </div>

                    <div className="mb-6 border-0!">
                        <h3 className="font-semibold mb-3">Kinh nghiệm làm việc</h3>
                        <ul className="list-disc list-inside text-sm space-y-2 text-gray-700">
                            <li>Great troubleshooting and analytical skills combined with the desire to tackle challenges head-on.</li>
                            <li>3+ years of experience in back-end development working with multiple smaller projects.</li>
                            <li>Experience with HTML, JavaScript, CSS, PHP, Symphony and/or Laravel.</li>
                            <li>Working regularly with APIs and Web Services (REST, GraphQL, SOAP, etc.)</li>
                        </ul>
                    </div>

                    <div className="border-0!">
                        <h3 className="font-semibold mb-3">Định hướng phát triển</h3>
                        <ul className="list-disc list-inside text-sm space-y-2 text-gray-700">
                            <li>Ambitious and hungry to grow your career in a fast-growing agency.</li>
                            <li>Want to work with us? You're in good company!</li>
                        </ul>
                    </div>
                </div>

                <Space orientation="vertical" size={16}>
                    <Card>
                        <h4 className="font-medium! mb-2 text-[16px]!">
                            <FontAwesomeIcon icon={faLocationArrow} className="text-[#BC2228]" /> Địa chỉ cá nhân
                        </h4>
                        <div className="text-sm text-gray-700">Đường D1, Khu Công Nghệ Cao, Phường Tân Phú, Quận 9, Thành phố Hồ Chí Minh</div>
                    </Card>

                    <Card>
                        <h4 className="font-medium! mb-3 text-[16px]!">
                            <FontAwesomeIcon icon={faTools} className="text-[#BC2228]" /> Kĩ năng
                        </h4>
                        <ul className="list-disc ml-6">
                            <li>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <h4 className="font-medium">Teachnical:</h4>
                                    {data.skills.map((s) => (
                                        <span className="ml-2! bg-[#E7F6EA] text-[#0BA02C] font-medium text-xs py-1 px-2 rounded" key={s}>
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </li>
                            <li>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    <h4 className="font-medium">Language:</h4>
                                    {data.languages.map((l) => (
                                        <span className="text-[#F16A1B] bg-[#FCE1D1] py-1 px-2 ml-2! rounded font-medium text-xs" key={l}>
                                            {l}
                                        </span>
                                    ))}
                                </div>
                            </li>
                        </ul>
                    </Card>

                    <Card>
                        <h4 className="font-medium! mb-3 text-[16px]!">
                            <FontAwesomeIcon icon={faAddressCard} className="text-[#BC2228]" /> Thông tin cá nhân
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
                        <div className="mb-3 flex gap-4">
                            <div className="inline-block p-3 bg-gray-50 rounded-md">
                                <FontAwesomeIcon icon={faFileLines} className="text-3xl text-[#BC2228]" />
                            </div>
                            <div className="mb-4 text-[16px] font-medium">Truy cập CV của A để xem thêm</div>
                        </div>

                        <Button type="default" block className="bg-[#BC2228]! border-0! text-white! font-bold!">
                            Truy cập CV
                        </Button>
                    </Card>
                </Space>
            </div>
        </>
    );
};
