import { Button, Input, InputNumber, Modal, notification, Space, Table, TableColumnsType, Typography } from "antd";

import type { ProductDataDb } from "@/libs/api/types/product";
import { useMediaQuery } from "@/libs/hooks/useMediaQuery";
import type { UseModal } from "@/libs/hooks/useModal";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { pickUpItem } from "@/libs/api/methods/order";

interface IModalPickUpProps {
    modal: UseModal;
    productsData?: ProductDataDb;
    idOrdine?: number;
}

export default function ModalPickUp({
    modal,
    productsData,
}: IModalPickUpProps) {
    const { isOpen, cta } = modal;

    const isMobile = useMediaQuery("(max-width: 768px)");
    const [isSubmitLoading, setSubmitLoading] = useState(false);
    const [inputNumber, setInputNumber] = useState(0);
    const router = useRouter();
    const [systemNtf, contextHolder] = notification.useNotification({
        stack: { threshold: 3 },
      });

    const id = router.query.orderId;


    const handleSave = async () => {
        if(inputNumber==0){
            systemNtf.warning({
                message: "Attenzione",
                description: "Quantità non valida.",
                placement: "top",
              });
              return
        }
        try {
            setSubmitLoading(true);
            await pickUpItem({ id_ordine: id, codice: productsData?.codice, prelevata: inputNumber });
            setInputNumber(0);
            
        } catch (error) {
            console.error('Failed to pick up item.', error);
            // setSelectedRowKeys([]);
            // setselectedUsers([]);
        } finally {
            setSubmitLoading(false);
            cta.ok();
        }
    };

    const handleMinusClick = () => {
        setInputNumber(inputNumber - 1)
    };

    const handlePlusClick = () => {
        setInputNumber(inputNumber + 1)

    };

    return (
        <Modal
      maskClosable={false}
      closable={false}
            title={
                <div className="flex justify-between ">
                    <Typography.Title level={isMobile ? 3 : 3} className="m-0">
                        {productsData?.codice}
                    </Typography.Title>
                    <div className="mr-6 flex items-center gap-2">
                        <Button size={isMobile ? "small" : "middle"} onClick={cta.cancel}>Annulla</Button>
                        <Button
                            type="primary"
                            size={isMobile ? "small" : "middle"}
                            onClick={handleSave}
                            disabled={isSubmitLoading}
                            loading={isSubmitLoading}
                        >Preleva
                        </Button>
                    </div>
                </div>}
            centered
            width={isMobile ? 350 : 500}
            open={isOpen}
            onCancel={cta.cancel}
            onOk={cta.ok}
            footer={false}
            className="sm:[&_.ant-modal-content]:p-3"
        >
        {contextHolder}

            <Space direction="horizontal" style={{ marginBottom: 30 }} className="flex justify-between" >
                <div className="flex-col">
                    <Typography className="m-0 text-lg font-semibold">
                        Ubicazione:
                    </Typography>
                    <Input
                        readOnly
                        value={productsData?.ubicazione}
                        className="min-w-min "
                    />
                </div>
                <div className="flex-col">
                    <Typography className="m-0 text-lg font-semibold">
                        Quantità richiesta:
                    </Typography>
                    <Input
                        readOnly
                        value={productsData?.da_prelevare}
                        className="min-w-min text-center"
                    />
                </div>

            </Space>
            <div className="flex justify-center mt-5 ">
                <div >
                    <Typography className="m-0 text-lg font-semibold mb-2">
                        Quantità prelevata:
                    </Typography>
                    <Input
                        className="w-48 text-center"

                        value={inputNumber}
                        size="large"
                        min={0}
                        readOnly
                        addonBefore={<Button type="text" size="middle" icon={<MinusIcon width={20} color="balck" />} onClick={handleMinusClick} disabled={inputNumber == 0 && true} />}
                        addonAfter={<Button type="text" icon={<PlusIcon width={20} color="black" />} onClick={handlePlusClick} disabled={inputNumber>=(productsData?.da_prelevare? productsData?.da_prelevare: 0) && true} />}
                        max={Number(productsData?.da_prelevare)}
                    />
                </div>
            </div>
        </Modal>
    );
}
