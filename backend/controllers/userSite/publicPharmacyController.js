import Pharmacy from "../../models/pharmacy/pharmacyModel.js";


// @desc Get all verified pharmacies
// @route GET /api/public/pharmacies
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



// @desc Get single pharmacy
// @route GET /api/public/pharmacies/:id
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