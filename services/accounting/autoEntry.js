const { parse } = require('csv-parse/sync');

function categorizeNarration(narration = '') {
	const text = narration.toLowerCase();
	if (text.includes('pos') || text.includes('sale')) return { account: 'Sales', type: 'credit' };
	if (text.includes('atm') || text.includes('cash')) return { account: 'Cash Withdrawal', type: 'debit' };
	if (text.includes('salary')) return { account: 'Salary Expense', type: 'debit' };
	if (text.includes('rent')) return { account: 'Rent Expense', type: 'debit' };
	if (text.includes('gst')) return { account: 'GST Taxes', type: 'debit' };
	return { account: 'Uncategorized', type: 'debit' };
}

async function parseBankStatementAndAutoPost(csvBuffer) {
	const content = csvBuffer.toString('utf8');
	const records = parse(content, { columns: true, skip_empty_lines: true });
	const journalEntries = [];
	for (const row of records) {
		const amount = Number(row.Amount || row.amount || row.Debit || row.Credit || 0);
		const narration = row.Narration || row.Description || '';
		const date = row.Date || row.date || new Date().toISOString().slice(0, 10);
		const cat = categorizeNarration(narration);
		journalEntries.push({
			date,
			narration,
			amount,
			debitAccount: cat.type === 'debit' ? cat.account : 'Bank',
			creditAccount: cat.type === 'credit' ? cat.account : 'Bank'
		});
	}
	// In production, persist to Firestore with double-entry integrity checks.
	return journalEntries;
}

module.exports = { parseBankStatementAndAutoPost };

