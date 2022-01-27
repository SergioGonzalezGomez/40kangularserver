const BattleRoutes = require('express').Router()
const { postNewBattle, getAllBattles, getBattle, patchBattle, deleteBattle } = require('./battles.controller')


BattleRoutes.get('/', getAllBattles)
BattleRoutes.get('/:id', getBattle)

//solo los admins pueden hacer esto
/* BattleRoutes.post('/', upload.single('img'), postNewBattle)
BattleRoutes.patch('/:id', upload.single('img'), patchBattle)
BattleRoutes.delete('/:id', [isAuth], upload.single('img'), deleteBattle) */

module.exports = BattleRoutes