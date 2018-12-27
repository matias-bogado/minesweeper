
/**
 * game/create.js
 *
 * Find games.
 */
module.exports = async function create(req, res) {
  const game = await Game.find( {
    where: req.allParams(),
    select: ['id', 'name', 'ownerEmail', 'status']
  });

  return res.json(game);
};
