require('dotenv').config();
const express = require('express');
const app = express();
const sgMail = require('@sendgrid/mail');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

sgMail.setApiKey(process.env.SENDGRID_API);

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const corsOptions = {
  origin: 'https://staking.minerall.io',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(helmet());
app.use(cors(corsOptions));

app.post('/mail', async (req, res) => {
  let mailError;
  const msg = {
    to: 'w@minerall.io',
    from: 'staking@minerall.io', // Use the email address or domain you verified above
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
    if (error.response) {
      mailError = error.response.body;
      console.error(error.response.body);
    }
  }
  res.send(mailError);
});
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
