const orders = [];

const saveOrder = (order) => {
  orders.push(order);
};

const fetchAllOrders = () => {
  return orders;
};

module.exports = {
  saveOrder,
  fetchAllOrders,
};
