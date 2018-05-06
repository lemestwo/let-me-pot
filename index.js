/**
 * Version: 0.1.3
 * Made by Loggeru
 */

const AUTOMANA = true,                  // true - Activates the auto-mana potion function / false - Deactivates
    AUTOHP = true,                      // true - Activates the auto-hp potion function / false - Deactivates
    NOTIFICATIONS = true                // true - Activates notification when a potions is used / false - Deactivates

/**
 * YOU CAN CHANGE MORE THINGS IN POTIONS.JS FILE
 *     DON'T CHANGE NOTHING BELOW THIS LINE
 */

const potions = require('./potions'),
    Command = require('command');

module.exports = function LetMePot(dispatch) {
    const command = Command(dispatch);

    let enabled = true,
        oCid = null,
        oX = null,
        oY = null,
        oZ = null,
        oW = null,
        oInCombat = false,
        oHp = 100,
        oMana = 100,
        oAlive = false,
        getPotInfo = false;

    let hpPotList = potions.filter(function (p) { return p.hp == true; }),
        manaPotList = potions.filter(function (p) { return p.hp != true; });

    hpPotList.sort(function (a, b) { return parseFloat(a.use_at) - parseFloat(b.use_at); });
    manaPotList.sort(function (a, b) { return parseFloat(a.use_at) - parseFloat(b.use_at); });

    command.add('getpotinfo', () => {
        getPotInfo = true;
        message('Use the potion you want and watch the infos in proxy console.', true);
    });

    command.add('letmepot', () => {
        enabled = !enabled;
        let txt = (enabled) ? 'ENABLED' : 'DISABLED';
        message('Let Me Pot is ' + txt, true);
    });

    dispatch.hook('S_LOGIN', 10, (event) => { oCid = event.gameId; });

    dispatch.hook('S_SPAWN_ME', 2, event => { oAlive = event.alive; });

    dispatch.hook('C_PLAYER_LOCATION', 5, { order: -10 }, (event) => {
        oX = (event.loc.x + event.dest.x) / 2;
        oY = (event.loc.y + event.dest.y) / 2;
        oZ = (event.loc.z + event.dest.z) / 2;
        oW = event.w;
    });

    dispatch.hook('S_USER_STATUS', 1, (event) => {
        if (event.target.equals(oCid)) {
            oInCombat = (event.status == 1) ? true : false;
        }
    });

    dispatch.hook('S_INVEN', 12, { order: -10 }, (event) => {
        if (!enabled) return; // Too much info, better just turn off if disabled

        let tempInv = event.items;
        for (i = 0; i < tempInv.length; i++) {
            for (o = 0; o < hpPotList.length; o++) {
                if (hpPotList[o].item == tempInv[i].id) {
                    hpPotList[o].invQtd = tempInv[i].amount;
                    hpPotList[o].id = tempInv[i].dbid;
                }
            }
            for (p = 0; p < manaPotList.length; p++) {
                if (manaPotList[p].item == tempInv[i].id) {
                    manaPotList[p].invQtd = tempInv[i].amount;
                    manaPotList[p].id = tempInv[i].dbid;
                }
            }
        }
    });

    dispatch.hook('C_USE_ITEM', 3, { order: -10 }, (event) => {
        if (getPotInfo == true && event.gameId.equals(oCid)) {
            message('Potion info: { item: ' + event.id + ' }');
            getPotInfo = false;
        }
    });

    dispatch.hook('S_CREATURE_CHANGE_HP', 6, (event) => {

        if (!enabled || !AUTOHP) return;

        if (event.target.equals(oCid)) {
            oHp = Math.round(event.curHp / event.maxHp * 100);
            if (event.curHp <= 0) oAlive = false;
            for (let i = 0; i < hpPotList.length; i++) {
                if (oHp <= hpPotList[i].use_at && hpPotList[i].inCd == false && hpPotList[i].invQtd > 0 && oInCombat == true && oAlive == true) {
                    useItem(hpPotList[i]);
                    hpPotList[i].inCd = true;
                    hpPotList[i].invQtd--;
                    setTimeout(function () { hpPotList[i].inCd = false; }, hpPotList[i].cd * 1000);
                    if (NOTIFICATIONS) message('Used ' + hpPotList[i].name + ', still have ' + hpPotList[i].invQtd + ' left.', true);
                    break;
                }
            }
        }

    });

    dispatch.hook('S_PLAYER_CHANGE_MP', 1, (event) => {

        if (!enabled || !AUTOMANA) return;

        if (event.target.equals(oCid)) {
            oMana = Math.round(event.currentMp / event.maxMp * 100);
            for (let i = 0; i < manaPotList.length; i++) {
                if (oMana <= manaPotList[i].use_at && manaPotList[i].inCd == false && manaPotList[i].invQtd > 0 && oInCombat == true && oAlive == true) {
                    useItem(manaPotList[i]);
                    manaPotList[i].inCd = true;
                    manaPotList[i].invQtd--;
                    setTimeout(function () { manaPotList[i].inCd = false; }, manaPotList[i].cd * 1000);
                    if (NOTIFICATIONS) message('Used ' + manaPotList[i].name + ', still have ' + manaPotList[i].invQtd + ' left.', true);
                    break;
                }
            }
        }

    });

    function useItem(potInfo) {
        dispatch.toServer('C_USE_ITEM', 3, {
            gameId: oCid,
            id: potInfo.item,
            dbid: potInfo.id,
            target: 0,
            amount: 1,
            dest: {x: 0, y: 0, z: 0},
            loc: {x: oX, y: oY, z: oZ},
            w: oW,
            unk1: 0,
            unk2: 0,
            unk3: 0,
            unk4: 1
        });        
    }

    function message(msg, chat = false) {
        if (chat == true) {
            command.message('(Let Me Pot) ' + msg);
        } else {
            console.log('(Let Me Pot) ' + msg);
        }
    }
}