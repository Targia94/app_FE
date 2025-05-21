import { Button, Form, Typography } from "antd";

import { useRouter } from "next/router";

export default function PasswordResettedForm() {
  const router = useRouter();
  const goToLogin = () => router.push("/");

  return (
    <Form name="password-resetted" layout="vertical" autoComplete="off">
      <Typography.Title level={4} className="font-bold text-center mt-0">
        Password cambiata!
      </Typography.Title>

      <Typography.Paragraph className="text-center">
        La tua password è stata aggiornata con successo.
      </Typography.Paragraph>

      <div className="text-center mt-4">
        <Button type="primary" className="px-8" onClick={goToLogin}>
          Accedi
        </Button>
      </div>
    </Form>
  );
}
