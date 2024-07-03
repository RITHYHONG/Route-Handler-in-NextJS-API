const {default: prisma} = require("./prisma")


// Get all customers
export const getAllCustomers = async () => {
  const payload = await prisma.customer.findMany();
  return payload;
};
  
// Get customer by ID
export const getCustomerById = async (customerId) => {
  const customerIdInt = parseInt(customerId);
  const payload = await prisma.customer.findUnique({
    where: {
      customer_id: customerIdInt
    }
  });
  return payload;
}
  
// Delete customer by ID
export const deleteCustomerById = async (customerId) => {
  const deletedCustomer = await prisma.customer.delete({
    where: {
      customer_id: parseInt(customerId)
    }
  });
  return deletedCustomer;
}
  
// Update customer by ID
export const updateCustomerById = async (customerId, newData) => {
  const updatedCustomer = await prisma.customer.update({
    where: {
      customer_id: parseInt(customerId)
    },
    data: newData
  });
  return updatedCustomer;
}
  
// Get customer by name
export const getCustomerByName = async (customerName) => {
  const payload = await prisma.customer.findFirstOrThrow({
    where: {
      first_name: customerName // Assuming first_name is the field to search for by name
    }
  });
  return payload;
}
  
// Insert new customer
export const insertCustomer = async (newData) => {
  console.log("customer data: ", newData);
  const payload = prisma.customer.create({
      data: {
        first_name: newData.first_name,
        last_name: newData.last_name,
        birth_date: newData.birth_date,
        money_spent: newData.money_spent
      }
  });
  return payload;
}
  
// Update customer
export const updateCustomer = async (customerId, newData) => {
  const updatedCustomer = await prisma.customer.update({
    where: {
      customer_id: parseInt(customerId)
    },
    data: newData
  });
  return updatedCustomer;
}
