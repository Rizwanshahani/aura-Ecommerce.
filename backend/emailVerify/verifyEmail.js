import nodemailer from 'nodemailer'

export const verifyEmail = async (token, email) => {
    const SITE_URL = process.env.SITE_URL || 'https://aura-ecommerce-5c8m.vercel.app';

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    const verifyLink = `${SITE_URL}/verify/${token}`;

    const mailConfigurations = {
        from: `"Aura Store" <${process.env.MAIL_USER}>`,
        to: email,
        subject: '✅ Verify Your Aura Store Account',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px;">Aura Store</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">Premium Electronics</p>
            </div>
            <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h2 style="color: #333; margin-top: 0;">Verify Your Email Address</h2>
                <p style="color: #666; line-height: 1.6;">
                    Hi there! Thanks for registering at Aura Store.
                    Please click the button below to verify your email and activate your account.
                </p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${verifyLink}"
                       style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                              color: white; padding: 14px 32px; text-decoration: none;
                              border-radius: 6px; font-size: 16px; font-weight: bold; display: inline-block;">
                        ✅ Verify My Account
                    </a>
                </div>
                <p style="color: #999; font-size: 13px; text-align: center;">
                    This link expires in 10 minutes.<br/>
                    If you didn't register, ignore this email.
                </p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="color: #bbb; font-size: 12px; text-align: center;">
                    Or paste this link in your browser:<br/>
                    <a href="${verifyLink}" style="color: #667eea; word-break: break-all;">${verifyLink}</a>
                </p>
            </div>
        </div>`
    };

    // Use Promise so Vercel waits for email to send before returning response
    await transporter.sendMail(mailConfigurations);
    console.log('✅ Verification email sent to:', email);
};