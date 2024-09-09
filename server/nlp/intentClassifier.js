const natural = require('natural');
const classifier = new natural.BayesClassifier();

// Training data for different intents
classifier.addDocument('What are the current groundwater levels?', 'groundwater_levels');
classifier.addDocument('How does groundwater contamination occur?', 'contamination');
classifier.addDocument('What are the best practices for groundwater conservation?', 'conservation');
classifier.addDocument('Tell me about groundwater laws', 'regulations');

// Train the classifier
classifier.train();

module.exports = classifier;
