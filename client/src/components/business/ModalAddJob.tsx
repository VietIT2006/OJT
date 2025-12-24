import { Modal, Form, Input, Select, DatePicker, Button, message } from "antd";
import { useEffect, useState } from "react";
import { businessApi, CreateJobDTO } from "../../apis/businessApi";
import type { TypeJob, Location } from "../../types/business.type";
import dayjs from "dayjs";

const { TextArea } = Input;

interface ModalAddJobProps {
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  companyId: string;
}

export const ModalAddJob = ({ open, onCancel, onSuccess, companyId }: ModalAddJobProps) => {
  const [form] = Form.useForm();
  const [typeJobs, setTypeJobs] = useState<TypeJob[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      Promise.all([
        businessApi.getTypeJobs(),
        businessApi.getLocations(),
      ]).then(([jobs, locs]) => {
        setTypeJobs(jobs);
        setLocations(locs);
      }).catch(console.error);
    }
  }, [open]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const jobData: CreateJobDTO = {
        company_id: companyId,
        type_job_id: values.type_job_id,
        tag_id: values.tag_id || "1",
        location_id: values.location_id,
        title: values.title,
        description: values.description,
        salary: values.salary || null,
        expire_at: values.expire_at ? dayjs(values.expire_at).toISOString() : null,
      };

      await businessApi.createJob(jobData);
      message.success("Thêm việc làm mới thành công!");
      form.resetFields();
      onSuccess();
    } catch (error: any) {
      message.error(error.message || "Thêm việc làm thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Thêm việc làm mới"
      open={open}
      onCancel={onCancel}
      footer={null}
      width={700}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Tên công việc"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tên công việc!" }]}
        >
          <Input placeholder="VD: Senior Frontend Developer" />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Thời gian làm việc"
            name="type_job_id"
            rules={[{ required: true, message: "Vui lòng chọn loại công việc!" }]}
          >
            <Select placeholder="Chọn loại">
              {typeJobs.map((type) => (
                <Select.Option key={type.id} value={type.id}>
                  {type.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Địa điểm"
            name="location_id"
            rules={[{ required: true, message: "Vui lòng chọn địa điểm!" }]}
          >
            <Select placeholder="Chọn địa điểm">
              {locations.map((loc) => (
                <Select.Option key={loc.id} value={loc.id}>
                  {loc.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item label="Mức lương" name="salary">
            <Input placeholder="VD: $200 - $1500" />
          </Form.Item>

          <Form.Item label="Thời hạn ứng tuyển" name="expire_at">
            <DatePicker 
              className="w-full" 
              placeholder="Chọn ngày hết hạn"
              format="DD/MM/YYYY"
            />
          </Form.Item>
        </div>

        <Form.Item label="Cấp độ chuyên môn" name="tag_id">
          <Select placeholder="Chọn cấp độ">
            <Select.Option value="1">Junior</Select.Option>
            <Select.Option value="2">Mid-level</Select.Option>
            <Select.Option value="3">Senior</Select.Option>
            <Select.Option value="4">Lead</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Mô tả công việc"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả công việc!" }]}
        >
          <TextArea 
            rows={6} 
            placeholder="Nhập mô tả chi tiết về công việc, yêu cầu, quyền lợi..."
            showCount
            maxLength={5000}
          />
        </Form.Item>

        <Form.Item className="mb-0 flex justify-end gap-2">
          <Button onClick={onCancel}>Hủy bỏ</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Thêm mới
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
