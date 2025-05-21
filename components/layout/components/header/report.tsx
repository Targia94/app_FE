
import ModalNewReport from "@/components/segnlazioni/new";
import { sendReport } from "@/libs/api/methods/report";
import { Report } from "@/libs/api/types/report";
import { getErrorMessage } from "@/libs/api/utils/error";
import { useModal } from "@/libs/hooks/useModal";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Avatar, Button, Form, notification, Typography } from "antd";

export default function ReportButton() {
    const [ntf, contextHolder] = notification.useNotification({
        stack: { threshold: 3 },
      });
    const [newForm] = Form.useForm();


    const modalOpen = useModal({
        handleOk: async (values: Report)=> {
          try {
            await sendReport(values);
            newForm.resetFields();
            modalOpen.hide();
            ntf.success({
              message: "Segnalazione",
              description: "Email inviata all' admin!",
              placement: "bottom",
            });
          } catch (err) {
            ntf.error({
              message: "Segnalazione",
              description: getErrorMessage(err),
              placement: "bottom",
            });
          }
        },
        handleCancel: () => modalOpen.hide(),
      });

    return (
        <>
            {contextHolder}
            <Button ghost={true} type="primary"  className="flex gap-2 items-center h-10 border-white-25" onClick={modalOpen.show} >
                <Avatar size="small" className="bg-white-25 flex items-center content-center" icon={<EnvelopeIcon width={18} color="white" />} >
                </Avatar>
                <Typography.Text className="text-white m-0 "> Apri segnalazione</Typography.Text>
                
            </Button>
            <ModalNewReport modal={modalOpen} form={newForm} />
        </>
    );
}
