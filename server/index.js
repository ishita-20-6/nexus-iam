const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const SECRET = "nexus_secret_key";

// Sample Users for IAM
const users = [
    { email: "admin@nexus.com", password: "123", role: "ADMIN" },
    { email: "user@nexus.com", password: "123", role: "VIEWER" }
];

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        const token = jwt.sign({ email: user.email, role: user.role }, SECRET);
        res.json({ token, role: user.role, name: user.email.split('@')[0] });
    } else {
        res.status(401).json({ message: "Galat Email/Password!" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));