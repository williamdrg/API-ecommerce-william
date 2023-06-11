const transporter = require('../utils/mailer');
const ejs = require('ejs')
const path = require('path')

//data = username
const sendMail = (email, doc, attachments) => {
  // de aqui para abajo nose ejecuta si create User tiene un error
  transporter
  .sendMail({
    from: "davidwdrg@gmail.com",
    to: email,
    subject: "Bienvenido",
    text: "Este seria el mensaje en texto plano",
    html: doc,
    attachments,
  })
  .then(() => console.log('mensaje enviado'))
  .catch(error => console.log(error))
}

const sendWelcomeMail = async (email, data) => {
    
    // renderizar ejs
    const filePath = path.join(__dirname, "../views/welcome/welcome.ejs");
    const doc = await ejs.renderFile(filePath, data);

  const attachments = [
    {
      filename: "Welcome_Email.png",
      path: path.join(
        __dirname,
        "../views/welcome/images/Welcome_Email.png"
      ),
      cid: "welcome_image",
    },
    {
      filename: "youtube.png",
      path: path.join(__dirname, "../views/welcome/images/youtube2x.png"),
      cid: "youtube",
    },
    {
      filename: "facebook2x.png",
      path: path.join(__dirname, "../views/welcome/images/facebook2x.png"),
      cid: "facebook",
    },
    {
      filename: "twitter2x.png",
      path: path.join(__dirname, "../views/welcome/images/twitter2x.png"),
      cid: "twitter",
    },
    {
      filename: "instagram2x.png",
      path: path.join(__dirname, "../views/welcome/images/instagram2x.png"),
      cid: "instagram",
    },
    {
      filename: "pinterest2x.png",
      path: path.join(__dirname, "../views/welcome/images/linkedin2x.png"),
      cid: "likedin",
    },
  ];

  sendMail(email, doc, attachments)
}

const sendPurchaseConfirmationMail = async (email, data) => {
  // renderizar ejs
  const filePath = path.join(__dirname, "../views/purchase/purchase.ejs");
  const doc = await ejs.renderFile(filePath, data);

  const attachments = [
    {
      filename: "cart.png",
      path: path.join(
        __dirname,
        "../views/purchase/images/cart.png"
      ),
      cid: "cart_image",
    },
    {
      filename: "nounglobaldelivery3062934_1.png",
      path: path.join(__dirname, "../views/purchase/images/nounglobaldelivery3062934_1.png"),
      cid: "send_cart",
    },
    {
      filename: "nounphoneservices3062924_1.png",
      path: path.join(__dirname, "../views/purchase/images/nounphoneservices3062924_1.png"),
      cid: "headbands",
    },
    {
      filename: "nounribbon3062923_1.png",
      path: path.join(__dirname, "../views/purchase/images/nounribbon3062923_1.png"),
      cid: "medal",
    },
    {
      filename: "noungift3062915_1.png",
      path: path.join(__dirname, "../views/purchase/images/noungift3062915_1.png"),
      cid: "giftimg",
    },
    {
      filename: "76544.png",
      path: path.join(__dirname, "../views/purchase/images/76544.png"),
      cid: "instagramimg",
    },
    {
      filename: "433.png",
      path: path.join(__dirname, "../views/purchase/images/433.png"),
      cid: "youtubeimg",
    },
    {
      filename: "87665.png",
      path: path.join(__dirname, "../views/purchase/images/87665.png"),
      cid: "facebookimg",
    },
    {
      filename: "76565.png",
      path: path.join(__dirname, "../views/purchase/images/76565.png"),
      cid: "twitterimg",
    },
  ];

  sendMail(email, doc, attachments);
}

const sendPasswordResetMail = async (email, data) => {
  
  const filePath = path.join(__dirname, "../views/passwordResert/passwordResert.ejs");
  const doc = await ejs.renderFile(filePath, data);

  const attachments = [
    {
      filename: "23891556799905703.png",
      path: path.join(__dirname, "../views/passwordResert/images/23891556799905703.png"),
      cid: "padlock",
    },
    {
      filename: "facebook-rounded-gray.png",
      path: path.join(__dirname, "../views/passwordResert/images/facebook-rounded-gray.png"),
      cid: "facebook",
    },
    {
      filename: "twitter-rounded-gray.png",
      path: path.join(__dirname, "../views/passwordResert/images/twitter-rounded-gray.png"),
      cid: "twitter",
    },
    {
      filename: "instagram-rounded-gray.png",
      path: path.join(__dirname, "../views/passwordResert/images/instagram-rounded-gray.png"),
      cid: "instagram",
    },
    {
      filename: "linkedin-rounded-gray.png",
      path: path.join(__dirname, "../views/passwordResert/images/linkedin-rounded-gray.png"),
      cid: "linkedin",
    },
  ]

  sendMail(email, doc , attachments);
};


module.exports = {
  sendWelcomeMail,
  sendMail,
  sendPurchaseConfirmationMail,
  sendPasswordResetMail
}