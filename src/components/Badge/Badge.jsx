const Badge = ({ role }) => {
  if (role === "admin") {
    return (
      <span className="bg-red-100 text-red-600 px-2 py-0.5 text-xs rounded-full font-semibold">
        Admin
      </span>
    );
  }
  if (role === "trainer") {
    return (
      <span className="bg-blue-100 text-blue-600 px-2 py-0.5 text-xs rounded-full font-semibold">
        Trainer
      </span>
    );
  }
  return null;
};

export default Badge;
