import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

interface ModalConfirmDeleteJobProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  jobTitle?: string;
}

export const ModalConfirmDeleteJob = ({ open, onConfirm, onCancel, jobTitle }: ModalConfirmDeleteJobProps) => {
  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <ExclamationCircleOutlined className="text-red-500 text-xl" />
          <span>Bạn có chắc chắn xóa công việc này?</span>
        </div>
      }
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Xác nhận"
      cancelText="Hủy bỏ"
      okButtonProps={{ danger: true }}
    >
      <p className="py-4">
        {jobTitle ? (
          <>
            Công việc <strong>"{jobTitle}"</strong> sẽ bị xóa vĩnh viễn và không thể khôi phục.
          </>
        ) : (
          "Công việc này sẽ bị xóa vĩnh viễn và không thể khôi phục."
        )}
      </p>
    </Modal>
  );
};
