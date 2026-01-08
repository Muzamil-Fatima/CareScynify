export const verificationEmail = (name, verifyUrl) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5; text-align: center; padding: 20px;">
      
      <h1 
        style="
          font-size: 32px; 
          font-weight: 800; 
          background: linear-gradient(to right, #6366f1, #a855f7, #ec4899); 
          -webkit-background-clip: text; 
          -webkit-text-fill-color: transparent; 
          margin-bottom: 20px;
        ">
        TecHub
      </h1>

      <p style="font-size: 16px;">Hello <strong>${name}</strong>,</p>

      <p style="font-size: 16px; margin-bottom: 30px;">
        Thank you for signing up at <strong>TecHub</strong>!  
        Please verify your email address to activate your account.
      </p>

      <a 
        href="${verifyUrl}" 
        style="
          display: inline-block;
          padding: 14px 28px;
          font-size: 18px;
          font-weight: bold;
          color: #fff;
          background-color: #6366f1;
          border-radius: 8px;
          text-decoration: none;
          margin-bottom: 30px;
        ">
        Verify Email
      </a>

      <p style="font-size: 14px; color: #666; margin-top: 20px;">
        This verification link will expire in <strong>15 minutes</strong>.
      </p>

      <p style="font-size: 14px; color: #666;">
        If you did not create an account, you can safely ignore this email.
      </p>

      <br />

      <p style="font-size: 14px; color: #999;">
<<<<<<< HEAD
        Sent with ❤️ by Muzamil
=======
        Sent with ❤️ by Muzamil-Fatima
>>>>>>> cc65fcec34579783f7610b01d8b0e755330a2a56
      </p>

    </div>
  `;
};
export const forgotPasswordEmail = (name, otp) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5; text-align: center; padding: 20px;">
      <h1 
        style="
          font-size: 32px; 
          font-weight: 800; 
          background: linear-gradient(to right, #6366f1, #a855f7, #ec4899); 
          -webkit-background-clip: text; 
          -webkit-text-fill-color: transparent; 
          margin-bottom: 20px;
        ">
        TecHub
      </h1>
      
      <p style="font-size: 16px;">Hello <strong>${name}</strong>,</p>
      <p style="font-size: 16px; margin-bottom: 30px;">
        Your password reset OTP is:
      </p>
      
      <h2 style="font-size: 28px; color: #6366f1; margin-bottom: 30px;">
        ${otp}
      </h2>
      
      <p style="font-size: 14px; color: #666;">
        If you did not request a password reset, please ignore this email.
      </p>
      <p style="font-size: 14px; color: #666;">
        This OTP will expire in 15 minutes.
      </p>

      <br />
      <p style="font-size: 14px; color: #999;">
<<<<<<< HEAD
        Sent with ❤️ by Muzamil
=======
        Sent with ❤️ by Muzamil-Fatima
>>>>>>> cc65fcec34579783f7610b01d8b0e755330a2a56
      </p>
    </div>
  `;
};
