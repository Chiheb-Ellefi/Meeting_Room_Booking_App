export const generateHtml = ({ username, email, description }) => {
  return `
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="https://www.ooredoo.com/" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Ooredoo Meeting Room Booking App</a>
    </div>
    
    <p style="font-size:1.1em">Hi, we received a complaint from the user ${username} with the email ${email}.</p>
    <p style="font-size:1.1em">" ${description} "</p>
    <p style="font-size:0.9em;">Regards,<br />The Ooredoo Meeting Room Booking Team</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#00466a;font-size:0.8em;line-height:1;font-weight:300">
      <p>Ooredoo</p>
    </div>
  </div>
</div>
`;
};
