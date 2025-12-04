// Absolute RPG - Enemies & Locations
// Враги, локации и их характеристики

const LOCATIONS = [
    // НОВЫЕ ЛОКАЦИИ - РАЗНООБРАЗНЫЕ БИОМЫ
    {
        id: 'enchanted_forest',
        name: '🌳 Зачарованный лес',
        levelRange: [1, 4],
        description: 'Волшебный лес, населённый магическими существами',
        enemies: [
            {
                id: 'fairy',
                name: 'Злая фея',
                level: 1,
                hp: 25,
                damage: 4,
                defense: 1,
                magicResist: 5,
                damageType: DAMAGE_TYPE.MAGICAL,
                exp: 12,
                gold: [3, 7],
                icon: '🧚'
            },
            {
                id: 'forest_sprite',
                name: 'Лесной спрайт',
                level: 2,
                hp: 40,
                damage: 6,
                defense: 2,
                magicResist: 8,
                damageType: DAMAGE_TYPE.MAGICAL,
                exp: 18,
                gold: [5, 10],
                icon: '✨'
            },
            {
                id: 'treant',
                name: 'Древень',
                level: 3,
                hp: 80,
                damage: 8,
                defense: 8,
                damageType: DAMAGE_TYPE.PHYSICAL,
                exp: 25,
                gold: [8, 15],
                icon: '🌲'
            },
            {
                id: 'wild_boar',
                name: 'Дикий кабан',
                level: 4,
                hp: 90,
                damage: 12,
                defense: 6,
                damageType: DAMAGE_TYPE.PHYSICAL,
                exp: 30,
                gold: [10, 18],
                icon: '🐗'
            }
        ]
    },
    {
        id: 'scorching_desert',
        name: '🏜️ Палящая пустыня',
        levelRange: [5, 8],
        description: 'Безжизненная пустыня с опасными хищниками',
        enemies: [
            {
                id: 'sand_scorpion',
                name: 'Песчаный скорпион',
                level: 5,
                hp: 100,
                damage: 14,
                defense: 8,
                damageType: DAMAGE_TYPE.PHYSICAL,
                exp: 40,
                gold: [12, 22],
                icon: '🦂'
            },
            {
                id: 'desert_raider',
                name: 'Пустынный налётчик',
                level: 6,
                hp: 120,
                damage: 16,
                defense: 10,
                damageType: DAMAGE_TYPE.PHYSICAL,
                exp: 45,
                gold: [15, 28],
                icon: '🏹'
            },
            {
                id: 'sand_worm',
                name: 'Песчаный червь',
                level: 7,
                hp: 150,
                damage: 20,
                defense: 6,
                damageType: DAMAGE_TYPE.PHYSICAL,
                exp: 55,
                gold: [18, 35],
                icon: '🪱'
            },
            {
                id: 'fire_djinn',
                name: 'Огненный джинн',
                level: 8,
                hp: 140,
                damage: 25,
                defense: 8,
                magicResist: 15,
                damageType: DAMAGE_TYPE.MAGICAL,
                exp: 60,
                gold: [20, 40],
                icon: '🧞'
            }
        ]
    },
    {
        id: 'frozen_tundra',
        name: '❄️ Ледяная тундра',
        levelRange: [9, 12],
        description: 'Замёрзшие земли с морозными чудовищами',
        enemies: [
            {
                id: 'frost_wolf',
                name: 'Морозный волк',
                level: 9,
                hp: 160,
                damage: 22,
                defense: 12,
                magicResist: 10,
                damageType: DAMAGE_TYPE.PHYSICAL,
                exp: 70,
                gold: [25, 45],
                icon: '🐺'
            },
            {
                id: 'ice_troll',
                name: 'Ледяной тролль',
                level: 10,
                hp: 220,
                damage: 28,
                defense: 18,
                magicResist: 8,
                damageType: DAMAGE_TYPE.PHYSICAL,
                exp: 80,
                gold: [30, 55],
                icon: '🧊'
            },
            {
                id: 'snow_yeti',
                name: 'Снежный йети',
                level: 11,
                hp: 250,
                damage: 32,
                defense: 20,
                magicResist: 12,
                damageType: DAMAGE_TYPE.PHYSICAL,
                exp: 90,
                gold: [35, 65],
                icon: '👹'
            },
            {
                id: 'ice_elemental',
                name: 'Ледяной элементаль',
                level: 12,
                hp: 200,
                damage: 38,
                defense: 12,
                magicResist: 25,
                damageType: DAMAGE_TYPE.MAGICAL,
                exp: 95,
                gold: [40, 70],
                icon: '💎'
            }
        ]
    },
    {
        id: 'mystic_volcano',
        name: '🌋 Мистический вулкан',
        levelRange: [13, 16],
        description: 'Активный вулкан, кишащий огненными существами',
        enemies: [
            {
                id: 'lava_lizard',
                name: 'Лавовая ящерица',
                level: 13,
                hp: 240,
                damage: 35,
                defense: 15,
                magicResist: 18,
                damageType: DAMAGE_TYPE.PHYSICAL,
                exp: 105,
                gold: [45, 85],
                icon: '🦎'
            },
            {
                id: 'magma_golem',
                name: 'Магмовый голем',
                level: 14,
                hp: 300,
                damage: 40,
                defense: 25,
                magicResist: 15,
                damageType: DAMAGE_TYPE.PHYSICAL,
                exp: 115,
                gold: [50, 95],
                icon: '🗿'
            },
            {
                id: 'flame_drake',
                name: 'Огненный дракончик',
                level: 15,
                hp: 280,
                damage: 48,
                defense: 18,
                magicResist: 22,
                damageType: DAMAGE_TYPE.MAGICAL,
                exp: 125,
                gold: [55, 105],
                icon: '🐉'
            },
            {
                id: 'inferno_demon',
                name: 'Демон инферно',
                level: 16,
                hp: 320,
                damage: 52,
                defense: 20,
                magicResist: 28,
                damageType: DAMAGE_TYPE.MAGICAL,
                exp: 140,
                gold: [65, 120],
                icon: '😈'
            }
        ]
    },
    {
        id: 'crystal_caverns',
        name: '💎 Кристальные пещеры',
        levelRange: [17, 20],
        description: 'Сверкающие пещеры с драгоценными кристаллами и их стражами',
        enemies: [
            {
                id: 'crystal_spider',
                name: 'Кристальный паук',
                level: 17,
                hp: 300,
                damage: 45,
                defense: 22,
                magicResist: 20,
                damageType: DAMAGE_TYPE.PHYSICAL,
                exp: 150,
                gold: [70, 130],
                icon: '🕷️'
            },
            {
                id: 'gem_guardian',
                name: 'Страж самоцветов',
                level: 18,
                hp: 350,
                damage: 55,
                defense: 30,
                magicResist: 25,
                damageType: DAMAGE_TYPE.PHYSICAL,
                exp: 160,
                gold: [80, 150],
                icon: '💠'
            },
            {
                id: 'crystal_dragon',
                name: 'Кристальный дракон',
                level: 19,
                hp: 450,
                damage: 70,
                defense: 35,
                magicResist: 35,
                damageType: DAMAGE_TYPE.MAGICAL,
                exp: 180,
                gold: [100, 180],
                icon: '🐲'
            },
            {
                id: 'prismatic_titan',
                name: 'Призматический титан',
                level: 20,
                hp: 550,
                damage: 85,
                defense: 40,
                magicResist: 40,
                damageType: DAMAGE_TYPE.MAGICAL,
                exp: 220,
                gold: [120, 220],
                icon: '⚡'
            }
        ]
    },
    
    // ОРИГИНАЛЬНЫЕ ЛОКАЦИИ
    {
        id: 'dark_forest',
        name: '🌲 Тёмный лес',
        levelRange: [1, 3],
        description: 'Густой лес, полный слабых монстров',
        enemies: [
            {
                id: 'slime',
                name: 'Слайм',
                level: 1,
                hp: 30,
                damage: 3,
                defense: 1,
                damageType: DAMAGE_TYPE.PHYSICAL,
                exp: 10,
                gold: [2, 5],
                icon: '🟢'
            },
            {
                id: 'wolf',
                name: 'Волк',
                level: 2,
                hp: 45,
                damage: 6,
                defense: 2,
                damageType: DAMAGE_TYPE.PHYSICAL,
                exp: 15,
                gold: [3, 8],
                icon: '🐺'
            },
            {
                id: 'goblin_scout',
                name: 'Гоблин-разведчик',
                level: 3,
                hp: 60,
                damage: 8,
                defense: 3,
                damageType: DAMAGE_TYPE.PHYSICAL,
                exp: 20,
                gold: [5, 12],
                icon: '👺'
            }
        ]
    },
    {
        id: 'abandoned_village',
        name: '🏘️ Заброшенная деревня',
        levelRange: [4, 6],
        description: 'Покинутая деревня, населённая нечистью',
        enemies: [
            {
                id: 'bandit',
                name: 'Бандит',
                level: 4,
                hp: 80,
                damage: 12,
                defense: 5,
                damageType: DAMAGE_TYPE.PHYSICAL,
                exp: 30,
                gold: [10, 20],
                icon: '🧔'
            },
            {
                id: 'zombie',
                name: 'Зомби',
                level: 5,
                hp: 100,
                damage: 10,
                defense: 3,
                damageType: DAMAGE_TYPE.PHYSICAL,
                exp: 35,
                gold: [8, 15],
                icon: '🧟'
            },
            {
                id: 'goblin_warrior',
                name: 'Гоблин-воин',
                level: 6,
                hp: 110,
                damage: 15,
                defense: 7,
                damageType: DAMAGE_TYPE.PHYSICAL,
                exp: 40,
                gold: [12, 25],
                icon: '👹'
            }
        ]
    },
    {
        id: 'ancient_ruins',
        name: '🏛️ Древние руины',
        levelRange: [7, 9],
        description: 'Развалины древней цивилизации',
        enemies: [
            {
                id: 'skeleton_warrior',
                name: 'Скелет-воин',
                level: 7,
                hp: 130,
                damage: 18,
                defense: 10,
                damageType: DAMAGE_TYPE.PHYSICAL,
                exp: 50,
                gold: [15, 30],
                icon: '💀'
            },
            {
                id: 'ghost',
                name: 'Призрак',
                level: 8,
                hp: 100,
                damage: 22,
                defense: 5,
                magicResist: 15,
                damageType: DAMAGE_TYPE.MAGICAL,
                exp: 55,
                gold: [18, 35],
                icon: '👻'
            },
            {
                id: 'stone_golem',
                name: 'Каменный голем',
                level: 9,
                hp: 200,
                damage: 20,
                defense: 20,
                damageType: DAMAGE_TYPE.PHYSICAL,
                exp: 60,
                gold: [20, 40],
                icon: '🗿'
            }
        ]
    },
    {
        id: 'cursed_swamp',
        name: '🧬 Проклятое болото',
        levelRange: [10, 12],
        description: 'Зловонное болото с опасными существами',
        enemies: [
            {
                id: 'swamp_creature',
                name: 'Болотная тварь',
                level: 10,
                hp: 180,
                damage: 25,
                defense: 12,
                damageType: DAMAGE_TYPE.PHYSICAL,
                exp: 70,
                gold: [25, 50],
                icon: '🧟'
            },
            {
                id: 'dark_mage',
                name: 'Тёмный маг',
                level: 11,
                hp: 150,
                damage: 35,
                defense: 8,
                magicResist: 20,
                damageType: DAMAGE_TYPE.MAGICAL,
                exp: 80,
                gold: [30, 60],
                icon: '🧙'
            },
            {
                id: 'poison_spider',
                name: 'Ядовитый паук',
                level: 12,
                hp: 160,
                damage: 28,
                defense: 10,
                damageType: DAMAGE_TYPE.PHYSICAL,
                exp: 85,
                gold: [28, 55],
                icon: '🕷️'
            }
        ]
    },
    {
        id: 'chaos_caves',
        name: '⛏️ Пещеры хаоса',
        levelRange: [13, 15],
        description: 'Глубокие пещеры с могущественными чудовищами',
        enemies: [
            {
                id: 'orc_berserker',
                name: 'Орк-берсерк',
                level: 13,
                hp: 250,
                damage: 40,
                defense: 15,
                damageType: DAMAGE_TYPE.PHYSICAL,
                exp: 100,
                gold: [40, 80],
                icon: '👹'
            },
            {
                id: 'vampire_bat',
                name: 'Летучая мышь-вампир',
                level: 14,
                hp: 200,
                damage: 35,
                defense: 10,
                damageType: DAMAGE_TYPE.PHYSICAL,
                exp: 110,
                gold: [45, 85],
                icon: '🦇'
            },
            {
                id: 'minotaur',
                name: 'Минотавр',
                level: 15,
                hp: 300,
                damage: 45,
                defense: 20,
                damageType: DAMAGE_TYPE.PHYSICAL,
                exp: 120,
                gold: [50, 100],
                icon: '🐂'
            }
        ]
    },
    {
        id: 'obsidian_fortress',
        name: '🏰 Обсидиановая крепость',
        levelRange: [16, 18],
        description: 'Зловещая крепость тёмных сил',
        enemies: [
            {
                id: 'dark_knight',
                name: 'Тёмный рыцарь',
                level: 16,
                hp: 350,
                damage: 50,
                defense: 25,
                damageType: DAMAGE_TYPE.PHYSICAL,
                exp: 140,
                gold: [60, 120],
                icon: '⚔️'
            },
            {
                id: 'demon_guard',
                name: 'Демон-страж',
                level: 17,
                hp: 320,
                damage: 55,
                defense: 20,
                magicResist: 25,
                damageType: DAMAGE_TYPE.MAGICAL,
                exp: 150,
                gold: [70, 130],
                icon: '👿'
            },
            {
                id: 'fire_elemental',
                name: 'Огненный элементаль',
                level: 18,
                hp: 280,
                damage: 60,
                defense: 15,
                magicResist: 30,
                damageType: DAMAGE_TYPE.MAGICAL,
                exp: 160,
                gold: [75, 140],
                icon: '🔥'
            }
        ]
    },
    {
        id: 'dragon_lair',
        name: '🐉 Логово дракона',
        levelRange: [19, 20],
        description: 'Логово могущественных драконов',
        enemies: [
            {
                id: 'dragonkin',
                name: 'Драконид',
                level: 19,
                hp: 400,
                damage: 65,
                defense: 30,
                magicResist: 25,
                damageType: DAMAGE_TYPE.PHYSICAL,
                exp: 180,
                gold: [90, 180],
                icon: '🦎'
            },
            {
                id: 'ancient_dragon',
                name: 'Древний дракон',
                level: 20,
                hp: 500,
                damage: 80,
                defense: 35,
                magicResist: 35,
                damageType: DAMAGE_TYPE.MAGICAL,
                exp: 200,
                gold: [100, 200],
                icon: '🐲'
            },
            {
                id: 'dragon_overlord',
                name: 'Повелитель драконов',
                level: 20,
                hp: 600,
                damage: 100,
                defense: 40,
                magicResist: 40,
                damageType: DAMAGE_TYPE.PHYSICAL,
                exp: 250,
                gold: [150, 300],
                icon: '🐉'
            }
        ]
    }
];

// Класс врага
class Enemy {
    constructor(template) {
        this.id = template.id;
        this.name = template.name;
        this.level = template.level;
        this.maxHP = template.hp;
        this.currentHP = template.hp;
        this.damage = template.damage;
        this.defense = template.defense || 0;
        this.magicResist = template.magicResist || 0;
        this.damageType = template.damageType;
        this.exp = template.exp;
        this.goldRange = template.gold;
        this.icon = template.icon;
    }
    
    // Расчёт урона
    calculateDamage() {
        const variance = 0.9 + Math.random() * 0.2; // 90-110%
        return Math.floor(this.damage * variance);
    }
    
    // Получение урона
    takeDamage(amount, damageType = DAMAGE_TYPE.PHYSICAL) {
        let finalDamage = amount;
        
        if (damageType === DAMAGE_TYPE.PHYSICAL) {
            finalDamage = Math.max(1, amount - this.defense);
        } else if (damageType === DAMAGE_TYPE.MAGICAL) {
            finalDamage = Math.max(1, amount - this.magicResist);
        }
        
        this.currentHP = Math.max(0, this.currentHP - finalDamage);
        return finalDamage;
    }
    
    // Проверка смерти
    isDead() {
        return this.currentHP <= 0;
    }
    
    // Генерация лута
    generateLoot() {
        const gold = Math.floor(
            this.goldRange[0] + 
            Math.random() * (this.goldRange[1] - this.goldRange[0])
        );
        
        return {
            exp: this.exp,
            gold: gold
        };
    }
}

// Функции для работы с локациями
function getLocationById(id) {
    return LOCATIONS.find(loc => loc.id === id);
}

function getAvailableLocations(playerLevel) {
    return LOCATIONS.filter(loc => 
        playerLevel >= loc.levelRange[0]
    );
}

function createRandomEnemy(location) {
    const enemies = location.enemies;
    const template = enemies[Math.floor(Math.random() * enemies.length)];
    return new Enemy(template);
}