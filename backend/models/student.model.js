import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
    {

        name : {
            type : String,
            required: [true, "Please Enter student Name"]
        },

        age : {
            type : Number,
            required : true,
            default : 1
        },

        grade : {
            type : Number,
            required : [true]
        }
    },
    {
        timestamps: true
    }
);

const Student = mongoose.model("Students", studentSchema);

export default Student;