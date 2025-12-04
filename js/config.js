// Absolute RPG - Configuration
// Этот файл содержит все базовые настройки игры

const CONFIG = {
    // Базовые параметры персонажа
    PLAYER_DEFAULTS: {
        level: 1,
        exp: 0,
        gold: 0,
        statPoints: 0,
        
        // Базовые характеристики
        strength: 10,        // Сила - увеличивает физический урон
        intelligence: 10,    // Интеллект - увеличивает магический урон
        agility: 10,         // Ловкость - шанс крита и уклонения
        vitality: 10,        // Выносливость - увеличивает макс HP
        
        // Расчётные параметры
        maxHP: 100,
        currentHP: 100,
        maxMana: 50,
        currentMana: 50,
        defense: 5,          // Физическая защита
        magicResist: 5       // Сопротивление магии
    },
    
    // Формулы расчёта параметров
    FORMULAS: {
        // HP = 100 + (vitality * 10)
        calculateMaxHP: (vitality) => 100 + (vitality * 10),
        
        // Mana = 50 + (intelligence * 5)
        calculateMaxMana: (intelligence) => 50 + (intelligence * 5),
        
        // Defense = 5 + (vitality * 0.5)
        calculateDefense: (vitality) => Math.floor(5 + (vitality * 0.5)),
        
        // Magic Resist = 5 + (intelligence * 0.5)
        calculateMagicResist: (intelligence) => Math.floor(5 + (intelligence * 0.5)),
        
        // Physical Damage = base + (strength * multiplier)
        calculatePhysicalDamage: (base, strength) => Math.floor(base + (strength * 0.8)),
        
        // Magic Damage = base + (intelligence * multiplier)
        calculateMagicDamage: (base, intelligence) => Math.floor(base + (intelligence * 0.8)),
        
        // Dodge Chance = agility * 0.2% (max 30%)
        calculateDodgeChance: (agility) => Math.min(agility * 0.2, 30),
        
        // Crit Chance = agility * 0.3% (max 50%)
        calculateCritChance: (agility) => Math.min(agility * 0.3, 50),
        
        // Attack Speed = 1000ms - (agility * 10) (min 500ms)
        calculateAttackSpeed: (agility) => Math.max(1000 - (agility * 10), 500),
        
        // EXP для следующего уровня
        calculateExpNeeded: (level) => Math.floor(100 * Math.pow(1.5, level - 1))
    },
    
    // Боевая система
    COMBAT: {
        ATTACK_INTERVAL: 2000,     // Интервал атаки в мс (будет модифицироваться)
        HEALTH_REGEN_INTERVAL: 5000, // Регенерация HP вне боя
        HEALTH_REGEN_AMOUNT: 0.05,   // 5% от макс HP
        MANA_REGEN_INTERVAL: 3000,   // Регенерация маны
        MANA_REGEN_AMOUNT: 0.03      // 3% от макс маны
    },
    
    // Система прокачки
    LEVELING: {
        STAT_POINTS_PER_LEVEL: 5     // Очков характеристик за уровень
    },
    
    // Настройки лута
    LOOT: {
        GOLD_MULTIPLIER: 1.0,        // Множитель золота
        ITEM_DROP_CHANCE: 0.15,      // 15% шанс дропа предмета
        POTION_DROP_CHANCE: 0.25     // 25% шанс дропа зелья
    },
    
    // Локальное хранилище
    STORAGE_KEY: 'absolute_rpg_save'
};

// Качество предметов
const ITEM_QUALITY = {
    COMMON: { name: 'Обычный', color: '#9ca3af', multiplier: 1.0 },
    UNCOMMON: { name: 'Необычный', color: '#10b981', multiplier: 1.2 },
    RARE: { name: 'Редкий', color: '#3b82f6', multiplier: 1.5 },
    EPIC: { name: 'Эпический', color: '#a855f7', multiplier: 2.0 },
    LEGENDARY: { name: 'Легендарный', color: '#f59e0b', multiplier: 3.0 }
};

// Типы предметов
const ITEM_TYPE = {
    WEAPON: 'weapon',
    ARMOR: 'armor',
    ACCESSORY: 'accessory',
    POTION: 'potion',
    MATERIAL: 'material'
};

// Типы урона
const DAMAGE_TYPE = {
    PHYSICAL: 'physical',
    MAGICAL: 'magical',
    TRUE: 'true'  // Чистый урон (игнорирует защиту)
};