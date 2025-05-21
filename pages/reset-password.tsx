import { Layout as AntdLayout, Card } from "antd";
import Image from "next/image";
import { useState } from "react";

import ResetPasswordForm from "@/components/reset-password";
import PasswordResettedForm from "@/components/reset-password/password-resetted";
import Head from "next/head";

enum State {
  RESET_PASSWORD,
  PASSWORD_RESETTED,
}

export default function ResetPasswordPage() {
  const [resetPswState, setResetPswState] = useState(State.RESET_PASSWORD);
  const goToPasswordResetted = () => setResetPswState(State.PASSWORD_RESETTED);

  return (
    <>
      <Head>
        <title>Montarreda | Reset Password</title>
      </Head>

      <AntdLayout>
        <div className="flex flex-col gap-2.5 items-center justify-center h-screen">
          <Card
            title={
              <Image
                src="/logo.png"
                alt="Montarreda"
                width={389}
                height={152}
                className="h-[50px] w-auto my-4 mx-auto block"
                priority
              />
            }
            bordered={false}
            className="relative w-[350px] overflow-hidden"
          >
            {resetPswState == State.RESET_PASSWORD && (
              <ResetPasswordForm goToPasswordResetted={goToPasswordResetted} />
            )}
            {resetPswState == State.PASSWORD_RESETTED && (
              <PasswordResettedForm />
            )}
          </Card>
        </div>
      </AntdLayout>
    </>
  );
}
