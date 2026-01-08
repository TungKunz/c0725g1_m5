const initialPlayers = [
    {
        id: 1,
        playerCode: "PL-0001",
        name: "Lionel Messi",
        dob: "1987-06-24",
        transferValue: 35000000,
        position: "RW",
    },
    {
        id: 2,
        playerCode: "PL-0002",
        name: "Cristiano Ronaldo",
        dob: "1985-02-05",
        transferValue: 15000000,
        position: "ST",
    },
    {
        id: 3,
        playerCode: "PL-0003",
        name: "Kylian Mbappé",
        dob: "1998-12-20",
        transferValue: 180000000,
        position: "LW",
    },
    {
        id: 4,
        playerCode: "PL-0004",
        name: "Erling Haaland",
        dob: "2000-07-21",
        transferValue: 170000000,
        position: "ST",
    },
    {
        id: 5,
        playerCode: "PL-0005",
        name: "Kevin De Bruyne",
        dob: "1991-06-28",
        transferValue: 55000000,
        position: "CM",
    },
    {
        id: 6,
        playerCode: "PL-0006",
        name: "Virgil van Dijk",
        dob: "1991-07-08",
        transferValue: 35000000,
        position: "CB",
    },
];
export const getAll = () => initialPlayers;
export function deleteById(id) {
    for (let i = 0; i < initialPlayers.length; i++) {
        if (initialPlayers[i].id == id) {
            initialPlayers.splice(i, 1);
            break;
        }
    }
}
export function findByName(keyword) {
    return initialPlayers.filter(p =>
        p.name.toLowerCase().includes(keyword.trim().toLowerCase())
    );
}
export function save(player) {
    // Tự động tính ID tiếp theo
    const nextId = initialPlayers.length > 0
        ? Math.max(...initialPlayers.map(p => p.id)) + 1
        : 1;

    const newPlayer = {
        ...player,
        id: nextId
    };

    initialPlayers.push(newPlayer);
}