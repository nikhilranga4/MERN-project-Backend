const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
});

// Virtual field to calculate age automatically
RecordSchema.virtual("age").get(function () {
  const today = new Date();
  const birthDate = new Date(this.dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
});

RecordSchema.set("toJSON", { virtuals: true }); // Include virtuals in JSON response

module.exports = mongoose.model("Record", RecordSchema);
