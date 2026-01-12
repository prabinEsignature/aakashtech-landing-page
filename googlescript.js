function doPost(e) {
  const data = JSON.parse(e.postData.contents);

  const htmlBody = `
    <h3>New Contact Form Submission</h3>
    <p><b>Full Name:</b> ${data.full_name || "N/A"}</p>
    <p><b>Email:</b> ${data.email}</p>
    <p><b>Phone:</b> ${data.phone || "N/A"}</p>
    <p><b>Company:</b> ${data.company || "N/A"}</p>
    <p><b>Service:</b> ${data.service}</p>
    <p><b>Message:</b><br>${data.message}</p>
  `;

  MailApp.sendEmail({
    to: "nepalsharekhabar9823@gmail.com",
    subject: "New Business Inquiry",
    htmlBody: htmlBody
  });

  return ContentService
    .createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
