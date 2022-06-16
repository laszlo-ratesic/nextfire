const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const { PubSub } = require('@google-cloud/pubsub');
const pubsubClient = new PubSub();

exports.sendTestMessage = functions.https.onRequest(async (req, res) => {
  const { topic, data } = req.body;

  const [exists] = await pubsubClient.topic(topic).exists();

  if (!exists) {
    await pubsubClient.createTopic(topic);
  }

  const id = await pubsubClient.topic(topic).publishJSON(data);

  res.send(id);
});
