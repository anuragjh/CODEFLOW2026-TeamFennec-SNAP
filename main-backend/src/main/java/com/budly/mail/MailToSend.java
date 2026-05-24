package com.budly.mail;

public class MailToSend {

    private static final String BRAND_COLOR = "#d6c3a5";
    private static final String BACKGROUND = "#050505";
    private static final String CARD = "#111111";
    private static final String TEXT = "#e8dfd1";
    private static final String MUTED = "#9f9484";

public static String purchaseSuccessBody(
        String userName,
        String userEmail,
        String deviceCode,
        String invoiceId,
        String generatedPassword
) {

    return """
        <div style="font-family:'Segoe UI',Arial,sans-serif;
                    background:#050505;
                    padding:40px;">

            <div style="max-width:650px;
                        margin:0 auto;
                        background:#111111;
                        border-radius:18px;
                        overflow:hidden;
                        border:1px solid #1d1d1d;
                        box-shadow:0 10px 40px rgba(0,0,0,0.45);">

                <div style="padding:35px;">

                    <h1 style="color:#d6c3a5;
                               letter-spacing:8px;
                               font-size:28px;
                               margin-bottom:35px;">
                        BUDLY
                    </h1>

                    <h2 style="color:#e8dfd1;
                               font-size:28px;
                               margin-bottom:12px;">
                        Purchase Successful
                    </h2>

                    <p style="color:#d7cdc0;
                              line-height:1.8;
                              font-size:15px;">

                        Hello %s,
                        your Budly device purchase has been successfully confirmed.

                        <br><br>

                        Your intelligent monitoring system is now being prepared
                        and securely linked to your Budly account.
                    </p>

                    <div style="background:#0c0c0c;
                                border-left:4px solid #d6c3a5;
                                padding:18px;
                                margin:28px 0;
                                border-radius:12px;">

                        <p style="margin:0;
                                  color:#e8dfd1;
                                  line-height:1.8;">

                            <b>Device Code:</b> %s
                            <br>

                            <b>Invoice ID:</b> %s
                            <br>

                            <b>Status:</b>

                            <span style="color:#7CFC98;">
                                Payment Verified
                            </span>
                        </p>
                    </div>

                    <h3 style="color:#d6c3a5;
                               margin-bottom:15px;">
                        Your Account
                    </h3>

                    <div style="background:#171717;
                                border:1px solid #2a2a2a;
                                padding:22px;
                                border-radius:12px;
                                margin-bottom:30px;">

                        <p style="color:#d7cdc0;
                                  line-height:2;
                                  margin:0;">

                            <b>Email:</b> %s
                            <br>

                            <b>Temporary Password:</b>

                            <span style="color:#7CFC98;
                                         font-weight:700;
                                         letter-spacing:1px;">
                                %s
                            </span>

                            <br><br>

                            A secure account has been automatically created
                            for your device access and industrial monitoring dashboard.

                            <br><br>

                            For security reasons,
                            we strongly recommend changing your password
                            after your first login.
                        </p>
                    </div>

                    <h3 style="color:#d6c3a5;
                               margin-bottom:15px;">
                        What Happens Next
                    </h3>

                    <ul style="color:#d7cdc0;
                               line-height:2;">

                        <li>Your device will be activated and configured</li>

                        <li>You can access the Budly dashboard immediately</li>

                        <li>AI-powered monitoring and analytics will become available after setup</li>
                    </ul>

                    <div style="margin-top:35px;">

                        <a href="https://budly.tech"
                           style="background:#d6c3a5;
                                  color:black;
                                  padding:14px 24px;
                                  text-decoration:none;
                                  border-radius:10px;
                                  font-weight:600;">
                            Open Budly
                        </a>
                    </div>

                    <div style="margin-top:35px;
                                padding:18px;
                                background:#0c0c0c;
                                border-radius:12px;">

                        <p style="margin:0;
                                  color:#9f9484;
                                  line-height:1.8;">

                            Your invoice PDF has been attached
                            to this email for your records.
                        </p>
                    </div>

                    <hr style="border:none;
                               border-top:1px solid #222;
                               margin:40px 0;">

                    <p style="color:#9f9484;
                              line-height:1.8;
                              font-size:14px;">

                        Need assistance?

                        <br><br>

                        Contact:
                        <a href="mailto:support@budly.tech"
                           style="color:#d6c3a5;
                                  text-decoration:none;">
                            support@budly.tech
                        </a>
                    </p>

                    <p style="margin-top:30px;
                              color:#777;
                              font-size:12px;
                              line-height:1.8;
                              text-align:center;">

                        BUDLY
                        <br>
                        Intelligent Industrial Monitoring
                    </p>

                </div>
            </div>
        </div>
    """.formatted(
            userName,
            deviceCode,
            invoiceId,
            userEmail,
            generatedPassword != null
                    ? generatedPassword
                    : "Use your existing password"
    );
}

    public static String welcomeBody(
            String userName,
            String deviceCode
    ) {

        return """
            <div style="font-family:'Segoe UI',Arial,sans-serif;
                        background:#050505;
                        padding:40px;">

                <div style="max-width:650px;
                            margin:0 auto;
                            background:#111111;
                            border-radius:18px;
                            border:1px solid #1d1d1d;
                            overflow:hidden;">

                    <div style="padding:35px;">

                        <h1 style="color:#d6c3a5;
                                   letter-spacing:8px;
                                   margin-bottom:35px;">
                            BUDLY
                        </h1>

                        <h2 style="color:#e8dfd1;">
                            Welcome to Budly
                        </h2>

                        <p style="color:#b8aea0;
                                  line-height:1.8;">
                            Hello %s,
                            your account has been successfully created
                            and your industrial monitoring device
                            is now linked to your account.
                        </p>

                        <div style="background:#0c0c0c;
                                    border-left:4px solid #d6c3a5;
                                    padding:18px;
                                    border-radius:12px;
                                    margin:28px 0;">

                            <p style="margin:0;
                                      color:#e8dfd1;">
                                <b>Device Code:</b> %s
                            </p>
                        </div>

                        <ul style="color:#b8aea0;
                                   line-height:2;">
                            <li>Access your monitoring dashboard</li>
                            <li>Track device intelligence and anomalies</li>
                            <li>Receive alerts and operational insights</li>
                        </ul>

                        <div style="margin-top:35px;">

                            <a href="https://budly.tech"
                               style="background:#d6c3a5;
                                      color:black;
                                      padding:14px 24px;
                                      text-decoration:none;
                                      border-radius:10px;
                                      font-weight:600;">
                                Launch Dashboard
                            </a>
                        </div>

                        <hr style="border:none;
                                   border-top:1px solid #222;
                                   margin:40px 0;">

                        <p style="color:#9f9484;
                                  font-size:14px;
                                  line-height:1.8;">

                            Support:
                            <a href="mailto:support@budly.tech"
                               style="color:#d6c3a5;
                                      text-decoration:none;">
                                support@budly.tech
                            </a>
                        </p>

                        <p style="margin-top:30px;
                                  color:#7a7165;
                                  text-align:center;
                                  font-size:12px;">
                            BUDLY
                            <br>
                            Industrial Intelligence Platform
                        </p>

                    </div>
                </div>
            </div>
        """.formatted(userName, deviceCode);
    }

    public static String suspiciousLoginBody(
            String userName
    ) {

        return """
            <div style="font-family:'Segoe UI',Arial,sans-serif;
                        background:#050505;
                        padding:40px;">

                <div style="max-width:650px;
                            margin:0 auto;
                            background:#111111;
                            border-radius:18px;
                            border:1px solid #1d1d1d;">

                    <div style="padding:35px;">

                        <h1 style="color:#d6c3a5;
                                   letter-spacing:8px;">
                            BUDLY
                        </h1>

                        <h2 style="color:#ff8f8f;
                                   margin-top:30px;">
                            Security Alert
                        </h2>

                        <p style="color:#d7cdc0;
                                  line-height:1.8;">
                            Hello %s,
                            we detected a new login to your Budly account.
                            If this was you, no action is required.
                        </p>

                        <div style="background:#170d0d;
                                    border-left:4px solid #ff8f8f;
                                    padding:18px;
                                    border-radius:12px;
                                    margin:28px 0;">

                            <p style="margin:0;
                                      color:#f0dada;">
                                If this activity was not authorized,
                                reset your password immediately.
                            </p>
                        </div>

                        <a href="https://budly.tech/reset-password"
                           style="background:#ff8f8f;
                                  color:black;
                                  padding:14px 24px;
                                  text-decoration:none;
                                  border-radius:10px;
                                  font-weight:600;">
                            Secure Account
                        </a>

                        <hr style="border:none;
                                   border-top:1px solid #222;
                                   margin:40px 0;">

                        <p style="color:#9f9484;
                                  font-size:14px;">
                            support@budly.tech
                        </p>

                    </div>
                </div>
            </div>
        """.formatted(userName);
    }

    public static String resetPasswordBody(
            String userName,
            String resetCode
    ) {

        String resetLink =
                "https://budly.tech/reset-password?code=" + resetCode;

        return """
            <div style="font-family:'Segoe UI',Arial,sans-serif;
                        background:#050505;
                        padding:40px;">

                <div style="max-width:650px;
                            margin:0 auto;
                            background:#111111;
                            border-radius:18px;
                            border:1px solid #1d1d1d;">

                    <div style="padding:35px;">

                        <h1 style="color:#d6c3a5;
                                   letter-spacing:8px;">
                            BUDLY
                        </h1>

                        <h2 style="color:#e8dfd1;
                                   margin-top:30px;">
                            Reset Password
                        </h2>

                        <p style="color:#b8aea0;
                                  line-height:1.8;">
                            Hello %s,
                            we received a request to reset your password.
                        </p>

                        <div style="margin-top:35px;">

                            <a href="%s"
                               style="background:#d6c3a5;
                                      color:black;
                                      padding:14px 24px;
                                      text-decoration:none;
                                      border-radius:10px;
                                      font-weight:600;">
                                Reset Password
                            </a>
                        </div>

                        <p style="margin-top:30px;
                                  color:#8b8175;
                                  font-size:13px;
                                  line-height:1.8;">
                            This link expires in 10 minutes.
                            If you did not request this,
                            you may safely ignore this email.
                        </p>

                        <hr style="border:none;
                                   border-top:1px solid #222;
                                   margin:40px 0;">

                        <p style="color:#9f9484;
                                  font-size:14px;">
                            support@budly.tech
                        </p>

                    </div>
                </div>
            </div>
        """.formatted(userName, resetLink);
    }
}
