
/**
 * game/reveal-cell.js
 *
 * Reveal cells for a specific game.
 */
module.exports = async function revealCell(req, res) {
  const game = await Game.revealCell(req.allParams());

  return res.json(game);
};
