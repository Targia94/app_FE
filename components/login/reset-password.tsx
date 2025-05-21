import { Button, Form, Input, Typography } from "antd";
import { useState } from "react";

import { resetPasswordAPI } from "@/libs/api/methods/auth";
import { getErrorMessage } from "@/libs/api/utils/error";
import { useRouter } from "next/router";

type ResetPasswordFormType = {
  email?: string;
};

interface IResetPasswordProps {
  goToLogin: () => void;
  goToEmailSent: () => void;
}

export default function ResetPasswordForm({
  goToLogin,
  goToEmailSent,
}: IResetPasswordProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetPassword = async (values: ResetPasswordFormType) => {
    setLoading(true);

    try {
      const res = await resetPasswordAPI(values);

      if (res.response.status === "OK") {
        goToEmailSent();
      } else {
        setError("Errore nell'invio della email. Riprovare.");
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


      <Button type="link" onClick={goToLogin} className="p-0 mb-2">
        &lt; indietro
      </Button>

      <Typography.Title level={4} className="font-bold text-center mt-0">
        Reset Password
      </Typography.Title>

      <Typography.Paragraph className="text-center">
        Invieremo una email per fare il reset della tua password.
      </Typography.Paragraph>

      <Form.Item<ResetPasswordFormType>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Inserisci l'email" }]}
      >
        <Input autoCapitalize="none" disabled={loading} />
      </Form.Item>

      <Form.Item className="text-center mb-0 mt-2">
        <Button
          type="primary"
          htmlType="submit"
          className="px-8"
          loading={loading}
          disabled={loading}
        >
          Invia
        </Button>
      </Form.Item>

      {error && (
        <div className="w-full mb-4 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      )}

    </Form>
  );
}
