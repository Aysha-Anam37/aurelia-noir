export type ContactSubmission = {
  type: 'contact';
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  source?: string;
  pageUrl?: string;
};

export type ReservationSubmission = {
  type: 'reservation';
  arrivalDate: string;
  departureDate: string;
  nights: number;
  suiteId: string;
  suiteName: string;
  adults: number;
  children: number;
  transferPreference: string;
  butlerServiceRequested: boolean;
  fullName: string;
  email: string;
  phone?: string;
  country?: string;
  specialRequests?: string;
  dietaryNotes?: string;
  estimatedSubtotal?: number;
  serviceCharge?: number;
  estimatedTotal?: number;
  source?: string;
  pageUrl?: string;
};

export type AppsScriptResult = {
  status: 'success';
  message: string;
  referenceId: string;
};

type AppsScriptError = {
  status?: 'error';
  message?: string;
};

/**
 * Sends form data to the Google Apps Script web app.
 * Configure VITE_APPS_SCRIPT_URL in .env.local for local testing and in
 * Vercel's project environment variables for the deployed website.
 */
export async function submitToAppsScript(
  payload: ContactSubmission | ReservationSubmission,
): Promise<AppsScriptResult> {
  const endpoint = import.meta.env.VITE_APPS_SCRIPT_URL?.trim();

  if (!endpoint) {
    throw new Error(
      'The form backend is not configured yet. Add VITE_APPS_SCRIPT_URL and rebuild the website.',
    );
  }

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      redirect: 'follow',
      // text/plain avoids an application/json CORS preflight with Apps Script.
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      'We could not confirm the submission. Please check your connection and the spreadsheet before trying again.',
    );
  }

  let result: AppsScriptResult | AppsScriptError;
  try {
    result = (await response.json()) as AppsScriptResult | AppsScriptError;
  } catch {
    throw new Error(
      'The backend did not return a readable confirmation. Check the Apps Script deployment and spreadsheet before retrying.',
    );
  }

  if (!response.ok || result.status !== 'success' || !('referenceId' in result)) {
    throw new Error(
      ('message' in result && result.message) ||
        'The submission could not be saved. Please try again.',
    );
  }

  return result;
}
