
"use strict";


/** Print a bold section banner */
function printBanner(title) {
  const bar = "═".repeat(64);
  console.log(`\n${bar}`);
  console.log(`  ★  ${title}`);
  console.log(bar);
}

/** Print a thin separator */
function printLine() {
  console.log("─".repeat(64));
}

/** Print a sub-section label */
function printLabel(label) {
  console.log(`\n  ▶  ${label}`);
  printLine();
}

/** Format a number as rupees with 2 decimal places */
function money(n) {
  return "₹" + Number(n).toFixed(2);
}

/** Left-pad a string to a fixed width */
function pad(str, width) {
  str = String(str);
  return str.length >= width ? str.slice(0, width) : str + " ".repeat(width - str.length);
}

/** Right-align a string inside a fixed width */
function rpad(str, width) {
  str = String(str);
  return str.length >= width ? str.slice(0, width) : " ".repeat(width - str.length) + str;
}


//  SECTION 1 ── LEVEL 1 : SINGLE-ACCOUNT FUNCTIONS


function createAccountObject(accountNumber, name, type, openingBalance) {
  // Validate type
  if (type !== "savings" && type !== "current") {
    console.log(`  ✗ Invalid type "${type}". Must be "savings" or "current".`);
    return null;
  }
  // Savings: minimum opening balance = ₹1000
  if (type === "savings" && openingBalance < 1000) {
    console.log(
      `  ✗ Savings account requires a minimum opening balance of ${money(1000)}.` +
      ` Provided: ${money(openingBalance)}`
    );
    return null;
  }

  // Build the account object
  const account = {
    accountNumber,
    name,
    type,
    balance: openingBalance,
    loan: 0,           // outstanding loan amount
    transactions: [],  // every operation is recorded here
  };

  // First transaction: account opened
  account.transactions.push({
    id: 1,
    kind: "ACCOUNT_OPEN",
    amount: openingBalance,
    balance: openingBalance,
    note: `${type.toUpperCase()} account opened`,
    date: new Date().toLocaleString("en-IN"),
  });

  return account;
}



function deposit(account, amount, note) {
  note = note || "Cash deposit";

  if (typeof amount !== "number" || isNaN(amount)) {
    console.log("  ✗ Deposit amount must be a valid number.");
    return false;
  }
  if (amount <= 0) {
    console.log(`  ✗ Deposit must be > ₹0. Provided: ${money(amount)}`);
    return false;
  }

  account.balance += amount;

  account.transactions.push({
    id: account.transactions.length + 1,
    kind: "DEPOSIT",
    amount: amount,
    balance: account.balance,
    note: note,
    date: new Date().toLocaleString("en-IN"),
  });

  return true;
}

function withdraw(account, amount, note) {
  note = note || "Cash withdrawal";

  if (typeof amount !== "number" || isNaN(amount)) {
    console.log("  ✗ Withdrawal amount must be a valid number.");
    return false;
  }
  if (amount <= 0) {
    console.log(`  ✗ Withdrawal must be > ₹0. Provided: ${money(amount)}`);
    return false;
  }

  // Minimum balance: ₹1000 for savings, ₹0 for current
  const minBalance = account.type === "savings" ? 1000 : 0;
  const balanceAfter = account.balance - amount;

  if (balanceAfter < minBalance) {
    if (account.type === "savings") {
      console.log(
        `  ✗ Denied — savings accounts must keep a minimum balance of ${money(minBalance)}.` +
        ` Current: ${money(account.balance)}, Requested: ${money(amount)},` +
        ` Would leave: ${money(balanceAfter)}`
      );
    } else {
      console.log(
        `  ✗ Insufficient funds.` +
        ` Balance: ${money(account.balance)}, Requested: ${money(amount)}`
      );
    }
    return false;
  }

  account.balance -= amount;

  account.transactions.push({
    id: account.transactions.length + 1,
    kind: "WITHDRAW",
    amount: amount,
    balance: account.balance,
    note: note,
    date: new Date().toLocaleString("en-IN"),
  });

  return true;
}

function checkBalance(account) {
  printLine();
  console.log(`  Account Number : ${account.accountNumber}`);
  console.log(`  Holder Name    : ${account.name}`);
  console.log(`  Account Type   : ${account.type.toUpperCase()}`);
  console.log(`  Balance        : ${money(account.balance)}`);
  if (account.loan > 0) {
    console.log(`  Loan Pending   : ${money(account.loan)}`);
  }
  printLine();
}


//  SECTION 2 ── LEVEL 2 : BANK OBJECT & MULTI-ACCOUNT FUNCTIONS


function createBank(bankName) {
  return {
    bankName: bankName,
    accounts: [],            // all account objects live here
    nextAccountNumber: 1001, // auto-increment seed
    totalLoansIssued: 0,     // cumulative total of all loans ever granted
  };
}

function bankCreateAccount(bank, name, type, openingBalance) {
  if (!name || typeof name !== "string" || name.trim() === "") {
    console.log("  ✗ Account holder name cannot be empty.");
    return null;
  }

  const acc = createAccountObject(bank.nextAccountNumber, name.trim(), type, openingBalance);
  if (!acc) return null;

  bank.accounts.push(acc);
  bank.nextAccountNumber += 1;

  console.log(
    "  ✓ Account created  →  No: " + acc.accountNumber +
    " | " + pad(acc.name, 14) +
    " | " + acc.type.toUpperCase() +
    " | Opening: " + money(openingBalance)
  );
  return acc;
}


function findAccount(bank, accountNumber) {
  const acc = bank.accounts.find(function(a) { return a.accountNumber === accountNumber; });
  if (!acc) {
    console.log("  ✗ Account " + accountNumber + " not found in " + bank.bankName + ".");
    return null;
  }
  return acc;
}

function bankDeposit(bank, accountNumber, amount) {
  const acc = findAccount(bank, accountNumber);
  if (!acc) return false;

  const ok = deposit(acc, amount);
  if (ok) {
    console.log(
      "  ✓ Deposited " + money(amount) +
      " → Acc " + accountNumber + " (" + acc.name + ")" +
      " | New Balance: " + money(acc.balance)
    );
  }
  return ok;
}

function bankWithdraw(bank, accountNumber, amount) {
  const acc = findAccount(bank, accountNumber);
  if (!acc) return false;

  const ok = withdraw(acc, amount);
  if (ok) {
    console.log(
      "  ✓ Withdrew " + money(amount) +
      " ← Acc " + accountNumber + " (" + acc.name + ")" +
      " | New Balance: " + money(acc.balance)
    );
  }
  return ok;
}

function bankTransfer(bank, fromNumber, toNumber, amount) {
  // Guard: self-transfer
  if (fromNumber === toNumber) {
    console.log("  ✗ Transfer denied: source and destination accounts are the same.");
    return false;
  }

  const from = findAccount(bank, fromNumber);
  if (!from) return false;

  const to = findAccount(bank, toNumber);
  if (!to) return false;

  // Attempt debit (withdraw handles all balance/minimum checks)
  const ok = withdraw(from, amount, "Transfer to Acc " + toNumber + " (" + to.name + ")");
  if (!ok) return false;

  // Credit destination
  deposit(to, amount, "Transfer from Acc " + fromNumber + " (" + from.name + ")");

  console.log(
    "  ✓ Transferred " + money(amount) +
    " from Acc " + fromNumber + " (" + from.name + ")" +
    " → Acc " + toNumber + " (" + to.name + ")"
  );
  console.log("    " + from.name + " balance : " + money(from.balance));
  console.log("    " + to.name   + " balance : " + money(to.balance));
  return true;
}

function showAllAccounts(bank) {
  if (bank.accounts.length === 0) {
    console.log("  (No accounts found)");
    return;
  }

  // Header row
  console.log(
    "  " + pad("Acc #", 6) + " " +
    pad("Name", 16) + " " +
    pad("Type", 9) + " " +
    rpad("Balance", 12) + " " +
    rpad("Loan", 12) + " " +
    pad("Txns", 5)
  );
  printLine();

  bank.accounts.forEach(function(acc) {
    console.log(
      "  " + pad(acc.accountNumber, 6) + " " +
      pad(acc.name, 16) + " " +
      pad(acc.type.toUpperCase(), 9) + " " +
      rpad(money(acc.balance), 12) + " " +
      rpad(money(acc.loan), 12) + " " +
      pad(acc.transactions.length, 5)
    );
  });
  printLine();
}


//  SECTION 3 ── LEVEL 3 : ADVANCED BANKING LOGIC


function applyYearlyInterest(bank) {
  var count = 0;
  bank.accounts.forEach(function(acc) {
    if (acc.type !== "savings") return; // skip current accounts

    var interest = parseFloat((acc.balance * 0.04).toFixed(2));
    acc.balance += interest;

    acc.transactions.push({
      id: acc.transactions.length + 1,
      kind: "INTEREST",
      amount: interest,
      balance: acc.balance,
      note: "4% annual interest credited",
      date: new Date().toLocaleString("en-IN"),
    });

    console.log(
      "  ✓ Interest credited → Acc " + acc.accountNumber + " (" + acc.name + ")" +
      " | +" + money(interest) + " | Balance: " + money(acc.balance)
    );
    count++;
  });

  if (count === 0) console.log("  (No savings accounts found — no interest applied)");
}

function issueLoan(bank, accountNumber, loanAmount) {
  var acc = findAccount(bank, accountNumber);
  if (!acc) return false;

  if (loanAmount <= 0) {
    console.log("  ✗ Loan amount must be > ₹0.");
    return false;
  }

  var maxLoan = acc.balance * 5;
  if (loanAmount > maxLoan) {
    console.log(
      "  ✗ Loan denied for Acc " + accountNumber + " (" + acc.name + ")." +
      " Requested: " + money(loanAmount) +
      " | Maximum (5× balance of " + money(acc.balance) + "): " + money(maxLoan)
    );
    return false;
  }

  // Grant loan: add to balance and track outstanding loan
  acc.loan    += loanAmount;
  acc.balance += loanAmount;
  bank.totalLoansIssued += loanAmount;

  acc.transactions.push({
    id: acc.transactions.length + 1,
    kind: "LOAN_CREDIT",
    amount: loanAmount,
    balance: acc.balance,
    note: "Loan granted (outstanding: " + money(acc.loan) + ")",
    date: new Date().toLocaleString("en-IN"),
  });

  console.log("  ✓ Loan of " + money(loanAmount) + " granted to Acc " + accountNumber + " (" + acc.name + ")");
  console.log("    New Balance     : " + money(acc.balance));
  console.log("    Total Loan Owed : " + money(acc.loan));
  return true;
}

function repayLoan(bank, accountNumber, repayAmount) {
  var acc = findAccount(bank, accountNumber);
  if (!acc) return false;

  if (acc.loan === 0) {
    console.log("  ✗ Acc " + accountNumber + " (" + acc.name + ") has no outstanding loan.");
    return false;
  }
  if (repayAmount <= 0) {
    console.log("  ✗ Repayment amount must be > ₹0.");
    return false;
  }
  if (repayAmount > acc.balance) {
    console.log(
      "  ✗ Insufficient balance for repayment." +
      " Balance: " + money(acc.balance) + ", Requested: " + money(repayAmount)
    );
    return false;
  }

  // Cap to actual loan outstanding
  var actual = Math.min(repayAmount, acc.loan);
  acc.balance -= actual;
  acc.loan    -= actual;

  acc.transactions.push({
    id: acc.transactions.length + 1,
    kind: "LOAN_REPAY",
    amount: actual,
    balance: acc.balance,
    note: "Loan repayment (remaining: " + money(acc.loan) + ")",
    date: new Date().toLocaleString("en-IN"),
  });

  console.log("  ✓ Repaid " + money(actual) + " on Acc " + accountNumber + " (" + acc.name + ")");
  console.log("    Remaining Loan : " + money(acc.loan));
  console.log("    Balance        : " + money(acc.balance));
  return true;
}

function showTransactionHistory(bank, accountNumber) {
  var acc = findAccount(bank, accountNumber);
  if (!acc) return;

  console.log("  Account: " + acc.accountNumber + " — " + acc.name + " (" + acc.type.toUpperCase() + ")");
  printLine();

  if (acc.transactions.length === 0) {
    console.log("  (No transactions recorded)");
    return;
  }

  // Column header
  console.log(
    "  " + pad("#", 3) + "  " +
    pad("Type", 14) + "  " +
    rpad("Amount", 12) + "  " +
    rpad("Balance", 12) + "  Note"
  );
  printLine();

  acc.transactions.forEach(function(tx) {
    console.log(
      "  " + pad(tx.id, 3) + "  " +
      pad(tx.kind, 14) + "  " +
      rpad(money(tx.amount), 12) + "  " +
      rpad(money(tx.balance), 12) + "  " +
      tx.note
    );
  });

  printLine();
  console.log(
    "  Current Balance : " + money(acc.balance) +
    "   Loan Outstanding : " + money(acc.loan)
  );
}

function bankSummary(bank) {
  var totalBalance      = 0;
  var totalLoan         = 0;
  var savingsCount      = 0;
  var currentCount      = 0;
  var totalTransactions = 0;

  bank.accounts.forEach(function(acc) {
    totalBalance      += acc.balance;
    totalLoan         += acc.loan;
    totalTransactions += acc.transactions.length;
    if (acc.type === "savings") savingsCount++;
    else                        currentCount++;
  });

  printLine();
  console.log("  Bank Name           : " + bank.bankName);
  console.log("  Total Accounts      : " + bank.accounts.length +
              "   (Savings: " + savingsCount + " | Current: " + currentCount + ")");
  console.log("  Total Balance       : " + money(totalBalance));
  console.log("  Total Loans (live)  : " + money(totalLoan));
  console.log("  Total Loans (ever)  : " + money(bank.totalLoansIssued));
  console.log("  Total Transactions  : " + totalTransactions);
  printLine();
}


//  SECTION 4 ── DEMO  (auto-runs on: node index.js)


(function runDemo() {

 
  // │  LEVEL 1 — SINGLE ACCOUNT DEMO                              │
 
  printBanner("LEVEL 1 — Single Account Banking");

  printLabel("Create a savings account for Arjun (opening balance ₹5000)");
  var arjun = createAccountObject(1001, "Arjun", "savings", 5000);

  printLabel("Check Balance");
  checkBalance(arjun);

  printLabel("Deposit ₹3000");
  var d1 = deposit(arjun, 3000);
  if (d1) console.log("  ✓ Deposited ₹3000.00 | Balance: " + money(arjun.balance));

  printLabel("Withdraw ₹1500");
  var w1 = withdraw(arjun, 1500);
  if (w1) console.log("  ✓ Withdrew  ₹1500.00 | Balance: " + money(arjun.balance));

  printLabel("❌ Validation: Deposit ₹0 (must be > 0)");
  deposit(arjun, 0);

  printLabel("❌ Validation: Deposit -500 (negative)");
  deposit(arjun, -500);

  printLabel("❌ Validation: Withdraw ₹99,000 (exceeds balance)");
  withdraw(arjun, 99000);

  printLabel("❌ Validation: Withdraw ₹6000 (would breach savings minimum of ₹1000)");
  // Arjun's balance is now 6500. Withdrawing 6000 leaves 500 < 1000 → denied
  withdraw(arjun, 6000);

  printLabel("✅ Withdraw ₹5000 (leaves exactly ₹1000 minimum — allowed)");
  var w2 = withdraw(arjun, 5000);
  if (w2) console.log("  ✓ Withdrew ₹5000.00 | Balance: " + money(arjun.balance));

  printLabel("Check Balance — Final (Level 1)");
  checkBalance(arjun);


  
  // │  LEVEL 2 — MULTI-ACCOUNT BANK DEMO                         │
 
  printBanner("LEVEL 2 — Multi-Account Banking");

  var bank = createBank("Heritage Bank");
  console.log('\n  Bank "' + bank.bankName + '" initialised.\n');

  // Create accounts (numbers auto-generated from 1001)
  printLabel("Creating accounts");
  bankCreateAccount(bank, "Priya",   "savings", 10000);   // 1001
  bankCreateAccount(bank, "Rahul",   "current",  5000);   // 1002
  bankCreateAccount(bank, "Sneha",   "savings",  8000);   // 1003
  bankCreateAccount(bank, "Anil",    "current",  2000);   // 1004
  bankCreateAccount(bank, "Kavita",  "savings", 15000);   // 1005

  printLabel("❌ Validation: Savings account with ₹500 (below ₹1000 minimum)");
  bankCreateAccount(bank, "Deepak", "savings", 500);

  printLabel("❌ Validation: Empty account holder name");
  bankCreateAccount(bank, "", "current", 3000);

  printLabel("❌ Validation: Unknown account type");
  bankCreateAccount(bank, "Vikram", "platinum", 5000);

  printLabel("Show All Accounts");
  showAllAccounts(bank);

  printLabel("Deposit ₹5000 → Acc 1001 (Priya)");
  bankDeposit(bank, 1001, 5000);

  printLabel("Withdraw ₹1000 ← Acc 1002 (Rahul)");
  bankWithdraw(bank, 1002, 1000);

  printLabel("Transfer ₹3000: Acc 1003 (Sneha) → Acc 1004 (Anil)");
  bankTransfer(bank, 1003, 1004, 3000);

  printLabel("❌ Validation: Transfer to non-existent account 9999");
  bankTransfer(bank, 1001, 9999, 500);

  printLabel("❌ Validation: Self-transfer (Acc 1002 → 1002)");
  bankTransfer(bank, 1002, 1002, 100);

  printLabel("❌ Validation: Withdraw ₹999,999 from Acc 1004 (Anil)");
  bankWithdraw(bank, 1004, 999999);

  printLabel("Show All Accounts — after transactions");
  showAllAccounts(bank);


  
  // │  LEVEL 3 — ADVANCED BANKING LOGIC DEMO                     │
  
  printBanner("LEVEL 3 — Advanced Banking Logic");

  // Interest
  printLabel("Apply 4% yearly interest (savings accounts only — current accounts skipped)");
  applyYearlyInterest(bank);

  // Loans
  printLabel("Issue loan ₹20,000 → Acc 1001 (Priya)  [max = 5 × balance]");
  issueLoan(bank, 1001, 20000);

  printLabel("Issue loan ₹5,000 → Acc 1004 (Anil)");
  issueLoan(bank, 1004, 5000);

  printLabel("❌ Validation: Loan ₹999,999 → Acc 1002 (Rahul) — exceeds 5× balance");
  issueLoan(bank, 1002, 999999);

  printLabel("Issue loan ₹10,000 → Acc 1005 (Kavita)");
  issueLoan(bank, 1005, 10000);

  // Repayment
  printLabel("Repay ₹5,000 on Acc 1001 (Priya)");
  repayLoan(bank, 1001, 5000);

  printLabel("❌ Validation: Repay loan on Acc 1003 (Sneha) — no loan outstanding");
  repayLoan(bank, 1003, 1000);

  // Transaction histories
  printLabel("Transaction History — Acc 1001 (Priya)");
  showTransactionHistory(bank, 1001);

  printLabel("Transaction History — Acc 1003 (Sneha)");
  showTransactionHistory(bank, 1003);

  printLabel("Transaction History — Acc 1004 (Anil)");
  showTransactionHistory(bank, 1004);

  // Final state
  printLabel("All Accounts — Final State");
  showAllAccounts(bank);

  // Summary
  printBanner("BANK SUMMARY — Heritage Bank");
  bankSummary(bank);

  var endBar = "═".repeat(64);
  console.log("\n" + endBar);
  console.log("  ✅  Demo complete — all levels and validations verified.");
  console.log(endBar + "\n");

})();
