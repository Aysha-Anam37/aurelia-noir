/**
 * AURELIA NOIR — Google Sheets form backend
 *
 * Bind this script to the Google Sheet used as the database:
 * Google Sheet > Extensions > Apps Script.
 * Run setupDatabase() once from the Apps Script editor and approve access.
 * Then deploy as a Web app (Execute as: Me; access: Anyone).
 */

const CONTACT_SHEET = 'ContactMessages';
const RESERVATION_SHEET = 'ReservationEnquiries';

const CONTACT_HEADERS = [
  'Timestamp',
  'Reference ID',
  'Name',
  'Email',
  'Phone',
  'Subject',
  'Message',
  'Source',
  'Page URL',
  'Status',
];

const RESERVATION_HEADERS = [
  'Timestamp',
  'Reference ID',
  'Arrival Date',
  'Departure Date',
  'Nights',
  'Suite ID',
  'Suite Name',
  'Adults',
  'Children',
  'Transfer Preference',
  'Butler Service Requested',
  'Full Name',
  'Email',
  'Phone',
  'Country',
  'Special Requests',
  'Dietary Notes',
  'Estimated Subtotal (USD)',
  'Estimated Service Charge (USD)',
  'Estimated Total (USD)',
  'Source',
  'Page URL',
  'Status',
];

/** Run once manually while the bound Google Sheet is open. */
function setupDatabase() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    throw new Error('Open this script from the Google Sheet via Extensions > Apps Script.');
  }

  PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', spreadsheet.getId());
  ensureSheet_(spreadsheet, CONTACT_SHEET, CONTACT_HEADERS);
  ensureSheet_(spreadsheet, RESERVATION_SHEET, RESERVATION_HEADERS);

  return 'Database setup complete: ContactMessages and ReservationEnquiries are ready.';
}

/** Basic health check. Open the deployed /exec URL in a browser to test. */
function doGet() {
  return jsonOutput_({
    status: 'success',
    message: 'Aurelia Noir form backend is online.',
  });
}

/** Receives contact and reservation forms from the frontend. */
function doPost(e) {
  const lock = LockService.getScriptLock();
  let lockAcquired = false;

  try {
    const payload = parsePayload_(e);
    const type = cleanText_(payload.type, 40).toLowerCase();
    const spreadsheet = getDatabaseSpreadsheet_();
    const timestamp = new Date();
    const referenceId = createReferenceId_(type === 'reservation' ? 'AN-RES' : 'AN-MSG');

    lock.waitLock(10000);
    lockAcquired = true;

    if (type === 'contact') {
      saveContact_(spreadsheet, payload, timestamp, referenceId);
    } else if (type === 'reservation') {
      saveReservation_(spreadsheet, payload, timestamp, referenceId);
    } else {
      throw new Error('Unknown submission type.');
    }

    return jsonOutput_({
      status: 'success',
      message: type === 'reservation'
        ? 'Reservation enquiry saved.'
        : 'Contact message saved.',
      referenceId: referenceId,
    });
  } catch (error) {
    console.error(error && error.stack ? error.stack : error);
    return jsonOutput_({
      status: 'error',
      message: error && error.message ? error.message : 'The form could not be saved.',
    });
  } finally {
    if (lockAcquired) lock.releaseLock();
  }
}

function saveContact_(spreadsheet, data, timestamp, referenceId) {
  const name = requiredText_(data.name, 'Name', 120);
  const email = requiredEmail_(data.email);
  const message = requiredText_(data.message, 'Message', 5000);
  const phone = cleanText_(data.phone, 80);
  const subject = cleanText_(data.subject, 180) || 'General enquiry';

  const sheet = ensureSheet_(spreadsheet, CONTACT_SHEET, CONTACT_HEADERS);
  sheet.appendRow([
    timestamp,
    referenceId,
    safeCell_(name),
    safeCell_(email),
    safeCell_(phone),
    safeCell_(subject),
    safeCell_(message),
    safeCell_(cleanText_(data.source, 100) || 'website'),
    safeCell_(cleanText_(data.pageUrl, 500)),
    'New',
  ]);
}

function saveReservation_(spreadsheet, data, timestamp, referenceId) {
  const fullName = requiredText_(data.fullName, 'Full name', 120);
  const email = requiredEmail_(data.email);
  const arrivalDate = requiredText_(data.arrivalDate, 'Arrival date', 20);
  const departureDate = requiredText_(data.departureDate, 'Departure date', 20);
  const arrival = parseIsoDate_(arrivalDate, 'Arrival date');
  const departure = parseIsoDate_(departureDate, 'Departure date');
  const nights = Math.round((departure.getTime() - arrival.getTime()) / 86400000);

  if (nights < 2) {
    throw new Error('Departure must be at least two nights after arrival.');
  }

  const adults = numberInRange_(data.adults, 'Adults', 1, 20);
  const children = numberInRange_(data.children, 'Children', 0, 20);
  const suiteId = requiredText_(data.suiteId, 'Suite', 160);
  const suiteName = requiredText_(data.suiteName, 'Suite name', 180);

  const sheet = ensureSheet_(spreadsheet, RESERVATION_SHEET, RESERVATION_HEADERS);
  sheet.appendRow([
    timestamp,
    referenceId,
    arrivalDate,
    departureDate,
    nights,
    safeCell_(suiteId),
    safeCell_(suiteName),
    adults,
    children,
    safeCell_(cleanText_(data.transferPreference, 100)),
    data.butlerServiceRequested === true ? 'Yes' : 'No',
    safeCell_(fullName),
    safeCell_(email),
    safeCell_(cleanText_(data.phone, 80)),
    safeCell_(cleanText_(data.country, 120)),
    safeCell_(cleanText_(data.specialRequests, 3000)),
    safeCell_(cleanText_(data.dietaryNotes, 2000)),
    safeNumber_(data.estimatedSubtotal),
    safeNumber_(data.serviceCharge),
    safeNumber_(data.estimatedTotal),
    safeCell_(cleanText_(data.source, 100) || 'website'),
    safeCell_(cleanText_(data.pageUrl, 500)),
    'New enquiry — not a confirmed booking',
  ]);
}

function getDatabaseSpreadsheet_() {
  const id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  if (!id) {
    throw new Error('Database is not configured. Run setupDatabase() from the bound spreadsheet first.');
  }
  return SpreadsheetApp.openById(id);
}

function ensureSheet_(spreadsheet, sheetName, headers) {
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) sheet = spreadsheet.insertSheet(sheetName);

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setFontColor('#F4EFE5')
      .setBackground('#171719')
      .setWrap(true);
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
  }
  return sheet;
}

function parsePayload_(e) {
  if (!e) throw new Error('No request was received.');

  // Supports JSON POST bodies and a regular form field named "payload".
  if (e.parameter && e.parameter.payload) {
    return JSON.parse(e.parameter.payload);
  }
  if (e.postData && e.postData.contents) {
    return JSON.parse(e.postData.contents);
  }
  throw new Error('The request body is empty or invalid.');
}

function requiredText_(value, label, maxLength) {
  const result = cleanText_(value, maxLength);
  if (!result) throw new Error(label + ' is required.');
  return result;
}

function requiredEmail_(value) {
  const email = cleanText_(value, 200);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Please provide a valid email address.');
  }
  return email;
}

function cleanText_(value, maxLength) {
  if (value === null || value === undefined) return '';
  return String(value).replace(/\u0000/g, '').trim().slice(0, maxLength);
}

// Prevent user-provided text from being interpreted as a spreadsheet formula.
function safeCell_(value) {
  const text = cleanText_(value, 5000);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function safeNumber_(value) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : 0;
}

function numberInRange_(value, label, min, max) {
  const number = Number(value);
  if (!Number.isInteger(number) || number < min || number > max) {
    throw new Error(label + ' is invalid.');
  }
  return number;
}

function parseIsoDate_(value, label) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error(label + ' must use YYYY-MM-DD format.');
  const date = new Date(value + 'T00:00:00Z');
  if (isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    throw new Error(label + ' is invalid.');
  }
  return date;
}

function createReferenceId_(prefix) {
  const datePart = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd-HHmmss');
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return prefix + '-' + datePart + '-' + randomPart;
}

function jsonOutput_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
