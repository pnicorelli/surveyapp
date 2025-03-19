# Layout Survey App

A serverless web-based survey application built with Google Apps Script that allows users to vote for their preferred layout design. The application displays multiple layout options, records votes in a Google Spreadsheet, and shows a thank you message after submission.

## Features

- Customizable title and description
- Display multiple images for voting
- Secure vote storage in Google Sheets
- Real-time results aggregation
- Two-step voting process with confirmation
- Anonymous voting system
- Timestamp recording for all submissions

## How It Works

The application consists of:
1. A Google Spreadsheet for data storage
2. Google Apps Script files (`Code.gs` and `Index.html`)
3. A web interface deployed as a Google Web App

When a user selects a layout and confirms their choice, the vote is recorded in the spreadsheet with a timestamp.

## Setup Instructions

### Step 1: Set Up the Google Spreadsheet

1. Make a copy of the Google Sheet template:
   [Layout Survey Template](https://docs.google.com/spreadsheets/d/1u-OKV3wOm1TSTV9ZfKsUkPRn4ymQ_zatYBUSOhudWuw/copy)
2. Go to the "data" sheet and remove all existing entries
3. Configure your survey on the "config" sheet:
   - Set your survey title
   - Add a description
   - Add images using the format: `[Image title, Image URL]`

### Step 2: Create the Apps Script Project

1. In your Google Spreadsheet, click on **Extensions** > **Apps Script**
2. In the Apps Script editor, replace the default code with the content of `Code.gs` from this repository
3. Click the "+" icon next to "Files" and select "HTML file"
4. Name the file "Index" and paste the content of `Index.html` from this repository
5. Save all files (Ctrl+S or ⌘+S)

### Step 3: Deploy as Web App

1. Click on **Deploy** > **New deployment**
2. Select **Web app** as the deployment type
3. Configure the deployment:
   - Description: "Layout Survey App" (or any name you prefer)
   - Execute as: "Me" (your account)
   - Who has access: Choose "Anyone" (for public surveys) or "Anyone within [your organization]" (for internal use)
4. Click **Deploy**
5. Copy the generated web app URL

Your survey is now live and ready to collect responses!

## Customization

### Updating Survey Images

To change the survey images, simply update the images list on the "config" sheet in your spreadsheet:
- Each row should contain an image title and its URL
- You can host images on any public service or Google Drive (with appropriate sharing permissions)

### Customizing the Design

Modify the appearance by editing the CSS in the `<style>` section of `Index.html`:

- Change the color scheme by updating `background-color` and `color` properties
- Adjust typography with `font-size` and `font-family` properties
- Modify spacing using `margin` and `padding` values
- Update button and border styles as needed

## Viewing Results

- All votes are recorded in the "data" sheet with timestamps
- The "result" sheet includes pre-built aggregation formulas for quick analysis
- Create custom formulas or charts for more detailed visualization of the voting data

## License

This project is available under the MIT License. You are free to modify and distribute it as needed.