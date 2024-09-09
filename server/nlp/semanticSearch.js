const use = require('@tensorflow-models/universal-sentence-encoder');

// Example knowledge base
const knowledgeBase = [
  { question: 'What are the current groundwater levels?', answer: 'Groundwater levels vary by region and season...' },
  { question: 'How does groundwater contamination occur?', answer: 'Groundwater contamination occurs through...' },
  { question: 'What are the best practices for groundwater conservation?', answer: 'The best practices include...' },
];

let model;

const loadModel = async () => {
  model = await use.load();
};

const findBestMatch = async (query) => {
  const queryEmbedding = await model.embed([query]);
  let bestMatch = { answer: 'Sorry, I am not sure about that.', score: 0 };

  for (const kbItem of knowledgeBase) {
    const kbEmbedding = await model.embed([kbItem.question]);
    const similarity = queryEmbedding.dot(kbEmbedding.transpose()).dataSync()[0];
    
    if (similarity > bestMatch.score) {
      bestMatch = { answer: kbItem.answer, score: similarity };
    }
  }

  return bestMatch.answer;
};

loadModel();

module.exports = { findBestMatch };
