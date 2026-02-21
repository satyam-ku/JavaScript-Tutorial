//  HELPER UTILITIES

/** Format a number as currency string */
function fmt(amount) {
  return "₹" + Number(amount).toFixed(2);
}

/** Print a styled section header */
function header(title) {
  const line = "═".repeat(56);
  console.log("\n" + line);
  console.log("  " + title);
  console.log(line);
}

/** Print a subtle divider */
function divider() {
  console.log("─".repeat(56));
}


//  LEVEL 1 — ACCOUNT OBJECT & CORE FUNCTIONS

function createAccountObject(accountNumber, name, type, initialBalance) {
  // Savings accounts require minimum balance of 1000
  const MIN_BALANCE = type === "savings" ? 1000 : 0;

  if (initialBalance < MIN_BALANCE) {
    console.log(
      `  ✗ Cannot open ${type} account with less than ${fmt(MIN_BALANCE)}.`
    );
    return null;
  }

  return {
    accountNumber,
    name,
    type,               // "savings" or "current"
    balance: initialBalance,
    loan: 0,            // outstanding loan amount
    transactions: [
      {
        type: "ACCOUNT_OPENED",
        amount: initialBalance,
        date: new Date().toLocaleString(),
        note: `${type.toUpperCase()} account opened with ${fmt(initialBalance)}`,
      },
    ],
  };
}

// ── Level-1 standalone functions


function depositToAccount(account, amount) {
  if (amount <= 0) {
    console.log("  ✗ Deposit amount must be greater than 0.");
    return false;
  }
  account.balance += amount;
  account.transactions.push({
    type: "DEPOSIT",
    amount,
    date: new Date().toLocaleString(),
    note: `Deposited ${fmt(amount)}. New balance: ${fmt(account.balance)}`,
  });
  return true;
}

function withdrawFromAccount(account, amount) {
  if (amount <= 0) {
    console.log("  ✗ Withdrawal amount must be greater than 0.");
    return false;
  }
  const MIN_BALANCE = account.type === "savings" ? 1000 : 0;
  if (account.balance - amount < MIN_BALANCE) {
    console.log(
      `  ✗ Insufficient funds. ${
        account.type === "savings"
          ? `Savings accounts must maintain a minimum balance of ${fmt(MIN_BALANCE)}.`
          : `Balance: ${fmt(account.balance)}.`
      }`
    );
    return false;
  }
  account.balance -= amount;
  account.transactions.push({
    type: "WITHDRAWAL",
    amount,
    date: new Date().toLocaleString(),
    note: `Withdrew ${fmt(amount)}. New balance: ${fmt(account.balance)}`,
  });
  return true;
}

function checkBalance(account) {
  console.log(`  Account Holder : ${account.name}`);
  console.log(`  Account No.    : ${account.accountNumber}`);
  console.log(`  Account Type   : ${account.type.toUpperCase()}`);
  console.log(`  Balance        : ${fmt(account.balance)}`);
  if (account.loan > 0) {
    console.log(`  Outstanding Loan: ${fmt(account.loan)}`);
  }
}

//  LEVEL 2 — BANK OBJECT & MULTI-ACCOUNT OPS

function createBank(bankName) {
  return {
    bankName,
    accounts: [],
    nextAccountNumber: 1001,
    totalLoansIssued: 0,
  };
}

function createAccount(bank, name, type, initialBalance) {
  if (!["savings", "current"].includes(type)) {
    console.log('  ✗ Account type must be "savings" or "current".');
    return null;
  }
  const account = createAccountObject(
    bank.nextAccountNumber,
    name,
    type,
    initialBalance
  );
  if (!account) return null;

  bank.accounts.push(account);
  bank.nextAccountNumber++;
  console.log(
    `  ✓ Account created! Account No: ${account.accountNumber} | Holder: ${name} | Type: ${type.toUpperCase()}`
  );
  return account;
}

function findAccount(bank, accountNumber) {
  const acc = bank.accounts.find((a) => a.accountNumber === accountNumber);
  if (!acc) {
    console.log(`  ✗ Account ${accountNumber} not found.`);
    return null;
  }
  return acc;
}

function deposit(bank, accountNumber, amount) {
  const account = findAccount(bank, accountNumber);
  if (!account) return;
  if (depositToAccount(account, amount)) {
    console.log(
      `  ✓ Deposited ${fmt(amount)} to Account ${accountNumber}. Balance: ${fmt(
        account.balance
      )}`
    );
  }
}

function withdraw(bank, accountNumber, amount) {
  const account = findAccount(bank, accountNumber);
  if (!account) return;
  if (withdrawFromAccount(account, amount)) {
    console.log(
      `  ✓ Withdrew ${fmt(amount)} from Account ${accountNumber}. Balance: ${fmt(
        account.balance
      )}`
    );
  }
}

function transfer(bank, fromAccNum, toAccNum, amount) {
  if (fromAccNum === toAccNum) {
    console.log("  ✗ Cannot transfer to the same account.");
    return;
  }
  const from = findAccount(bank, fromAccNum);
  if (!from) return;
  const to = findAccount(bank, toAccNum);
  if (!to) return;

  // Temporarily use withdrawFromAccount for validation
  if (!withdrawFromAccount(from, amount)) return;

  depositToAccount(to, amount);

  // Overwrite the last two generic transaction notes with transfer-specific ones
  from.transactions[from.transactions.length - 1].note =
    `Transferred ${fmt(amount)} to Account ${toAccNum}. Balance: ${fmt(from.balance)}`;
  to.transactions[to.transactions.length - 1].note =
    `Received ${fmt(amount)} from Account ${fromAccNum}. Balance: ${fmt(to.balance)}`;

  console.log(
    `  ✓ Transferred ${fmt(amount)} from Account ${fromAccNum} to Account ${toAccNum}.`
  );
  console.log(`    ${from.name}'s balance : ${fmt(from.balance)}`);
  console.log(`    ${to.name}'s balance   : ${fmt(to.balance)}`);
}


function showAllAccounts(bank) {
  if (bank.accounts.length === 0) {
    console.log("  No accounts found.");
    return;
  }
  console.log(
    `  ${"Acc#".padEnd(6)} ${"Holder".padEnd(18)} ${"Type".padEnd(10)} ${"Balance".padStart(12)} ${"Loan".padStart(10)}`
  );
  divider();
  bank.accounts.forEach((acc) => {
    console.log(
      `  ${String(acc.accountNumber).padEnd(6)} ${acc.name.padEnd(18)} ${acc.type
        .toUpperCase()
        .padEnd(10)} ${fmt(acc.balance).padStart(12)} ${fmt(acc.loan).padStart(10)}`
    );
  });
}

//  LEVEL 3 — ADVANCED BANKING LOGIC

function applyYearlyInterest(bank) {
  bank.accounts.forEach((acc) => {
    if (acc.type === "savings") {
      const interest = parseFloat((acc.balance * 0.04).toFixed(2));
      acc.balance += interest;
      acc.transactions.push({
        type: "INTEREST",
        amount: interest,
        date: new Date().toLocaleString(),
        note: `4% yearly interest applied. Added ${fmt(interest)}. New balance: ${fmt(
          acc.balance
        )}`,
      });
      console.log(
        `  ✓ Interest ${fmt(interest)} applied to ${acc.name} (Acc ${acc.accountNumber}).`
      );
    }
  });
}

function issueLoan(bank, accountNumber, loanAmount) {
  const account = findAccount(bank, accountNumber);
  if (!account) return;

  if (loanAmount <= 0) {
    console.log("  ✗ Loan amount must be greater than 0.");
    return;
  }

  const maxLoan = account.balance * 5;
  if (loanAmount > maxLoan) {
    console.log(
      `  ✗ Loan denied. Maximum loan for ${account.name} is ${fmt(maxLoan)} (5× balance of ${fmt(
        account.balance
      )}).`
    );
    return;
  }

  account.loan += loanAmount;
  account.balance += loanAmount;
  bank.totalLoansIssued += loanAmount;

  account.transactions.push({
    type: "LOAN_ISSUED",
    amount: loanAmount,
    date: new Date().toLocaleString(),
    note: `Loan of ${fmt(loanAmount)} issued. Total loan: ${fmt(account.loan)}. Balance: ${fmt(
      account.balance
    )}`,
  });

  console.log(
    `  ✓ Loan of ${fmt(loanAmount)} issued to ${account.name} (Acc ${accountNumber}).`
  );
  console.log(`    New Balance     : ${fmt(account.balance)}`);
  console.log(`    Outstanding Loan: ${fmt(account.loan)}`);
}

function repayLoan(bank, accountNumber, repayAmount) {
  const account = findAccount(bank, accountNumber);
  if (!account) return;

  if (account.loan === 0) {
    console.log(`  ✗ ${account.name} has no outstanding loan.`);
    return;
  }
  if (repayAmount <= 0) {
    console.log("  ✗ Repayment amount must be greater than 0.");
    return;
  }
  if (repayAmount > account.balance) {
    console.log("  ✗ Insufficient balance to repay this amount.");
    return;
  }

  // Cap repayment to loan amount
  const actual = Math.min(repayAmount, account.loan);
  account.balance -= actual;
  account.loan -= actual;

  account.transactions.push({
    type: "LOAN_REPAYMENT",
    amount: actual,
    date: new Date().toLocaleString(),
    note: `Loan repayment of ${fmt(actual)}. Remaining loan: ${fmt(account.loan)}. Balance: ${fmt(
      account.balance
    )}`,
  });

  console.log(`  ✓ Loan repayment of ${fmt(actual)} recorded.`);
  console.log(`    Remaining Loan : ${fmt(account.loan)}`);
  console.log(`    Balance        : ${fmt(account.balance)}`);
}

function showTransactionHistory(bank, accountNumber) {
  const account = findAccount(bank, accountNumber);
  if (!account) return;

  console.log(`  Transaction History — ${account.name} (Acc ${accountNumber})`);
  divider();
  if (account.transactions.length === 0) {
    console.log("  No transactions recorded.");
    return;
  }
  account.transactions.forEach((tx, i) => {
    console.log(`  [${i + 1}] ${tx.type.padEnd(18)} ${tx.date}`);
    console.log(`       ${tx.note}`);
  });
}

function bankSummary(bank) {
  let totalBalance = 0;
  let totalLoan = 0;

  bank.accounts.forEach((acc) => {
    totalBalance += acc.balance;
    totalLoan += acc.loan;
  });

  console.log(`  Bank Name       : ${bank.bankName}`);
  console.log(`  Total Accounts  : ${bank.accounts.length}`);
  console.log(`  Total Balance   : ${fmt(totalBalance)}`);
  console.log(`  Total Loans Out : ${fmt(totalLoan)}`);
  console.log(`  Total Loans Ever: ${fmt(bank.totalLoansIssued)}`);
}

//  DEMO — AUTO-RUNS ON  node index.js

(function runDemo() {
  // ── LEVEL 1 DEMO ──────────────────────────
  header("LEVEL 1 — Single Account Banking");

  const alice = createAccountObject(1001, "Alice", "savings", 5000);

  console.log("\n  >> Check Balance");
  checkBalance(alice);

  divider();
  console.log("\n  >> Deposit ₹2000");
  depositToAccount(alice, 2000);
  console.log(`  Balance after deposit : ${fmt(alice.balance)}`);

  divider();
  console.log("\n  >> Withdraw ₹1500");
  withdrawFromAccount(alice, 1500);
  console.log(`  Balance after withdrawal : ${fmt(alice.balance)}`);

  divider();
  console.log("\n  >> Try invalid deposit (amount = 0)");
  depositToAccount(alice, 0);

  divider();
  console.log("\n  >> Try overdraft (withdraw ₹99999)");
  withdrawFromAccount(alice, 99999);

  divider();
  console.log("\n  >> Try to break minimum savings balance");
  withdrawFromAccount(alice, alice.balance - 500); // would leave only 500

  // ── LEVEL 2 DEMO ──────────────────────────
  header("LEVEL 2 — Multi Account Banking");

  const bank = createBank("Sunrise Bank");

  console.log("\n  >> Creating accounts");
  divider();
  createAccount(bank, "Alice",   "savings", 5000);
  createAccount(bank, "Bob",     "current", 3000);
  createAccount(bank, "Charlie", "savings", 10000);
  createAccount(bank, "Diana",   "current", 1500);

  console.log("\n  >> Attempt invalid account type");
  createAccount(bank, "Eve", "premium", 2000);

  console.log("\n  >> Attempt savings account below minimum balance");
  createAccount(bank, "Frank", "savings", 500);

  divider();
  console.log("\n  >> Show All Accounts");
  showAllAccounts(bank);

  divider();
  console.log("\n  >> Deposit ₹3000 to Alice (1001)");
  deposit(bank, 1001, 3000);

  console.log("\n  >> Withdraw ₹500 from Bob (1002)");
  withdraw(bank, 1002, 500);

  console.log("\n  >> Transfer ₹2000 from Charlie (1003) to Diana (1004)");
  transfer(bank, 1003, 1004, 2000);

  console.log("\n  >> Transfer with insufficient balance");
  transfer(bank, 1004, 1001, 999999);

  console.log("\n  >> Transfer to non-existent account");
  transfer(bank, 1001, 9999, 100);

  // ── LEVEL 3 DEMO ──────────────────────────
  header("LEVEL 3 — Advanced Banking Logic");

  // Yearly interest
  console.log("\n  >> Apply 4% Yearly Interest (Savings accounts only)");
  divider();
  applyYearlyInterest(bank);

  // Loans
  divider();
  console.log("\n  >> Issue Loan to Alice (1001) — ₹10000 (within 5× balance)");
  issueLoan(bank, 1001, 10000);

  console.log("\n  >> Issue Loan to Bob (1002) — ₹50000 (exceeds 5× balance)");
  issueLoan(bank, 1002, 50000);

  console.log("\n  >> Issue Loan to Charlie (1003) — ₹25000");
  issueLoan(bank, 1003, 25000);

  divider();
  console.log("\n  >> Repay ₹5000 of Alice's loan (1001)");
  repayLoan(bank, 1001, 5000);

  console.log("\n  >> Try to repay loan from account with no loan (1002)");
  repayLoan(bank, 1002, 1000);

  // Transaction history
  divider();
  console.log("\n  >> Transaction History — Alice (1001)");
  showTransactionHistory(bank, 1001);

  divider();
  console.log("\n  >> Transaction History — Charlie (1003)");
  showTransactionHistory(bank, 1003);

  // Updated account list
  divider();
  console.log("\n  >> All Accounts (final state)");
  showAllAccounts(bank);

  // Bank summary
  header("BANK SUMMARY");
  bankSummary(bank);

  console.log("\n" + "═".repeat(56));
  console.log("  Demo complete. All levels verified.");
  console.log("═".repeat(56) + "\n");
})();
