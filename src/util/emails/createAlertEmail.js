const rsvpMarkup = (guest) => {
  const meal = guest.meal || (guest.vegetarian ? 'vegetarian option' : '');
  const icon = guest.attending ? 'confirm' : 'decline';
  const attendingText = guest.attending
    ? `can attend${meal ? `, and will be having the ${meal} for dinner` : ''}.`
    : 'cannot attend.';

  const otherRestrictions = guest.restrictions
    ? ` and have noted the following: ${guest.restrictions}`
    : '';
  let restrictionText = '';

  if (guest.vegetarian && guest.glutenFree) {
    restrictionText = `They've indicated that they are Vegetarian and Gluten Free${otherRestrictions}.`;
  } else if (guest.vegetarian) {
    restrictionText = `They've indicated that they are Vegetarian${otherRestrictions}.`;
  } else if (guest.glutenFree) {
    restrictionText = `They've indicated that they are Gluten Free${otherRestrictions}.`;
  } else if (guest.restrictions) {
    restrictionText = `They've noted the following: ${guest.restrictions}.`;
  }

  return `
  <tr>
    <td style="padding: 10px;">
      <img src="https://api.bethandnick.us/img/guest-${icon}.png" width="22" height="22">
    </td>
    <td style="font-size: 18px; font-family: Roboto, Helvetica, Arial, sans-serif; color: #333333;" class="padding" bgcolor="#fff">
      <b>${guest.name}</b> ${attendingText} ${restrictionText || ''}
    </td>
  </tr>
  `;
};

export const createAlertEmail = (guests) =>
  `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Someone RSVP'd</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <style type="text/css">
        body,
        table,
        td,
        a {
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        } /* Prevent WebKit and Windows mobile changing default text sizes */
        table,
        td {
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        } /* Remove spacing between tables in Outlook 2007 and up */
        img {
          -ms-interpolation-mode: bicubic;
        } /* Allow smoother rendering of resized image in Internet Explorer */

        /* RESET STYLES */
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

        /* iOS BLUE LINKS */
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: none !important;
          font-size: inherit !important;
          font-family: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
        }

        .header-img {
          max-width: 100% !important;
        }

        .header-mobile {
          max-width: 100% !important;
          display: none !important;
        }

        @media screen and (min-width: 800px) {
          .extra-desktop-padding {
            padding-left: 30px;
            padding-right: 30px;
          }
        }

        @media screen and (min-width: 526px) {
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
        }

        /* ANDROID CENTER FIX */
        div[style*="margin: 16px 0;"] {
          margin: 0 !important;
        }
      </style>
    </head>
    <body style="margin: 0 !important; padding: 0 !important;">
      <!-- HIDDEN PREHEADER TEXT -->
      <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        Somebody has RSVP'd to your wedding!
      </div>

      <!-- HEADER -->
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
                          width="1200"
                          height="120"
                          border="0"
                          alt="Beth and Nick, December 18"
                          style="display: block; color: #666666; font-family: Helvetica, arial, sans-serif; font-size: 16px;"
                          class="img-max header-img header-desktop"
                        />

                        <img
                          src="https://api.bethandnick.us/img/header-mobile.png"
                          width="1200"
                          height="120"
                          border="0"
                          alt="Beth and Nick, December 18"
                          style="display: block; color: #666666; font-family: Helvetica, arial, sans-serif; font-size: 16px;"
                          class="img-max header-mobile"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td height="40">&nbsp;</td>
                          </tr>
                          <tr>
                            <td>
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td align="left" style="font-size: 22px; font-weight: bold; font-family: Roboto, Helvetica, Arial, sans-serif; color: #333333; background-color: #fff; " class="padding" bgcolor="#fff">You've got a new RSVP:</td>
                                </tr>
                                <tr>
                                  <td height="20">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td style="background-color: #fff;">
                                    <table>
                                      ${Object.values(guests).map(rsvpMarkup)}
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td height="30"></td>
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
