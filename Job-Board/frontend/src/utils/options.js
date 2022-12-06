// Get request header
const getOptions = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return {
    headers: { authorization: `Bearer ${user?.token}` },
  };
};

export default getOptions;
