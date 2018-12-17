
/**
 * game/toggle-cell-flag.js
 *
 * Flag a cell for a specific game.
 */
module.exports = async function toggleCellFlag(req, res) {
  const game = await Game.toggleCellFlag(req.allParams());

  return res.json(game);
};
