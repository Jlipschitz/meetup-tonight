// convert mongoose models to object and get rid of sensitive properties
export default function cleanUserObj(user) {
  if (!user) return user;
  user = user.constructor.name === 'model' ? user.toObject() : user;

  return user;
}
