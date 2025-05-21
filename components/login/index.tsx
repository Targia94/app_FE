import { Button, Form, Input } from "antd";
import { useState } from "react";

import { logInAPI } from "@/libs/api/methods/auth";
import { getErrorMessage } from "@/libs/api/utils/error";
import { useRouter } from "next/router";

type LoginFormType = {
  email?: string;
  password?: string;
};

interface ILoginFormProps {
  goToResetPsw: () => void;
}

export default function LoginForm({ goToResetPsw }: ILoginFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (values: LoginFormType) => {
    setLoading(true);

    try {
      const res = await logInAPI(values);

      if (res.status === "OK") {
        router.push("/dashboard");
      } else if (
        res.status === "WRONG_CREDENTIALS_ERROR" ||
        res.status === "FIELD_ERROR"
      ) {
        setError("Credenziali errate. Riprovare.");
      } else if (res.status === "SIGN_IN_NOT_ALLOWED") {
        setError("Accesso non consentito.");
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form<LoginFormType>
      name="login"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={login}
      onFieldsChange={() => setError("")}
      autoComplete="off"
    >


      <Form.Item<LoginFormType>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Inserisci l'email" }]}
      >
        <Input autoCapitalize="none" disabled={loading} />
      </Form.Item>

      <Form.Item<LoginFormType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Inserisci la password" }]}
      >
        <Input.Password disabled={loading} />
      </Form.Item>

      <Form.Item className="text-right mb-4">
        <Button
          type="link"
          className="p-0"
          disabled={loading}
          onClick={goToResetPsw}
        >
          Password dimenticata?
        </Button>
      </Form.Item>

      <Form.Item className="text-center mb-0 mt-2">
        <Button
          type="primary"
          htmlType="submit"
          className="px-8"
          loading={loading}
          disabled={loading}
        >
          Accedi
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
