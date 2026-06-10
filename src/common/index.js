const backendDomain = "http://192.168.1.154:5000/api";

const SummaryApi = {

ChooseRole: {
    url: `${backendDomain}/auth/member-types`,
    method: "GET",
  },

EmployeeCreate: {
    url: `${backendDomain}/employee/profile/create-profile`,
    method: "POST",
  },


}

export default SummaryApi;