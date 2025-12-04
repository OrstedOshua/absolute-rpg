// Absolute RPG - Player System
// Управление игроком и его характеристиками

class Player {
    constructor() {
        this.loadFromStorage() || this.reset();
    }
    
    // Сброс персонажа к начальным значениям
    reset() {
        this.name = 'Герой';
        this.level = CONFIG.PLAYER_DEFAULTS.level;
        this.exp = CONFIG.PLAYER_DEFAULTS.exp;
        this.gold = CONFIG.PLAYER_DEFAULTS.gold;
        this.statPoints = CONFIG.PLAYER_DEFAULTS.statPoints;
        
        // Характеристики
        this.strength = CONFIG.PLAYER_DEFAULTS.strength;
        this.intelligence = CONFIG.PLAYER_DEFAULTS.intelligence;
        this.agility = CONFIG.PLAYER_DEFAULTS.agility;
        this.vitality = CONFIG.PLAYER_DEFAULTS.vitality;
        
        // Расчётные параметры
        this.updateStats();
        this.currentHP = this.maxHP;
        this.currentMana = this.maxMana;
        
        // Экипировка (слоты)
        this.equipment = {
            weapon: null,
            armor: null,
            accessory: null
        };
        
        // Инвентарь
        this.inventory = [];
        
        // Боевое состояние
        this.inCombat = false;
        this.currentLocation = null;
        
        this.save();
    }
    
    // Обновление расчётных характеристик
    updateStats() {
        this.maxHP = CONFIG.FORMULAS.calculateMaxHP(this.vitality);
        this.maxMana = CONFIG.FORMULAS.calculateMaxMana(this.intelligence);
        this.defense = CONFIG.FORMULAS.calculateDefense(this.vitality);
        this.magicResist = CONFIG.FORMULAS.calculateMagicResist(this.intelligence);
        this.dodgeChance = CONFIG.FORMULAS.calculateDodgeChance(this.agility);
        this.critChance = CONFIG.FORMULAS.calculateCritChance(this.agility);
        this.attackSpeed = CONFIG.FORMULAS.calculateAttackSpeed(this.agility);
        
        // Добавляем бонусы от экипировки
        this.applyEquipmentBonuses();
    }
    
    // Применение бонусов от экипировки
    applyEquipmentBonuses() {
        if (this.equipment.weapon) {
            // Оружие добавляет к базовому урону
        }
        if (this.equipment.armor) {
            this.defense += this.equipment.armor.defense || 0;
            this.magicResist += this.equipment.armor.magicResist || 0;
        }
        if (this.equipment.accessory) {
            // Аксессуары добавляют специальные бонусы
            if (this.equipment.accessory.dodgeBonus) {
                this.dodgeChance += this.equipment.accessory.dodgeBonus;
            }
        }
    }
    
    // Расчёт урона атаки
    calculateDamage() {
        let baseDamage = 5;
        
        if (this.equipment.weapon) {
            baseDamage = this.equipment.weapon.damage;
        }
        
        const damage = CONFIG.FORMULAS.calculatePhysicalDamage(baseDamage, this.strength);
        
        // Проверка на крит
        const isCrit = Math.random() * 100 < this.critChance;
        return {
            damage: isCrit ? Math.floor(damage * 1.5) : damage,
            isCrit: isCrit
        };
    }
    
    // Получение урона
    takeDamage(amount, damageType = DAMAGE_TYPE.PHYSICAL) {
        let finalDamage = amount;
        
        // Проверка на уклонение
        if (Math.random() * 100 < this.dodgeChance) {
            return { damage: 0, dodged: true };
        }
        
        // Применяем защиту
        if (damageType === DAMAGE_TYPE.PHYSICAL) {
            finalDamage = Math.max(1, amount - this.defense);
        } else if (damageType === DAMAGE_TYPE.MAGICAL) {
            finalDamage = Math.max(1, amount - this.magicResist);
        }
        // TRUE урон проходит без изменений
        
        this.currentHP = Math.max(0, this.currentHP - finalDamage);
        return { damage: finalDamage, dodged: false };
    }
    
    // Лечение
    heal(amount) {
        const actualHeal = Math.min(amount, this.maxHP - this.currentHP);
        this.currentHP = Math.min(this.maxHP, this.currentHP + amount);
        return actualHeal;
    }
    
    // Восстановление маны
    restoreMana(amount) {
        const actualRestore = Math.min(amount, this.maxMana - this.currentMana);
        this.currentMana = Math.min(this.maxMana, this.currentMana + amount);
        return actualRestore;
    }
    
    // Получение опыта
    gainExp(amount) {
        this.exp += amount;
        const expNeeded = CONFIG.FORMULAS.calculateExpNeeded(this.level);
        
        if (this.exp >= expNeeded) {
            this.levelUp();
            return true;
        }
        return false;
    }
    
    // Повышение уровня
    levelUp() {
        this.level++;
        this.statPoints += CONFIG.LEVELING.STAT_POINTS_PER_LEVEL;
        this.exp = 0;
        
        // Полное восстановление HP и маны
        this.updateStats();
        this.currentHP = this.maxHP;
        this.currentMana = this.maxMana;
        
        return true;
    }
    
    // Добавление очка характеристики
    addStatPoint(stat) {
        if (this.statPoints <= 0) return false;
        
        switch(stat) {
            case 'strength':
                this.strength++;
                break;
            case 'intelligence':
                this.intelligence++;
                break;
            case 'agility':
                this.agility++;
                break;
            case 'vitality':
                this.vitality++;
                break;
            default:
                return false;
        }
        
        this.statPoints--;
        this.updateStats();
        this.save();
        return true;
    }
    
    // Получение золота
    addGold(amount) {
        this.gold += amount;
    }
    
    // Трата золота
    spendGold(amount) {
        if (this.gold >= amount) {
            this.gold -= amount;
            return true;
        }
        return false;
    }
    
    // Добавление предмета в инвентарь
    addItem(item) {
        this.inventory.push(item);
    }
    
    // Удаление предмета из инвентаря
    removeItem(itemIndex) {
        if (itemIndex >= 0 && itemIndex < this.inventory.length) {
            return this.inventory.splice(itemIndex, 1)[0];
        }
        return null;
    }
    
    // Экипировка предмета
    equipItem(itemIndex) {
        const item = this.inventory[itemIndex];
        if (!item) return false;
        
        const slot = item.type;
        if (!this.equipment.hasOwnProperty(slot)) return false;
        
        // Снимаем старый предмет
        if (this.equipment[slot]) {
            this.inventory.push(this.equipment[slot]);
        }
        
        // Экипируем новый
        this.equipment[slot] = item;
        this.removeItem(itemIndex);
        this.updateStats();
        this.save();
        return true;
    }
    
    // Снятие предмета
    unequipItem(slot) {
        if (!this.equipment[slot]) return false;
        
        this.inventory.push(this.equipment[slot]);
        this.equipment[slot] = null;
        this.updateStats();
        this.save();
        return true;
    }
    
    // Использование предмета (зелье)
    useItem(itemIndex) {
        const item = this.inventory[itemIndex];
        if (!item || item.type !== ITEM_TYPE.POTION) return false;
        
        let result = { success: false, message: '' };
        
        if (item.healAmount) {
            const healed = this.heal(item.healAmount);
            result.success = true;
            result.message = `Восстановлено ${healed} HP`;
        }
        
        if (item.manaAmount) {
            const restored = this.restoreMana(item.manaAmount);
            result.success = true;
            result.message += ` Восстановлено ${restored} маны`;
        }
        
        if (result.success) {
            this.removeItem(itemIndex);
            this.save();
        }
        
        return result;
    }
    
    // Проверка смерти
    isDead() {
        return this.currentHP <= 0;
    }
    
    // Воскрешение
    revive() {
        this.currentHP = Math.floor(this.maxHP * 0.5);
        this.currentMana = Math.floor(this.maxMana * 0.5);
    }
    
    // Сохранение
    save() {
        const saveData = {
            name: this.name,
            level: this.level,
            exp: this.exp,
            gold: this.gold,
            statPoints: this.statPoints,
            strength: this.strength,
            intelligence: this.intelligence,
            agility: this.agility,
            vitality: this.vitality,
            currentHP: this.currentHP,
            currentMana: this.currentMana,
            equipment: this.equipment,
            inventory: this.inventory,
            currentLocation: this.currentLocation
        };
        
        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(saveData));
    }
    
    // Загрузка
    loadFromStorage() {
        const data = localStorage.getItem(CONFIG.STORAGE_KEY);
        if (!data) return false;
        
        try {
            const saveData = JSON.parse(data);
            Object.assign(this, saveData);
            this.updateStats();
            return true;
        } catch (e) {
            console.error('Ошибка загрузки сохранения:', e);
            return false;
        }
    }
    
    // Получение данных для UI
    getDisplayStats() {
        return {
            name: this.name,
            level: this.level,
            exp: this.exp,
            expNeeded: CONFIG.FORMULAS.calculateExpNeeded(this.level),
            gold: this.gold,
            statPoints: this.statPoints,
            
            hp: `${this.currentHP}/${this.maxHP}`,
            hpPercent: (this.currentHP / this.maxHP) * 100,
            
            mana: `${this.currentMana}/${this.maxMana}`,
            manaPercent: (this.currentMana / this.maxMana) * 100,
            
            strength: this.strength,
            intelligence: this.intelligence,
            agility: this.agility,
            vitality: this.vitality,
            
            defense: this.defense,
            magicResist: this.magicResist,
            dodgeChance: this.dodgeChance.toFixed(1),
            critChance: this.critChance.toFixed(1)
        };
    }
}

// Экспорт для использования в других модулях
let player;