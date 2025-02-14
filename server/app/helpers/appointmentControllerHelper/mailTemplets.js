/**
 * HTML template for sending an email for Appointment booking confrmation.
 * @constant {string} APPOINTMENT_CONFIRMATION_TEMPLATE - The HTML string containing the email template.
*/
export const APPOINTMENT_CONFIRMATION_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Appointment Confirmation</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello <strong> {customerName} </strong>,</p>
    <p>Thank you for booking your appointment. Below are the details of your scheduled appointment:</p>
    
    <div style="margin: 20px 0;">
      <p><strong>Appointment Date:</strong> {appointmentDate}</p>
      <p><strong>Appointment Time:</strong> {appointmentTime}</p>
    </div>

    <p>If you need to reschedule or cancel your appointment, please contact us at least 12 hours in advance.</p>

    <div style="text-align: center; margin-top: 30px;">
      <p>We look forward to seeing you!</p>
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
 * HTML template for sending an email for Appointment cancellation confrmation.
 * @constant {string} APPOINTMENT_CANCELLATION_TEMPLATE - The HTML string containing the email template.
*/
export const APPOINTMENT_CANCELLATION_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Cancellation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #FF6347, #FF4500); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Appointment Cancellation</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello <strong> {customerName} </strong>,</p>
    <p>We regret to inform you that your appointment scheduled on <strong>{appointmentDate}</strong> at <strong>{appointmentTime}</strong> has been cancelled.</p>
    
    <p>If this cancellation was made in error, or if you would like to reschedule, please contact us as soon as possible.</p>

    <p>If you have any questions or concerns, feel free to reach out to us. We are here to assist you!</p>

    <div style="text-align: center; margin-top: 30px;">
      <p>We apologize for any inconvenience this may have caused.</p>
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
 * HTML template for sending an email for Appointment Reminder confrmation.
 * @constant {string} REMINDER_EMAIL_TEMPLATE - The HTML string containing the email template.
*/
export const REMINDER_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Reminder</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Appointment Reminder</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello <strong> {customerName} </strong>,</p>
    <p>This is a reminder for your appointment with <strong>{doctorName}</strong>:</p>
    
    <div style="margin: 20px 0;">
      <p><strong>Appointment Date:</strong> {appointmentDate}</p>
      <p><strong>Appointment Time:</strong> {appointmentTime}</p>
    </div>

    <p>Please make sure to arrive on time. If you need to reschedule or cancel, kindly let us know in advance.</p>

    <div style="text-align: center; margin-top: 30px;">
      <p>We look forward to seeing you!</p>
    </div>

    <p>Best regards,<br> DOCZY Team</p>
  </div>
  
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

