import { v2 as cloudinary } from 'cloudinary'

//cloudinary configuration
const cloudinayConfig = ()=>{
      cloudinary.config({
        cloud_name : "dh2pnqr4r" ,
        api_key : "192884813572794" ,
        api_secret : "oLZ7LtIUcDLrXH8vECbGz3XPGTU"
      })
}
export default cloudinayConfig