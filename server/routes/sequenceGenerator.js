var Sequence = require('../models/sequence');


let sequenceId;
let maxConspiracyId;
class SequenceGenerator {

    constructor() {

        const sequence = this.getSequence()
            .then(
                function(result) {
                    console.log('resulte:', result);
                    sequenceId = result._id;
                    maxConspiracyId = result.maxConspiracyId;

                    return result;
                }
            );
        console.log('this is the sequence', sequence);


    }

    async getSequence() {
        return await Sequence.findOne().exec();
    }

}

SequenceGenerator.prototype.nextId = function(collectionType) {

    var updateObject = {};
    var nextId;
    switch (collectionType) {
        case 'conspiracies':
            console.log('inside switch case');
            maxConspiracyId++;
            updateObject = { maxConspiracyId: maxConspiracyId };
            nextId = maxConspiracyId;
            break;
        default:
            return -1;
    }
    console.log(SequenceGenerator.seqId);
    Sequence.updateMany({ _id: sequenceId }, { $set: updateObject })
        .then(function(err) {
            if (err) {
                console.log("nextId error = " + err);
                return null
            }
        });

    return nextId;

}



module.exports = new SequenceGenerator();