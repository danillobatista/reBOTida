const salute = [
    "Alô você",
    "Bom dia",
    "Saudações",
    "Olá",
    "Oi",
    "Tudo bem com você",
];

const vocative = [
    "fã da beisebola",
    "torcida do baseball",
    "que aprecia um beisebol",
    "pessoa que aprecia este belo esporte"
]

const results = [
    "resultados de ontem da MLB:",
    "se você ficou por fora, o que rolou nos jogos de ontem:",
    "chegando com os placares de ontem"
]

const nextGames = [
    "E pra hoje, teremos mais:",
    "Pra ficar de olho no que vem hoje:",
    "Ainda hoje, teremos esses jogos:",
    "E a programação de hoje pro beisebol:"
]

function messageScores() {
    const s = salute[Math.floor(Math.random() * salute.length)];
    const v = vocative[Math.floor(Math.random() * vocative.length)];
    const r = results[Math.floor(Math.random() * results.length)];

    return `${s} ${v}, ${r}`;
}

function messageGames() {
    return nextGames[Math.floor(Math.random() * nextGames.length)];
}
module.exports.messageScores = messageScores;
module.exports.messageGames = messageGames;