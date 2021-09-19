import { getActiveGuestRestrictions, getOtherGuestMarkup } from './guestResponseUtils';

export const createAttendingEmail = (activeGuest, otherGuests = []) => {
  const restrictionText = getActiveGuestRestrictions(activeGuest);
  const otherGuestMarkup = otherGuests.length ? getOtherGuestMarkup(otherGuests) : '';
  const meal = activeGuest.meal || (activeGuest.vegetarian ? 'vegetarian option' : '');

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Beth & Nick are getting married</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      <style type="text/css">
        body,
        table,
        td,
        a {
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        table,
        td {
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
        img {
          -ms-interpolation-mode: bicubic;
        }

        img {
          border: 0;
          height: auto;
          line-height: 100%;
          outline: none;
          text-decoration: none;
        }
        table {
          border-collapse: collapse !important;
        }
        body {
          height: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
        }

        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: none !important;
          font-size: inherit !important;
          font-family: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
        }

        .hero-img {
          max-width: 100% !important;
        }

        .confirm-text {
          max-width: 80% !important;
        }

        @media screen and (min-width: 526px) {
          .confirm-text {
            max-width: 560px !important;
            width: 80% !important;
          }

          .spacer {
            height: 60px;
          }

          .frame-padding {
            padding: 40px !important;
          }

          .header-desktop {
            display: block !important;
          }
          .header-mobile {
            display: none !important;
          }
        }

        @media screen and (max-width: 525px) {
          .wrapper {
            width: 100% !important;
            max-width: 100% !important;
          }

          .header-desktop {
            display: none !important;
          }

          .logo img {
            margin: 0 auto !important;
          }

          .mobile-hide {
            display: none !important;
          }

          .img-max {
            max-width: 100% !important;
            width: 100% !important;
            height: auto !important;
          }

          .responsive-table {
            width: 100% !important;
          }

          .no-padding {
            padding: 0 !important;
          }

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

        div[style*="margin: 16px 0;"] {
          margin: 0 !important;
        }
      </style>
    </head>
    <body style="margin: 0 !important; padding: 0 !important;">
      <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        You're coming to the wedding!
      </div>

      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td bgcolor="#f5f5f5" align="center" style="padding: 24px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 660px;" class="responsive-table" bgcolor="#fff">
              <tr>
                <td style="padding: 24px;" class="frame-padding">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="left">
                        <img
                          src="https://api.bethandnick.us/img/header.png"
                          width="1752"
                          height="194"
                          border="0"
                          alt="Beth and Nick, December 18, 2021"
                          style="display: block; width: 100%;"
                          class="img-max header-desktop"
                        />
                        <img
                          src="https://api.bethandnick.us/img/header-mobile.png"
                          width="809"
                          height="375"
                          border="0"
                          alt="Beth and Nick, December 18, 2021"
                          style="display: block; width: 100%; max-width: 600px;"
                          class="img-max header-mobile"
                        />
                      </td>
                    </tr>
                  </table>

                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td height="20"></td>
                    </tr>
                    <tr>
                      <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td height="20"></td>
                          </tr>
                          <tr>
                            <td align="left">
                              <h1 style="font-family: Roboto, Helvetica, Arial, sans-serif;">
                                Get ready, you're going to a wedding
                              </h1>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" style="font-size: 22px; line-height: 34px; font-family: Roboto, Helvetica, Arial, sans-serif; color: #333333; background-color: #fff;" bgcolor="#fff">
                              You're in! We can't wait to celebrate with you on <b>December 18th</b> at <a style="color: #b99359;" href="https://bethandnick.us/the-venue/" target="_blank" rel="noreferrer noopener">the Barn at Gibbet Hill</a>.
                            </td>
                          </tr>
                          <tr>
                            <td height="20"></td>
                          </tr>
                          <tr>
                            <td align="left" style="font-size: 22px; line-height: 34px; font-family: Roboto, Helvetica, Arial, sans-serif; color: #333333; background-color: #fff;" bgcolor="#fff">
                              You selected the ${meal} for dinner, which is a great choice. ${restrictionText}
                            </td>
                          </tr>
                          <tr>
                            <td height="20"></td>
                          </tr>
                          ${otherGuestMarkup}
                          <tr>
                            <td align="left" style="font-size: 22px; line-height: 34px; font-family: Roboto, Helvetica, Arial, sans-serif; color: #333333; background-color: #fff;">
                              Don't forget to <a style="color: #b99359;" href="https://bethandnick.us/accommodations/" target="_blank" rel="noreferrer noopener">book your hotel room</a> if you haven't already, and keep up with
                              <a style="color: #b99359;" href="https://bethandnick.us" target="_blank" rel="noreferrer noopener">bethandnick.us</a> to stay up to date with all the wedding details.
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td height="40"></td>
                    </tr>
                    <tr>
                      <td class="padding" align="center">
                        <img
                          src="https://api.bethandnick.us/img/bethandnick-sq.jpg"
                          width="660"
                          height="6"
                          border="0"
                          alt="Goofy wedding pictures"
                          style="display: block; color: #333333; font-family: Helvetica, arial, sans-serif; font-size: 16px;"
                          class="img-max hero-img"
                        />
                      </td>
                    </tr>
                  </table>

                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td height="40"></td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size: 16px; line-height: 26px; font-family: Roboto, Helvetica, Arial, sans-serif; color: #333333;">
                        If you have any questions, or if you need to update your RSVP, feel free to reply directly to this email or call Nick or Beth. We'll be happy to make sure you've got all the info you need.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
`;
};
