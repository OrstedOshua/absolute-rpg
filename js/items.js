// Absolute RPG - Items System
// Система предметов, экипировки и зелий

const WEAPONS = [
    {
        id: 'wooden_sword',
        name: 'Деревянный меч',
        type: ITEM_TYPE.WEAPON,
        quality: ITEM_QUALITY.COMMON,
        damage: 8,
        level: 1,
        price: 20,
        icon: '🗡️'
    },
    {
        id: 'iron_sword',
        name: 'Железный меч',
        type: ITEM_TYPE.WEAPON,
        quality: ITEM_QUALITY.UNCOMMON,
        damage: 15,
        level: 5,
        price: 100,
        icon: '⚔️'
    },
    {
        id: 'steel_sword',
        name: 'Стальной меч',
        type: ITEM_TYPE.WEAPON,
        quality: ITEM_QUALITY.RARE,
        damage: 25,
        level: 10,
        price: 500,
        icon: '⚔️'
    },
    {
        id: 'mithril_sword',
        name: 'Мифриловый меч',
        type: ITEM_TYPE.WEAPON,
        quality: ITEM_QUALITY.EPIC,
        damage: 40,
        level: 15,
        price: 2000,
        icon: '⚔️'
    },
    {
        id: 'dragon_sword',
        name: 'Драконий меч',
        type: ITEM_TYPE.WEAPON,
        quality: ITEM_QUALITY.LEGENDARY,
        damage: 60,
        level: 20,
        price: 10000,
        icon: '⚔️'
    },
    // Магическое оружие
    {
        id: 'novice_staff',
        name: 'Посох новичка',
        type: ITEM_TYPE.WEAPON,
        quality: ITEM_QUALITY.COMMON,
        damage: 10,
        intelligence: 5,
        level: 1,
        price: 30,
        icon: '🪄'
    },
    {
        id: 'mage_staff',
        name: 'Посох мага',
        type: ITEM_TYPE.WEAPON,
        quality: ITEM_QUALITY.RARE,
        damage: 30,
        intelligence: 15,
        level: 10,
        price: 800,
        icon: '🪄'
    },
    {
        id: 'archmage_staff',
        name: 'Посох архимага',
        type: ITEM_TYPE.WEAPON,
        quality: ITEM_QUALITY.LEGENDARY,
        damage: 55,
        intelligence: 30,
        level: 20,
        price: 12000,
        icon: '🪄'
    }
];

const ARMOR = [
    {
        id: 'leather_armor',
        name: 'Кожаная броня',
        type: ITEM_TYPE.ARMOR,
        quality: ITEM_QUALITY.COMMON,
        defense: 5,
        level: 1,
        price: 25,
        icon: '🧥'
    },
    {
        id: 'chainmail',
        name: 'Кольчуга',
        type: ITEM_TYPE.ARMOR,
        quality: ITEM_QUALITY.UNCOMMON,
        defense: 12,
        level: 5,
        price: 150,
        icon: '🛡️'
    },
    {
        id: 'plate_armor',
        name: 'Латы',
        type: ITEM_TYPE.ARMOR,
        quality: ITEM_QUALITY.RARE,
        defense: 20,
        level: 10,
        price: 600,
        icon: '🛡️'
    },
    {
        id: 'mithril_armor',
        name: 'Мифриловая броня',
        type: ITEM_TYPE.ARMOR,
        quality: ITEM_QUALITY.EPIC,
        defense: 35,
        level: 15,
        price: 2500,
        icon: '🛡️'
    },
    {
        id: 'dragon_armor',
        name: 'Драконья броня',
        type: ITEM_TYPE.ARMOR,
        quality: ITEM_QUALITY.LEGENDARY,
        defense: 50,
        magicResist: 25,
        level: 20,
        price: 15000,
        icon: '🛡️'
    }
];

const ACCESSORIES = [
    {
        id: 'dodge_ring',
        name: 'Кольцо уклонения',
        type: ITEM_TYPE.ACCESSORY,
        quality: ITEM_QUALITY.UNCOMMON,
        dodgeBonus: 10,
        level: 3,
        price: 200,
        icon: '💍'
    },
    {
        id: 'reflect_amulet',
        name: 'Амулет отражения',
        type: ITEM_TYPE.ACCESSORY,
        quality: ITEM_QUALITY.RARE,
        reflectDamage: 5,
        level: 7,
        price: 500,
        icon: '💎'
    },
    {
        id: 'magic_cloak',
        name: 'Плащ защиты от магии',
        type: ITEM_TYPE.ACCESSORY,
        quality: ITEM_QUALITY.EPIC,
        magicResist: 15,
        level: 12,
        price: 1500,
        icon: '🧥'
    },
    {
        id: 'vampiric_necklace',
        name: 'Вампирское ожерелье',
        type: ITEM_TYPE.ACCESSORY,
        quality: ITEM_QUALITY.LEGENDARY,
        lifesteal: 10,
        level: 18,
        price: 8000,
        icon: '💎'
    }
];

const POTIONS = [
    {
        id: 'minor_hp_potion',
        name: 'Малое зелье здоровья',
        type: ITEM_TYPE.POTION,
        quality: ITEM_QUALITY.COMMON,
        healAmount: 50,
        level: 1,
        price: 10,
        icon: '🧪'
    },
    {
        id: 'hp_potion',
        name: 'Зелье здоровья',
        type: ITEM_TYPE.POTION,
        quality: ITEM_QUALITY.UNCOMMON,
        healAmount: 100,
        level: 5,
        price: 30,
        icon: '🧪'
    },
    {
        id: 'major_hp_potion',
        name: 'Большое зелье здоровья',
        type: ITEM_TYPE.POTION,
        quality: ITEM_QUALITY.RARE,
        healAmount: 200,
        level: 10,
        price: 80,
        icon: '🧪'
    },
    {
        id: 'mana_potion',
        name: 'Зелье маны',
        type: ITEM_TYPE.POTION,
        quality: ITEM_QUALITY.COMMON,
        manaAmount: 30,
        level: 1,
        price: 15,
        icon: '🧪'
    },
    {
        id: 'greater_mana_potion',
        name: 'Большое зелье маны',
        type: ITEM_TYPE.POTION,
        quality: ITEM_QUALITY.RARE,
        manaAmount: 80,
        level: 10,
        price: 60,
        icon: '🧪'
    }
];

// Все предметы
const ALL_ITEMS = [...WEAPONS, ...ARMOR, ...ACCESSORIES, ...POTIONS];

// Получение предмета по ID
function getItemById(id) {
    return ALL_ITEMS.find(item => item.id === id);
}

// Генерация случайного предмета
function generateRandomItem(maxLevel) {
    const availableItems = ALL_ITEMS.filter(item => 
        item.level <= maxLevel && item.type !== ITEM_TYPE.POTION
    );
    
    if (availableItems.length === 0) return null;
    
    const item = availableItems[Math.floor(Math.random() * availableItems.length)];
    return { ...item };
}

// Генерация случайного зелья
function generateRandomPotion(maxLevel) {
    const availablePotions = POTIONS.filter(item => item.level <= maxLevel);
    
    if (availablePotions.length === 0) return null;
    
    const potion = availablePotions[Math.floor(Math.random() * availablePotions.length)];
    return { ...potion };
}

// Получение предметов для магазина
function getShopItems(playerLevel) {
    return ALL_ITEMS.filter(item => 
        item.level <= playerLevel + 2
    ).sort((a, b) => a.price - b.price);
}

// Форматирование описания предмета
function getItemDescription(item) {
    const stats = [];
    
    if (item.damage) stats.push(`⚔️ Урон: ${item.damage}`);
    if (item.defense) stats.push(`🛡️ Защита: ${item.defense}`);
    if (item.magicResist) stats.push(`✨ Сопр. магии: ${item.magicResist}`);
    if (item.intelligence) stats.push(`🧠 Интеллект: +${item.intelligence}`);
    if (item.dodgeBonus) stats.push(`🏃 Уклонение: +${item.dodgeBonus}%`);
    if (item.reflectDamage) stats.push(`↩️ Отражение: ${item.reflectDamage}%`);
    if (item.lifesteal) stats.push(`🩸 Вампиризм: ${item.lifesteal}%`);
    if (item.healAmount) stats.push(`❤️ Восст.: ${item.healAmount} HP`);
    if (item.manaAmount) stats.push(`💧 Восст.: ${item.manaAmount} маны`);
    
    return stats.join(' | ');
}