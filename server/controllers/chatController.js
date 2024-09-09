const ChatLog = require('../models/ChatLog');
const classifier = require('../nlp/intentClassifier');
const { findBestMatch } = require('../nlp/semanticSearch');

exports.handleChat = async (req, res) => {
  const { query } = req.body;

  try {
    const intent = classifier.classify(query);
    let response;

    switch (intent) {
      case 'groundwater_levels':
        response = 'Groundwater levels are dynamic and vary across regions...';
        break;
      case 'contamination':
        response = 'Groundwater contamination can occur through various means, such as...';
        break;
      case 'conservation':
        response = 'Conserving groundwater involves several practices such as...';
        break;
      case 'regulations':
        response = 'Groundwater regulations are enforced to manage and protect resources...';
        break;
      default:
        response = await findBestMatch(query);
        break;
    }

    // Save to database
    const chatLog = new ChatLog({
      userQuery: query,
      botResponse: response,
    });

    await chatLog.save();

    res.json({ response });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
