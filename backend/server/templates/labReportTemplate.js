const labReportTemplate = (report) => {
  const rows = (report.results || [])
    .map(
      (item) => `
      <tr>
        <td>${item.parameter || ""}</td>
        <td>${item.value || ""}</td>
        <td>${item.unit || ""}</td>
        <td>${item.referenceRange || ""}</td>
        <td>${item.remarks || ""}</td>
      </tr>
    `,
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Laboratory Report</title>

<style>
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial,Helvetica,sans-serif;
}

body{
    background:#f3f4f6;
    padding:30px;
}

.container{
    width:100%;
    max-width:950px;
    margin:auto;
    background:#fff;
    border-radius:15px;
    padding:35px;
    border:1px solid #ddd;
}

.header{
    display:flex;
    justify-content:space-between;
    align-items:flex-start;
    border-bottom:2px solid #ddd;
    padding-bottom:20px;
}

.title{
    color:#7c3aed;
    font-size:30px;
    font-weight:bold;
}

.report-id{
    color:#666;
    margin-top:8px;
}

.info{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:40px;
    margin-top:35px;
}

.item{
    margin-bottom:18px;
}

.label{
    font-size:13px;
    color:#666;
    margin-bottom:5px;
}

.value{
    font-size:16px;
    font-weight:bold;
    color:#222;
}

.section-title{
    margin-top:40px;
    margin-bottom:15px;
    font-size:22px;
    font-weight:bold;
    color:#222;
}

table{
    width:100%;
    border-collapse:collapse;
}

thead{
    background:#7c3aed;
    color:white;
}

th,td{
    border:1px solid #ddd;
    padding:12px;
    text-align:left;
    font-size:14px;
}

tbody tr:nth-child(even){
    background:#fafafa;
}

.remarks-box{
    margin-top:15px;
    border:1px solid #ddd;
    border-radius:8px;
    background:#f9fafb;
    padding:18px;
    min-height:90px;
}

.footer{
    margin-top:50px;
    border-top:2px solid #ddd;
    padding-top:25px;
    display:flex;
    justify-content:space-between;
}

.small{
    color:#666;
    font-size:13px;
}

.bold{
    font-weight:bold;
    margin-top:5px;
}

.status{
    color:green;
    font-weight:bold;
}
</style>

</head>

<body>

<div class="container">

<div class="header">

<div>
<div class="title">Laboratory Report</div>
<div class="report-id">
Report ID : ${report.reportId}
</div>
</div>

</div>

<div class="info">

<div>

<div class="item">
<div class="label">Laboratory</div>
<div class="value">${report.laboratoryId?.labName || "CareScynify Laboratory"}</div>
</div>

<div class="item">
<div class="label">Patient</div>
<div class="value">
${report.labPatientId?.name || report.patientId?.userId?.name || "Unknown Patient"}
</div>
</div>

<div class="item">
<div class="label">Sample ID</div>
<div class="value">
${report.sampleId?.sampleId || ""}
</div>
</div>

</div>

<div>

<div class="item">
<div class="label">Date</div>
<div class="value">
${new Date(report.createdAt).toLocaleDateString()}
</div>
</div>

<div class="item">
<div class="label">Status</div>
<div class="status">
${report.reportStatus}
</div>
</div>

</div>

</div>

<div class="section-title">
Test Results
</div>

<table>

<thead>
<tr>
<th>Parameter</th>
<th>Value</th>
<th>Unit</th>
<th>Reference Range</th>
<th>Remarks</th>
</tr>
</thead>

<tbody>

${rows}

</tbody>

</table>

<div class="section-title">
Overall Remarks
</div>

<div class="remarks-box">
${report.overallRemarks || "No remarks available."}
</div>

<div class="footer">

<div>
<div class="small">
Verified By
</div>

<div class="bold">
${report.verifiedBy?.name || "Laboratory Staff"}
</div>
</div>

<div style="text-align:right">

<div class="small">
CareScynify Laboratory
</div>

<div class="small">
Computer Generated Report
</div>

</div>

</div>

</div>

</body>
</html>
`;
};

export default labReportTemplate;
