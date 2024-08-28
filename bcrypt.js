import bcrypt from 'bcrypt'

const secure = async(password)=>{
    const salt =  bcrypt.genSaltSync(10)
    try {
        const hashpass = await bcrypt.hash(password,salt)
        return hashpass    
    } catch (error) {
        console.error(error)
        return null
    }
}

const comparePass = async(password,hashpass) => {
    try {
      const auth = await bcrypt.compare(password,hashpass)
      return auth
    } catch (error) {
        console.error(error)
        return false
    }
}

export {comparePass}
export default secure


