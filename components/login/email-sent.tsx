import { Form, Typography } from "antd";

export default function EmailSentForm() {
  return (
    <Form name="email-sent" layout="vertical" autoComplete="off">
      <Typography.Title level={4} className="font-bold text-center mt-0">
        Email inviata
      </Typography.Title>

      <Typography.Paragraph className="text-center">
        Riceverai a breve via email le istruzioni per reimpostare la password.
      </Typography.Paragraph>
    </Form>
  );
}
