# Aurelia Noir — Google Sheets backend setup

The frontend has two forms wired to a Google Apps Script endpoint:

- Contact page → `ContactMessages` tab
- Reservation page → `ReservationEnquiries` tab

Reservation submissions are saved as **enquiries**, not confirmed bookings. This is a fictional website, so no real room availability or booking service exists.

## Part 1 — Create the Google Sheet database

1. Create a new Google Sheet named **Aurelia Noir Database**.
2. In that sheet, open **Extensions → Apps Script**.
3. In `Code.gs`, replace the default contents with the complete code in `apps-script/Code.gs` from this ZIP.
4. Save the script.
5. In the Apps Script function dropdown, select `setupDatabase` and click **Run**.
6. Approve Google's permissions when asked. Run `setupDatabase` only once for initial setup. It creates `ContactMessages` and `ReservationEnquiries` tabs and stores the spreadsheet ID in the script's properties.
7. Return to the spreadsheet and confirm those two tabs exist.

## Part 2 — Deploy the web app

1. In Apps Script, choose **Deploy → New deployment**.
2. Select the gear/type selector and choose **Web app**.
3. Set **Execute as** to **Me**.
4. Set **Who has access** to **Anyone** so public visitors can submit the site's forms.
5. Click **Deploy** and complete authorisation if prompted.
6. Copy the web app URL. It should end with `/exec`. Keep this URL private from unnecessary sharing; the endpoint is public because the website's visitors need to use it.
7. Open the `/exec` URL in a browser. It should show JSON stating that the Aurelia Noir form backend is online.

Whenever you later edit the Apps Script code, go to **Deploy → Manage deployments → Edit** and deploy a new version so the live endpoint uses your changes.

## Part 3 — Connect the frontend locally

Create a file named `.env.local` in the project root (beside `package.json`) with:

```env
VITE_APPS_SCRIPT_URL="PASTE_YOUR_APPS_SCRIPT_WEB_APP_EXEC_URL_HERE"
```

Replace the placeholder with your actual `/exec` URL. Do not include angle brackets. Restart the development server after changing environment variables.

## Part 4 — Connect the deployed Vercel site

In Vercel, open the project → **Settings → Environment Variables**. Add:

- Name: `VITE_APPS_SCRIPT_URL`
- Value: your Apps Script `/exec` URL
- Environments: Production (and Preview too if you use preview deployments)

Save the setting, then redeploy the website so Vite can include the endpoint in the build.

## Part 5 — Test both forms

1. Open the deployed website.
2. Submit a test message from the Contact page using your own test details.
3. Open `ContactMessages` and verify a new row appears.
4. Submit a test reservation enquiry using dates at least two nights apart.
5. Open `ReservationEnquiries` and verify a new row appears, including a reference ID and the selected suite information.
6. Check that invalid emails and invalid date ranges are rejected by the frontend and backend.

The frontend expects the Apps Script response to be readable by the browser. Apps Script cross-origin requests can sometimes be affected by browser/CORS or Google redirect behaviour. If the form displays a connection/confirmation error, first check the relevant spreadsheet tab and the Apps Script **Executions** page before submitting again; the request might have reached Apps Script even if the browser could not read its response.

## Data fields saved

### ContactMessages
Timestamp, reference ID, name, email, phone, subject, message, source, page URL, status.

### ReservationEnquiries
Timestamp, reference ID, arrival and departure, nights, suite ID/name, adults, children, transfer preference, butler preference, contact details, country, special requests, dietary notes, estimate fields, page URL, and status.

## Security and privacy note

This is a simple portfolio/demo backend. Anyone who obtains the public endpoint can attempt to submit data, and this simple endpoint does not provide authentication or strong abuse prevention. Do not collect payment details, identity documents, or sensitive personal data through it. For a real hotel booking system, add appropriate spam controls, privacy disclosures, authentication where needed, and a proper booking backend.
