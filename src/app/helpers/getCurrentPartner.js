const getCurrentPartner = () => {
  const searchParams = new URLSearchParams(document.location.search);
  return searchParams.get('partner') || 'default';
};

export default getCurrentPartner;
