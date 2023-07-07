import { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import Ajv from 'ajv';
import lexiconData from '../lexicons/sentimentlexicon.json';

const ajv = new Ajv();
const validate = ajv.compile({
  type: 'object',
  required: ['lexicon', 'defs'],
  properties: {
    lexicon: { type: 'number' },
    defs: {
      type: 'object',
      required: ['main'],
      properties: {
        main: {
          type: 'object',
          required: ['type', 'description', 'parameters', 'output', 'words'],
          properties: {
            type: { type: 'string' },
            description: { type: 'string' },
            parameters: {
              type: 'object',
              required: ['type', 'properties'],
              properties: {
                type: { type: 'string' },
                properties: { type: 'object' }
              }
            },
            output: {
              type: 'object',
              required: ['encoding', 'schema'],
              properties: {
                encoding: { type: 'string' },
                schema: { type: 'object' }
              }
            },
            words: { type: 'object' }
          }
        }
      }
    }
  }
});

const SentimentAnalysisApp = () => {
  const [inputText, setInputText] = useState('');
  const [sentiment, setSentiment] = useState('');

  const analyzeSentiment = () => {
    const tokens = inputText.toLowerCase().split(' ');

    let positiveCount = 0;
    let negativeCount = 0;

    tokens.forEach((token) => {
      if (lexiconData.defs.main.words[token] === 'positive') {
        positiveCount++;
      } else if (lexiconData.defs.main.words[token] === 'negative') {
        negativeCount++;
      }
    });

    if (positiveCount > negativeCount) {
      setSentiment('Positive');
    } else if (negativeCount > positiveCount) {
      setSentiment('Negative');
    } else {
      setSentiment('Neutral');
    }
  };

  // Validate lexicon against the schema
  const isLexiconValid = validate(lexiconData);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter text to analyze sentiment"
        value={inputText}
        onChangeText={(text) => setInputText(text)}
      />
      <Button title="Analyze Sentiment" onPress={analyzeSentiment} />
      {isLexiconValid ? (
        <Text style={styles.sentiment}>Sentiment: {sentiment}</Text>
      ) : (
        <Text style={styles.error}>Invalid lexicon</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
  },
  sentiment: {
    marginTop: 20,
    fontSize: 18,
  },
  error: {
    marginTop: 20,
    fontSize: 18,
    color: 'red',
  },
});

export default SentimentAnalysisApp;
