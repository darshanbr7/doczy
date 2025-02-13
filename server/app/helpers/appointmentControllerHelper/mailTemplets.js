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
