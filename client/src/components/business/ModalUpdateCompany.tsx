import { Modal, Form, Input, Select, Button, message } from "antd";
import { useEffect, useState } from "react";
import { businessApi, UpdateCompanyDTO } from "../../apis/businessApi";
import type { Company, TypeCompany, Location } from "../../types/business.type";

const { TextArea } = Input;

interface ModalUpdateCompanyProps {
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  company: Company;
}

export const ModalUpdateCompany = ({ open, onCancel, onSuccess, company }: ModalUpdateCompanyProps) => {
  const [form] = Form.useForm();
  const [typeCompanies, setTypeCompanies] = useState<TypeCompany[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      businessApi.getTypeCompanies().then(setTypeCompanies).catch(console.error);
      
      form.setFieldsValue({
        name: company.name,
        type_company_id: company.type_company_id,
        website: company.website,
        link_fb: company.link_fb,
        link_linkedin: company.link_linkedin,
        size: company.size,
        description: company.description,
      });
    }
  }, [open, company, form]);

  const handleSubmit = async (values: UpdateCompanyDTO) => {
    setLoading(true);
    try {
      await businessApi.updateCompany(company.id, values);
      message.success("Cập nhật thông tin công ty thành công!");
      form.resetFields();
      onSuccess();
    } catch (error: any) {
      message.error(error.message || "Cập nhật thông tin công ty thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Cập nhật thông tin doanh nghiệp"
      open={open}
      onCancel={onCancel}
      footer={null}
      width={700}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Tên công ty"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên công ty!" }]}
        >
          <Input placeholder="VD: FPT Software" />
        </Form.Item>

        <Form.Item
          label="Loại công ty"
          name="type_company_id"
          rules={[{ required: true, message: "Vui lòng chọn loại công ty!" }]}
        >
          <Select placeholder="Chọn loại công ty">
            {typeCompanies.map((type) => (
              <Select.Option key={type.id} value={type.id}>
                {type.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Website" name="website">
          <Input placeholder="https://www.example.com" />
        </Form.Item>

        <Form.Item label="Facebook" name="link_fb">
          <Input placeholder="https://facebook.com/example" />
        </Form.Item>

        <Form.Item label="LinkedIn" name="link_linkedin">
          <Input placeholder="https://linkedin.com/company/example" />
        </Form.Item>

        <Form.Item label="Quy mô" name="size">
          <Select placeholder="Chọn quy mô công ty">
            <Select.Option value="1-50">1-50 nhân viên</Select.Option>
            <Select.Option value="51-200">51-200 nhân viên</Select.Option>
            <Select.Option value="201-500">201-500 nhân viên</Select.Option>
            <Select.Option value="501-1000">501-1000 nhân viên</Select.Option>
            <Select.Option value="1000+">Trên 1000 nhân viên</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Mô tả công ty" name="description">
          <TextArea 
            rows={5} 
            placeholder="Nhập mô tả về công ty của bạn..."
            showCount
            maxLength={2000}
          />
        </Form.Item>

        <Form.Item className="mb-0 flex justify-end gap-2">
          <Button onClick={onCancel}>Hủy bỏ</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
