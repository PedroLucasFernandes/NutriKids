const adminModel = require('../models/adminModel.js');

const adminRepository = {
  async getAdminByUsername(username) {
    try {
      return await adminModel.getAdminByUsername(username);
    } catch (error) {
      throw error;
    }
  },

  async getAllAdmins() {
    try {
      return await adminModel.getAllAdmins();
    } catch (error) {
      throw error;
    }
  },

  async getAdminById(id) {
    try {
      return await adminModel.getAdminById(id);
    } catch (error) {
      throw error;
    }
  }
};

module.exports = adminRepository;

