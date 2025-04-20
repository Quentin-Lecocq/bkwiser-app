'use client';

const BankrollPage = () => {
  const handleCreateBankroll = async () => {
    const response = await fetch('/api/bankroll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'New Bankroll', initialAmount: 1000 }),
    });

    if (!response.ok) {
      console.error('Failed to create bankroll');
      return;
    }

    const data = await response.json();
    console.log('Bankroll created:', data);
  };

  return (
    <div>
      <h1>Create bankroll</h1>
      <button onClick={handleCreateBankroll}>create</button>
    </div>
  );
};

export default BankrollPage;
