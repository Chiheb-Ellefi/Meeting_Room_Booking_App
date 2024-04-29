const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require("../secrets/serviceAccountKey.json"); // Replace with your actual path
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
/*upload files to firebase storage : 

const bucket = admin.storage().bucket(); // Get a reference to your Firebase Storage bucket
const fileName = 'my-image.jpg'; // Set the desired filename
const localFilePath = '/path/to/local/image.jpg'; // Replace with the actual local file path

// Upload the file
bucket.upload(localFilePath, {
  destination: fileName,
  // Other options (e.g., metadata) can be specified here
})
  .then(() => {
    console.log('File uploaded successfully!');
  })
  .catch((error) => {
    console.error('Error uploading file:', error);
  });


retreive download urls : 


const file = bucket.file(fileName);

file.getSignedUrl({
  action: 'read',
  expires: '03-01-2500', // Set an expiration date (optional)
})
  .then((urls) => {
    const downloadUrl = urls[0];
    console.log('Download URL:', downloadUrl);
    // Save this download URL in your PostgreSQL database
  })
  .catch((error) => {
    console.error('Error getting download URL:', error);
  });
 */
