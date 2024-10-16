import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { MAILGUN_SECRET, MAILGUN_DOMAIN } from '$env/static/private'
import { getClient } from '$lib/mongoconnect'
import Mailgun from 'mailgun.js';
import formData from 'form-data';

export const POST: RequestHandler = async ({ request }) => {

  // Deals with turning request body into usable data
  const body = await request.json();

  // Connects to Mongodb
  const client = getClient()

  const db = client.db('OtherData');
  const MongoCollection = db.collection('TempVerificationCodes');

  // Deletes all previous verification code documents matching the email
  await MongoCollection.deleteMany({ email: body.email });

  // Creates Date object 6 hours in the future
  const expireDate = new Date(Date.now() + 3 * 60 * 60 * 1000);

  // Creates a random 6-digit code
  const randomCode = String(Math.floor(100000 + Math.random() * 900000)).padStart(6, '0');

  // Creates data to be sent to mongo
  const VerificationDocumentContents = {
    email: body.email,
    'expiresAfter': expireDate,
    code: randomCode,
  };

  await MongoCollection.insertOne(VerificationDocumentContents)

  // Initialize Mailgun with formData
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({
    username: 'api',
    key: MAILGUN_SECRET,
  });

  // Send an email with the generated verification code
  const mailResponse = await mg.messages.create(MAILGUN_DOMAIN, {
    from: 'Lection <no-reply@lection.cc>',
    to: [body.email],
    subject: 'Verify your account',
    html: `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
	<title></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
	<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css"><!--<![endif]-->
	<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		.image_block img+div {
			display: none;
		}

		sup,
		sub {
			line-height: 0;
			font-size: 75%;
		}

		@media (max-width:520px) {
			.desktop_hide table.icons-inner {
				display: inline-block !important;
			}

			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}

			.mobile_hide {
				display: none;
			}

			.row-content {
				width: 100% !important;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}
		}
	</style><!--[if mso ]><style>sup, sub { font-size: 100% !important; } sup { mso-text-raise:10% } sub { mso-text-raise:-10% }</style> <![endif]-->
</head>

<body class="body" style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
	<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
		<tbody>
			<tr>
				<td>
					<table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px; margin: 0 auto;" width="500">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="heading_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<h1 style="margin: 0; color: #1e5167; direction: ltr; font-family: TimesNewRoman, 'Times New Roman', Times, Beskerville, Georgia, serif; font-size: 50px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 60px;"><em><span class="tinyMce-placeholder" style="word-break: break-word;"><a href="https://www.lection.cc" target="_blank" style="text-decoration: none; color: #1e5167;" rel="noopener"><span class="mce-content-body mce-edit-focus" style="word-break: break-word; position: relative;" id="98ffab39-c30b-4339-b0e3-4011ece9e4c3" data-position="10-0-0" data-qa="tinyeditor-root-element"><em><span class="tinyMce-placeholder" style="word-break: break-word;">Lection</span></em></span></a></span></em></h1>
															</td>
														</tr>
													</table>
													<table class="divider_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<div class="alignment" align="center">
																	<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																		<tr>
																			<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;"><span style="word-break: break-word;">&#8202;</span></td>
																		</tr>
																	</table>
																</div>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#353535;direction:ltr;font-family:'Poppins', Arial, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:200%;text-align:center;mso-line-height-alt:32px;">
																	<p style="margin: 0; margin-bottom: 16px;">Thank you for registering! Please verify your email address to activate your account.</p>
																	<p style="margin: 0; margin-bottom: 16px;">&nbsp;</p>
																	<p style="margin: 0; margin-bottom: 16px;">Your verification code is: <strong>${randomCode}</strong></p>
																	<p style="margin: 0; margin-bottom: 16px;">&nbsp;</p>
																	<p style="margin: 0; margin-bottom: 16px;">Enter this code in the verification field on our website to complete your registration. This code will expire in 3 hours.</p>
																	<p style="margin: 0; margin-bottom: 16px;">&nbsp;</p>
																	<p style="margin: 0;">If you didn't request this code, please ignore this email.</p>
																</div>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-4" style="height:60px;line-height:60px;font-size:1px;">&#8202;</div>
													<table class="divider_block block-5" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<div class="alignment" align="center">
																	<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																		<tr>
																			<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;"><span style="word-break: break-word;">&#8202;</span></td>
																		</tr>
																	</table>
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; background-color: #ffffff; width: 500px; margin: 0 auto;" width="500">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="icons_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center; line-height: 0;">
														<tr>
															<td class="pad" style="vertical-align: middle; color: #1e0e4b; font-family: 'Inter', sans-serif; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;"><!--[if vml]><table align="center" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
																<!--[if !vml]><!-->
																<table class="icons-inner" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; padding-left: 0px; padding-right: 0px;" cellpadding="0" cellspacing="0" role="presentation"><!--<![endif]-->
																	<tr>
																		<td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 6px;"><a href="http://designedwithbeefree.com/" target="_blank" style="text-decoration: none;"><img class="icon" alt="Beefree Logo" src="https://d1oco4z2z1fhwp.cloudfront.net/assets/Beefree-logo.png" height="auto" width="34" align="center" style="display: block; height: auto; margin: 0 auto; border: 0;"></a></td>
																		<td style="font-family: 'Inter', sans-serif; font-size: 15px; font-weight: undefined; color: #1e0e4b; vertical-align: middle; letter-spacing: undefined; text-align: center; line-height: normal;"><a href="http://designedwithbeefree.com/" target="_blank" style="color: #1e0e4b; text-decoration: none;">Designed with Beefree</a></td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table><!-- End -->
</body>

          </html>`,
  });



  return json({ success: true });
};

export const PUT: RequestHandler = async ({ request }) => {

  // Deals with turning request body into usable data
  const body = await request.json();

  // Connects to Mongodb
  const client = getClient()

  const db = client.db('OtherData');
  const MongoCollection = db.collection('TempVerificationCodes');

  const pulledDoc = await MongoCollection.findOne({ email: body.email})

  // Deletes all previous verification code documents matching the email
  await MongoCollection.deleteMany({ email: body.email });

  if( pulledDoc.code == body.code) {


    return json({ verified: true });
  }
  else{
    return json({ verified: false});
  }
};

export const PATCH: RequestHandler = async ({ request }) => {
  
	// Deals with turning request body into usable data
	const body = await request.json();
  
	// Connects to Mongodb
	const client = getClient()
  
	const db = client.db('Users');
	const MongoCollection = db.collection('hosts');
  
	const docCount = await MongoCollection.countDocuments({ email: body.email})
  
	if( docCount >= 1) {
  
  
	  return json({ match: true });
	}
	else{
	  return json({ match: false});
	}
  };
