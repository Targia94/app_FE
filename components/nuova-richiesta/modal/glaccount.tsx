import {
    Divider,
    Input,
    Modal,
    Radio,
    Table,
    Typography,
    type TableColumnsType,
} from "antd";

import {
    formatPagination,
    useQueryWithPagination,
} from "@/libs/api/hooks/useQueryWithPagination";
import { DEFAULT_STALE_TIME } from "@/libs/api/utils/constants";

import type { IModalProps } from "@/libs/hooks/useModal";

import { getCentersCost } from "@/libs/api/methods/costCenter";
import { CentriCosto } from "@/libs/api/types/costCenter";
import { useMediaQuery } from "@/libs/hooks/useMediaQuery";
import { debounce } from "@/libs/utils/optimization";
import { useEffect, useMemo, useState } from "react";
import GrantPermission from "@/components/auth/grant-permission";
import { useSession } from "@/libs/hooks/useSession";
import { columnsGLAccount } from "@/components/gl-account/column";
import { columnsModalGLAccount } from "@/components/gl-account/column/modal.column";
import { getGlAccounts } from "@/libs/api/methods/gl-account";
import { useDebounce } from "@/libs/hooks/useDebounce";
import { GLAccount } from "@/libs/api/types/gl-account";



export default function ListGlAccount({ modal }: IModalProps) {
    const { isOpen, cta } = modal;

    const { data: user } = useSession();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<GLAccount[]>([]);
    const isMobile = useMediaQuery("(max-width: 768px)");

    

    /**
     * Debounce
     */
    const [glAccountSearchTerm, setGlAccountSearchTerm, debouncedGlAccountSearchTerm] = useDebounce("");

    /**
     * Retrieve Location data
     */

    const onSelectChange = (
        newSelectedRowKeys: React.Key[],
        newSelectedProducts: GLAccount[]
    ) => {
        setSelectedRowKeys(newSelectedRowKeys);
        setSelectedProducts(newSelectedProducts);
        cta.ok(newSelectedProducts);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };


    const { status: statusglAccount, data: glAccount, pagination } = useQueryWithPagination({
        queryKey: ["gl-account-new-request", debouncedGlAccountSearchTerm],
        queryFn: getGlAccounts,
        queryFnParams: {
            filters: [
                ...(debouncedGlAccountSearchTerm ? [{ key: "descrizione", value: debouncedGlAccountSearchTerm }] : [])
            ],
        },
        staleTime: DEFAULT_STALE_TIME,
        avoidPrefetch: true
    });

    const columns = columnsModalGLAccount

    return (
        <Modal
            open={isOpen}
            centered
            onCancel={cta.cancel}
            footer={[]}
            className="sm:[&_.ant-modal-content]:p-3"
            width={700}
        >
            <div className="flex gap-2 justify-between items-center mb-5">
                <Typography.Title level={3} className="m-0">
                    GL
                </Typography.Title>
            </div>

            <Divider />

            <div className="flex gap-2 justify-end mb-4">
                <Input
                    addonBefore={'GL'}
                    placeholder={'Ricerca il GL'}
                    allowClear
                    size={!isMobile ? 'large' : 'middle'}
                    onChange={(e) => setGlAccountSearchTerm(e.target.value)}
                    value={glAccountSearchTerm}
                />
            </div>
            <Table
                rowSelection={{ type: "radio", ...rowSelection }}
                loading={statusglAccount == 'pending'}
                columns={columns}
                onRow={(record) => ({
                    onClick: () => {
                        const selectedRowKeys = [record.id];
                        const selectedProducts = [record];
                        onSelectChange(selectedRowKeys, selectedProducts);
                    },
                })}
                rowKey={(data) => data.id}
                dataSource={glAccount}
                scroll={{ y: isMobile ? "30vh" : "45vh" }}
                pagination={formatPagination(pagination)}
            />

            {/* <Table
          columns={columns}
          rowSelection={{ type: "radio", ...rowSelection }}
          onRow={(record) => ({
            onClick: () => {
              const selectedRowKeys = [record.id];
              const selectedProducts = [record];
              onSelectChange(selectedRowKeys, selectedProducts);
            },
          })}
          rowKey={(record) => record.id}
          dataSource={data}
          loading={status == "pending"}
          pagination={formatPagination(pagination)}
          scroll={{ y: isMobile ? "30vh" : "45vh" }}
        /> */}
        </Modal>
    );
}
