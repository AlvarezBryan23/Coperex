import Admin from "../admin/admin-model.js";
import { hash } from "argon2";
import { adminConfig } from "../../configs/admin-config.js";

const initializeAdmin = async () => {
    try {
        const existingAdmin = await Admin.findOne({ email: adminConfig.email });
        if (existingAdmin) {
            console.log("Admin already exists.");
            return;
        }

        const encryptedPassword = await hash(adminConfig.password);
        const adminData = {
            email: adminConfig.email,
            password: encryptedPassword,
            name: "Admin",
            surname: "User"
        };

        const newAdmin = await Admin.create(adminData);
        console.log("Admin user created successfully:", newAdmin);
    } catch (err) {
        console.error("Error creating admin user:", err.message);
    }
};

initializeAdmin();
