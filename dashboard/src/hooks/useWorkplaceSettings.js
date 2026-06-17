// export const useWorkplaceSettings = (setProfile, setIsDirty) => {
//   const updateSettings = (workplaceId, settings) => {
//     setProfile(prev => {
//       const updated = prev.doctor.workplaces.map(w => {
//         if (w._id !== workplaceId) return w;

//         return {
//           ...w,
//           settings: {
//             ...w.settings,
//             ...settings,
//           },
//         };
//       });

//       return {
//         ...prev,
//         doctor: {
//           ...prev.doctor,
//           workplaces: updated,
//         },
//       };
//     });

//     setIsDirty(true);
//   };

//   return { updateSettings };
// };