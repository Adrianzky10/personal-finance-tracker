type ResetPasswordTemplateOptions = {
  name: string;
  resetLink: string;
};

export const createResetPasswordEmailTemplate = ({
  name,
  resetLink,
}: ResetPasswordTemplateOptions) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .container {
      border: 1px solid #eee;
      border-radius: 8px;
      padding: 30px;
      background-color: #ffffff;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #0ea5e9;
      color: white !important;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
      margin: 20px 0;
    }
    .footer {
      margin-top: 40px;
      font-size: 14px;
      color: #666;
      text-align: center;
    }
  </style>
</head>
<body style="background-color: #f9fafb;">
  <div class="container">
    <div class="header">
      <h2 style="color: #0f172a; margin: 0;">Reset Your Password</h2>
    </div>
    
    <p>Hi ${name},</p>
    
    <p>We received a request to reset your password for your Personal Finance Tracker account. If you made this request, please click the button below to reset your password:</p>
    
    <div style="text-align: center;">
      <a href="${resetLink}" class="button">Reset Password</a>
    </div>
    
    <p style="margin-top: 20px;">If the button doesn't work, you can copy and paste this link into your browser:</p>
    <p style="word-break: break-all; color: #0ea5e9;">${resetLink}</p>
    
    <p>If you didn't request a password reset, you can safely ignore this email. Your password will not change.</p>
    
    <div class="footer">
      <p>This link will expire in 1 hour for your security.</p>
      <p>&copy; ${new Date().getFullYear()} Personal Finance Tracker. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
