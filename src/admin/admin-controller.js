import Admin from "./admin-model.js"
import { hash } from "argon2"

export const saveAdmin = async() =>{
    try{
        const exitsAdmin = await Admin.findOne({role: "ADMIN_ROLE"});

        if(!exitsAdmin){
            const hashedPassword = await hash("Bry22an$");

            const admin = new Admin({
                name: "Bryan",
                surname: "Alvarez",
                username: "B.Alvarez",
                password: hashedPassword,
                email: "balvarez-2023244@kinal.edu.gt",
                phone: "36101639",
                role: "ADMIN_ROLE"
            })
            await admin.save();
            console.log("Admin se ha creado")
        }
    }catch(err){
        console.log(err)
    }
}