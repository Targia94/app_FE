import { Button, Form, Input, Typography } from "antd";
import { useState } from "react";

import { resetPasswordUsingTokenAPI } from "@/libs/api/methods/auth";
import { getErrorMessage } from "@/libs/api/utils/error";
import { useRouter } from "next/router";

type ResetPasswordFormType = {
  newPassword?: string;
  confirmPassword?: string;
};

interface IResetPasswordFormProps {
  goToPasswordResetted: () => void;
}

export default function ResetPasswordForm({
  goToPasswordResetted,
}: IResetPasswordFormProps) {
  const router = useRouter();
  const token = router.query.token as string;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetPassword = async (values: ResetPasswordFormType) => {
    setLoading(true);

    try {
      if (!token) {
        setError("Il token è mancante.");
        return;
      }

      if (values.newPassword !== values.confirmPassword) {
        setError("Le password non coincidono.");
        return;
      }

      const res = await resetPasswordUsingTokenAPI({
        token,
        newPassword: values.newPassword,
      });

      if (res.response.status === "OK") {
        goToPasswordResetted();
      } else {
        setError("Errore nel cambio password. Riprovare.");
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form<ResetPasswordFormType>
      name="reset-password"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={resetPassword}
      onFieldsChange={() => setError("")}
      autoComplete="off"
    >
      <Typography.Title level={4} className="font-bold text-center mt-0">
        Cambia la password
      </Typography.Title>

      <Typography.Paragraph className="text-center">
        Inserisci la nuova password qui sotto.
      </Typography.Paragraph>

      <Form.Item<ResetPasswordFormType>
        label="Nuova password"
        name="newPassword"
        rules={[
          { required: true, message: "Inserisci la nuova password" },
          {
            validator: (_, value) =>
              !value || value.length >= 8 ? Promise.resolve() : Promise.reject({
                message: "Deve contenere almeno 8 caratteri."
              }),
          },
          {
            validator: (_, value) =>
              !value || /[A-Z]/.test(value) ? Promise.resolve() : Promise.reject({
                message: "Deve includere almeno una lettera maiuscola (A-Z)."
              }),
          },
          {
            validator: (_, value) =>
              !value || /[a-z]/.test(value) ? Promise.resolve() : Promise.reject({
                message: "Deve includere almeno una lettera minuscola (a-z)."
              }),
          },
          {
            validator: (_, value) =>
              !value || /[0-9]/.test(value) ? Promise.resolve() : Promise.reject({
                message: "Deve includere almeno un numero (0-9)."
              }),
          },
          {
            validator: (_, value) =>
              !value || /[!@#$%^&*(),.?":{}|<>]/.test(value) ? Promise.resolve() : Promise.reject({
                message: "Deve includere almeno un carattere speciale."
              }),
          },
        ]}
      >
        <Input.Password disabled={loading} />
      </Form.Item>

      <Form.Item<ResetPasswordFormType>
        label="Conferma password"
        name="confirmPassword"
        rules={[
          { required: true, message: "Inserisci la password di conferma" },
        ]}
      >
        <Input.Password disabled={loading} />
      </Form.Item>

      <Form.Item className="text-center mb-0 mt-2">
        <Button
          type="primary"
          htmlType="submit"
          className="px-8"
          loading={loading}
          disabled={loading}
        >
          Cambia
        </Button>
      </Form.Item>
      <Typography.Paragraph className="my-5 opacity-60">
        La password deve soddisfare i seguenti criteri:
        <ul>
          <li>Deve contenere almeno 8 caratteri.</li>
          <li>Deve includere almeno una lettera maiuscola (A-Z).</li>
          <li>Deve includere almeno una lettera minuscola (a-z).</li>
          <li>Deve includere almeno un numero (0-9).</li>
          <li>Deve includere almeno un carattere speciale.</li>
        </ul>
      </Typography.Paragraph>

      {error && (
        <div className="w-full mb-4 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      )}

    </Form>
  );
}
