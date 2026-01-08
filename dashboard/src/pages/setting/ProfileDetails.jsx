const ProfileDetails = () => {
  return (
    <div>
      <h6 className="font-secondary font-bold text-[40px] mt-16">
        Profile Details
      </h6>
      <div className="text-[13px] font-medium border border-white/15 rounded-[15px] w-5/6 mt-26">
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr className="border-b border-white/15 text-left">
              <th className="px-4 py-4.5">Name</th>
              <th className="px-4 py-4.5">Role</th>
              <th className="px-4 py-4.5">Email</th>
              <th className="px-4 py-4.5">Number</th>
            </tr>
          </thead>
          <tbody>
            <tr className="opacity-80">
              <td className="px-4 py-4.5">Lenka</td>
              <td className="px-4 py-4.5">Admin</td>
              <td className="px-4 py-4.5">lenka@gmail.com</td>
              <td className="px-4 py-4.5">+971 123 123 12</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ProfileDetails;
