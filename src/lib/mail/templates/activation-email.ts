type ActivationEmailTemplateProps = {
  name: string;
  activationLink: string;
};

export function createActivationEmailTemplate({
  name,
  activationLink,
}: ActivationEmailTemplateProps): string {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Verify Your Email</title>
</head>

<body style="margin:0;padding:40px;background:#f5f5f5;font-family:Arial,sans-serif;">

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="max-width:600px;margin:auto;background:white;border-radius:12px;padding:40px;"
>

<tr>
<td>

<h1 style="color:#111827;">
Hello, ${name} 👋
</h1>

<p style="color:#4b5563;font-size:16px;line-height:1.6;">
Thank you for registering your Personal Finance Tracker account.
Please verify your email address by clicking the button below.
</p>

<p style="margin:40px 0;">
<a
href="${activationLink}"
style="
display:inline-block;
padding:14px 28px;
background:#2563eb;
color:white;
text-decoration:none;
border-radius:8px;
font-weight:600;
"
>
Verify Email
</a>
</p>

<p style="color:#6b7280;font-size:14px;">
If the button doesn't work, copy this link into your browser:
</p>

<p>
<a href="${activationLink}">
${activationLink}
</a>
</p>

<hr style="margin:40px 0;border:none;border-top:1px solid #e5e7eb;" />

<p style="font-size:13px;color:#9ca3af;">
This email was sent automatically by Personal Finance Tracker.
</p>

</td>
</tr>

</table>

</body>
</html>
`;
}
