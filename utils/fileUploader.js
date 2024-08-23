import { v2 as cloudinary } from "cloudinary"
//uploading file to cloudinary
const imageUploader = async(image)=>{
       try {
        const url = await cloudinary.uploader.upload(image.path)
        return url.secure_url
       } catch (error) {
        console.log(error)
       }
}
export default imageUploader