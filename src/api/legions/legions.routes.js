const LegionRoutes = require('express').Router()
const { postNewLegion, getAllLegions, getLegion, patchLegion, deleteLegion } = require('./legions.controller')


LegionRoutes.get('/', getAllLegions)
LegionRoutes.get('/:id', getLegion)

//solo los admins pueden hacer esto
/* LegionRoutes.post('/', upload.single('img'), postNewLegion)
LegionRoutes.patch('/:id', upload.single('img'), patchLegion)
LegionRoutes.delete('/:id', [isAuth], upload.single('img'), deleteLegion) */

module.exports = LegionRoutes