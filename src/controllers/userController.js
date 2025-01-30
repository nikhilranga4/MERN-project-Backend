const Record = require("../models/Record");

// @desc Get all records
// @route GET /api/users
const getUsers = async (req, res) => {
  try {
    const records = await Record.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Add a new record
// @route POST /api/users
const addUser = async (req, res) => {
  try {
    const { name, dob } = req.body;

    if (!name || !dob) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRecord = new Record({ name, dob });
    await newRecord.save();

    res.status(201).json({ message: "Record added successfully", record: newRecord });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Update an existing record
// @route PUT /api/users/:id
const updateUser = async (req, res) => {
  try {
    const { name, dob } = req.body;
    const updatedRecord = await Record.findByIdAndUpdate(
      req.params.id,
      { name, dob },
      { new: true, runValidators: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json({ message: "Record updated successfully", record: updatedRecord });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Delete a record
// @route DELETE /api/users/:id
const deleteUser = async (req, res) => {
  try {
    const deletedRecord = await Record.findByIdAndDelete(req.params.id);

    if (!deletedRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { getUsers, addUser, updateUser, deleteUser };
