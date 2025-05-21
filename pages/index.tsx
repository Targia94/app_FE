import { Alert, Layout as AntdLayout, Card } from "antd";
import Image from "next/image";
import { useState } from "react";

import LoginForm from "@/components/login";
import EmailSentForm from "@/components/login/email-sent";
import ResetPasswordForm from "@/components/login/reset-password";
import Head from "next/head";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

enum State {
  LOGIN,
  RESET_PASSWORD,
  EMAIL_SENT,
}

export default function HomePage() {
  const [loginState, setLoginState] = useState(State.LOGIN);
  const goToEmailSent = () => setLoginState(State.EMAIL_SENT);
  const goToResetPsw = () => setLoginState(State.RESET_PASSWORD);
  const goToLogin = () => setLoginState(State.LOGIN);

  return (
    <>
      <Head>
        <title>Montarreda | Login</title>
      </Head>
      {process.env.NEXT_PUBLIC_DEV_ENV == 'development' && (
        <Alert
          className="flex text-center text-red-700 text-xl justify-center"
          message={
            <div className="flex justify-center items-center gap-2">
              <ExclamationTriangleIcon width={36} />
              <b>AMBIENTE DI TEST</b>
            </div>
          }
          type="error"
        />
      )}

      <AntdLayout>
        <div className="flex flex-col gap-2.5 items-center justify-center h-screen">
          <Card
            title={
              <Image
                src="/logo.png"
                alt="Montarreda"
                width={500}
                height={200}
                className="h-[50px] w-auto my-4 mx-auto block"
                priority
              />
            }
            bordered={false}
            className="relative w-[350px] overflow-hidden"
          >
            {loginState == State.LOGIN && (
              <LoginForm goToResetPsw={goToResetPsw} />
            )}
            {loginState == State.RESET_PASSWORD && (
              <ResetPasswordForm
                goToLogin={goToLogin}
                goToEmailSent={goToEmailSent}
              />
            )}
            {loginState == State.EMAIL_SENT && <EmailSentForm />}
          </Card>
        </div>
      </AntdLayout>
    </>
  );
}
