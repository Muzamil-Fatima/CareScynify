import User from "../../models/user.js";
import Pharmacy from "../../models/pharmacy/pharmacyModel.js";
export const getPharmacyProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password");

    const pharmacy = await Pharmacy.findOne({ userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
      pharmacy,
    });
  } catch (error) {
    console.error("getPharmacyProfile Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch pharmacy profile",
    });
  }
};

export const updatePharmacyProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      // User
      name,
      email,
      phone,
      dob,
      cnic,

      // Pharmacy
      pharmacyName,
      ownerName,
      registrationNumber,
      licenseNumber,
      taxNumber,
      alternatePhone,
      website,
      whatsapp,
      supportPhone,

      address,
      city,
      province,
      country,
      postalCode,
      mapLink,
      latitude,
      longitude,

      pharmacyType,
      operatingHours,
      description,

      emergencyService,
      homeDelivery,
      onlineConsultationSupport,
      isOpen,
      acceptPrescription,
      cashOnDelivery,
    } = req.body;

    // Update User
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (phone !== undefined) user.phone = phone;
    if (dob !== undefined) user.dob = dob;
    if (cnic !== undefined) user.cnic = cnic;

    await user.save();

    // Update Pharmacy
    let pharmacy = await Pharmacy.findOne({ userId });

    if (!pharmacy) {
      pharmacy = await Pharmacy.create({
        userId,
      });
    }

    if (pharmacyName !== undefined)
      pharmacy.pharmacyName = pharmacyName;

    if (ownerName !== undefined)
      pharmacy.ownerName = ownerName;

    if (registrationNumber !== undefined)
      pharmacy.registrationNumber = registrationNumber;

    if (licenseNumber !== undefined)
      pharmacy.licenseNumber = licenseNumber;

    if (taxNumber !== undefined)
      pharmacy.taxNumber = taxNumber;

    if (alternatePhone !== undefined)
      pharmacy.alternatePhone = alternatePhone;

    if (website !== undefined)
      pharmacy.website = website;

    if (whatsapp !== undefined)
      pharmacy.whatsapp = whatsapp;

    if (supportPhone !== undefined)
      pharmacy.supportPhone = supportPhone;

    if (address !== undefined)
      pharmacy.address = address;

    if (city !== undefined)
      pharmacy.city = city;

    if (province !== undefined)
      pharmacy.province = province;

    if (country !== undefined)
      pharmacy.country = country;

    if (postalCode !== undefined)
      pharmacy.postalCode = postalCode;

    if (mapLink !== undefined)
      pharmacy.mapLink = mapLink;

    if (latitude !== undefined)
      pharmacy.latitude = latitude;

    if (longitude !== undefined)
      pharmacy.longitude = longitude;

    if (pharmacyType !== undefined)
      pharmacy.pharmacyType = pharmacyType;

    if (operatingHours !== undefined)
      pharmacy.operatingHours = operatingHours;

    if (description !== undefined)
      pharmacy.description = description;

    if (emergencyService !== undefined)
      pharmacy.emergencyService = emergencyService;

    if (homeDelivery !== undefined)
      pharmacy.homeDelivery = homeDelivery;

    if (onlineConsultationSupport !== undefined)
      pharmacy.onlineConsultationSupport =
        onlineConsultationSupport;

    if (isOpen !== undefined)
      pharmacy.isOpen = isOpen;

    if (acceptPrescription !== undefined)
      pharmacy.acceptPrescription = acceptPrescription;

    if (cashOnDelivery !== undefined)
      pharmacy.cashOnDelivery = cashOnDelivery;

    await pharmacy.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
      pharmacy,
    });
  } catch (error) {
    console.error("updatePharmacyProfile Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update pharmacy profile",
    });
  }
};