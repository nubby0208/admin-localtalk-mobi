
const { numbersSchemaModel } = require('../models/NumberModels');

const generateNumber = (length) => {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
const checkIfExist = async (number)=>{
    const isExist = await numbersSchemaModel.findOne({ number });
    return isExist;
}
exports.generateNumbersUtility = async (length) => {
    for (var i = 0; i < length; i++) {
        setTimeout(() => {
            let number = generateNumber(7);
            let checkNumber = checkIfExist(number);
            console.log(checkNumber);
           // if(!checkNumber){
                console.log("Number===>", number);
                let numbersModel = new numbersSchemaModel({
                    number: Number(number),
                    isAssigned: false
                });
                numbersModel.save(async err => {
                    if (err) {
                      console.log("Err=>>>" , err)
                    } else {
                      
                    }
                });
            //} else{
            //console.log("Else Number exist")
           // }

        }, 100);
    }
}