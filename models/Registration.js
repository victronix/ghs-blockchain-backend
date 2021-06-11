const mongoose = require("mongoose");
const { Schema } = mongoose;

const registrationSchema = new Schema({
  chld_name: String,
  chld_gender: String,
  fth_name: String,
  fth_nationality: String,
  fth_occupation: String,
  fth_religion: String,
  moth_name: String,
  moth_nationality: String,
  when_born: String,
  where_born: String,
  infrm_name: String,
  created_at: String,
  infrm_relationship: String,
  infrm_nationality: String,
});

exports.Registration = mongoose.model("Registration", registrationSchema);
