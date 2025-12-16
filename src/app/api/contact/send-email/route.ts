import { NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Initialize SES Client
// Note: We explicitly use the environment variables provided by the user.
const sesClient = new SESClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY || "",
        secretAccessKey: process.env.AWS_SECRET_KEY || "",
    },
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, companyName, country, comments } = body;

        // Server-side validation
        if (!name || !email || !companyName || !country || !comments) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        const salesTeamEmail = process.env.SALES_TEAM_EMAIL;
        const fromEmail = process.env.AWS_FROM_EMAIL;

        if (!salesTeamEmail || !fromEmail) {
            console.error("Missing email configuration environment variables");
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        const emailSubject = `New Interest in XareTrust: ${companyName}`;

        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
<style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
    .header { background-color: #f4f4f4; padding: 10px; text-align: center; border-bottom: 1px solid #ddd; }
    .content { padding: 20px; }
    .field { margin-bottom: 10px; }
    .label { font-weight: bold; }
    .footer { margin-top: 20px; font-size: 0.8em; text-align: center; color: #777; }
</style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>New XareTrust Contact Request</h2>
        </div>
        <div class="content">
            <p>Hello Sales Team,</p>
            <p>You have received a new inquiry from a company interested in XareTrust scoring and potential platform features.</p>
            
            <div class="field">
                <span class="label">Name:</span> ${name}
            </div>
            <div class="field">
                <span class="label">Company Name:</span> ${companyName}
            </div>
            <div class="field">
                <span class="label">Email:</span> ${email}
            </div>
            <div class="field">
                <span class="label">Country:</span> ${country}
            </div>
            
            <hr />
            
            <div class="field">
                <span class="label">Comments/Message:</span>
                <p>${comments}</p>
            </div>
        </div>
        <div class="footer">
            <p>This email was sent from the XareTrust Contact Us form.</p>
        </div>
    </div>
</body>
</html>
        `;

        const command = new SendEmailCommand({
            Destination: {
                ToAddresses: [salesTeamEmail],
            },
            Message: {
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data: emailHtml,
                    },
                    Text: {
                        Charset: "UTF-8",
                        Data: `New inquiry from ${name} at ${companyName}.\n\nDetails:\nName: ${name}\nEmail: ${email}\nCountry: ${country}\n\nMessage:\n${comments}`,
                    },
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: emailSubject,
                },
            },
            Source: fromEmail,
        });

        await sesClient.send(command);

        return NextResponse.json(
            { message: "Email sent successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json(
            { error: "Failed to send email. Please try again later." },
            { status: 500 }
        );
    }
}
