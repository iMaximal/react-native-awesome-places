const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const fs = require('fs');
const UUID = require('uuid-v4');

const gcconfig = {
  projectId: 'react-native-awe-1526404146569',
  keyFilename: 'key.json',
};

const gcs = require('@google-cloud/storage')(gcconfig);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.storeImage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const body = JSON.parse(request.body);
    fs.writeFileSync('/tmp/uploaded-image.jpg', body.image, 'base64', (error) => {
      console.log(error);
      return response.status(500).json({ error });
    });
    const bucket = gcs.bucket('react-native-awe-1526404146569.appspot.com');
    const uuid = UUID();

    bucket.upload('/tmp/uploaded-image.jpg', {
      uploadType: 'media',
      destination: '/places/' + uuid + '.jpg',
      metadata: {
        metadata: {
          contentType: 'image/jpeg',
          firebaseStorageDownloadToken: uuid,
        },
      },
    }, (error, file) => {
      if (!error) {
        response.status(201).json({
          imageUrl: 'https://firebasestorage.googleapis.com/v0/b/' +
          bucket.name +
          '/o/' +
          encodeURIComponent(file.name) +
            '?alt=media&token=' +
            uuid
        })
      } else {
        console.log(error);
        response.status(500).json({ error })
      }
    });
  });
});
