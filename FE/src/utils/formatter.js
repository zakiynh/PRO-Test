export const formatGender = (gender) => {
  if (gender.toLowerCase() === 'male') return 'M';
  if (gender.toLowerCase() === 'female') return 'F';
  return gender;
}

export const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
}