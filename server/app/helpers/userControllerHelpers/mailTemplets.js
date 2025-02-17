/**
 * HTML template for sending an OTP (One-Time Password) email for user login verification.
 * @constant {string} OTP_EMAIL_TEMPLATE - The HTML string containing the email template.
*/
export const OTP_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP for your LOGIN </title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">OTP for your LOGIN </h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signingIn ! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <p>Enter this code to login.</p>
    <p>This code will expire in 5 minutes for security reasons.</p>
    <p>If you didn't try to login, please ignore this email.</p>
    <p>Best regards,<br> DOCZY Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

/**
 * HTML template for sending a token to email for user verification
 * @constant {string} TOKEN_EMAIL_TEMPLATE - The HTML string containing the email template.
*/
export const TOKEN_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title> Verifying User </title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify your Account </h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signingUp ! Click the link to Verify Account:</p>
     <div style="text-align: center; margin-top: 30px;">
      <a href="{token}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; font-weight: bold; border-radius: 5px; margin-top: 10px; display: inline-block;">
        Click here to verify Account
      </a>
    </div>
    <p>Best regards,<br> DOCZY Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;


/**
 * HTML template for sending a Reset password link  to  user email 
 * @constant {string} FORGOT_PASSWORD_EMAIL_TEMPLATE - The HTML string containing the email template.
*/
export const FORGOT_PASSWORD_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title> Forgot Password </title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #2196F3, #1976D2); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Forgot Your Password?</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset the password for your account. If you did not request this, please ignore this email.</p>
    <p>If you want to reset your password, please click the button below to complete the process.</p>
    <div style="text-align: center; margin-top: 30px;">
      <a href="{token}" style="background-color: #2196F3; color: white; padding: 10px 20px; text-decoration: none; font-weight: bold; border-radius: 5px; margin-top: 10px; display: inline-block;">
        Reset Your Password
      </a>
    </div>
    <p>Best regards,<br> DOCZY Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;
