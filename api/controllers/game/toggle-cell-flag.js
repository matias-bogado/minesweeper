
/**
 * game/flagCell.js
 *
 * Flag a cell for a specific game.
 */
module.exports = async function flagCell(req, res) {
  console.log('OK')
  const newStatus = await Game.flagCell(req.allParams());

  return res.json({ ...newStatus  });
};
