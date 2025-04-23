const BankrollCard = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold">Bankroll Name</h2>
      <p className="text-gray-600">Current Balance: $1000</p>
      <p className="text-gray-600">Total Bets: 10</p>
      <p className="text-gray-600">Total Wins: 5</p>
      <p className="text-gray-600">Total Losses: 5</p>
      <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
        View Details
      </button>
      <button className="mt-2 bg-red-500 text-white py-2 px-4 rounded">
        Delete Bankroll
      </button>
    </div>
  );
};

export default BankrollCard;
