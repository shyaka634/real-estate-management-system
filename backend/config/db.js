import {Sequelize} from 'sequelize';
const sequelize= new Sequelize("real_estate_management_system","root","",{
    host:"localhost",
    dialect:"mysql"
});

export async function connectDb(){
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error Occured when connecting to db",error);

    }
}

export default sequelize;