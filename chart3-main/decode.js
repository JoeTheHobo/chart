function decodeAccess(string) {
    let rowsBroken = string.split(`\n`);
    let rows = [];
    for (let i = 0; i < rowsBroken.length; i++) {
        rows.push(rowsBroken[i].split(`\t`));
    }
    let toReturn = [];
    for (let i = 2; i < rows.length; i++) {
        let alsoFit = [];
        for (let j = 0; j < 41; j++) {
            if (rows[i][j + 1] == 'x') {
                alsoFit.push(rows[1][j+1])
            }
        }
        toReturn.push({
            name: rows[i][0],
            fit: alsoFit,
        })
    }
    return toReturn;
}
function decodeMatrix(string) {
    let nfm = [];
    let stake = [];
    let keys = [];
    let letters = [];

    string = string.split(`\n`);
    let newString = [];
    for (let i = 0; i < string.length; i++) {
        newString.push(string[i].split(`\t`));
    }
    rows = newString;

    //Find Stake
    for (let i = 1; i < 17; i++) {
        let keyWay, cut, buildings = [];

        keyWay = rows[3][i];
        cut = Number(rows[4][i]);
        for (let j = 0; j < 8; j++) {
            if (Number(rows[j + 5][i]) === 0) continue;
            buildings.push(Number(rows[j + 5][i]));
        }
        stake.push({
            keyWay: keyWay,
            cut: cut,
            buildings: buildings,
        })
    }
    //Find Wards
    for (let j = 15; j < 30; j++) {
        for (let i = 3; i < 7; i++) {
            if (rows[j][i] == '') continue;
            keys.push({
                name: rows[j][i],
                cuts: [Number(rows[j][1]),Number(rows[j][2]),Number(rows[14][i])],
            })
        }
    }
    //Find Buildings
    for (let j = 15; j < 18; j++) {
        for (let i = 11; i < 15; i++) {
            letters.push({
                name: rows[j][i],
                cuts: [Number(rows[j][10]),Number(rows[14][i])],
            })
        }
    }
    //Finding NFM
    nfm = [Number(rows[0][1]),Number(rows[0][2]),Number(rows[0][3]),Number(rows[0][4]),Number(rows[0][5]),Number(rows[0][6])];

    return {
        nfm: nfm,
        stake: stake,
        keys: keys,
        letters: letters,
    }
}
function decodeBuildings(string) {
    let rowsBroken = string.split(`\n`);
    let rows = [];
    for (let i = 0; i < rowsBroken.length; i++) {
        rows.push(rowsBroken[i].split(`\t`));
    }
    let buildings = [];
    for (let i = 1; i < rows.length; i++) {
        buildings.push({
            name: Number(rows[i][0]),
            address: rows[i][1].split(", "),
            letter: rows[i][2],
            stake: rows[i][3],
        })
    }
    return buildings;
}

function decodeOrder(string) {
    let rowsBroken = string.split(`\n`);
    let rows = [];
    for (let i = 0; i < rowsBroken.length; i++) {
        rows.push(rowsBroken[i].split(`\t`));
    }
    let order = [];
    for (let i = 0; i < rows.length; i++) {
        order.push({
            name: rows[i][0],
            order: Number(rows[i][1]),
            title: rows[i][2],
        })
    }
    return order;
}