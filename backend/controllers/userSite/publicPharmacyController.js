import Pharmacy from "../../models/pharmacy/pharmacyModel.js";

// get all pharmacies
export const getAllPharmacies = async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find({
      verificationStatus: "verified",
    })
      .select(
        "pharmacyName ownerName address city province logo coverImage pharmacyType homeDelivery isOpen acceptPrescription cashOnDelivery description"
      )
      .sort({ createdAt: -1 });


    res.status(200).json({
      success: true,
      count: pharmacies.length,
      pharmacies,
    });


  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// get pharmacy by id 
export const getPharmacyById = async (req, res) => {
  try {

    const pharmacy = await Pharmacy.findOne({
      _id: req.params.id,
      verificationStatus: "verified",
    });


    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: "Pharmacy not found",
      });
    }


    res.status(200).json({
      success: true,
      pharmacy,
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// Search Pharmacies
export const searchPharmacies = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search query is required.",
      });
    }

    const pharmacies = await Pharmacy.find({
      verificationStatus: "verified",
      $or: [
        {
          pharmacyName: {
            $regex: query,
            $options: "i",
          },
        },
        {
          ownerName: {
            $regex: query,
            $options: "i",
          },
        },
        {
          city: {
            $regex: query,
            $options: "i",
          },
        },
        {
          pharmacyType: {
            $regex: query,
            $options: "i",
          },
        },
        {
          address: {
            $regex: query,
            $options: "i",
          },
        },
      ],
    })
      .populate("userId", "name email phone avatar")
      .sort({ createdAt: -1 })
      .lean();

    const formattedPharmacies = pharmacies.map((pharmacy) => ({
      _id: pharmacy._id,
      pharmacyName: pharmacy.pharmacyName,
      ownerName: pharmacy.ownerName,
      city: pharmacy.city,
      address: pharmacy.address,
      pharmacyType: pharmacy.pharmacyType,
      homeDelivery: pharmacy.homeDelivery,
      emergencyService: pharmacy.emergencyService,
      onlineConsultationSupport:
        pharmacy.onlineConsultationSupport,
      acceptPrescription: pharmacy.acceptPrescription,
      cashOnDelivery: pharmacy.cashOnDelivery,
      isOpen: pharmacy.isOpen,
      verificationStatus: pharmacy.verificationStatus,
      logo: pharmacy.logo,
      coverImage: pharmacy.coverImage,
      user: pharmacy.userId,
    }));

    return res.status(200).json({
      success: true,
      total: formattedPharmacies.length,
      pharmacies: formattedPharmacies,
    });
  } catch (error) {
    console.error("Search Pharmacies Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to search pharmacies.",
      error: error.message,
    });
  }
};
// Filter Pharmacies
export const filterPharmacies = async (req, res) => {
  try {
    const {
      city,
      pharmacyType,
      homeDelivery,
      emergencyService,
      onlineConsultationSupport,
      acceptPrescription,
      cashOnDelivery,
      available,
    } = req.query;

    const filter = {
      verificationStatus: "verified",
    };

    // City
    if (city) {
      filter.city = {
        $regex: city,
        $options: "i",
      };
    }

    // Pharmacy Type
    if (pharmacyType) {
      filter.pharmacyType = pharmacyType;
    }

    // Home Delivery
    if (homeDelivery === "true") {
      filter.homeDelivery = true;
    }

    // Emergency Service
    if (emergencyService === "true") {
      filter.emergencyService = true;
    }

    // Online Consultation
    if (onlineConsultationSupport === "true") {
      filter.onlineConsultationSupport = true;
    }

    // Accept Prescription
    if (acceptPrescription === "true") {
      filter.acceptPrescription = true;
    }

    // Cash on Delivery
    if (cashOnDelivery === "true") {
      filter.cashOnDelivery = true;
    }

    // Currently Open
    if (available === "true") {
      filter.isOpen = true;
    }

    const pharmacies = await Pharmacy.find(filter)
      .populate("userId", "name email phone avatar")
      .sort({ createdAt: -1 })
      .lean();

    const formattedPharmacies = pharmacies.map((pharmacy) => ({
      _id: pharmacy._id,
      pharmacyName: pharmacy.pharmacyName,
      ownerName: pharmacy.ownerName,
      registrationNumber: pharmacy.registrationNumber,
      city: pharmacy.city,
      province: pharmacy.province,
      address: pharmacy.address,
      pharmacyType: pharmacy.pharmacyType,
      description: pharmacy.description,
      logo: pharmacy.logo,
      coverImage: pharmacy.coverImage,

      homeDelivery: pharmacy.homeDelivery,
      emergencyService: pharmacy.emergencyService,
      onlineConsultationSupport:
        pharmacy.onlineConsultationSupport,
      acceptPrescription: pharmacy.acceptPrescription,
      cashOnDelivery: pharmacy.cashOnDelivery,

      isOpen: pharmacy.isOpen,
      verificationStatus: pharmacy.verificationStatus,

      user: pharmacy.userId,
    }));

    return res.status(200).json({
      success: true,
      total: formattedPharmacies.length,
      pharmacies: formattedPharmacies,
    });
  } catch (error) {
    console.error("Filter Pharmacies Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to filter pharmacies.",
      error: error.message,
    });
  }
};