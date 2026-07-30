import nodemailer from 'nodemailer'

export const sendOTPMail = async (otp, email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    const mailConfigurations = {
        from: `"Aura Store" <${process.env.MAIL_USER}>`,
        to: email,
        subject: '🔐 Your Password Reset OTP - Aura Store',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px;">Aura Store</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">Premium Electronics</p>
            </div>
            <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h2 style="color: #333; margin-top: 0;">Password Reset OTP</h2>
                <p style="color: #666; line-height: 1.6;">
                    You requested a password reset for your Aura Store account. 
                    Use the OTP below to reset your password:
                </p>
                <div style="text-align: center; margin: 30px 0;">
                    <div style="background: #f0f0f0; border: 2px dashed #667eea; border-radius: 10px; padding: 20px; display: inline-block;">
                        <span style="font-size: 36px; font-weight: bold; color: #667eea; letter-spacing: 8px;">${otp}</span>
                    </div>
                </div>
                <p style="color: #999; font-size: 13px; text-align: center;">
                    This OTP expires in 10 minutes.<br/>
                    If you didn't request this, ignore this email.
                </p>
            </div>
        </div>`
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailConfigurations, (error, info) => {
            if (error) {
                console.error('❌ OTP email failed:', error.message);
                reject(error);
            } else {
                console.log('✅ OTP email sent to:', email);
                resolve(info);
            }
        });
    });
};