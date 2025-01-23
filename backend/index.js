const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://mission-app-8539e.firebaseio.com',
});

const app = express();
app.use(bodyParser.json());

const apiKey = 'AIzaSyDozO7D1nK8_y-cthmqejzSyNyEeC_u8t8'; // Replace with your actual API key

// Endpoint to generate a password reset link
app.post('/generateResetLink', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const resetLink = await admin.auth().generatePasswordResetLink(email, {
            url: `http://localhost:5173/resetPassword?continueUrl=http://localhost:5173/resetPassword&lang=en`,
            handleCodeInApp: true,
        });

        const oobCode = resetLink.split('oobCode=')[1].split('&')[0];
        const completeLink = `http://localhost:5173/resetPassword?mode=resetPassword&oobCode=${oobCode}&apiKey=${apiKey}&continueUrl=http://localhost:5173/resetPassword&lang=en`;

        res.status(200).json({ resetLink: completeLink });
    } catch (error) {
        console.error('Error generating password reset link:', error);
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});