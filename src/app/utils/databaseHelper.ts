import api from "../service/interceptor/interceptor";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const getUserByEmail = async (email:string) => {
  try{
    const response = await api.post(`${baseUrl}/auth/email`,{ user_email: email });
    if(response.data.user && Object.keys(response.data.user).length > 0){
      return response.data.user;
    }else{
      return null;
    }
  }catch(err:any){
    console.error(err);
  }
}

const createUser = async({user_name,user_email}) => {
  try{
    const response = await api.post(`${baseUrl}/auth/register`,{
      
    })
  }catch(err:any){
    console.error(err);
  }
}
