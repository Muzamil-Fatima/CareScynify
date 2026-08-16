import User from "../../models/user.js";
import Laboratory from "../../models/laboratory/labModel.js";

// Get Laboratory Profile
export const getLabProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password");
    const laboratory = await Laboratory.findOne({ userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
      laboratory,
    });
  } catch (error) {
    console.error("getLaboratoryProfile Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch laboratory profile",
    });
  }
};

// Update Laboratory Profile
export const updateLabProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const body = req.body || {};

    const {
      // USER
      name,
      email,
      phone,
      dob,
      cnic,

      // LAB
      labName,
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

      labType,
      operatingHours,
      description,

      homeSampleCollection,
      onlineReports,
      emergencyTesting,
      isOpen,
      onlineBooking,
      digitalReports,
    } = body;

    //  USER UPDATE 

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

    // AVATAR UPDATE 

    if (req.file) {
      user.avatar = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    }

    await user.save();

    //  LAB UPDATE 

    let laboratory = await Laboratory.findOne({
      userId,
    });

    if (!laboratory) {
      laboratory = await Laboratory.create({
        userId,
      });
    }

    // Basic Info

    if (labName !== undefined) laboratory.labName = labName;

    if (ownerName !== undefined) laboratory.ownerName = ownerName;

    if (registrationNumber !== undefined)
      laboratory.registrationNumber = registrationNumber;

    if (licenseNumber !== undefined) laboratory.licenseNumber = licenseNumber;

    if (taxNumber !== undefined) laboratory.taxNumber = taxNumber;

    // Contact

    if (alternatePhone !== undefined)
      laboratory.alternatePhone = alternatePhone;

    if (website !== undefined) laboratory.website = website;

    if (whatsapp !== undefined) laboratory.whatsapp = whatsapp;

    if (supportPhone !== undefined) laboratory.supportPhone = supportPhone;

    // Address

    if (address !== undefined) laboratory.address = address;

    if (city !== undefined) laboratory.city = city;

    if (province !== undefined) laboratory.province = province;

    if (country !== undefined) laboratory.country = country;

    if (postalCode !== undefined) laboratory.postalCode = postalCode;

    if (mapLink !== undefined) laboratory.mapLink = mapLink;

    if (latitude !== undefined) laboratory.latitude = latitude;

    if (longitude !== undefined) laboratory.longitude = longitude;

    // Details

    if (labType !== undefined) laboratory.labType = labType;

    if (operatingHours !== undefined)
      laboratory.operatingHours = operatingHours;

    if (description !== undefined) laboratory.description = description;

    // Services

    if (homeSampleCollection !== undefined)
      laboratory.homeSampleCollection = homeSampleCollection;

    if (onlineReports !== undefined) laboratory.onlineReports = onlineReports;

    if (emergencyTesting !== undefined)
      laboratory.emergencyTesting = emergencyTesting;

    if (isOpen !== undefined) laboratory.isOpen = isOpen;

    if (onlineBooking !== undefined) laboratory.onlineBooking = onlineBooking;

    if (digitalReports !== undefined)
      laboratory.digitalReports = digitalReports;

    await laboratory.save();

    return res.status(200).json({
      success: true,
      message: "Laboratory profile updated successfully",
      user,
      laboratory,
    });
  } catch (error) {
    console.error("updateLabProfile Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
