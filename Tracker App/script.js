const transactionForm = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');
const balanceElement = document.getElementById('balance');
const incomeElement = document.getElementById('income-amount');
const expenseElement = document.getElementById('expense-amount');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Add transaction
function addTransaction(e) {
    e.preventDefault();
    
    const text = document.getElementById('text').value;
    const amount = +document.getElementById('amount').value;
    const type = document.getElementById('type').value;
    
    if (text.trim() === '' || amount === 0) {
        alert('Please enter valid details!');
        return;
    }
    
    const transaction = {
        id: Date.now(),
        text,
        amount: type === 'expense' ? -amount : amount,
        type
    };
    
    transactions.push(transaction);
    updateLocalStorage();
    updateUI();
    
    document.getElementById('text').value = '';
    document.getElementById('amount').value = '';
}

// Delete transaction
function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    updateUI();
}

// Update UI
function updateUI() {
    // Clear transaction list
    transactionList.innerHTML = '';
    
    // Calculate balance, income, expense
    const amounts = transactions.map(transaction => transaction.amount);
    const balance = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => acc + item, 0).toFixed(2);
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0) * -1).toFixed(2);
    
    // Update DOM
    balanceElement.textContent = `₹${balance}`;
    incomeElement.textContent = `+₹${income}`;
    expenseElement.textContent = `-₹${expense}`;
    
    // Add transactions to list
    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.classList.add(transaction.type);
        
        li.innerHTML = `
            <span>${transaction.text}</span>
            <span>₹${Math.abs(transaction.amount).toFixed(2)}</span>
            <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">X</button>
        `;
        
        transactionList.appendChild(li);
    });
}

// Update localStorage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Event listeners
transactionForm.addEventListener('submit', addTransaction);

// Initialize UI
updateUI();