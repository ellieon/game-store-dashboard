const getCookie = (key: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${key}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return undefined;
};

export default getCookie;
