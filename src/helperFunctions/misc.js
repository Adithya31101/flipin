export const getAvatar = (name) => {
  let initials = "";
  name.split(" ").forEach((n) => (initials += n[0]));
  return initials;
};