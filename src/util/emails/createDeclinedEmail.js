export const createDeclinedEmail = () =>
  `
<!DOCTYPE html>
<html>
<head>
<title>Beth & Nick are getting married</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<style type="text/css">
    /* CLIENT-SPECIFIC STYLES */
    body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;} /* Prevent WebKit and Windows mobile changing default text sizes */
    table, td{mso-table-lspace: 0pt; mso-table-rspace: 0pt;} /* Remove spacing between tables in Outlook 2007 and up */
    img{-ms-interpolation-mode: bicubic;} /* Allow smoother rendering of resized image in Internet Explorer */

    /* RESET STYLES */
    img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;}
    table{border-collapse: collapse !important;}
    body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}

    /* iOS BLUE LINKS */
    a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    }

    .hero-img,
    .header-img {
      max-width: 100% !important;
    }

    .header-mobile {
        max-width: 100% !important;
        display: none !important;
    }

    .confirm-text {
      max-width: 80% !important;
    }

    @media screen and (min-width: 800px) {
        .extra-desktop-padding {
        padding-left: 30px;
            padding-right: 30px;
      }
    }

    @media screen and (min-width: 526px) {
        .offset-table {
          position: relative !important;
            top: -120px !important;
        }

      .offset-main {
        position: relative !important;
            top: -120px !important;
            padding-left: 20% !important;
        }

        .confirm-text {
          max-width: 560px !important;
          width: 80% !important;
        }

        .spacer {
          height: 120px;
        }
    }


    /* MOBILE STYLES */
    @media screen and (max-width: 525px) {

        .header-desktop {
        display: none !important;
        }
        .header-mobile {
          display: block !important;
        }

        /* ALLOWS FOR FLUID TABLES */
        .wrapper {
          width: 100% !important;
          max-width: 100% !important;
        }

        /* ADJUSTS LAYOUT OF LOGO IMAGE */
        .logo img {
          margin: 0 auto !important;
        }

        /* USE THESE CLASSES TO HIDE CONTENT ON MOBILE */
        .mobile-hide {
          display: none !important;
        }

        .img-max {
          max-width: 100% !important;
          width: 100% !important;
          height: auto !important;
        }

        /* FULL-WIDTH TABLES */
        .responsive-table {
          width: 100% !important;
        }

        /* UTILITY CLASSES FOR ADJUSTING PADDING ON MOBILE */
        .padding {
          padding: 10px 5% 15px 5% !important;
        }

        .padding-meta {
          padding: 30px 5% 0px 5% !important;
          text-align: center;
        }

        .no-padding {
          padding: 0 !important;
        }

        .section-padding {
          padding: 50px 15px 50px 15px !important;
        }

        /* ADJUST BUTTONS ON MOBILE */
        .mobile-button-container {
            margin: 0 auto;
            width: 100% !important;
        }

        .mobile-button {
            padding: 15px !important;
            border: 0 !important;
            font-size: 16px !important;
            display: block !important;
        }

    }

    /* ANDROID CENTER FIX */
    div[style*="margin: 16px 0;"] { margin: 0 !important; }
</style>
</head>
<body style="margin: 0 !important; padding: 0 !important;">

<!-- HIDDEN PREHEADER TEXT -->
<div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    We're sorry you can't make it.
</div>

<!-- HEADER -->
<table border="0" cellpadding="0" cellspacing="0" width="100%">

    <tr>
        <td bgcolor="#f5f5f5" align="center" style="padding: 70px 15px 70px 15px;" class="section-padding">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
            <tr>
            <td align="center" valign="top" width="500">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 880px;" class="responsive-table" bgcolor="#fff">
                <tr>
                    <td style="padding:40px;">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td class="padding extra-desktop-padding" align="left">
                                    <img src="https://api.bethandnick.us/img/header.png" width="1200" height="120" border="0" alt="Beth and Nick, October 17" style="display: block; color: #666666;  font-family: Helvetica, arial, sans-serif; font-size: 16px; margin-top: 30px;" class="img-max header-img header-desktop">

                                    <img src="https://api.bethandnick.us/img/header-mobile.png" width="1200" height="120" border="0" alt="Beth and Nick, October 17" style="display: block; color: #666666;  font-family: Helvetica, arial, sans-serif; font-size: 16px;" class="img-max header-mobile">

                                </td>
                            </tr>
                            <tr>
                              <td class="spacer" height="60">&nbsp;</td>
                            </tr>
                            <tr>
                                <td align="center">
                                  <img src="https://api.bethandnick.us/img/declined.png" width="660" height="433" border="0" alt="Get ready. You're going to a wedding." style="display: block; color: #666666;  font-family: Helvetica, arial, sans-serif; font-size: 16px; max-width: 600px;" class="img-max confirm-text">
                                </td>
                            </tr>
                            <tr>
                              <td class="spacer" height="60">&nbsp;</td>
                            </tr>
                        </table>

                        <!-- HERO IMAGE -->
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td class="padding" align="center">
                                    <img src="https://api.bethandnick.us/img/prom-photo.jpg" width="660" height="6" border="0" alt="Nick and Beth and their first prom" style="display: block; color: #666666;  font-family: Helvetica, arial, sans-serif; font-size: 16px;" class="img-max hero-img">
                                </td>
                            </tr>
                        </table>

                        <!-- HERO IMAGE -->
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td height="20"></td>
                            </tr>
                            <tr>
                                <td class="offset-main">

                                    <!-- COPY -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td align="left" style="padding: 40px; font-size: 22px; line-height: 34px; font-family: Roboto, Helvetica, Arial, sans-serif; color: #666666; background-color: #fff; " class="padding" bgcolor="#fff">We understand, things can get busy. While we're disappointed we won't get to celebrate with you on October 17th, we hope to see you real soon.</td>
                                        </tr>
                                        <tr>
                                            <td align="left" style="padding: 0 40px 40px 40px; font-size: 22px; line-height: 34px; font-family: Roboto, Helvetica, Arial, sans-serif; color: #666666; background-color: #fff; " class="padding">In the meantime, we hope you enjoy this picture of our High School prom together.</td>
                                        </tr>
                                    </table>

                                </td>
                            </tr>
                        </table>

                        <!-- Other checkins -->
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr><td height="20"></td></tr>
                            <tr>
                                <td class="offset-table">

                                    <!-- COPY -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">

                                        <tr>
                                            <td align="left" style="padding: 40px; font-size: 26px; line-height: 38px; font-weight: bold; font-family: Roboto, Helvetica, Arial, sans-serif; color: #666666; background-color: #fff; " class="padding" bgcolor="#fff">You've also rsvp'd for the following people:</td>
                                        </tr>
                                        <tr>
                                            <td align="left" style="padding: 10px 40px; font-size: 22px; line-height: 34px; font-family: Roboto, Helvetica, Arial, sans-serif; color: #666666; background-color: #fff; " class="padding" bgcolor="#fff">
                                              <img src="https://api.bethandnick.us/img/guest-decline.png" width="22" height="22" style="vertical-align: middle">&nbsp;
                                                <span style="vertical-align: middle; line-height: 1;"><strong>Terra Gallo</strong> cannot attend.</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="left" style="padding: 10px 40px; font-size: 22px; line-height: 34px; font-family: Roboto, Helvetica, Arial, sans-serif; color: #666666; background-color: #fff; " class="padding" bgcolor="#fff">
                                              <img src="https://api.bethandnick.us/img/guest-confirm.png" width="22" height="22" style="vertical-align: middle">&nbsp;
                                                <span style="vertical-align: middle; line-height: 1;"><strong>Terra Gallo</strong> can attend, and will be having the fish option for dinner.</span>
                                            </td>
                                        </tr>
                                    </table>

                                </td>
                            </tr>

                            <tr><td height="40"></td></tr>
                        </table>

                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td align="left" style="padding: 0px 30px 30px 30px; font-size: 16px; line-height: 26px; font-family: Roboto, Helvetica, Arial, sans-serif; color: #666666;" class="padding">If you have any questions, or if you have a change in plans and are able to make it to the wedding, please feel free to reply directly to this email or call Nick or Beth.</td>
                            </tr>
                        </table>
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


</table>
</body>
</html>
`;
