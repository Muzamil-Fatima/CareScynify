import { useState, useCallback } from "react";

import MedicineContext from "./MedicineContext";

import {
  addMedicine,
  getMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
  getMedicineStats,
  searchMedicines,
} from "../../api/pharmacy/medicineApi";

const PharmacyProvider = ({ children }) => {
  const [medicines, setMedicines] = useState([]);
  const [allMedicines, setAllMedicines] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    lowStock: 0,
    expiringSoon: 0,
  });

  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  // Current filters
  const [filters, setFilters] = useState({
    category: "",
    stock: "",
    sort: "",
  });

  // --------------------------------------------------
  // APPLY FILTERS + SORT
  // --------------------------------------------------

  const applyFilters = useCallback(
    (medicineList, currentFilters) => {
      let result = [...medicineList];

      const {
        category = "",
        stock = "",
        sort = "",
      } = currentFilters;

      // CATEGORY
      if (category) {
        result = result.filter(
          (medicine) =>
            medicine.category?.toLowerCase() ===
            category.toLowerCase()
        );
      }

      // STOCK
      if (stock) {
        result = result.filter((medicine) => {
          const medicineStock = Number(medicine.stock || 0);

          switch (stock) {
            case "in-stock":
              return medicineStock > 10;

            case "low-stock":
              return (
                medicineStock > 0 &&
                medicineStock <= 10
              );

            case "out-of-stock":
              return medicineStock <= 0;

            case "expired":
              return (
                medicine.expiryDate &&
                new Date(medicine.expiryDate) < new Date()
              );

            default:
              return true;
          }
        });
      }

      // SORT
      switch (sort) {
        case "name-asc":
          result.sort((a, b) =>
            (a.name || "").localeCompare(
              b.name || ""
            )
          );
          break;

        case "name-desc":
          result.sort((a, b) =>
            (b.name || "").localeCompare(
              a.name || ""
            )
          );
          break;

        case "newest":
          result.sort(
            (a, b) =>
              new Date(b.createdAt || 0) -
              new Date(a.createdAt || 0)
          );
          break;

        case "oldest":
          result.sort(
            (a, b) =>
              new Date(a.createdAt || 0) -
              new Date(b.createdAt || 0)
          );
          break;

        case "price-low":
          result.sort(
            (a, b) =>
              Number(a.unitPrice || 0) -
              Number(b.unitPrice || 0)
          );
          break;

        case "price-high":
          result.sort(
            (a, b) =>
              Number(b.unitPrice || 0) -
              Number(a.unitPrice || 0)
          );
          break;

        case "stock":
          result.sort(
            (a, b) =>
              Number(b.stock || 0) -
              Number(a.stock || 0)
          );
          break;

        case "expiry":
          result.sort(
            (a, b) =>
              new Date(
                a.expiryDate || "9999-12-31"
              ) -
              new Date(
                b.expiryDate || "9999-12-31"
              )
          );
          break;

        default:
          break;
      }

      return result;
    },
    []
  );

  // --------------------------------------------------
  // GET ALL MEDICINES
  // --------------------------------------------------

  const fetchMedicines = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getMedicines();

      const medicineList = data?.medicines || [];

      setAllMedicines(medicineList);
      setMedicines(medicineList);

      setFilters({
        category: "",
        stock: "",
        sort: "",
      });

      return data;
    } catch (error) {
      console.error(
        "Error fetching medicines:",
        error
      );

      setAllMedicines([]);
      setMedicines([]);

      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // --------------------------------------------------
  // SEARCH MEDICINES
  // --------------------------------------------------

  const searchMedicinesList = useCallback(
    async (searchText = "") => {
      try {
        setSearchLoading(true);

        const data = await searchMedicines(searchText);

        const medicineList = data?.medicines || [];

        setAllMedicines(medicineList);

        // Apply existing filters after search
        const filteredResult = applyFilters(
          medicineList,
          filters
        );

        setMedicines(filteredResult);

        return data;
      } catch (error) {
        console.error(
          "Error searching medicines:",
          error
        );

        setAllMedicines([]);
        setMedicines([]);

        throw error;
      } finally {
        setSearchLoading(false);
      }
    },
    [applyFilters, filters]
  );

  // --------------------------------------------------
  // FILTER MEDICINES
  // --------------------------------------------------

  const filterMedicines = useCallback(
    ({
      category = filters.category,
      stock = filters.stock,
      sort = filters.sort,
    } = {}) => {
      const newFilters = {
        category,
        stock,
        sort,
      };

      setFilters(newFilters);

      const filteredResult = applyFilters(
        allMedicines,
        newFilters
      );

      setMedicines(filteredResult);

      return filteredResult;
    },
    [allMedicines, applyFilters, filters]
  );

  // --------------------------------------------------
  // RESET FILTERS
  // --------------------------------------------------

  const resetMedicineFilters = useCallback(() => {
    const emptyFilters = {
      category: "",
      stock: "",
      sort: "",
    };

    setFilters(emptyFilters);

    setMedicines(allMedicines);
  }, [allMedicines]);

  // --------------------------------------------------
  // STATS
  // --------------------------------------------------

  const fetchMedicineStats = useCallback(async () => {
    try {
      setStatsLoading(true);

      const data = await getMedicineStats();

      setStats(
        data?.stats || {
          total: 0,
          lowStock: 0,
          expiringSoon: 0,
        }
      );

      return data;
    } catch (error) {
      console.error(
        "Error fetching medicine stats:",
        error
      );

      setStats({
        total: 0,
        lowStock: 0,
        expiringSoon: 0,
      });

      throw error;
    } finally {
      setStatsLoading(false);
    }
  }, []);

  // --------------------------------------------------
  // GET SINGLE MEDICINE
  // --------------------------------------------------

  const fetchMedicineById = useCallback(
    async (medicineId) => {
      try {
        setLoading(true);

        const data =
          await getMedicineById(medicineId);

        return data?.medicine;
      } catch (error) {
        console.error(
          "Error fetching medicine:",
          error
        );

        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // --------------------------------------------------
  // ADD MEDICINE
  // --------------------------------------------------

  const createMedicine = useCallback(
    async (medicineData) => {
      try {
        setLoading(true);

        const data =
          await addMedicine(medicineData);

        if (data?.medicine) {
          setAllMedicines((prev) => [
            data.medicine,
            ...prev,
          ]);

          setMedicines((prev) => [
            data.medicine,
            ...prev,
          ]);
        }

        await fetchMedicineStats();

        return data;
      } catch (error) {
        console.error(
          "Error adding medicine:",
          error
        );

        throw error;
      } finally {
        setLoading(false);
      }
    },
    [fetchMedicineStats]
  );

  // --------------------------------------------------
  // UPDATE MEDICINE
  // --------------------------------------------------

  const editMedicine = useCallback(
    async (medicineId, medicineData) => {
      try {
        setLoading(true);

        const data = await updateMedicine(
          medicineId,
          medicineData
        );

        if (data?.medicine) {
          setAllMedicines((prev) =>
            prev.map((medicine) =>
              medicine._id === medicineId
                ? data.medicine
                : medicine
            )
          );

          setMedicines((prev) =>
            prev.map((medicine) =>
              medicine._id === medicineId
                ? data.medicine
                : medicine
            )
          );
        }

        await fetchMedicineStats();

        return data;
      } catch (error) {
        console.error(
          "Error updating medicine:",
          error
        );

        throw error;
      } finally {
        setLoading(false);
      }
    },
    [fetchMedicineStats]
  );

  // --------------------------------------------------
  // DELETE MEDICINE
  // --------------------------------------------------

  const removeMedicine = useCallback(
    async (medicineId) => {
      try {
        setLoading(true);

        const data =
          await deleteMedicine(medicineId);

        setAllMedicines((prev) =>
          prev.filter(
            (medicine) =>
              medicine._id !== medicineId
          )
        );

        setMedicines((prev) =>
          prev.filter(
            (medicine) =>
              medicine._id !== medicineId
          )
        );

        await fetchMedicineStats();

        return data;
      } catch (error) {
        console.error(
          "Error deleting medicine:",
          error
        );

        throw error;
      } finally {
        setLoading(false);
      }
    },
    [fetchMedicineStats]
  );

  // --------------------------------------------------
  // CONTEXT VALUE
  // --------------------------------------------------

  const value = {
    medicines,
    allMedicines,

    stats,

    loading,
    statsLoading,
    searchLoading,

    filters,

    fetchMedicines,
    searchMedicinesList,

    filterMedicines,
    resetMedicineFilters,

    fetchMedicineStats,
    fetchMedicineById,

    createMedicine,
    editMedicine,
    removeMedicine,
  };

  return (
    <MedicineContext.Provider value={value}>
      {children}
    </MedicineContext.Provider>
  );
};

export default PharmacyProvider;