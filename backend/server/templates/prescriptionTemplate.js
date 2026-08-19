const escapeHtml = (value) => {
  if (value === null || value === undefined) return "";

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const getDoctorName = (doctor) => {
  const user = doctor?.userId || {};

  return (
    user?.name ||
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    "Doctor"
  );
};

const getPatientName = (patient) => {
  if (!patient) return "Patient";

  const user = patient?.userId || {};

  return (
    patient?.name ||
    user?.name ||
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    "Patient"
  );
};

const formatDate = (date) => {
  if (!date) return "N/A";

  try {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "N/A";
  }
};

const formatMultiline = (value) => {
  if (!value) return "";

  return String(value)
    .split("\n")
    .map((item) => escapeHtml(item.trim()))
    .filter(Boolean)
    .join("<br />");
};

const prescriptionTemplate = (prescription) => {
  /*
  
  | Doctor
  
  */

  const doctor = prescription?.doctorId || {};
  const doctorUser = doctor?.userId || {};

  const doctorName = getDoctorName(doctor);

  const specialization =
    doctor?.specialization ||
    "";

  const qualifications =
    doctor?.qualifications ||
    doctor?.qualification ||
    "";

  const doctorId =
    doctor?.drId ||
    "";

  /*
  
  | Digital Signature
  
  */

  const signatureUrl =
    typeof doctor?.digitalSignature === "string"
      ? doctor.digitalSignature
      : doctor?.digitalSignature?.url || "";

  /*
  
  | Workplace
  
  */

  /*
   * IMPORTANT:
   * The controller attaches the resolved workplace object as
   * `prescriptionForPdf._doc.workplace = workplace` (see
   * prescriptionController.js). `workplaceId` on the schema is
   * just a raw ObjectId with no name/location — reading from it
   * here always fell back to the "Consultation Workplace" /
   * "Location not available" defaults.
   */
  const workplace = prescription?.workplace || {};

  const workplaceName =
    workplace?.name ||
    workplace?.workplaceName ||
    "Consultation Workplace";

  const workplaceLocation =
    workplace?.location ||
    workplace?.address ||
    [workplace?.city].filter(Boolean).join(", ") ||
    "Location not available";

  /*
  
  | Patient
  
  */

  const patient = prescription?.patientId || {};

  const patientName = getPatientName(patient);

  /*
  
  | Appointment
  
  */

  const appointment = prescription?.appointmentId || {};

  const appointmentCustomId =
    appointment?.appointmentId ||
    "";

  const appointmentDate =
    appointment?.date ||
    appointment?.appointmentDate ||
    prescription?.createdAt ||
    null;

  const appointmentTime =
    appointment?.appointmentTime ||
    "";

  const consultationType =
    appointment?.consultationType ||
    "";

  /*
  
  | Prescription Data
  
  */

  const prescriptionId =
    prescription?.prescriptionId ||
    "N/A";

  const diagnosis =
    prescription?.diagnosis ||
    "";

  const symptoms =
    Array.isArray(prescription?.symptoms)
      ? prescription.symptoms
      : [];

  const medicines =
    Array.isArray(prescription?.medicines)
      ? prescription.medicines
      : [];

  const labTests =
    Array.isArray(prescription?.labTests)
      ? prescription.labTests
      : [];

  const advice =
    prescription?.advice ||
    "";

  const followUpDate =
    prescription?.followUpDate ||
    null;

  /*
  
  | Medicines HTML
  
  */

  const medicinesHtml = medicines.length
    ? `
      <table class="medicine-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Medicine</th>
            <th>Dosage</th>
            <th>Frequency</th>
            <th>Duration</th>
          </tr>
        </thead>

        <tbody>
          ${medicines
            .map(
              (item, index) => `
                <tr>
                  <td>${index + 1}</td>

                  <td class="medicine-name">
                    ${escapeHtml(item?.medicine || "")}
                  </td>

                  <td>
                    ${escapeHtml(item?.dosage || "")}
                  </td>

                  <td>
                    ${escapeHtml(item?.frequency || "")}
                  </td>

                  <td>
                    ${escapeHtml(item?.duration || "")}
                  </td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    `
    : `
      <div class="empty-box">
        No medicines prescribed.
      </div>
    `;

  /*
  
  | Symptoms HTML
  
  */

  const symptomsHtml = symptoms.length
    ? `
      <ul class="list">
        ${symptoms
          .map(
            (item) => `
              <li>${escapeHtml(item)}</li>
            `,
          )
          .join("")}
      </ul>
    `
    : `
      <div class="empty-text">
        No symptoms recorded.
      </div>
    `;

  /*
  
  | Lab Tests HTML
  
  */

  const labTestsHtml = labTests.length
    ? `
      <ul class="list">
        ${labTests
          .map(
            (item) => `
              <li>${escapeHtml(item)}</li>
            `,
          )
          .join("")}
      </ul>
    `
    : `
      <div class="empty-text">
        No laboratory tests recommended.
      </div>
    `;

  /*
  
  | Signature HTML
  
  */

  const signatureHtml = signatureUrl
    ? `
      <div class="signature-container">

        <img
          src="${escapeHtml(signatureUrl)}"
          class="signature"
          alt="Doctor Digital Signature"
        />

        <div class="signature-line"></div>

        <div class="signature-name">
          Dr. ${escapeHtml(doctorName)}
        </div>

        ${
          specialization
            ? `
              <div class="signature-specialization">
                ${escapeHtml(specialization)}
              </div>
            `
            : ""
        }

      </div>
    `
    : `
      <div class="signature-container no-signature">

        <div class="signature-space"></div>

        <div class="signature-line"></div>

        <div class="signature-name">
          Dr. ${escapeHtml(doctorName)}
        </div>

      </div>
    `;

  /*
  
  | Return Complete HTML
  
  */

  return `
<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8" />

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
/>

<title>
  Prescription ${escapeHtml(prescriptionId)}
</title>

<style>

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;

    font-family:
      Arial,
      Helvetica,
      sans-serif;

    color: #1e293b;

    background: #ffffff;

    font-size: 13px;

    line-height: 1.5;
  }

  .page {
    width: 100%;
    min-height: 100vh;

    padding: 10px 5px;
  }

  /*
  
  | Header
  
  */

  .header {
    border: 1px solid #e2e8f0;

    border-radius: 12px;

    padding: 22px;

    margin-bottom: 18px;

    background: #ffffff;
  }

  .header-top {
    display: flex;

    justify-content: space-between;

    align-items: flex-start;

    gap: 30px;
  }

  .doctor-info {
    flex: 1;
  }

  .doctor-name {
    font-size: 24px;

    font-weight: 700;

    color: #111827;

    margin-bottom: 4px;
  }

  .doctor-specialization {
    font-size: 15px;

    font-weight: 600;

    color: #7c3aed;

    margin-bottom: 3px;
  }

  .doctor-qualification {
    color: #64748b;

    font-size: 13px;

    margin-bottom: 5px;
  }

  .doctor-id {
    color: #64748b;

    font-size: 12px;
  }

  .doctor-id strong {
    color: #334155;
  }

  /*
  
  | Workplace
  
  */

  .workplace {
    width: 230px;

    text-align: right;
  }

  .workplace-label {
    text-transform: uppercase;

    letter-spacing: 1px;

    color: #94a3b8;

    font-size: 9px;

    font-weight: 700;

    margin-bottom: 3px;
  }

  .workplace-name {
    font-size: 15px;

    font-weight: 700;

    color: #1e293b;
  }

  .workplace-location {
    color: #64748b;

    font-size: 11px;

    margin-top: 3px;
  }

  .consultation-type {
    display: inline-block;

    margin-top: 7px;

    padding: 4px 10px;

    border-radius: 20px;

    background: #f3e8ff;

    color: #7c3aed;

    font-size: 9px;

    font-weight: 600;

    text-transform: capitalize;
  }

  /*
  
  | Divider
  
  */

  .divider {
    height: 1px;

    background: #e2e8f0;

    margin: 18px 0;
  }

  /*
  
  | Patient Information
  
  */

  .patient-grid {
    display: grid;

    grid-template-columns:
      1.5fr
      1fr
      1fr
      1fr;

    gap: 0;

    border-bottom: 1px solid #e2e8f0;

    padding: 12px 0;
  }

  .info-item {
    padding: 2px 16px;

    border-left: 1px solid #e2e8f0;
  }

  .info-item:first-child {
    border-left: none;

    padding-left: 0;
  }

  .info-label {
    display: block;

    font-size: 9px;

    color: #94a3b8;

    text-transform: uppercase;

    letter-spacing: 0.7px;

    margin-bottom: 3px;
  }

  .info-value {
    display: block;

    font-size: 13px;

    color: #1e293b;

    font-weight: 700;

    word-break: break-word;
  }

  /*
  
  | Prescription ID
  
  */

  .prescription-id {
    margin-top: 12px;

    text-align: right;

    color: #64748b;

    font-size: 10px;
  }

  .prescription-id strong {
    color: #334155;
  }

  /*
  
  | Section
  
  */

  .section {
    margin-top: 18px;

    page-break-inside: avoid;
  }

  /*
   * NOTE:
   * Purple bottom-border under each section title removed
   * (per request). Bold heading text is kept and the spacing
   * below the heading is increased so sections still feel
   * visually separated without the line.
   */
  .section-title {
    display: flex;

    align-items: center;

    gap: 8px;

    font-size: 15px;

    font-weight: 700;

    color: #1e293b;

    margin-bottom: 14px;
  }

  .section-content {
    color: #475569;

    font-size: 12px;

    padding: 3px 2px;
  }

  /*
  
  | Diagnosis
  
  */

  .diagnosis-box {
    background: #f8fafc;

    border-left: 4px solid #6366f1;

    padding: 11px 13px;

    border-radius: 6px;

    color: #334155;

    white-space: pre-wrap;

    word-break: break-word;
  }

  /*
  
  | Lists
  
  */

  .list {
    margin: 0;

    padding-left: 22px;
  }

  .list li {
    margin-bottom: 5px;

    color: #475569;
  }

  /*
  
  | Medicines
  
  */

  .medicine-table {
    width: 100%;

    border-collapse: collapse;

    margin-top: 5px;

    font-size: 11px;
  }

  .medicine-table th {
    background: #f3e8ff;

    color: #5b21b6;

    font-weight: 700;

    padding: 9px 7px;

    text-align: left;

    border: 1px solid #ddd6fe;
  }

  .medicine-table td {
    padding: 8px 7px;

    border: 1px solid #e2e8f0;

    color: #475569;

    vertical-align: top;
  }

  .medicine-table tbody tr:nth-child(even) {
    background: #f8fafc;
  }

  .medicine-name {
    font-weight: 700;

    color: #1e293b !important;
  }

  /*
  
  | Advice
  
  */

  .advice-box {
    background: #fff7ed;

    border-left: 4px solid #f97316;

    padding: 11px 13px;

    border-radius: 6px;

    color: #475569;

    white-space: pre-wrap;

    word-break: break-word;
  }

  /*
  
  | Follow Up
  
  */

  .follow-up-box {
    display: inline-block;

    padding: 9px 14px;

    background: #f5f3ff;

    border: 1px solid #ddd6fe;

    border-radius: 8px;

    color: #5b21b6;

    font-weight: 600;

    font-size: 12px;
  }

  /*
  
  | Empty
  
  */

  .empty-box {
    padding: 10px;

    background: #f8fafc;

    border: 1px dashed #cbd5e1;

    border-radius: 6px;

    color: #94a3b8;

    text-align: center;

    font-size: 11px;
  }

  .empty-text {
    color: #94a3b8;

    font-style: italic;
  }

  /*
  
  | Footer / Signature
  
  */

  .footer {
    margin-top: 35px;

    display: flex;

    justify-content: flex-end;

    page-break-inside: avoid;
  }

  .signature-container {
    width: 190px;

    text-align: center;
  }

  .signature {
    display: block;

    width: 150px;

    height: 65px;

    object-fit: contain;

    margin: 0 auto 3px auto;
  }

  .signature-space {
    height: 65px;
  }

  .signature-line {
    border-top: 1px solid #94a3b8;

    width: 180px;

    margin: 0 auto;
  }

  .signature-name {
    margin-top: 4px;

    font-weight: 700;

    color: #334155;

    font-size: 11px;
  }

  .signature-specialization {
    color: #64748b;

    font-size: 9px;

    margin-top: 1px;
  }

  /*
  
  | Bottom Footer
  
  */

  .document-footer {
    margin-top: 25px;

    padding-top: 10px;

    border-top: 1px solid #e2e8f0;

    text-align: center;

    color: #94a3b8;

    font-size: 8px;
  }

  /*
  
  | Print
  
  */

  @media print {

    /*
    |------------------------------------------------------------------------
    | BLACK & WHITE PRINT SAFETY
    |------------------------------------------------------------------------
    |
    | The screen version leans on colored backgrounds/borders
    | (purple, orange, indigo) to separate sections. Those washes
    | out or disappears on a black & white printer/copier.
    |
    | Below, every colored cue is replaced with a solid black
    | border and black text so the document stays fully legible
    | even when printed or photocopied without color.
    |------------------------------------------------------------------------
    */

    body {
      -webkit-print-color-adjust: exact;

      print-color-adjust: exact;

      color: #000000;
    }

    .page {
      background: #ffffff;
    }

    .section {
      page-break-inside: avoid;
    }

    .medicine-table {
      page-break-inside: auto;
    }

    .medicine-table tr {
      page-break-inside: avoid;

      page-break-after: auto;
    }

    /* Header */

    .header {
      border: 1px solid #000000;
    }

    .doctor-name,
    .doctor-specialization,
    .doctor-qualification,
    .doctor-id,
    .doctor-id strong,
    .workplace-name,
    .workplace-location,
    .info-value,
    .prescription-id strong,
    .section-title,
    .medicine-name,
    .signature-name {
      color: #000000 !important;
    }

    .divider {
      background: #000000;
    }

    /* Patient info row */

    .patient-grid {
      border-bottom: 1px solid #000000;
    }

    .info-item {
      border-left: 1px solid #000000;
    }

    .info-item:first-child {
      border-left: none;
    }

    /* Consultation type badge */

    .consultation-type {
      background: #ffffff;

      border: 1px solid #000000;

      color: #000000 !important;
    }

    /* Diagnosis box */

    .diagnosis-box {
      background: #ffffff;

      border: 1px solid #000000;

      border-left: 4px solid #000000;

      color: #000000;
    }

    /* Medicines table */

    .medicine-table th {
      background: #ffffff;

      color: #000000;

      border: 1px solid #000000;
    }

    .medicine-table td {
      border: 1px solid #000000;

      color: #000000;
    }

    .medicine-table tbody tr:nth-child(even) {
      background: #ffffff;
    }

    /* Advice box */

    .advice-box {
      background: #ffffff;

      border: 1px solid #000000;

      border-left: 4px solid #000000;

      color: #000000;
    }

    /* Follow-up box */

    .follow-up-box {
      background: #ffffff;

      border: 1px solid #000000;

      color: #000000;
    }

    /* Empty state boxes */

    .empty-box,
    .empty-text {
      color: #000000;

      border-color: #000000;
    }

    /* Signature */

    .signature-line {
      border-top: 1px solid #000000;
    }

    /* Document footer */

    .document-footer {
      border-top: 1px solid #000000;

      color: #000000;
    }

  }

</style>

</head>

<body>

<div class="page">

  <!-- ======================================================
       DOCTOR HEADER
  ======================================================= -->

  <div class="header">

    <div class="header-top">

      <div class="doctor-info">

        <div class="doctor-name">
          Dr. ${escapeHtml(doctorName)}
        </div>

        ${
          specialization
            ? `
              <div class="doctor-specialization">
                ${escapeHtml(specialization)}
              </div>
            `
            : ""
        }

        ${
          qualifications
            ? `
              <div class="doctor-qualification">
                ${escapeHtml(qualifications)}
              </div>
            `
            : ""
        }

        ${
          doctorId
            ? `
              <div class="doctor-id">
                Doctor ID:
                <strong>
                  ${escapeHtml(doctorId)}
                </strong>
              </div>
            `
            : ""
        }

      </div>


      <!-- WORKPLACE -->

      <div class="workplace">

        <div class="workplace-label">
          Consultation Workplace
        </div>

        <div class="workplace-name">
          ${escapeHtml(workplaceName)}
        </div>

        <div class="workplace-location">
          ${escapeHtml(workplaceLocation)}
        </div>

        ${
          consultationType
            ? `
              <div class="consultation-type">
                ${escapeHtml(
                  String(consultationType).replace(/_/g, " "),
                )}
              </div>
            `
            : ""
        }

      </div>

    </div>


    <div class="divider"></div>


    <!-- PATIENT INFORMATION -->

    <div class="patient-grid">

      <div class="info-item">

        <span class="info-label">
          Patient
        </span>

        <span class="info-value">
          ${escapeHtml(patientName)}
        </span>

      </div>


      <div class="info-item">

        <span class="info-label">
          Appointment ID
        </span>

        <span class="info-value">
          ${escapeHtml(appointmentCustomId || "N/A")}
        </span>

      </div>


      <div class="info-item">

        <span class="info-label">
          Date
        </span>

        <span class="info-value">
          ${escapeHtml(formatDate(appointmentDate))}
        </span>

      </div>


      <div class="info-item">

        <span class="info-label">
          Time
        </span>

        <span class="info-value">
          ${escapeHtml(appointmentTime || "N/A")}
        </span>

      </div>

    </div>


    <div class="prescription-id">

      Prescription ID:

      <strong>
        ${escapeHtml(prescriptionId)}
      </strong>

    </div>

  </div>


  <!-- ======================================================
       DIAGNOSIS
  ======================================================= -->

  <div class="section">

    <div class="section-title">
      Diagnosis
    </div>

    <div class="section-content">

      ${
        diagnosis
          ? `
            <div class="diagnosis-box">
              ${formatMultiline(diagnosis)}
            </div>
          `
          : `
            <div class="empty-text">
              No diagnosis recorded.
            </div>
          `
      }

    </div>

  </div>


  <!-- ======================================================
       SYMPTOMS
  ======================================================= -->

  <div class="section">

    <div class="section-title">
      Symptoms
    </div>

    <div class="section-content">

      ${symptomsHtml}

    </div>

  </div>


  <!-- ======================================================
       MEDICINES
  ======================================================= -->

  <div class="section">

    <div class="section-title">
      Medicines
    </div>

    <div class="section-content">

      ${medicinesHtml}

    </div>

  </div>


  <!-- ======================================================
       LAB TESTS
  ======================================================= -->

  <div class="section">

    <div class="section-title">
      Recommended Lab Tests
    </div>

    <div class="section-content">

      ${labTestsHtml}

    </div>

  </div>


  <!-- ======================================================
       ADVICE
  ======================================================= -->

  <div class="section">

    <div class="section-title">
      Advice
    </div>

    <div class="section-content">

      ${
        advice
          ? `
            <div class="advice-box">
              ${formatMultiline(advice)}
            </div>
          `
          : `
            <div class="empty-text">
              No advice provided.
            </div>
          `
      }

    </div>

  </div>


  <!-- ======================================================
       FOLLOW UP
  ======================================================= -->

  <div class="section">

    <div class="section-title">
      Follow-up
    </div>

    <div class="section-content">

      ${
        followUpDate
          ? `
            <div class="follow-up-box">
              Follow-up Date:
              ${escapeHtml(formatDate(followUpDate))}
            </div>
          `
          : `
            <div class="empty-text">
              No follow-up date specified.
            </div>
          `
      }

    </div>

  </div>


  <!-- ======================================================
       SIGNATURE
  ======================================================= -->

  <div class="footer">

    ${signatureHtml}

  </div>


  <!-- ======================================================
       DOCUMENT FOOTER
  ======================================================= -->

  <div class="document-footer">

    This prescription was digitally generated by CareScynify.

    <br />

    Prescription ID:
    ${escapeHtml(prescriptionId)}

  </div>

</div>

</body>

</html>
`;
};

export default prescriptionTemplate;