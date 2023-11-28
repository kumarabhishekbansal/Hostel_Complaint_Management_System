const nodemailer = require("nodemailer");

// send contact us message

const ContactMail = async (user) => {
  console.log("enter ContactMail");
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.auth_email,
      pass: process.env.auth_password,
    },
  });

  let htmlforuser = `<p>Hello, <b>${user.fullname}</b></p>
    <h2>Your message has been saved successfully,</h2>
    <h3>Your issue  is : ${user.message}</h3>
    <h3>Your token id. is #${user._id}</h3>
    <h5>We try our best to find the best solution for your message</h5>
    <br />
    <h4>Your DashBoard : </h4>
    <span>${process.env.CLIENT}/dash</span>
    
    <br />
    <p><b>Thanks and Regards ,</b></p>
    <h2><b><strong>HCM</strong></b></h2>
            `;

  let htmlforadmin = `<p>Hello</p>
            <h2>Someone message to hcm whose full name is : , <b>${user.fullname}</b></h2>
            <h3>The issue  is : ${user.message}</h3>
            <h3>Their token id. is #${user._id}</h3>
            <h5>Their email id is : ${user.email}</h5>
            <br />
            <p><b>Thanks and Regards ,</b></p>
            <h2><b><strong>HCM</strong></b></h2>
                    `;

  let mailDetailstouser = {
    from: process.env.auth_email,
    to: user.email,
    subject: "No reply-Message from HCM",
    html: htmlforuser,
  };

  let mailDetailstoadmin = {
    from: process.env.auth_email,
    to: process.env.auth_email,
    subject: "Message on HCM",
    html: htmlforadmin,
  };

  mailTransporter.sendMail(mailDetailstouser, function (err, data) {
    if (err) {
      console.log("contact to user Error Occurs");
    } else {
      console.log("contact to user Email sent successfully");
    }
  });

  mailTransporter.sendMail(mailDetailstoadmin, function (err, data) {
    if (err) {
      console.log("contact to admin Error Occurs");
    } else {
      console.log("contact to admin Email sent successfully");
    }
  });
};

module.exports = {ContactMail };
