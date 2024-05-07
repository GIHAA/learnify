// kamesh add user service 
import authFetch from "./axiosInterceptor";

const API_BASE_URL = "http://localhost:3001/auth-service/api/users/";


export const getuser = async () => {

  try {
    const response = await authFetch.get(`${API_BASE_URL}/`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching userdata:", error);
    throw error;
  }
};

export const deleteuser = async(id)=>{

    try{

        const response = await authFetch.delete(`${API_BASE_URL}/${id}`);
        return response.data.data;
    }catch(error){

        console.error("Error delete userdata:", error);
    throw error;
    }
}

export const Updateusername = async (id,name)=>{

    try{
      
     const response  =  await  authFetch.patch(`${API_BASE_URL}/${id}`, { name })
     return response.data;

    }catch(error){

        console.error("Erro update user:", error);
        throw error;
    }
}