const fs = require('fs');
const path = require('path');

const customersFilePath = path.join(__dirname, '../customers.json');

function createCustomer(customerData) {
    const customers = JSON.parse(fs.readFileSync(customersFilePath, 'utf8')) || [];
    customers.push(customerData);
    fs.writeFileSync(customersFilePath, JSON.stringify(customers, null, 2));
}

function getCustomer(customerId) {
    const customers = JSON.parse(fs.readFileSync(customersFilePath, 'utf8')) || [];
    return customers.find(customer => customer.customerId === customerId);
}

function updateCustomer(customerId, updatedData) {
    const customers = JSON.parse(fs.readFileSync(customersFilePath, 'utf8')) || [];
    const customerIndex = customers.findIndex(customer => customer.customerId === customerId);
    if (customerIndex !== -1) {
        customers[customerIndex] = { ...customers[customerIndex], ...updatedData };
        fs.writeFileSync(customersFilePath, JSON.stringify(customers, null, 2));
    }
}

function deleteCustomer(customerId) {
    const customers = JSON.parse(fs.readFileSync(customersFilePath, 'utf8')) || [];
    const updatedCustomers = customers.filter(customer => customer.customerId !== customerId);
    fs.writeFileSync(customersFilePath, JSON.stringify(updatedCustomers, null, 2));
}

module.exports = { createCustomer, getCustomer, updateCustomer, deleteCustomer };
