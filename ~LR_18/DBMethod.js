const { Sequelize } = require("sequelize");

module.exports = {
    gets(Model) {
        return Model.findAll({
            raw: true
        });
    },
    getAuditoriumsgt60(Model){
        console.log(Model);
return Model.findAll({
    where:{
        auditorium_capacity: {[Sequelize.Op.and]:
        {
            [Sequelize.Op.gt]:10,
            [Sequelize.Op.lt]:60 }
        }
    }
  
});
    },
    getPulByFac(Faculty1, Pulpit1,Subject, faculty_name){
        console.log(Faculty1);
        
        return Faculty1.findAll({
include:[
    {model:Pulpit1,Subject,as:'faculty_pulpits', required:true, where: {faculty: faculty_name}}

],
        });
    },
    getAuditoriumByType(Auditorium, Auditorium_type, auditoriums){
        return Auditorium.findAll({
            include:[
                {model:Auditorium_type,as:'auditorium_type_auditorium', required:true, where: {auditorium_type: auditoriums}}
            
            ],
                    });
    } 
}