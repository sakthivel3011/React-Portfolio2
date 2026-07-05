/**
 * ============================================================
 *  Sakthivel S — Portfolio Contact Form Backend (Apps Script)
 * ============================================================
 *
 *  What it does on every form submission:
 *    1. Saves the message into your Google Sheet
 *    2. Sends YOU an alert email (new message notification)
 *    3. Sends the USER a thank-you email
 *  Both emails use the portfolio's black / white / green theme.
 *
 *  ------------------- HOW TO DEPLOY -------------------
 *  1. Open https://script.google.com → New project
 *  2. Delete everything in Code.gs and paste this whole file
 *  3. Save (Ctrl+S), name it e.g. "Portfolio Contact"
 *  4. Click Deploy → New deployment
 *       - Type:        Web app
 *       - Execute as:  Me
 *       - Who has access:  Anyone
 *  5. Click Deploy, authorize the permissions, and COPY the
 *     Web app URL (ends with /exec)
 *  6. Paste that URL into src/components/Contact.jsx →
 *     const SCRIPT_URL = '...'
 *  ------------------------------------------------------
 */

var OWNER_EMAIL = 'sakthii3011@gmail.com';
var SHEET_ID = '1XMNByHAGQMWNbegHRYA64iB3LnS5Z5LXK2vULr4vT3I';
var SHEET_NAME = 'Sheet1'; // change if your tab has a different name

function doPost(e) {
  try {
    var p = (e && e.parameter) || {};
    var name = String(p.name || '').trim();
    var email = String(p.email || '').trim();
    var message = String(p.message || '').trim();

    if (!name || !email || !message) {
      return jsonResponse({ ok: false, error: 'Missing fields' });
    }

    saveToSheet(name, email, message);
    sendOwnerAlert(name, email, message);
    sendThankYou(name, email);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

// Lets you test the deployment by opening the /exec URL in a browser
function doGet() {
  return ContentService.createTextOutput(
    'Portfolio contact endpoint is running.'
  );
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function saveToSheet(name, email, message) {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

  // Add a header row once
  if (sheet.getLastRow() === 0) {
    sheet
      .appendRow(['Timestamp', 'Name', 'Email', 'Message'])
      .getRange(1, 1, 1, 4)
      .setFontWeight('bold');
  }

  sheet.appendRow([new Date(), name, email, message]);
}

/* ---------- shared email shell (black / white / green theme) ---------- */

function emailShell(innerHtml) {
  return (
    '' +
    '<div style="margin:0;padding:32px 16px;background:#050505;font-family:Segoe UI,Arial,sans-serif;">' +
    '  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;">' +
    '    <tr><td style="background:#0d0d0f;border:1px solid #26262a;border-radius:16px;padding:36px 32px;">' +
    innerHtml +
    '      <div style="border-top:1px solid #26262a;margin-top:28px;padding-top:18px;">' +
    '        <p style="margin:0;color:#7a7a80;font-size:12px;">Sakthivel S<span style="color:#C9FF3D;">.</span> — Full-Stack Web Developer</p>' +
    '      </div>' +
    '    </td></tr>' +
    '  </table>' +
    '</div>'
  );
}

/* ------------------------- owner alert email ------------------------- */

function sendOwnerAlert(name, email, message) {
  var html = emailShell(
    '' +
      '<p style="margin:0 0 6px;color:#C9FF3D;font-size:11px;letter-spacing:3px;text-transform:uppercase;">New message</p>' +
      '<h1 style="margin:0 0 20px;color:#ffffff;font-size:22px;">Portfolio contact form</h1>' +
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#111113;border:1px solid #26262a;border-radius:12px;">' +
      '  <tr><td style="padding:18px 20px;">' +
      '    <p style="margin:0 0 4px;color:#7a7a80;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Name</p>' +
      '    <p style="margin:0 0 14px;color:#ffffff;font-size:15px;font-weight:600;">' + escapeHtml(name) + '</p>' +
      '    <p style="margin:0 0 4px;color:#7a7a80;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Email</p>' +
      '    <p style="margin:0 0 14px;font-size:15px;"><a href="mailto:' + escapeHtml(email) + '" style="color:#C9FF3D;text-decoration:none;">' + escapeHtml(email) + '</a></p>' +
      '    <p style="margin:0 0 4px;color:#7a7a80;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Message</p>' +
      '    <p style="margin:0;color:#d6d6da;font-size:14px;line-height:1.6;white-space:pre-wrap;">' + escapeHtml(message) + '</p>' +
      '  </td></tr>' +
      '</table>' +
      '<a href="mailto:' + escapeHtml(email) + '" style="display:inline-block;margin-top:22px;background:#C9FF3D;color:#050505;font-size:14px;font-weight:700;padding:12px 26px;border-radius:99px;text-decoration:none;">Reply to ' + escapeHtml(name.split(' ')[0]) + '</a>'
  );

  MailApp.sendEmail({
    to: OWNER_EMAIL,
    subject: 'Portfolio: new message from ' + name,
    htmlBody: html,
    replyTo: email,
    name: 'Portfolio Contact',
  });
}

/* ------------------------ user thank-you email ------------------------ */

function sendThankYou(name, email) {
  var firstName = escapeHtml(name.split(' ')[0]);
  var html = emailShell(
    '' +
      '<p style="margin:0 0 6px;color:#C9FF3D;font-size:11px;letter-spacing:3px;text-transform:uppercase;">Message received</p>' +
      '<h1 style="margin:0 0 16px;color:#ffffff;font-size:22px;">Thank you, ' + firstName + '<span style="color:#C9FF3D;">.</span></h1>' +
      '<p style="margin:0 0 12px;color:#d6d6da;font-size:14px;line-height:1.7;">Your message just landed in my inbox. I read every message personally and usually reply within 24 hours.</p>' +
      '<p style="margin:0 0 24px;color:#d6d6da;font-size:14px;line-height:1.7;">Meanwhile, feel free to follow me on Instagram:</p>' +
      '<a href="https://www.instagram.com/updone.in" style="display:inline-block;background:#C9FF3D;color:#050505;font-size:14px;font-weight:700;padding:12px 26px;border-radius:99px;text-decoration:none;">Follow @updone.in</a>'
  );

  MailApp.sendEmail({
    to: email,
    subject: 'Thanks for reaching out — Sakthivel S',
    htmlBody: html,
    name: 'Sakthivel S',
  });
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
