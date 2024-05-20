const maxes = {
    mass: 5000000,
    medal: 10,
    crown: 100,
    rk: 100,
    bk: 200,
    juja: 100,
    bubble: 300,
    slug: 9999,
    jg: 100,
};

document.querySelectorAll('input').forEach((elem) => {
    elem.addEventListener('focusout', function () {
        let maxValue = maxes[this.getAttribute('tag')];
        if (this.value > maxValue) this.value = maxValue;
    }.bind(elem));
});

let inputs = [];
let multipliers = [ 2, 0.05, 0.03, 0.08, 0.02, 0.01, 0.003, 0.0003, 0.005, ];

let scoreNums = [];
let score = 0;

let lifeCost = [ 99 ];

for (let i = 1; i <= 100; i++) {
    lifeCost.push((i * 100) + 49);
};
console.log(lifeCost)

document.querySelector('.calculate').addEventListener('click', () => {
    document.querySelectorAll('input').forEach((elem) => {
        if (elem.value == '') {
            inputs.push(0);
        } else {
            inputs.push(Number(elem.value));
        }
    });

    const baseScore = (inputs[0] * multipliers[0]);
    scoreNums.push(baseScore);

    for (let i = 0; i < inputs.length; i++) {
        if (i == 0) continue;

        let multiplier = (inputs[i] * multipliers[i]);
        if (multipliers[i] == 0.0003) multiplier = Math.ceil(multiplier);

        scoreNums.push(baseScore * multiplier);
    };

    for (let i = 0; i < scoreNums.length; i++) {
        score = score + scoreNums[i];
    };

    document.querySelector('.score').innerHTML = String(score);

    let livesNeeded = ((inputs[0] - 4000000) > 0) ? (inputs[0] - 4000000) / 10000 : 0;
    let rubiesNeeded = 0;

    for (let i = 0; i < livesNeeded; i++) {
        rubiesNeeded = rubiesNeeded + lifeCost[i];
    };

    document.querySelector('.rubies').innerHTML = String(rubiesNeeded);

    inputs = [];
    scoreNums = [];
    score = 0;
});

document.querySelector('.changelog-btn').addEventListener('click', () => { toggleChangelog(true) });
document.querySelector('.btn-close-changelog').addEventListener('click', () => { toggleChangelog(false) });

function toggleChangelog(bool) {
    if (bool) {
        document.querySelector('.changelog').style.display = 'block';
        document.querySelector('.shader').style.display = 'block';
    } else if (!bool) {
        document.querySelector('.changelog').style.display = 'none';
        document.querySelector('.shader').style.display = 'none';
    }
};