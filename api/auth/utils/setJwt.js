import jwt from 'jsonwebtoken';

export default function setJwt(req, res) {
<<<<<<< HEAD
  if (!req.user) return;
  
=======
>>>>>>> 8119d0042709891509c1e388492f7d75453988a4
  const expiresIn = process.env.JWT_LENGTH || 60 * 60 * 24 * 180 * 1000; // default to 180 days
  const token = jwt.sign({ _id: req.user._id.toString() }, process.env.JWT_SECRET, { expiresIn });
  res.cookie('auth_token', token, {
    maxAge: expiresIn,
    httpOnly: true
  });
}
