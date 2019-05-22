const txt = `https://www.gifyourgame.com/GoateedNutantEmpressnashmeiraii
https://www.gifyourgame.com/WailfulBacksweptEphraim
https://www.gifyourgame.com/UncurbedZigzagPukutak
https://www.gifyourgame.com/HurtlingAgelessFaithconnors
https://www.gifyourgame.com/SpeechlessPuggishBelome
https://www.gifyourgame.com/CursingVaticBabybowser
https://www.gifyourgame.com/CistedShiplessCaptainolimar
https://www.gifyourgame.com/SurestSloughyTroll
https://www.gifyourgame.com/RecluseUnvexedArfur
https://www.gifyourgame.com/UndrapedFolkishWantz
https://www.gifyourgame.com/RoomyUnkissedAlcidmargrace
https://www.gifyourgame.com/RinglessGleesomePrincefellenantdoraguille
https://www.gifyourgame.com/SejantBedimmedMadamebroode
https://www.gifyourgame.com/TakingHoodlessLuvbi
https://www.gifyourgame.com/ClayeyInhaledSeiferalmasy
https://www.gifyourgame.com/PursyTusklessMarcusfenix
https://www.gifyourgame.com/GraciousTatteredSkipper
https://www.gifyourgame.com/TwofoldFatiguedBabyluigi
https://www.gifyourgame.com/BarklessBreechlessHavharo
https://www.gifyourgame.com/InformYawningYagudo
https://www.gifyourgame.com/ZincyAridFranklinclinton
https://www.gifyourgame.com/PiggishTalonedLenne
https://www.gifyourgame.com/SnoozyZestyLoz
https://www.gifyourgame.com/AlloyedBiliousRubicante
https://www.gifyourgame.com/SaltantSpryerSeymourguado
https://www.gifyourgame.com/PercentFleecyDrunne
https://www.gifyourgame.com/SquigglyChangingRefia
https://www.gifyourgame.com/SequentFrizzlyMinwu
https://www.gifyourgame.com/SternalConjointZeid
https://www.gifyourgame.com/MidgetMesarchAlbertwesker
https://www.gifyourgame.com/CrackbrainedHarnessedRhinostery
https://www.gifyourgame.com/ThuddingSpleenishCornelia
https://www.gifyourgame.com/DespisedBouncyWedge
https://www.gifyourgame.com/SuffusedLeggedPokemontrainer
https://www.gifyourgame.com/GamesomeUnscreenedValkeng
https://www.gifyourgame.com/MangeyDesiredElroy
https://www.gifyourgame.com/UngirthedStoreyedMeatbag
https://www.gifyourgame.com/SpacialBeamyDuckhunt
https://www.gifyourgame.com/LoudishAntlikeGigameth
https://www.gifyourgame.com/ProfoundGauzyLalibo
https://www.gifyourgame.com/NervineBlushfulGau
https://www.gifyourgame.com/PercoidInspiredBabyyoshi
https://www.gifyourgame.com/IncisedMinuteGordon`


module.exports.run = (client, message, args) => {
  let stuff = txt.split('\n')
  for (let i = 0; i < stuff.length; i++) {
    message.channel.send(stuff[i])
  }
}

module.exports.info = {
  category: 'Admin',
  name: 'montagegifs',
  description: 'Just don\'t....',
  authLevel: 4
};
