import { FormInstance } from "antd";
import { useState } from "react";

/**
 * Types
 */

type ModalHandlers = {
  handleOk: (...args: any[]) => Promise<void> | void;
  handleCancel: (...args: any[]) => Promise<void> | void;
};

type ModalOptions = {}

/**
 * Hook
 */

export const useModal = (handlers: ModalHandlers, options?: ModalOptions) => {
  const [isOpen, setIsOpen] = useState(false);
  const show = () => setIsOpen(true);
  const hide = () => setIsOpen(false);

  return {
    isOpen,
    show,
    hide,
    cta: {
      ok: handlers.handleOk,
      cancel: handlers.handleCancel
    },
  };
};

/**
 * Return type
 */

export type UseModal = ReturnType<typeof useModal>;

/**
 * Component interface
 */

export interface IModalProps {
  modal: UseModal;
  form?: FormInstance<any>;

}
