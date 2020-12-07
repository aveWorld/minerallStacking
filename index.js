require('dotenv').config();
const express = require('express');
const app = express();
const sgMail = require('@sendgrid/mail');
const cors = require('cors');
const bodyParser = require('body-parser');

sgMail.setApiKey(process.env.SENDGRID_API);

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.use(cors());

app.post('/mail', async (req, res) => {
  const msg = {
    to: 'mykhailo.potashnik.knm.2018@lpnu.ua',
    from: 'texnarb228@gmail.com', // Use the email address or domain you verified above
  };
  const data = req.body;
  if (data.type === 'form') {
    msg.subject = 'New Form From Minerall Stacking';
    msg.html = `<div>
      <p><strong>Name</strong> : ${data.name}</p>
      <p><strong>Email</strong> : ${data.email}</p>
      <p><strong>Eth Hold</strong> : ${data.ethHold}</p>
      <p><strong>Eth Want To Stake</strong> : ${data.ethStake}</p>
      <p><strong>When Stake</strong> : ${data.whenStake}</p>
      </div>`;
  } else if (data.type === 'sub') {
    msg.subject = 'New Subscriber From Minerall Stacking';
    msg.html = `<div>
      <p><strong>Email</strong> : ${data.email}</p>
      </div>`;
  }
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});