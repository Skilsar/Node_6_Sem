class customerModel {
  async getCustomer(conn) {
    return await conn.customers.findMany();
  }

  getOneCustomer(conn, custName) {
    return conn.customers.findMany({
      where: {
        company_name: custName,
      },
    });
  }

  getOneCustomerById(conn, custId) {
    return conn.customers.findMany({
      where: {
        customer_id: custId,
      },
    });
  }

  addCustomer(conn, custObj) {
    let result = conn.customers.create({
      data: {
        company_name: custObj.company_name,
        abbreviation: custObj.abbreviation,
      },
    });
    return result;
  }

  updateCustomer(conn, custObj) {
    console.log("updateCustomer: " + JSON.stringify(custObj));
    let result = conn.customers.update({
      data: {
        company_name: custObj.company_name,
        abbreviation: custObj.abbreviation,
      },
      where: { customer_id: parseInt(custObj.customer_id) },
    });
    return result;
  }

  deleteCustomer(conn, custId) {
    console.log("deleteCustomer: " + JSON.stringify(custId));
    let result = conn.customers.delete({ where: { customer_id: custId } });
    return result;
  }
}

module.exports = customerModel;
