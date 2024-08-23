import { v2 as cloudinary } from 'cloudinary'

//cloudinary configuration
const cloudinayConfig = ()=>{
      cloudinary.config({
        cloud_name : "dsv8gqse5",
        api_key : "598814646243469",
        api_secret : "yxvzhXYBsq0slUJwS_ok6xvBl_8"
      })
}
export default cloudinayConfig