module.exports = [
    /**
     * IF YOU WANT TO ADD MORE POTS, JUST COPY THE CONTENT BETWEEN { }, 
     * AND CHANGE ONLY THE ITEMS LISTED ABOVE:
     * 
     * ITEM - CODE OF THE ITEM, CAN BE FOUND USING IN-BUILT COMMAND OR TERA DATABASE
     * CD - ITEM COOLDOWN TIME IN SECONDS
     * HP - TRUE: HP POTION / FALSE: MP POTION
     * USE_AT - HOW MUCH HP/MP TO BE USED (IF 50 THE POTION WILL BE USED IF YOU HAVE LESS THAN 50% HP/MP)
     * 
     * JUST COPY THE OTHER VALUES
     */
    // HP
    {
        item: 6552,
        name: "Prime Recovery Potable",
        cd: 10,
        hp: true,
        use_at: 50,
        inCd: false,
        id: 0,
        invQtd: 0
    },
    {
        item: 116,
        name: "Health Potion",
        cd: 30,
        hp: true,
        use_at: 20,
        inCd: false,
        id: 0,
        invQtd: 0
    },
    {
        item: 114,
        name: "Valkyon Health Potion",
        cd: 30,
        hp: true,
        use_at: 20,
        inCd: false,
        id: 0,
        invQtd: 0
    },

    // MP
    {
        item: 6562,
        name: "Prime Replenishment Potable",
        cd: 10,
        hp: false,
        use_at: 50,
        inCd: false,
        id: 0,
        invQtd: 0
    },
]