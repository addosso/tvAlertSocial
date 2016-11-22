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
* __day__  ( Formato:  gg-mm-aaaa )

# '/mediaset'
#### parametri ammessi

* __canale__  ( Possibili valori: 'italia1', 'italia2', 'canale5', 'rete4', 'la5','extra', 'topcrime', 'iris','tgcom24' ) 
* __day__ ( Formato: gg/mm/aaaa ) 
                                                               
# '/mediasetpremium'
#### parametri ammessi

* __canale__ ( Possibili valori:  "cinemahd", "cinema24", "cinema2hd", 'cinema224', 'cinemahdenergy', 'cinema24energy', 'cinemaemotion', 'cinemacomedy', 'studiouniversal', 'actionhd', 'action24', 'crimehd', 'crime24', 'stories', 'stories24', 'joi','joi24', 'investigationdiscovery', 'sporthd', 'sport2hd', 'eurosport', 'eurosport2', 'cartoonnetwork' )
* __day__ ( Formato: gg/mm/aaaa ) 