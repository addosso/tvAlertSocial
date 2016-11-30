## Running Server

Per far girare il server andare con terminale dentro la cartella main e digitare da console

__"node main.js"__

Il numero della porta di default è 8083.
Per cambiare porta, al momento della digitazione del comando su shell, inserire l'argomento 'port=XXXX' .

 __"node main.js port=9091"__


## API

# '/rai' 
#### parametri ammessi 
* __canale__ ( Possibili valori:  'Rai1', 'Rai2', 'Rai3', 'Rai4', 'Rai5', 'RaiMovie', 'RaiPremium', 'RaiYoyo', 'RaiGulp','RaiStoria', 'RaiScuola', 'RaiNews24', 'RaiSport1', 'RaiSport2' )
* __day__  ( Formato:  gg/mm/aaaa )

# '/mediaset'
#### parametri ammessi

* __canale__  ( Possibili valori: 'italia1', 'italia2', 'canale5', 'rete4', 'la5','extra', 'topcrime', 'iris','tgcom24' ) 
* __day__ ( Formato: gg/mm/aaaa ) 
                                                               
# '/mediasetpremium'
#### parametri ammessi

* __canale__ ( Possibili valori:  "cinemahd", "cinema24", "cinema2hd", 'cinema224', 'cinemahdenergy', 'cinema24energy', 'cinemaemotion', 'cinemacomedy', 'studiouniversal', 'actionhd', 'action24', 'crimehd', 'crime24', 'stories', 'stories24', 'joi','joi24', 'investigationdiscovery', 'sporthd', 'sport2hd', 'eurosport', 'eurosport2', 'cartoonnetwork' )
* __day__ ( Formato: gg/mm/aaaa ) 

# '/sky'
### parametri ammessi

* __canale__ ( Possibili valori ( solo le chiavi del JSON qui riportato) :
              {
              "AXNHD":"ch_8455",
              "AXNSci-Fi":"ch_6503",
              "AnimalPlanet":"ch_519",
              "AutomotoTV":"ch_7587",
              "BabyTV":"ch_6160",
              "Boomerang":"ch_472",
              "CICrime+InvestigationHD":"ch_8336",
              "CartoonNetwork":"ch_129",
              "CieloHD":"ch_8133",
              "ClassicaHD":"ch_8007",
              "ComedyCentral":"ch_318",
              "DeAJunior":"ch_7427",
              "DeAKids":"ch_460",
              "DiscoveryChannelHD":"ch_931",
              "DiscoveryScienceHD":"ch_467",
              "DiscoveryTravel&LivingHD":"ch_465",
              "DisneyChannelHD":"ch_118",
              "DisneyJunior":"ch_453",
              "DisneyXDHD":"ch_131",
              "Dove":"ch_6360",
              "Eurosport2HD":"ch_391",
              "EurosportHD":"ch_307",
              "FoxAnimationHD":"ch_8853",
              "FoxComedyHD":"ch_8833",
              "FoxCrimeHD":"ch_139",
              "FoxHD":"ch_122",
              "FoxLifeHD":"ch_133",
              "FoxSportsHD":"ch_8027",
              "GamberoRossoHD":"ch_524",
              "HipHopTV":"ch_309",
              "HistoryChannelHD":"ch_639",
              "K2":"ch_6240",
              "La3":"ch_6400",
              "Lei":"ch_423",
              "MAN-GA":"ch_6440",
              "MTVHD":"ch_9196",
              "MTVHits":"ch_543",
              "MTVMusic":"ch_528",
              "MTVRocks":"ch_542",
              "MyDeejay":"ch_462",
              "NatGeoPeopleHD":"ch_7407",
              "NatGeoWildHD":"ch_126",
              "NationalGeoHD":"ch_641",
              "NickJunior":"ch_461",
              "Nickelodeon":"ch_320",
              "Primafila1":"ch_7667",
              "RealTimeHD":"ch_522",
              "RockTV":"ch_333",
              "Sky3D-Ch150":"ch_6761",
              "SkyArteHD":"ch_8193",
              "SkyAtlanticHD":"ch_8456",
              "SkyCinemaClassicsHD":"ch_723",
              "SkyCinemaComedyHD":"ch_6561",
              "SkyCinemaCultHD":"ch_6141",
              "SkyCinemaFamilyHD":"ch_105",
              "SkyCinemaHitsHD":"ch_724",
              "SkyCinemaMaxHD":"ch_115",
              "SkyCinemaPassionHD":"ch_6581",
              "SkyCinemaUnoHD":"ch_101",
              "SkySport24HD":"ch_929",
              "SkySport1HD":"ch_8714",
              "SkySport2HD":"ch_7507",
              "SkySport3HD":"ch_8693",
              "SkySportF1HD":"ch_8413",
              "SkySportMixHD":"ch_9433",
              "SkySportMotoGPHD":"ch_8434",
              "SkySportPlusHD":"ch_8753",
              "SkySupercalcioHD":"ch_8673",
              "SkyTG24HD":"ch_362",
              "SkyUnoHD":"ch_718",
              "Super!":"ch_6460",
              "TV8":"ch_8195" 
              })
              
* __day__ ( Formato: gg/mm/aaaa )

# '/sky/fromnow'
### Parametri Ammessi

* __canale__ ( Possibili valori ( solo le chiavi del JSON qui riportato) :
              {
              "AXNHD":"ch_8455",
              "AXNSci-Fi":"ch_6503",
              "AnimalPlanet":"ch_519",
              "AutomotoTV":"ch_7587",
              "BabyTV":"ch_6160",
              "Boomerang":"ch_472",
              "CICrime+InvestigationHD":"ch_8336",
              "CartoonNetwork":"ch_129",
              "CieloHD":"ch_8133",
              "ClassicaHD":"ch_8007",
              "ComedyCentral":"ch_318",
              "DeAJunior":"ch_7427",
              "DeAKids":"ch_460",
              "DiscoveryChannelHD":"ch_931",
              "DiscoveryScienceHD":"ch_467",
              "DiscoveryTravel&LivingHD":"ch_465",
              "DisneyChannelHD":"ch_118",
              "DisneyJunior":"ch_453",
              "DisneyXDHD":"ch_131",
              "Dove":"ch_6360",
              "Eurosport2HD":"ch_391",
              "EurosportHD":"ch_307",
              "FoxAnimationHD":"ch_8853",
              "FoxComedyHD":"ch_8833",
              "FoxCrimeHD":"ch_139",
              "FoxHD":"ch_122",
              "FoxLifeHD":"ch_133",
              "FoxSportsHD":"ch_8027",
              "GamberoRossoHD":"ch_524",
              "HipHopTV":"ch_309",
              "HistoryChannelHD":"ch_639",
              "K2":"ch_6240",
              "La3":"ch_6400",
              "Lei":"ch_423",
              "MAN-GA":"ch_6440",
              "MTVHD":"ch_9196",
              "MTVHits":"ch_543",
              "MTVMusic":"ch_528",
              "MTVRocks":"ch_542",
              "MyDeejay":"ch_462",
              "NatGeoPeopleHD":"ch_7407",
              "NatGeoWildHD":"ch_126",
              "NationalGeoHD":"ch_641",
              "NickJunior":"ch_461",
              "Nickelodeon":"ch_320",
              "Primafila1":"ch_7667",
              "RealTimeHD":"ch_522",
              "RockTV":"ch_333",
              "Sky3D-Ch150":"ch_6761",
              "SkyArteHD":"ch_8193",
              "SkyAtlanticHD":"ch_8456",
              "SkyCinemaClassicsHD":"ch_723",
              "SkyCinemaComedyHD":"ch_6561",
              "SkyCinemaCultHD":"ch_6141",
              "SkyCinemaFamilyHD":"ch_105",
              "SkyCinemaHitsHD":"ch_724",
              "SkyCinemaMaxHD":"ch_115",
              "SkyCinemaPassionHD":"ch_6581",
              "SkyCinemaUnoHD":"ch_101",
              "SkySport24HD":"ch_929",
              "SkySport1HD":"ch_8714",
              "SkySport2HD":"ch_7507",
              "SkySport3HD":"ch_8693",
              "SkySportF1HD":"ch_8413",
              "SkySportMixHD":"ch_9433",
              "SkySportMotoGPHD":"ch_8434",
              "SkySportPlusHD":"ch_8753",
              "SkySupercalcioHD":"ch_8673",
              "SkyTG24HD":"ch_362",
              "SkyUnoHD":"ch_718",
              "Super!":"ch_6460",
              "TV8":"ch_8195" 
              })

# '/oraInOnda'
### Parametri Ammessi

    Nessun Parametro ammesso
#### Ritorno
    JSON che ha come chiavi il palinsesto televisivo e come valore un JSON sulle informazioni riguardanti la diretta.
    !!--Da vedere meglio --!!