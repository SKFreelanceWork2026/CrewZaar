// const backendDomain = "http://192.168.1.154:5000/api";
const backendDomain = "https://crewzaar.com/crewzaar-backend/api";

const SummaryApi = {

ChooseRole: {
    url: `${backendDomain}/auth/member-types.php`,
    method: "GET",
  },

EmployeeCreate: {
    url: `${backendDomain}/employee/create-profile.php`,
    method: "POST",
  },

getEmployee: {
    url: `${backendDomain}/employee/get-profile-by-id.php`,
    method: "POST",
  },

EmployeeUpdate: {
    url: `${backendDomain}/employee/update-profile.php`,
    method: "POST",
  },

EmployeeExperienceCreate: {
    url: `${backendDomain}/employee/create-experience.php`,
    method: "POST",
  },
EmployeeExperienceCreateUpdate: {
    url: `${backendDomain}/employee/update-experience.php`,
    method: "POST",
  },

getEmployeeQuestionsByRole: {
    url: `${backendDomain}/assessment/get-assessment-by-role.php`,
    method: "POST",
  },

questionsSubmission: {
    url: `${backendDomain}/assessment/submit-assessment.php`,
    method: "POST",
  },

communicationQuestionsSubmission: {
    url: `${backendDomain}/assessment/submit-communication-result.php`,
    method: "POST",
  },

verificationSubmission: {
    url: `${backendDomain}/assessment/create-verification.php`,
    method: "POST",
  },
documentVerification: {
    url: `${backendDomain}/employee/upload-documents.php`,
    method: "POST",
  },

documentVerificationUpdate: {
    url: `${backendDomain}/employee/update-document.php`,
    method: "POST",
  },

slotCreate: {
    url: `${backendDomain}/assessment/create-interview.php`,
    method: "POST",
  },

getTaskByRole: {
    url: `${backendDomain}/assessment/getTask.php`,
    method: "POST",
  },
taskSubmission: {
    url: `${backendDomain}/assessment/submitTask.php`,
    method: "POST",
},

getCommunicationQuestions:{
  url: `${backendDomain}/assessment/comunication_retreive.php`,
  method: "GET",

},

submitCommunicationQuestions:{
  url: `${backendDomain}/assessment/submit-communication-result.php`,
  method: "POST",

},




profileimageupload: {
  url: `${backendDomain}/employee/upload-profile-image.php`,
  method: "POST",
},

getprofileimage: {
  url: `https://crewzaar.com/crewzaar-backend/uploads/profiles/`,
  method: "GET"
},

}

export default SummaryApi;