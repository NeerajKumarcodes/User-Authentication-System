import bcrypt from "bcrypt";

// Capitalise the first letter of the name
export const capitalizeName = function(next){
    if(this.name){
        this.name = this.name.split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
    }
    next();
};

// Hash the password before saving the user
export const hashPassword = async function(next){
    if(this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
};