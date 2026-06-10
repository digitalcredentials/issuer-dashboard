export const getPopulatedEmail = (claimPageLink:string, earnerName: string) =>  {
    return `<!DOCTYPE html>
<html>
<head>

  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>DCC Credential</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
  /**
   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
   */
  @media screen {
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 400;
      src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
    }

    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 700;
      src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
    }
  }

  /**
   * Avoid browser level font resizing.
   * 1. Windows Mobile
   * 2. iOS / OSX
   */
  body,
  table,
  td,
  a {
    -ms-text-size-adjust: 100%; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }

  /**
   * Remove extra space added to tables and cells in Outlook.
   */
  table,
  td {
    mso-table-rspace: 0pt;
    mso-table-lspace: 0pt;
  }

  /**
   * Better fluid images in Internet Explorer.
   */
  img {
    -ms-interpolation-mode: bicubic;
  }

  /**
   * Remove blue links for iOS devices.
   */
  a[x-apple-data-detectors] {
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    text-decoration: none !important;
  }

  /**
   * Fix centering issues in Android 4.4.
   */
  div[style*="margin: 16px 0;"] {
    margin: 0 !important;
  }

  body {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  /**
   * Collapse table borders to avoid space between cells.
   */
  table {
    border-collapse: collapse !important;
  }

  a {
    color: #1a82e2;
  }

  img {
    height: auto;
    line-height: 100%;
    text-decoration: none;
    border: 0;
    outline: none;
  }
  </style>

</head>
<body style="background-color: #e9ecef;">

  <!-- start preheader -->
  <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
    Claim your DCC Credential
  </div>
  <!-- end preheader -->

  <!-- start body -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%">

    <!-- start logo -->
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" valign="top" style="padding: 36px 24px;">
              <a href="https://digitalcredentials.mit.edu" target="_blank" style="display: inline-block;">
                <img src="https://digitalcredentials.mit.edu/images/DCC_navbar-logo.png" alt="DCC Logo" border="0" width="200" style="display: block; width: 200px; max-width: 200px; min-width: 200px;">
              </a>
            </td>
          </tr>
        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end logo -->

    <!-- start hero -->
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Hello ${earnerName}!</h1>
            </td>
          </tr>
        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end hero -->

    <!-- start copy block -->
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <!-- start copy -->
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">Your DCC Credential is ready for you to claim.</p>
            </td>
          </tr>
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">  
              <p style="margin: 0;">To claim your credential, download the <a href="https://lcw.app/" target="_blank">Learner Credential Wallet</a> on your mobile device and then click on the button below to get the next steps to claim your credential.</p>
            </td>
          </tr>
          <!-- end copy -->

          <!-- start button -->
          <tr>
            <td align="left" bgcolor="#ffffff">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" bgcolor="#429EA6" style="border-radius: 6px;">
                          <a href="${claimPageLink}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Get Your Credential</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- end button -->

          <!-- start copy -->
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
              <p style="margin: 0;"><a href="${claimPageLink}" target="_blank">${claimPageLink}</a></p>
            </td>
          </tr>
          <!-- end copy -->

          <!-- start copy -->
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 8px solid #d4dadf">
              <p style="margin: 0;">Cheers,<br> Digital Credentials Consortium</p>
            </td>
          </tr>

           <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 30px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;"><i>The DCC is advancing the understanding and use of privacy-enhanced, portable, verifiable digital academic credentials in higher education through open source technology development and leadership, research, and advocacy.</i></p>
            </td>
          </tr>

          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;"><i>Are you an affiliate of a non-profit or state-funded postsecondary institution? Consider joining the DCC! <a href="https://wiki.dcconsortium.org/app/page/1-cS0TK_wZq-9DriQH5dozzQFNy54aK_X?p=1h1VJHHv2zSe0n9Ltg-KQevSuqWbGcExy" target="_blank">Learn more about our membership tiers and benefits</a>.</p>
            </td>
          </tr>
          <tr>
              <td valign="top" class="mceColumn" data-block-id="-6" colspan="12" width="100%">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td valign="middle" align="center"><!--[if mso]><table align="left" border="0" cellspacing= "0" cellpadding="0"><tr><![endif]--><!--[if mso]><td align="center" valign="top"><![endif]-->
                                <table align="left" border="0" cellpadding="0" cellspacing="0" style="display:inline;float:left" role="presentation">
                                  <tr>
                                    <td style="padding-top:3px;padding-bottom:3px;padding-left:12px;padding-right:12px" valign="top" align="center" width="40"><a href="https://digitalcredentials.mit.edu/" target="_blank" rel="noreferrer"><img class="mceSocialFollowImage" width="40" height="40" alt="Website icon" src="https://cdn-images.mailchimp.com/icons/social-block-v3/block-icons-v3/website-filled-dark-40.png"></a>
                                  </td>
                                </tr>
                              </table><!--[if mso]></td><![endif]--><!--[if mso]><td align="center" valign="top"><![endif]-->
                              <table align="left" border="0" cellpadding="0" cellspacing="0" style="display:inline;float:left" role="presentation">
                                <tr>
                                  <td style="padding-top:3px;padding-bottom:3px;padding-left:12px;padding-right:12px" valign="top" align="center" width="40"><a href="https://www.linkedin.com/company/dccconsortium/" target="_blank" rel="noreferrer"><img class="mceSocialFollowImage" width="40" height="40" alt="LinkedIn icon" src="https://cdn-images.mailchimp.com/icons/social-block-v3/block-icons-v3/linkedin-filled-dark-40.png"></a>
                                  </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          <!-- end copy -->

        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end copy block -->

    <!-- start footer -->
    <tr>
      <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <!-- start permission -->
          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;">You received this email because we received a request for an <a href="https://badging.dcconsortium.org/lcw-experience-badge" target="_blank">LCW Experience Badge</a> with this address. If you didn't request this badge you can safely delete this email.</p>
            </td>
          </tr>
          <!-- end permission -->


        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end footer -->

  </table>
  <!-- end body -->

</body>
</html>
`
}