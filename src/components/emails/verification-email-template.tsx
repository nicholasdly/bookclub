export function VerificationEmailText({ code }: { code: string }) {
  return `Veriification code — Enter the following verification code when prompted to finsh creating your account: ${code}. This code will expire in 15 minutes.`;
}

export function VerificationEmailTemplate({ code }: { code: string }) {
  return (
    <div>
      <h1>Verification code</h1>
      <p>
        Enter the following verification code when prompted to finish creating
        your account:
      </p>
      <p>
        <b>{code}</b>
      </p>
      <p>This code will expire in 15 minutes.</p>
    </div>
  );
}
