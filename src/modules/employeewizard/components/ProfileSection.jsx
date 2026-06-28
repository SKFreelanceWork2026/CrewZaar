import { useState, useEffect, useRef } from "react";
import { User, Camera, X } from "lucide-react";
import SummaryApi from "../../../common";
import Taskupload from "../components/Taskupload";
import VerificationProcess from "../components/Verificationprocess";
import CommunicationAssessment from "../components/CommunicationAssessment";
import Logo from "../../../assets/images/logo1.png";

const ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Data Scientist",
  "Product Manager",
  "Mobile Developer",
  "UI/UX Designer",
  "Graphic Designer",
  "Product Designer",
  "Video Editor",
  "Branding Designer",
  "Drawing Artist",
];

// Role-based skill suggestions
const ROLE_SKILLS = {
  "Frontend Developer": [
    "React", "JavaScript", "TypeScript", "HTML", "CSS", "Next.js", "Vue.js",
    "Angular", "Redux", "Tailwind CSS", "SASS", "Webpack", "Babel", "Jest",
    "Cypress", "Storybook", "GraphQL", "REST API", "Responsive Design",
  ],
  "Backend Developer": [
    "Node.js", "Python", "Java", "C#", "PHP", "Ruby", "Go", "Rust",
    "Express.js", "Django", "Spring Boot", "Laravel", "Rails",
    "PostgreSQL", "MySQL", "MongoDB", "Redis", "Kafka", "RabbitMQ",
    "REST API", "GraphQL", "Microservices", "Docker", "Kubernetes",
    "AWS", "Azure", "GCP",
  ],
  "Full Stack Developer": [
    "React", "Node.js", "JavaScript", "TypeScript", "Python", "Java", "C#",
    "HTML", "CSS", "Next.js", "Express.js", "Spring Boot", "Django",
    "PostgreSQL", "MySQL", "MongoDB", "REST API", "GraphQL", "Docker",
    "AWS", "Git", "CI/CD", "Microservices",
  ],
  "DevOps Engineer": [
    "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Terraform", "Ansible",
    "Puppet", "Chef", "Jenkins", "GitLab CI", "GitHub Actions", "CircleCI",
    "Linux", "Bash", "Python", "Go", "Prometheus", "Grafana", "ELK Stack",
    "Nginx", "Apache", "Networking", "Security",
  ],
  "Data Scientist": [
    "Python", "R", "SQL", "Machine Learning", "Deep Learning", "NLP",
    "Computer Vision", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas",
    "NumPy", "Jupyter", "Tableau", "Power BI", "Hadoop", "Spark", "Kafka",
    "AWS SageMaker", "Data Visualization", "Statistical Analysis",
  ],
  "Product Manager": [
    "Agile", "Scrum", "JIRA", "Confluence", "Product Strategy", "Roadmapping",
    "User Research", "Data Analysis", "SQL", "Figma", "Wireframing",
    "A/B Testing", "Product Metrics", "Communication", "Leadership",
    "Market Research", "Competitive Analysis", "Storytelling",
  ],
  "Mobile Developer": [
    "React Native", "Flutter", "Swift", "Kotlin", "Java", "Objective-C",
    "Android SDK", "iOS SDK", "Firebase", "Redux", "GraphQL", "REST API",
    "App Store Connect", "Google Play Console", "Git", "CI/CD",
    "Performance Optimization", "Unit Testing",
  ],
  "UI/UX Designer": [
    "Figma", "Adobe XD", "Sketch", "InVision", "Photoshop", "Illustrator",
    "Wireframing", "Prototyping", "User Research", "Usability Testing",
    "User Personas", "Information Architecture", "Interaction Design",
    "Visual Design", "Design Systems", "Material Design", "Responsive Design",
  ],
  "Graphic Designer": [
    "Photoshop", "Illustrator", "InDesign", "CorelDRAW", "Canva",
    "Typography", "Color Theory", "Layout Design", "Branding", "Logo Design",
    "Print Design", "Packaging Design", "Visual Communication", "Adobe Suite",
    "Figma", "After Effects", "Premiere Pro",
  ],
  "Product Designer": [
    "Figma", "Sketch", "Adobe XD", "User Research", "Prototyping",
    "UX Design", "UI Design", "Design Systems", "User Testing",
    "Wireframing", "Information Architecture", "Interaction Design",
    "Visual Design", "Product Strategy", "Data Analysis", "Collaboration",
  ],
  "Video Editor": [
    "Adobe Premiere Pro", "Final Cut Pro", "DaVinci Resolve", "After Effects",
    "Video Editing", "Color Grading", "Audio Editing", "Motion Graphics",
    "Visual Effects", "Storytelling", "Cinematography", "Lighting",
    "Sound Design", "Media Encoder", "Compression",
  ],
  "Branding Designer": [
    "Brand Strategy", "Logo Design", "Visual Identity", "Typography",
    "Color Theory", "Photoshop", "Illustrator", "InDesign", "Brand Guidelines",
    "Packaging Design", "Marketing Materials", "Social Media Design",
    "Figma", "After Effects", "Brand Storytelling",
  ],
  "Drawing Artist": [
    "Digital Art", "Illustration", "Procreate", "Photoshop", "Sketching",
    "Character Design", "Concept Art", "Comic Art", "Manga", "Painting",
    "Color Theory", "Anatomy", "Visual Storytelling", "Creativity",
    "Adobe Illustrator", "Concept Development",
  ],
};

// Roles that should see the Task Submission screen
const CREATIVE_ROLES = [
  "UI/UX Designer", "Graphic Designer", "Product Designer",
  "Video Editor", "Branding Designer", "Drawing Artist",
];

const isCreativeRole = (role) => CREATIVE_ROLES.includes(role);

const EXPERIENCE = [
  { label: "Fresher", value: "fresher" },
  { label: "Intern", value: "intern" },
  { label: "0–2 Years", value: "0-2" },
  { label: "2–5 Years", value: "2-5" },
  { label: "5+ Years", value: "5+" },
];

const NOTICE_PERIODS = ["Immediate", "2 weeks", "1 month", "2 months", "3 months"];
const WORK_MODES = ["Remote", "On-site", "Hybrid"];

const REQUIRED_FIELDS = [
  "fullName", "email", "phone", "role", "skills", "experience",
  "noticePeriod", "workMode",
];

const FIELDS = [
  "fullName", "email", "phone", "role", "skills", "experience",
  "company", "noticePeriod", "workMode",
];

const FIELD_LABELS = {
  fullName: "Full Name",
  email: "Email Address",
  phone: "Mobile Number",
  role: "Primary Role",
  skills: "Skills",
  experience: "Years of Experience",
  company: "Previous Company",
  noticePeriod: "Notice Period",
  workMode: "Preferred Work Mode",
};

const VERIFICATION_STEPS = [
  { id: 1, title: "Step 1: Skill Test", desc: "Complete skill-based assessment", icon: "📄" },
  { id: 2, title: "Step 2: Task Submission", desc: "Upload practical assignment", icon: "⏱" },
  { id: 3, title: "Step 3: Communication Test", desc: "Assess communication skills", icon: "💬" },
];

const EMPTY_FORM = {
  fullName: "", email: "", phone: "", role: "", skills: "",
  experience: "", company: "", noticePeriod: "", workMode: "",
};

const isValidId = (val) =>
  val !== null && val !== undefined && String(val).trim() !== "" &&
  String(val).trim() !== "null" && String(val).trim() !== "undefined" && String(val).trim() !== "0";

const isFresher = (expValue) => expValue === "fresher";

const readStoredEmployeeId = () => {
  try {
    const raw = sessionStorage.getItem("user");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (isValidId(parsed?.employee_id)) return String(parsed.employee_id);
    }
  } catch (e) {}
  try {
    const id = sessionStorage.getItem("employee_id");
    if (isValidId(id)) return id;
  } catch (e) {}
  return null;
};

const persistEmployeeId = (id) => {
  try {
    const raw = sessionStorage.getItem("user");
    const userObj = raw ? JSON.parse(raw) : {};
    userObj.employee_id = id;
    sessionStorage.setItem("user", JSON.stringify(userObj));
  } catch (e) {}
  try {
    sessionStorage.setItem("employee_id", String(id));
  } catch (e) {}
};

const clearStoredEmployeeId = () => {
  try {
    const raw = sessionStorage.getItem("user");
    if (raw) {
      const userObj = JSON.parse(raw);
      delete userObj.employee_id;
      sessionStorage.setItem("user", JSON.stringify(userObj));
    }
  } catch (e) {}
  try {
    sessionStorage.removeItem("employee_id");
  } catch (e) {}
};

const callExperienceCreate = async (employeeId, yearsOfExperience, companyName) => {
  const fresher = isFresher(yearsOfExperience);
  const payload = {
    employee_id: employeeId,
    company_name: fresher ? "N/A" : companyName || "",
    designation: fresher ? "N/A" : "N/A",
    years_of_experience: yearsOfExperience,
  };

  const response = await fetch(SummaryApi.EmployeeExperienceCreate.url, {
    method: SummaryApi.EmployeeExperienceCreate.method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.message || "Experience create failed");
  }
  return result;
};

const callExperienceUpdate = async (experienceId, yearsOfExperience, companyName) => {
  const fresher = isFresher(yearsOfExperience);
  const payload = {
    experience_id: experienceId,
    company_name: fresher ? "N/A" : companyName || "",
    designation: fresher ? "N/A" : "N/A",
    years_of_experience: yearsOfExperience,
  };

  const response = await fetch(SummaryApi.EmployeeExperienceCreateUpdate.url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.message || "Experience update failed");
  }
  return result;
};

const fetchProfileById = async (empId) => {
  const response = await fetch(SummaryApi.getEmployee.url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ employee_id: empId }),
  });
  const result = await response.json();
  if (!response.ok || !result?.data) throw new Error("getEmployee failed");
  return result.data;
};

export default function JobProfileDashboard() {
  const [memberTypeId, setMemberTypeId] = useState(null);
  const [memberTypeName, setMemberTypeName] = useState("");
  const [employeeId, setEmployeeId] = useState(() => readStoredEmployeeId());
  const [memberId, setMemberId] = useState(null);
  const [experienceId, setExperienceId] = useState(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [savedProfile, setSavedProfile] = useState(null);
  const [viewMode, setViewMode] = useState("form");
  const [verificationStarted, setVerificationStarted] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [profileImage, setProfileImage] = useState(() => {
    try { return sessionStorage.getItem("profile_image") || null; } catch { return null; }
  });
  const [verificationId, setVerificationId] = useState(() => {
    return sessionStorage.getItem("verification_id") || null;
  });
  const [postVerificationScreen, setPostVerificationScreen] = useState(() => {
    return sessionStorage.getItem("verification_screen") || null;
  });

  // Skills autocomplete state
  const [skillInput, setSkillInput] = useState("");
  const [skillSuggestions, setSkillSuggestions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState(() => {
    const currentSkills = form.skills || "";
    return currentSkills ? currentSkills.split(",").map((s) => s.trim()).filter(Boolean) : [];
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const skillInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // ─── API Function to save pending task ──────────────────────────────
  const savePendingTask = async (wizardStep, verificationScreen = null, status = "pending") => {
    try {
      const employeeStr = sessionStorage.getItem("employee");
      if (!employeeStr) {
        console.warn("No employee data found");
        return;
      }

      const employee = JSON.parse(employeeStr);
      const employee_id = employee.employee_id || sessionStorage.getItem("employee_id");

      if (!employee_id) {
        console.warn("No employee_id found");
        return;
      }

      const member_type_id = sessionStorage.getItem("member_type_id") || employee.member_type_id;

      const payload = {
        employee_id: employee_id,
        member_type_id: member_type_id,
        wizard_step: wizardStep,
        verification_screen: verificationScreen,
        status: status,
      };

      console.log("📤 Saving pending task:", payload);

      const response = await fetch(SummaryApi.createorupdatependingtasks.url, {
        method: SummaryApi.createorupdatependingtasks.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("✅ Pending task saved:", result);
      return result;
    } catch (err) {
      console.error("❌ Error saving pending task:", err);
    }
  };

  // Update selectedSkills when form.skills changes
  useEffect(() => {
    const currentSkills = form.skills || "";
    const skillsArray = currentSkills ? currentSkills.split(",").map((s) => s.trim()).filter(Boolean) : [];
    setSelectedSkills(skillsArray);
  }, [form.skills]);

  const getSkillSuggestions = (input, role) => {
    if (!input || input.trim() === "") {
      return ROLE_SKILLS[role] || [];
    }
    const inputLower = input.toLowerCase().trim();
    const roleSkills = ROLE_SKILLS[role] || [];
    return roleSkills
      .filter((skill) => skill.toLowerCase().includes(inputLower) && !selectedSkills.includes(skill))
      .slice(0, 8);
  };

  const handleSkillInputChange = (e) => {
    const value = e.target.value;
    setSkillInput(value);
    const suggestions = getSkillSuggestions(value, form.role);
    setSkillSuggestions(suggestions);
    setShowSuggestions(suggestions.length > 0 && value.trim() !== "");
    setActiveSuggestionIndex(-1);
  };

  const addSkill = (skill) => {
    if (!skill || skill.trim() === "") return;
    const trimmedSkill = skill.trim();
    if (selectedSkills.includes(trimmedSkill)) return;
    const newSkills = [...selectedSkills, trimmedSkill];
    setSelectedSkills(newSkills);
    setForm((prev) => ({ ...prev, skills: newSkills.join(", ") }));
    setSkillInput("");
    setSkillSuggestions([]);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
    skillInputRef.current?.focus();
  };

  const removeSkill = (skillToRemove) => {
    const newSkills = selectedSkills.filter((s) => s !== skillToRemove);
    setSelectedSkills(newSkills);
    setForm((prev) => ({ ...prev, skills: newSkills.join(", ") }));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (activeSuggestionIndex >= 0 && activeSuggestionIndex < skillSuggestions.length) {
        addSkill(skillSuggestions[activeSuggestionIndex]);
        return;
      }
      if (skillInput.trim()) {
        addSkill(skillInput);
        return;
      }
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (showSuggestions && skillSuggestions.length > 0) {
        setActiveSuggestionIndex((prev) => prev < skillSuggestions.length - 1 ? prev + 1 : prev);
      }
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (showSuggestions && skillSuggestions.length > 0) {
        setActiveSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
      }
    }
    if (e.key === "Escape") {
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    }
    if (e.key === "Backspace" && skillInput === "" && selectedSkills.length > 0) {
      removeSkill(selectedSkills[selectedSkills.length - 1]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (skillInputRef.current && !skillInputRef.current.contains(e.target) &&
          suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (form.role && skillInput) {
      const suggestions = getSkillSuggestions(skillInput, form.role);
      setSkillSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0 && skillInput.trim() !== "");
    }
  }, [form.role]);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("memberType");
      if (raw) {
        const parsed = JSON.parse(raw);
        setMemberTypeId(parsed.member_type_id);
        setMemberTypeName(parsed.member_type_name);
        return;
      }
    } catch (e) {}
    try {
      const id = sessionStorage.getItem("member_type_id");
      const name = sessionStorage.getItem("member_type_name");
      if (id) {
        setMemberTypeId(Number(id));
        setMemberTypeName(name || "");
        return;
      }
    } catch (e) {}
    try {
      const raw = sessionStorage.getItem("user");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.member_type_id) {
          setMemberTypeId(parsed.member_type_id);
          setMemberTypeName(parsed.member_type_name || "");
        }
        if (parsed?.member_id) {
          setMemberId(parsed.member_id);
        }
      }
    } catch (e) {}
    try {
      const mId = sessionStorage.getItem("member_id");
      if (mId) setMemberId(Number(mId));
    } catch (e) {}
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const storedId = readStoredEmployeeId();
      if (!storedId) {
        setIsLoading(false);
        return;
      }
      setEmployeeId(storedId);
      try {
        const response = await fetch(SummaryApi.getEmployee.url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ employee_id: storedId }),
        });
        const result = await response.json();
        if (response.ok && result?.data) {
          const d = result.data;
          if (isValidId(d.employee_id)) {
            persistEmployeeId(d.employee_id);
            setEmployeeId(String(d.employee_id));
          }
          if (isValidId(d.member_id)) {
            setMemberId(d.member_id);
          }
          if (Array.isArray(d.experiences) && d.experiences.length > 0) {
            const firstExp = d.experiences[0];
            if (isValidId(firstExp?.experience_id)) {
              setExperienceId(String(firstExp.experience_id));
            }
          }
          const exp = d.experiences?.[0] || {};
          const profile = {
            fullName: d.full_name || "",
            email: d.email || "",
            phone: d.phone || "",
            role: d.role || "",
            skills: d.skills || "",
            experience: exp.years_of_experience ? String(exp.years_of_experience) : "",
            company: exp.company_name || "",
            noticePeriod: d.notice_period || "",
            workMode: d.preferred_work_mode || "",
          };
          setForm(profile);
          setSavedProfile(profile);
          setViewMode("profile");
          if (d.profile_image) {
            const imageName = d.profile_image.replace("uploads/profiles/", "");
            const profileImageUrl = SummaryApi.getprofileimage.url + imageName;
            setProfileImage(profileImageUrl);
            try { sessionStorage.setItem("profile_image", profileImageUrl); } catch {}
          }
        } else {
          clearStoredEmployeeId();
          setEmployeeId(null);
        }
      } catch (err) {
        console.warn("getEmployee failed:", err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const screen = sessionStorage.getItem("verification_screen");
      const vId = sessionStorage.getItem("verification_id");
      if (vId) {
        setVerificationId(vId);
        sessionStorage.removeItem("verification_screen");
        setPostVerificationScreen(null);
        return;
      }
      if (screen) {
        setPostVerificationScreen(screen);
      } else {
        setPostVerificationScreen(null);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 2800);
  };

  const handleProfileImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("Please select a valid image file.");
      e.target.value = "";
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      showToast("Image must be smaller than 2 MB.");
      e.target.value = "";
      return;
    }
    const empId = employeeId || readStoredEmployeeId();
    if (!empId) {
      showToast("Please save your profile first before uploading an image.");
      e.target.value = "";
      return;
    }
    try {
      const formData = new FormData();
      formData.append("employee_id", empId);
      formData.append("profile_image", file);
      const response = await fetch(SummaryApi.profileimageupload.url, {
        method: SummaryApi.profileimageupload.method,
        body: formData,
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Image upload failed");
      }
      const imagePath = result.profile_image || result.data?.profile_image;
      if (imagePath) {
        const imageName = imagePath.replace("uploads/profiles/", "");
        const profileImageUrl = SummaryApi.getprofileimage.url + imageName;
        setProfileImage(profileImageUrl);
        try { sessionStorage.setItem("profile_image", profileImageUrl); } catch {}
        showToast("Profile image updated successfully!");
      } else {
        throw new Error("Image path not returned from server");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      showToast(error.message || "Failed to upload image. Please try again.");
    }
    e.target.value = "";
  };

  const fresherSelected = isFresher(form.experience);

  const getProgress = () => {
    const profileToCheck = viewMode === "form" ? form : savedProfile;
    if (!profileToCheck) return 0;
    const fields = isFresher(profileToCheck.experience)
      ? FIELDS.filter((f) => f !== "company" && f !== "noticePeriod")
      : FIELDS;
    const filledFields = fields.filter((f) => profileToCheck[f] && profileToCheck[f].trim() !== "").length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const progress = getProgress();

  const handleChange = (field, value) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "experience" && isFresher(value)) {
        updated.company = "";
        updated.noticePeriod = "";
      }
      return updated;
    });
  };

  const validateRequiredFields = () => {
    const missingFields = [];
    const fieldsToCheck = fresherSelected
      ? REQUIRED_FIELDS.filter((f) => f !== "noticePeriod")
      : REQUIRED_FIELDS;
    for (const field of fieldsToCheck) {
      const value = form[field];
      if (!value || (typeof value === "string" && value.trim() === "")) {
        missingFields.push(FIELD_LABELS[field]);
      }
    }
    if (missingFields.length > 0) {
      showToast(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return false;
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      showToast("Please enter a valid email address");
      return false;
    }
    if (form.phone && !/^\d{10}$/.test(form.phone)) {
      showToast("Please enter a valid 10-digit mobile number");
      return false;
    }
    return true;
  };

// In your ProfileSection.jsx, update the handleSave function

// In ProfileSection.jsx - Update the handleSave function

const handleSave = async () => {
  if (!validateRequiredFields()) {
    return;
  }

  const isUpdate = isValidId(employeeId);
  if (!isUpdate && !memberTypeId) {
    showToast("Session error: member type not found. Please log in again.");
    return;
  }

  const apiConfig = isUpdate ? SummaryApi.EmployeeUpdate : SummaryApi.EmployeeCreate;
  setIsSaving(true);

  try {
    const noticePeriodValue = fresherSelected ? "N/A" : form.noticePeriod;
    let payload;
    if (isUpdate) {
      payload = {
        employee_id: Number(employeeId),
        member_id: memberId,
        email: form.email,
        full_name: form.fullName,
        notice_period: noticePeriodValue,
        preferred_work_mode: form.workMode,
      };
    } else {
      payload = {
        member_type_id: memberTypeId,
        email: form.email,
        phone: form.phone,
        full_name: form.fullName,
        role: form.role,
        skills: form.skills,
        notice_period: noticePeriodValue,
        preferred_work_mode: form.workMode,
      };
    }

    console.log("📤 Saving profile with payload:", payload);

    const response = await fetch(apiConfig.url, {
      method: apiConfig.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log("📥 Profile save response:", result);

    // Handle errors
    if (result.message && result.message.includes("Mobile number already exists")) {
      showToast("Mobile number already exists. Please use a different number.");
      setIsSaving(false);
      return;
    } else if (result.message && result.message.includes("Email already exists")) {
      showToast("Email already exists. Please use a different email.");
      setIsSaving(false);
      return;
    } else if (response.status === 409) {
      showToast(result.message || "Conflict error. Please check your details.");
      setIsSaving(false);
      return;
    }

    if (!response.ok) {
      throw new Error(result.message || `Server error: ${response.status}`);
    }

    let resolvedEmployeeId = employeeId;

    if (!isUpdate) {
      const newId = result?.data?.employee_id ?? result?.employee_id;
      if (isValidId(newId)) {
        persistEmployeeId(newId);
        setEmployeeId(String(newId));
        resolvedEmployeeId = String(newId);
      } else {
        throw new Error("Profile created but employee_id missing in response.");
      }
    }

    // Experience API call
    if (form.experience && form.experience !== "") {
      try {
        if (!isUpdate) {
          const expResult = await callExperienceCreate(resolvedEmployeeId, form.experience, form.company);
          const newExpId = expResult?.data?.experience_id ?? expResult?.experience_id;
          if (isValidId(newExpId)) {
            setExperienceId(String(newExpId));
          }
        } else {
          if (isValidId(experienceId)) {
            await callExperienceUpdate(experienceId, form.experience, form.company);
          } else {
            const expResult = await callExperienceCreate(resolvedEmployeeId, form.experience, form.company);
            const newExpId = expResult?.data?.experience_id ?? expResult?.experience_id;
            if (isValidId(newExpId)) {
              setExperienceId(String(newExpId));
            }
          }
        }
      } catch (expError) {
        console.error("⚠️ Experience API failed:", expError.message);
        showToast("Profile saved, but experience record failed: " + expError.message);
        setViewMode("profile");
        setIsSaving(false);
        return;
      }
    }

    // ─── ✅ SAVE PENDING TASK - wizard_step = 1 (Profile completed) ───
    const finalEmployeeId = resolvedEmployeeId || sessionStorage.getItem("employee_id");
    
    if (finalEmployeeId) {
      try {
        // Get member_type_id from session
        let memberTypeIdForTask = null;
        
        try {
          const memberTypeRaw = sessionStorage.getItem("memberType");
          if (memberTypeRaw) {
            const memberTypeObj = JSON.parse(memberTypeRaw);
            memberTypeIdForTask = memberTypeObj.member_type_id;
            console.log("📋 Got member_type_id from memberType:", memberTypeIdForTask);
          }
        } catch (e) {
          console.warn("Could not parse memberType from session:", e);
        }
        
        if (!memberTypeIdForTask) {
          memberTypeIdForTask = sessionStorage.getItem("member_type_id");
          console.log("📋 Got member_type_id from direct:", memberTypeIdForTask);
        }
        
        if (!memberTypeIdForTask) {
          memberTypeIdForTask = memberTypeId;
          console.log("📋 Using member_type_id from state:", memberTypeIdForTask);
        }
        
        if (!memberTypeIdForTask) {
          memberTypeIdForTask = 2; // Default to Employee
          console.log("📋 Using default member_type_id:", memberTypeIdForTask);
        }
        
        // IMPORTANT: Pass a proper string for verification_screen, not null
        // For wizard_step = 1 (Profile completed), verification_screen should be empty string or a specific value
        const taskPayload = {
          employee_id: String(finalEmployeeId),
          member_type_id: String(memberTypeIdForTask),
          wizard_step: 1,
          verification_screen: "", // Empty string instead of null
          status: "pending",
        };

        console.log("📤 Saving pending task with payload:", taskPayload);

        const taskResponse = await fetch(SummaryApi.createorupdatependingtasks.url, {
          method: SummaryApi.createorupdatependingtasks.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskPayload),
        });

        // Check if response is ok before parsing JSON
        if (!taskResponse.ok) {
          const errorText = await taskResponse.text();
          console.warn("⚠️ Pending task API returned error:", taskResponse.status, errorText);
          throw new Error(`API returned ${taskResponse.status}: ${errorText}`);
        }

        const taskResult = await taskResponse.json();
        console.log("✅ Pending task response:", taskResult);
        
        if (taskResult.success) {
          console.log("✅ Pending task saved successfully!");
          sessionStorage.setItem("wizardStep", "1");
          sessionStorage.setItem("pending_task_saved", "true");
        } else {
          console.warn("⚠️ Pending task API returned error:", taskResult.message);
        }
      } catch (taskError) {
        console.error("❌ Error saving pending task:", taskError);
        // Don't stop the flow - profile is already saved
      }
    } else {
      console.warn("⚠️ No employee_id available to save pending task");
    }

    // Refresh profile data
    if (!isUpdate && isValidId(resolvedEmployeeId)) {
      try {
        const freshData = await fetchProfileById(resolvedEmployeeId);
        if (isValidId(freshData.employee_id)) {
          persistEmployeeId(freshData.employee_id);
          setEmployeeId(String(freshData.employee_id));
        }
        if (isValidId(freshData.member_id)) {
          setMemberId(freshData.member_id);
        }
        if (Array.isArray(freshData.experiences) && freshData.experiences.length > 0) {
          const firstExp = freshData.experiences[0];
          if (isValidId(firstExp?.experience_id)) {
            setExperienceId(String(firstExp.experience_id));
          }
        }
        const exp = freshData.experiences?.[0] || {};
        const freshProfile = {
          fullName: freshData.full_name || "",
          email: freshData.email || "",
          phone: freshData.phone || "",
          role: freshData.role || "",
          skills: freshData.skills || "",
          experience: exp.years_of_experience ? String(exp.years_of_experience) : "",
          company: exp.company_name || "",
          noticePeriod: freshData.notice_period || "",
          workMode: freshData.preferred_work_mode || "",
        };
        setForm(freshProfile);
        setSavedProfile(freshProfile);
        if (freshData.profile_image) {
          const imageName = freshData.profile_image.replace("uploads/profiles/", "");
          const profileImageUrl = SummaryApi.getprofileimage.url + imageName;
          setProfileImage(profileImageUrl);
          try { sessionStorage.setItem("profile_image", profileImageUrl); } catch {}
        }
      } catch (getErr) {
        setSavedProfile({ ...form });
      }
    } else if (isUpdate) {
      setSavedProfile({ ...form });
    }

    setViewMode("profile");
    showToast(isUpdate ? "Profile updated successfully ✓" : "Profile created successfully ✓");
  } catch (error) {
    console.error("❌ Save FAILED:", error.message);
    showToast(error.message || "Failed to save profile. Please try again.");
  } finally {
    setIsSaving(false);
  }
};

  const handleDeleteProfile = async () => {
    try {
      const response = await fetch(SummaryApi.EmployeeCreate.url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employee_id: isValidId(employeeId) ? Number(employeeId) : undefined,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Delete failed");
      clearStoredEmployeeId();
      setForm({ ...EMPTY_FORM });
      setSavedProfile(null);
      setEmployeeId(null);
      setExperienceId(null);
      setProfileImage(null);
      try { sessionStorage.removeItem("profile_image"); } catch {}
      setViewMode("form");
      setVerificationStarted(false);
      setShowDeleteConfirm(false);
      showToast("Profile deleted successfully");
    } catch (error) {
      console.error("❌ Delete FAILED:", error.message);
      showToast(error.message || "Failed to delete profile.");
      setShowDeleteConfirm(false);
    }
  };

  const isProfileComplete = progress === 100 && isValidId(employeeId);

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", background: "#f2f5f1", flexDirection: "column", gap: 14 }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#4CAF0A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 0.8s linear infinite" }}>
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
        <p style={{ color: "#7a8a7a", fontSize: 14 }}>Loading your profile...</p>
      </div>
    );
  }

  // Role-based screen swap
  if (postVerificationScreen === "taskupload") {
    return (
      <Taskupload
        role={savedProfile?.role || form?.role}
        employeeId={employeeId}
        onComplete={() => {
          sessionStorage.removeItem("verification_screen");
          setPostVerificationScreen(null);
        }}
      />
    );
  }

  if (postVerificationScreen === "verification") {
    return (
      <VerificationProcess
        role={savedProfile?.role || form?.role}
        employeeId={employeeId}
        onComplete={() => {
          sessionStorage.removeItem("verification_screen");
          setPostVerificationScreen(null);
        }}
      />
    );
  }

  if (postVerificationScreen === "communication") {
    return (
      <CommunicationAssessment
        role={savedProfile?.role || form?.role}
        employeeId={employeeId}
        onBack={() => {
          sessionStorage.setItem("verification_screen", "taskupload");
          sessionStorage.setItem("wizardStep", "2");
          setPostVerificationScreen("taskupload");
        }}
        onNext={() => {
          sessionStorage.removeItem("verification_screen");
          sessionStorage.setItem("wizardStep", "5");
          window.dispatchEvent(new Event("storage"));
          setPostVerificationScreen(null);
        }}
      />
    );
  }

  const isSkillsDisabled = !form.role || isValidId(employeeId);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .jpd-root{font-family:'DM Sans',-apple-system,sans-serif;background:#f2f5f1;min-height:100vh;padding-bottom:56px}
        .jpd-topbar{height:4px;background:linear-gradient(90deg,#4CAF0A,#56c478);width:100%}
        .jpd-hdr{text-align:center;padding:32px 20px 18px}
        .jpd-hdr h1{font-size:24px;font-weight:600;color:#1a1f1a;letter-spacing:-0.3px}
        .jpd-hdr p{font-size:14px;color:#7a8a7a;margin-top:5px}
        .jpd-logo{display:block;height:48px;width:auto;object-fit:contain;margin:0 auto 14px}
        .jpd-wrap{max-width:1080px;margin:0 auto;padding:0 20px}
        .jpd-prog{background:#fff;border:1px solid #e2e8e2;border-radius:14px;padding:1.3rem 1.6rem;margin-bottom:20px;box-shadow:0 1px 3px rgba(0,0,0,.04)}
        .jpd-prog-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px}
        .jpd-prog-top h2{font-size:15px;font-weight:600;color:#1a1f1a}
        .jpd-prog-top p{font-size:13px;color:#9aaa9a;margin-top:3px}
        .jpd-pct{font-size:26px;font-weight:600;color:#4CAF0A}
        .jpd-bar-bg{background:#e5ebe5;border-radius:999px;height:9px;overflow:hidden}
        .jpd-bar-fill{background:linear-gradient(90deg,#4CAF0A,#56c478);height:100%;border-radius:999px;transition:width .6s cubic-bezier(.4,0,.2,1)}
        .jpd-grid{display:grid;grid-template-columns:1fr 310px;gap:20px;align-items:start}
        .jpd-card{background:#fff;border:1px solid #e2e8e2;border-radius:14px;padding:1.6rem 1.8rem;box-shadow:0 1px 3px rgba(0,0,0,.04)}
        .jpd-card-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.4rem}
        .jpd-card-head h2{margin-bottom:0;letter-spacing:-0.2px}
        .jpd-card h2{font-size:18px;font-weight:600;color:#1a1f1a;margin-bottom:1.4rem;letter-spacing:-0.2px}
        .jpd-avatar-wrap{position:relative;flex-shrink:0}
        .jpd-avatar{width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#eafaf0,#dff3e4);border:1.5px solid #b0d4b8;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#3d9808;overflow:hidden;cursor:pointer;position:relative;transition:border-color .15s}
        .jpd-avatar:hover{border-color:#4CAF0A}
        .jpd-avatar img{width:100%;height:100%;object-fit:cover;display:block}
        .jpd-avatar-cam{position:absolute;bottom:-2px;right:-2px;width:20px;height:20px;border-radius:50%;background:#4CAF0A;border:2px solid #fff;display:flex;align-items:center;justify-content:center;color:#fff;cursor:pointer;transition:background .15s}
        .jpd-avatar-cam:hover{background:#3d9808}
        .jpd-avatar-input{display:none}
        .jpd-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        .jpd-field{display:flex;flex-direction:column;gap:7px;margin-bottom:16px}
        .jpd-field label{font-size:13px;font-weight:500;color:#5a6a5a}
        .required-star{color:#e24b4a;margin-left:4px;font-size:14px}
        .jpd-field input,.jpd-field select{border:1.5px solid #dde5dd;border-radius:9px;padding:10px 13px;font-size:14px;font-family:'DM Sans',sans-serif;background:#fafcfa;color:#1a1f1a;outline:none;transition:border-color .15s,box-shadow .15s;appearance:none;-webkit-appearance:none}
        .jpd-field select{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239aaa9a' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 13px center;padding-right:36px}
        .jpd-field input:focus,.jpd-field select:focus{border-color:#4CAF0A;box-shadow:0 0 0 3px rgba(76,175,10,.12);background:#fff}
        .jpd-field input::placeholder{color:#b8c8b8}
        .jpd-btn-green{background:#4CAF0A;color:#fff;border:none;border-radius:9px;padding:11px 26px;font-size:14px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:8px;box-shadow:0 2px 8px rgba(76,175,10,.25);transition:background .15s,transform .1s}
        .jpd-btn-green:hover{background:#3d9808}
        .jpd-btn-green:active{transform:scale(.98)}
        .jpd-btn-outline{background:transparent;color:#1a1f1a;border:1.5px solid #dde5dd;border-radius:9px;padding:11px 26px;font-size:14px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:background .15s,border-color .15s}
        .jpd-btn-outline:hover{background:#f4f7f4;border-color:#b0d4b8}
        .jpd-btn-delete{background:transparent;color:#e24b4a;border:1.5px solid #f5c6c6;border-radius:9px;padding:11px 26px;font-size:14px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:background .15s,border-color .15s}
        .jpd-btn-delete:hover{background:#fff5f5;border-color:#e24b4a}
        .jpd-btn-delete-confirm{background:#e24b4a;color:#fff;border:none;border-radius:9px;padding:11px 26px;font-size:14px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:background .15s,transform .1s}
        .jpd-btn-delete-confirm:hover{background:#c73a39}
        .jpd-btn-delete-confirm:active{transform:scale(.98)}
        .jpd-btn-row{display:flex;gap:10px;flex-wrap:wrap;margin-top:6px}
        .jpd-delete-banner{background:#fff5f5;border:1.5px solid #f5c6c6;border-radius:10px;padding:14px 16px;margin-top:16px;display:flex;flex-direction:column;gap:10px}
        .jpd-delete-banner p{font-size:13px;color:#c73a39;font-weight:500}
        .jpd-delete-banner-btns{display:flex;gap:10px}
        .jpd-pv-row{display:flex;justify-content:space-between;align-items:center;padding:11px 0;border-bottom:1px solid #f0f4f0}
        .jpd-pv-row:last-child{border-bottom:none}
        .jpd-pv-label{font-size:13px;color:#7a8a7a}
        .jpd-pv-val{font-size:14px;font-weight:500;color:#1a1f1a;text-align:right;max-width:65%}
        .jpd-pv-empty{color:#b8c8b8;font-weight:400}
        .jpd-right{display:flex;flex-direction:column;gap:18px}
        .jpd-right-card{background:#fff;border:1px solid #e2e8e2;border-radius:14px;padding:1.25rem 1.4rem;box-shadow:0 1px 3px rgba(0,0,0,.04)}
        .jpd-right-card h2{font-size:15px;font-weight:600;color:#1a1f1a;margin-bottom:1.1rem}
        .jpd-step{display:flex;align-items:flex-start;gap:11px;margin-bottom:14px}
        .jpd-step-icon{width:38px;height:38px;border-radius:50%;background:#f4f7f4;border:1px solid #e2e8e2;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:17px}
        .jpd-step-body{flex:1;padding-top:1px}
        .jpd-step-head{display:flex;justify-content:space-between;align-items:center;gap:6px}
        .jpd-step-title{font-size:13.5px;font-weight:500;color:#1a1f1a}
        .jpd-badge{font-size:11px;background:#f2f4f2;color:#9aaa9a;padding:2px 10px;border-radius:999px;border:1px solid #dde5dd;white-space:nowrap}
        .jpd-badge.inprog{background:#fffbea;color:#9a7510;border-color:#e8d470}
        .jpd-step-desc{font-size:12px;color:#9aaa9a;margin-top:2px}
        .jpd-start-btn{width:100%;background:#4CAF0A;color:#fff;border:none;border-radius:9px;padding:12px;font-size:14px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;margin-top:4px;box-shadow:0 2px 8px rgba(76,175,10,.25);transition:background .15s,transform .1s}
        .jpd-start-btn:hover:not(:disabled){background:#3d9808}
        .jpd-start-btn:active:not(:disabled){transform:scale(.98)}
        .jpd-start-btn:disabled{opacity:0.5;cursor:not-allowed}
        .jpd-status-head{display:flex;align-items:center;gap:9px;margin-bottom:10px}
        .jpd-status-head h3{font-size:15px;font-weight:600;color:#1a1f1a}
        .jpd-pill{display:inline-flex;align-items:center;font-size:12px;font-weight:500;padding:4px 14px;border-radius:999px;margin-bottom:10px}
        .jpd-pill.pending{background:#fffbea;color:#9a7510;border:1px solid #e8d470}
        .jpd-pill.inprog{background:#eafaf0;color:#1e7a39;border:1px solid #b0d4b8}
        .jpd-status-desc{font-size:13px;color:#7a8a7a;line-height:1.6}
        .jpd-warn-banner{background:#fffbea;border:1.5px solid #e8d470;border-radius:10px;padding:10px 14px;margin-bottom:16px;font-size:13px;color:#9a7510;font-weight:500}
        .jpd-toast{position:fixed;bottom:26px;left:50%;transform:translateX(-50%) translateY(80px);background:#1a1f1a;color:#fff;padding:11px 22px;border-radius:999px;font-size:13px;font-weight:500;font-family:'DM Sans',sans-serif;transition:transform .3s cubic-bezier(.4,0,.2,1),opacity .3s;opacity:0;pointer-events:none;z-index:9999;display:flex;align-items:center;gap:8px}
        .jpd-toast.show{transform:translateX(-50%) translateY(0);opacity:1}
        .jpd-toast-dot{width:8px;height:8px;border-radius:50%;background:#56c478;flex-shrink:0}
        @keyframes jpd-spin { to { transform:rotate(360deg); } }
        @media(max-width:720px){
          .jpd-grid{grid-template-columns:1fr}
          .jpd-row{grid-template-columns:1fr}
          .jpd-card{padding:1.2rem}
          .jpd-logo{height:38px}
        }
        .jpd-skills-container{position:relative;width:100%}
        .jpd-skills-tags{display:flex;flex-wrap:wrap;gap:6px;padding:6px;border:1.5px solid #dde5dd;border-radius:9px;background:#fafcfa;min-height:44px;align-items:center;cursor:text;transition:border-color .15s,box-shadow .15s}
        .jpd-skills-tags:focus-within{border-color:#4CAF0A;box-shadow:0 0 0 3px rgba(76,175,10,.12);background:#fff}
        .jpd-skills-tags.disabled{background:#f5f5f5;cursor:not-allowed;opacity:0.8}
        .jpd-skills-tags.disabled:focus-within{border-color:#dde5dd;box-shadow:none}
        .jpd-skill-tag{display:inline-flex;align-items:center;gap:4px;background:#eafaf0;color:#1a1f1a;padding:4px 8px 4px 10px;border-radius:6px;font-size:13px;font-weight:500;border:1px solid #b0d4b8}
        .jpd-skill-tag button{background:none;border:none;cursor:pointer;padding:0;display:flex;align-items:center;color:#5a6a5a;transition:color .15s}
        .jpd-skill-tag button:hover:not(:disabled){color:#e24b4a}
        .jpd-skill-tag button:disabled{cursor:not-allowed;opacity:0.5}
        .jpd-skill-input{border:none;outline:none;padding:6px 4px;font-size:14px;font-family:'DM Sans',sans-serif;background:transparent;color:#1a1f1a;flex:1;min-width:120px}
        .jpd-skill-input::placeholder{color:#b8c8b8}
        .jpd-skill-input:disabled{cursor:not-allowed;opacity:0.6}
        .jpd-skills-suggestions{position:absolute;top:calc(100% + 4px);left:0;right:0;background:#fff;border:1.5px solid #dde5dd;border-radius:9px;box-shadow:0 4px 12px rgba(0,0,0,.08);max-height:200px;overflow-y:auto;z-index:1000;display:none}
        .jpd-skills-suggestions.show{display:block}
        .jpd-skill-suggestion{padding:8px 14px;cursor:pointer;font-size:13px;color:#1a1f1a;transition:background .1s}
        .jpd-skill-suggestion:hover,.jpd-skill-suggestion.active{background:#f0f7f0}
        .jpd-skill-suggestion mark{background:#d4e8d4;font-weight:600}
        .jpd-skills-empty{padding:10px 14px;font-size:13px;color:#9aaa9a}
        .jpd-skill-char-count{font-size:12px;color:#9aaa9a;margin-top:4px;text-align:right}
        .jpd-skill-char-count .limit-reached{color:#e24b4a}
        .jpd-skill-warning{font-size:12px;color:#d4a017;margin-top:4px}
      `}</style>

      <div className="jpd-root">
        <div className="jpd-topbar" />
        <div className="jpd-hdr">
          <img src={Logo} alt="Logo" className="jpd-logo" />
          <h1>Welcome back!</h1>
          <p>Complete your profile and get verified to start receiving job offers</p>
        </div>

        <div className="jpd-wrap">
          <div className="jpd-prog">
            <div className="jpd-prog-top">
              <div>
                <h2>Profile Completion</h2>
                <p>Fill and save all fields to reach 100%</p>
              </div>
              <span className="jpd-pct">{progress}%</span>
            </div>
            <div className="jpd-bar-bg">
              <div className="jpd-bar-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="jpd-grid">
            <div className="jpd-card">
              <div className="jpd-card-head">
                <h2>{viewMode === "form" ? (isValidId(employeeId) ? "Edit Profile" : "Create Your Profile") : "Your Profile"}</h2>
                <label className="jpd-avatar-wrap">
                  <div className="jpd-avatar" title="Click to upload profile picture">
                    {profileImage ? <img src={profileImage} alt="Profile" /> : <User size={22} strokeWidth={2} />}
                  </div>
                  <span className="jpd-avatar-cam"><Camera size={11} strokeWidth={2.3} /></span>
                  <input type="file" accept="image/*" className="jpd-avatar-input" onChange={handleProfileImageChange} />
                </label>
              </div>

              {viewMode === "form" ? (
                <>
                  <div className="jpd-row">
                    <div className="jpd-field">
                      <label>Full Name <span className="required-star">*</span></label>
                      <input type="text" placeholder="John Doe" value={form.fullName} onChange={(e) => handleChange("fullName", e.target.value)} />
                    </div>
                    <div className="jpd-field">
                      <label>Email Address <span className="required-star">*</span></label>
                      <input type="email" placeholder="john@example.com" value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
                    </div>
                  </div>

                  <div className="jpd-row">
                    <div className="jpd-field">
                      <label>Mobile Number <span className="required-star">*</span></label>
                      <input type="tel" placeholder="9876543210" value={form.phone} maxLength={10} disabled={isValidId(employeeId)} onChange={(e) => { const value = e.target.value.replace(/\D/g, ""); if (value.length <= 10) handleChange("phone", value); }} style={{ background: isValidId(employeeId) ? "#f5f5f5" : "#fff", cursor: isValidId(employeeId) ? "not-allowed" : "text", opacity: isValidId(employeeId) ? 0.8 : 1 }} />
                      {isValidId(employeeId) && <small style={{ color: "#7a8a7a", marginTop: "4px" }}>Mobile number cannot be changed after profile creation.</small>}
                    </div>
                    <div className="jpd-field">
                      <label>Primary Role <span className="required-star">*</span></label>
                      <select value={form.role} onChange={(e) => handleChange("role", e.target.value)} disabled={isValidId(employeeId)} style={{ background: isValidId(employeeId) ? "#f5f5f5" : "#fafcfa", cursor: isValidId(employeeId) ? "not-allowed" : "pointer", opacity: isValidId(employeeId) ? 0.8 : 1 }}>
                        <option value="">Select your role</option>
                        {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                      {isValidId(employeeId) && <small style={{ color: "#7a8a7a", marginTop: "4px" }}>Primary role cannot be changed after profile creation.</small>}
                    </div>
                  </div>

                  <div className="jpd-field">
                    <label>Skills <span className="required-star">*</span></label>
                    <div className="jpd-skills-container">
                      <div className={`jpd-skills-tags${isSkillsDisabled ? " disabled" : ""}`} onClick={() => { if (!isSkillsDisabled) skillInputRef.current?.focus(); }}>
                        {selectedSkills.map((skill) => (
                          <span key={skill} className="jpd-skill-tag">
                            {skill}
                            <button type="button" onClick={(e) => { e.stopPropagation(); if (!isValidId(employeeId)) removeSkill(skill); }} disabled={isValidId(employeeId)}><X size={14} /></button>
                          </span>
                        ))}
                        <input ref={skillInputRef} type="text" className="jpd-skill-input" placeholder={isSkillsDisabled ? (!form.role ? "Please select a role first" : "Skills cannot be changed after profile creation") : (selectedSkills.length === 0 ? "Type a skill and press Enter..." : "")} value={skillInput} onChange={handleSkillInputChange} onKeyDown={handleSkillKeyDown} onFocus={() => { if (!isSkillsDisabled && skillInput.trim() && form.role) { const suggestions = getSkillSuggestions(skillInput, form.role); setSkillSuggestions(suggestions); setShowSuggestions(suggestions.length > 0); } }} disabled={isSkillsDisabled} />
                      </div>
                      {!isSkillsDisabled && (
                        <div ref={suggestionsRef} className={`jpd-skills-suggestions${showSuggestions ? " show" : ""}`}>
                          {skillSuggestions.length > 0 ? skillSuggestions.map((skill, index) => (
                            <div key={skill} className={`jpd-skill-suggestion${index === activeSuggestionIndex ? " active" : ""}`} onClick={() => addSkill(skill)} onMouseEnter={() => setActiveSuggestionIndex(index)}>{skill}</div>
                          )) : skillInput.trim() && <div className="jpd-skills-empty">No matching skills found. Press Enter to add "{skillInput}"</div>}
                        </div>
                      )}
                    </div>
                    {isSkillsDisabled && !form.role && !isValidId(employeeId) && <div className="jpd-skill-warning">⚠️ Please select a Primary Role first to add skills</div>}
                    {form.role && !isValidId(employeeId) && !isSkillsDisabled && <small style={{ color: "#7a8a7a", marginTop: "4px" }}>Type to see skill suggestions for {form.role}</small>}
                    {isValidId(employeeId) && <small style={{ color: "#7a8a7a", marginTop: "4px" }}>Skills cannot be changed after profile creation.</small>}
                    {selectedSkills.length > 0 && !isValidId(employeeId) && <div className="jpd-skill-char-count">{selectedSkills.length} skill{selectedSkills.length > 1 ? "s" : ""} added</div>}
                  </div>

                  <div className="jpd-row">
                    <div className="jpd-field">
                      <label>Years of Experience <span className="required-star">*</span></label>
                      <select value={form.experience} onChange={(e) => handleChange("experience", e.target.value)} disabled={isValidId(employeeId)} style={{ background: isValidId(employeeId) ? "#f5f5f5" : "#fafcfa", cursor: isValidId(employeeId) ? "not-allowed" : "pointer", opacity: isValidId(employeeId) ? 0.8 : 1 }}>
                        <option value="">Select experience</option>
                        {EXPERIENCE.map((x) => <option key={x.value} value={x.value}>{x.label}</option>)}
                      </select>
                      {isValidId(employeeId) && <small style={{ color: "#7a8a7a", marginTop: "4px" }}>Years of experience cannot be changed after profile creation.</small>}
                    </div>
                    <div className="jpd-field">
                      <label>Preferred Work Mode <span className="required-star">*</span></label>
                      <select value={form.workMode} onChange={(e) => handleChange("workMode", e.target.value)}>
                        <option value="">Select work mode</option>
                        {WORK_MODES.map((w) => <option key={w} value={w}>{w}</option>)}
                      </select>
                    </div>
                  </div>

                  {!fresherSelected && (
                    <div className="jpd-field">
                      <label>Previous Company <span className="required-star">*</span></label>
                      <input type="text" placeholder="Tech Corp Inc." value={form.company} onChange={(e) => handleChange("company", e.target.value)} />
                    </div>
                  )}

                  {!fresherSelected && (
                    <div className="jpd-field">
                      <label>Notice Period <span className="required-star">*</span></label>
                      <select value={form.noticePeriod} onChange={(e) => handleChange("noticePeriod", e.target.value)}>
                        <option value="">Select notice period</option>
                        {NOTICE_PERIODS.map((n) => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                  )}

                  <div className="jpd-btn-row">
                    <button className="jpd-btn-green" onClick={handleSave} disabled={isSaving} style={{ opacity: isSaving ? 0.75 : 1, cursor: isSaving ? "not-allowed" : "pointer" }}>
                      {isSaving ? (
                        <>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "jpd-spin 0.8s linear infinite" }}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
                          {isValidId(employeeId) ? "Update Profile" : "Save Profile"}
                        </>
                      )}
                    </button>
                    {savedProfile && <button className="jpd-btn-outline" onClick={() => setViewMode("profile")}>Cancel</button>}
                  </div>
                </>
              ) : (
                <>
                  {FIELDS.filter((f) => {
                    if (isFresher(savedProfile?.experience)) return f !== "company" && f !== "noticePeriod";
                    return true;
                  }).map((f) => (
                    <div className="jpd-pv-row" key={f}>
                      <span className="jpd-pv-label">
                        {f === "experience" ? EXPERIENCE.find((x) => x.value === savedProfile?.[f])?.label || FIELD_LABELS[f] : FIELD_LABELS[f]}
                        {REQUIRED_FIELDS.includes(f) && <span className="required-star">*</span>}
                      </span>
                      <span className={`jpd-pv-val${!savedProfile?.[f] ? " jpd-pv-empty" : ""}`}>
                        {f === "experience" ? EXPERIENCE.find((x) => x.value === savedProfile?.[f])?.label || savedProfile?.[f] || "—" : savedProfile?.[f] || "—"}
                      </span>
                    </div>
                  ))}
                  <div className="jpd-btn-row" style={{ marginTop: "18px" }}>
                    <button className="jpd-btn-green" onClick={() => setViewMode("form")}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                      Update Profile
                    </button>
                  </div>
                  {showDeleteConfirm && (
                    <div className="jpd-delete-banner">
                      <p>⚠️ Are you sure? This will permanently delete your profile.</p>
                      <div className="jpd-delete-banner-btns">
                        <button className="jpd-btn-delete-confirm" onClick={handleDeleteProfile}>Yes, Delete</button>
                        <button className="jpd-btn-outline" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="jpd-right">
              <div className="jpd-right-card">
                <h2>Verification Process</h2>
                {VERIFICATION_STEPS.map((step) => (
                  <div className="jpd-step" key={step.id}>
                    <div className="jpd-step-icon">{step.icon}</div>
                    <div className="jpd-step-body">
                      <div className="jpd-step-head">
                        <span className="jpd-step-title">{step.title}</span>
                        <span className={`jpd-badge${verificationId ? " inprog" : verificationStarted ? " inprog" : ""}`}>
                          {verificationId ? "Pending Review" : verificationStarted ? "In Progress" : "Pending"}
                        </span>
                      </div>
                      <p className="jpd-step-desc">{step.desc}</p>
                    </div>
                  </div>
                ))}

                {!verificationId ? (
                  isProfileComplete ? (
                    <button className="jpd-start-btn" onClick={async () => {
                      const roleToStore = savedProfile?.role || form?.role;
                      if (roleToStore) sessionStorage.setItem("employee_role", roleToStore);
                      
                      // ─── SAVE PENDING TASK - wizard_step = 2 (Started verification) ───
                      const screen = isCreativeRole(roleToStore) ? "task" : "verification";
                      await savePendingTask(2, screen, "pending");
                      
                      sessionStorage.setItem("verification_screen", screen);
                      sessionStorage.setItem("wizardStep", "2");
                      window.location.href = "/employee-wizard";
                    }}>
                      Start Verification
                    </button>
                  ) : (
                    <button className="jpd-start-btn" disabled style={{ opacity: 0.5, cursor: "not-allowed" }} title="Complete all profile fields (100%) to start verification">
                      Start Verification
                    </button>
                  )
                ) : (
                  <div style={{ marginTop: 16, padding: "14px 16px", background: "#fffbea", border: "1.5px solid #e8d470", borderRadius: 12, textAlign: "center" }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#9a7510", marginBottom: 4 }}>Verification Submitted</p>
                    <p style={{ fontSize: 13, color: "#7a8a7a" }}>Your profile is currently under review. Our team will get back to you within <strong>24 hours</strong>.</p>
                  </div>
                )}
              </div>

              {!verificationId && (
                <div className="jpd-right-card">
                  <div className="jpd-status-head">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4a017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    <h3>Verification Status</h3>
                  </div>
                  <div className={`jpd-pill${verificationId ? " inprog" : verificationStarted ? " inprog" : " pending"}`}>
                    {verificationId ? "Pending Review" : verificationStarted ? "In Progress" : "Pending Verification"}
                  </div>
                  <p className="jpd-status-desc">
                    {verificationId ? (
                      <>Your verification status is currently <strong>Pending</strong>. Our team will review your submission and get back to you within <strong>24 hours</strong>.</>
                    ) : verificationStarted ? (
                      "Your verification is underway. We'll notify you once each step is reviewed."
                    ) : (
                      "Complete the verification process to unlock your profile and start receiving job opportunities."
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={`jpd-toast${toast.show ? " show" : ""}`}>
          <div className="jpd-toast-dot" />
          {toast.msg}
        </div>
      </div>
    </>
  );
}