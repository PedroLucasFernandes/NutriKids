const adminRepository = require('../repositories/adminRepository.js');

const adminService = {
    async getAdminByUsername(username) {
        try {
            return await adminRepository.getAdminByUsername(username);
        } catch(error) {
            throw error;
        }
    },

    async getAllAdmins() {
        try {
            return await adminRepository.getAllAdmins();
        } catch(error) {
            throw error;
        }
    },

    async getAdminById(id) {
        try {
            return await adminRepository.getAdminById(id);
        } catch(error) {
            throw error;
        }
    }
}

module.exports = adminService;