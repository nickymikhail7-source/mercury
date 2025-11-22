export default function handler(req, res) {
    res.status(200).json({ message: 'Pong', time: new Date().toISOString() });
}
