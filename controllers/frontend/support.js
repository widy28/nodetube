const ReceivedEmail = require('../../models/index').ReceivedEmail

exports.getReceivedEmails = async (req, res) => {

  const receivingEmailAddress = req.query.to;

  // console.log(req.query.respondedTo);

  let respondedTo = req.query.respondedTo;

  // if not true or false
  if(respondedTo !== 'false' && respondedTo !== 'true' ){
    respondedTo = 'false';
  }

  // console.log(respondedTo); // true

  // dont let users access ceo emails unless
  if(receivingEmailAddress == 'ceo@pew.tube' && req.user.role !== 'admin'){
    return [];
  }

  // exclude uploads without an uploadUrl
  let receivedEmails = await ReceivedEmail.find({ toEmailAddress: receivingEmailAddress, respondedTo }).populate().lean();

  receivedEmails = receivedEmails.reverse();



  // console.log(receivedEmails);

  res.render('moderator/receivedEmails', {
    title: 'Received Emails',
    receivedEmails
  });

};

exports.getReceivedEmail = async (req, res) => {

  const id = req.params.id;

  // exclude uploads without an uploadUrl
  let receivedEmail = await ReceivedEmail.findById(id).lean();

  console.log(receivedEmail);

  res.render('moderator/receivedEmail', {
    title: 'Received Email',
    receivedEmail,
    email: receivedEmail
  });

};