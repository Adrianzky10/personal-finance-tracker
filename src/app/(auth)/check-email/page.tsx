import CheckEmail from "@/components/auth/CheckEmail";

type TMode = "registered" | "expired";

type CheckEmailPageProps = {
  searchParams: Promise<{
    email?: string;
    mode?: TMode;
  }>;
};

export default async function CheckEmailPage({
  searchParams,
}: CheckEmailPageProps) {
  const { email, mode } = await searchParams;

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateRequestParam =
    !!email &&
    validateEmail(email) &&
    !!mode &&
    (mode === "registered" || mode === "expired");

  if (!validateRequestParam) {
    return (
      <CheckEmail
        email={email ?? "Email not found"}
        mode={mode ?? "Mode not found"}
        error="Invalid activation link."
      />
    );
  }

  return <CheckEmail email={email} mode={mode} />;
}
