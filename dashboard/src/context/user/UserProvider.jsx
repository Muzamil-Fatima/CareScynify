import { useEffect, useState } from "react";
import UserContext from "./UserContext";
import toast from "react-hot-toast";
import {
  getUserProfile,
  addLanguage as addLanguageAPI,
  updateLanguage as updateLanguageAPI,
  deleteLanguage as deleteLanguageAPI,
} from "../../api/userApi";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH USER
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);

        const data = await getUserProfile();

        setUser(data?.user || {});
        setLanguages(data?.user?.languages || []);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to load user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  
  // ADD LANGUAGE
  
  const addLanguage = async (payload) => {
    try {
      const res = await addLanguageAPI(payload);

      if (res?.success) {
        setLanguages(res.languages); // backend source of truth
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add language");
    }
  };

  // 
  // UPDATE LANGUAGE
  // 
  const updateLanguage = async (id, payload) => {
    try {
      const res = await updateLanguageAPI(id, payload);

      if (res?.success) {
        setLanguages(res.languages);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update language");
    }
  };

  // 
  // DELETE LANGUAGE
  // 
  const deleteLanguage = async (id) => {
    try {
      const res = await deleteLanguageAPI(id);

      if (res?.success) {
        setLanguages(res.languages);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete language");
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,

        languages,
        setLanguages,

        addLanguage,
        updateLanguage,
        deleteLanguage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;