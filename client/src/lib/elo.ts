export function calculateELO(winnerRating: number, loserRating: number, kFactor: number = 32) {
  const expectedWinner = 1 / (1 + Math.pow(10, (loserRating - winnerRating) / 400));
  const expectedLoser = 1 / (1 + Math.pow(10, (winnerRating - loserRating) / 400));
  
  const newWinnerRating = winnerRating + kFactor * (1 - expectedWinner);
  const newLoserRating = loserRating + kFactor * (0 - expectedLoser);
  
  return {
    winnerRating: Math.round(newWinnerRating),
    loserRating: Math.round(newLoserRating)
  };
}
