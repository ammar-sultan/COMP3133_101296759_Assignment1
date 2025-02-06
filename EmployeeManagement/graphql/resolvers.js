const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Employee = require("../models/Employee");

const resolvers = {
  signup: async ({ username, email, password }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error(
        "An account with this email already exists. Please use a different email."
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    return { id: user.id, username: user.username, email: user.email };
  },

  login: async ({ username, password }) => {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error(
        "No user found with this username. Please check your username or sign up."
      );
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Incorrect password. Please try again.");
    }

    const token = jwt.sign({ userId: user.id }, "your_secret_key", {
      expiresIn: "1h",
    });

    return { userId: user.id, token };
  },

  getAllEmployees: async () => {
    try {
      const employees = await Employee.find();
      if (employees.length === 0) {
        throw new Error("No employees found in the database.");
      }
      return employees;
    } catch (error) {
      throw new Error("Failed to fetch employees. Please try again later.");
    }
  },

  getEmployeeById: async ({ eid }) => {
    try {
      const employee = await Employee.findById(eid);
      if (!employee) {
        throw new Error(
          `No employee found with ID ${eid}. Please check the ID and try again.`
        );
      }
      return employee;
    } catch (error) {
      throw new Error(
        "Failed to retrieve employee details. Please try again later."
      );
    }
  },

  searchEmployee: async ({ designation, department }) => {
    try {
      let query = {};
      if (designation) query.designation = designation;
      if (department) query.department = department;

      const employees = await Employee.find(query);
      if (employees.length === 0) {
        throw new Error("No employees found with the given search criteria.");
      }
      return employees;
    } catch (error) {
      throw new Error("Failed to search employees. Please try again later.");
    }
  },

  addEmployee: async (args) => {
    try {
      const existingEmployee = await Employee.findOne({ email: args.email });
      if (existingEmployee) {
        throw new Error(
          "An employee with this email already exists. Please check the email."
        );
      }

      const employee = new Employee({ ...args });
      await employee.save();
      return employee;
    } catch (error) {
      throw new Error("Failed to add new employee. Please try again later.");
    }
  },

  updateEmployee: async ({ eid, ...args }) => {
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(eid, args, {
        new: true,
      });
      if (!updatedEmployee) {
        throw new Error(
          `No employee found with ID ${eid}. Please check the ID and try again.`
        );
      }
      return updatedEmployee;
    } catch (error) {
      throw new Error(
        "Failed to update employee details. Please try again later."
      );
    }
  },

  deleteEmployee: async ({ eid }) => {
    try {
      const employee = await Employee.findById(eid);
      if (!employee) {
        throw new Error(
          `No employee found with ID ${eid}. Please check the ID and try again.`
        );
      }

      await Employee.findByIdAndDelete(eid);
      return "Employee deleted successfully.";
    } catch (error) {
      throw new Error("Failed to delete employee. Please try again later.");
    }
  },
};

module.exports = resolvers;
