const dotenv = require('dotenv');
dotenv.config({path:'config.env'});

// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// const msg = {
//   to: 'nikhilrm8923@gmail.com', // Change to your recipient
//   from: 'nik.theappideas@gmail.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })

const sendWelcomeMail = function (to) {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
    to,
    from: 'nik.theappideas@gmail.com',
    subject: 'Registered successfully',
    // text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>Welcome...</strong>',
    }
    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })
}

const { reportsByDateDev, reportsByDateDes, reportsByDateBde } = require('../helpers/dailyReports');
const sendReportMail = async () => {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    // Get reports
    const start = new Date(new Date().toJSON().slice(0, 10));
    start.setHours(0,0,0,0);
    const end = new Date(new Date().toJSON().slice(0, 10));
    end.setHours(23,59,59,999);

    const devReports = await reportsByDateDev(start, end);
    const desReports = await reportsByDateDes(start, end);
    const bdeReports = await reportsByDateBde(start, end);
    // console.log([devReports, desReports, bdeReports]);
    const reports = {devReports, desReports, bdeReports}

    const msg = {
    to: 'nikhilrm8923@gmail.com',
    from: 'nik.theappideas@gmail.com',
    subject: `Reports: ${new Date().toJSON().slice(0, 10)}`,
    // text: 'and easy to do anywhere, even with Node.js',
    html: JSON.stringify(reports),
    }
    // console.log(JSON.stringify(reports));
    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })
}

module.exports = {
    sendWelcomeMail,
    sendReportMail
}

// let html = `<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
// <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
// <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
// <script type="text/javascript">
//     var data = //data here
// ];
// $(document).ready(function () {
//     var html = '<table class="table table-striped">';
//     html += '<tr>';
//     var flag = 0;
//     $.each(data[0], function(index, value){
//         html += '<th>'+index+'</th>';
//     });
//     html += '</tr>';
//      $.each(data, function(index, value){
//          html += '<tr>';
//         $.each(value, function(index2, value2){
//             html += '<td>'+value2+'</td>';
//         });
//         html += '<tr>';
//      });
//      html += '</table>';
//      $('body').html(html);
// });
// </script>`