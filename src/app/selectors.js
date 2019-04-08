export const isValidName = name => {
  const labels = name.split('.');

  let isValid = true;

  labels.forEach(label => {
    console.log(label)
    if (label.length === 0) isValid = false; 
  });

  return isValid;
};
