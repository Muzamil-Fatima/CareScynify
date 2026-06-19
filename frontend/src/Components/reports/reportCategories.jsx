import ScienceIcon from "@mui/icons-material/Science";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ImageIcon from "@mui/icons-material/Image";
import MedicationIcon from "@mui/icons-material/Medication";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AppsIcon from "@mui/icons-material/Apps";
import CategoryIcon from "@mui/icons-material/Category";

export const reportCategories = [
  { name: "All", icon: <AppsIcon /> },
  { name: "Lab", icon: <ScienceIcon /> },
  { name: "Radiology", icon: <ImageIcon /> },
  { name: "Doctor", icon: <LocalHospitalIcon /> },
  { name: "Pathology", icon: <DescriptionOutlinedIcon /> },
  { name: "Pharmacy", icon: <MedicationIcon /> },
  { name: "Vitals", icon: <MonitorHeartIcon /> },
  { name: "Other", icon: <CategoryIcon /> },
];
