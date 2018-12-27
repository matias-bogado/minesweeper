
/**
 * game/create.js
 *
 * Create game.
 */
module.exports = async function create(req, res) {
  const game = await Game.create(req.allParams()).fetch();

  return res.json(game);
};
