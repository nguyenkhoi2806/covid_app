import axios from "axios";

class CovidService {
  async getAllData() {
    try {
      return axios.get("https://api.covid19api.com/summary").then((res) => {
        return res.data;
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new CovidService();
