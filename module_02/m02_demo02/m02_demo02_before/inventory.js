// Mock data representing separate systems for demonstration
let booksInventory = {
  9780451526537: { title: 'Space Odyssey', stock: 10, basePrice: 20 },
};

let promotions = [
  { isbn: '9780451526537', discountType: 'percentage', value: 10 },
];

function calculatePrice(isbn) {
  let book = booksInventory[isbn];
  let promotion = promotions.find((promo) => promo.isbn === isbn);
  let finalPrice = book.basePrice;

  if (promotion) {
    finalPrice -= (book.basePrice * promotion.value) / 100;
  }

  return finalPrice;
}

async function processSale(isbn, quantity) {
  if (booksInventory[isbn].stock >= quantity) {
    // Simulate a delay to mimic real-world asynchronous behavior and potential race conditions
    // review: uncomment below to show concurrency issues
     await new Promise((resolve) => setTimeout(resolve, Math.random() * 50));
    booksInventory[isbn].stock -= quantity;
    return { success: true, price: calculatePrice(isbn) };
  } else {
    return { success: false, message: 'Insufficient stock' };
  }
}

module.exports = { processSale, booksInventory, promotions, calculatePrice };
