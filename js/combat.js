// Absolute RPG - Combat System
// Автоматическая боевая система

class CombatSystem {
    constructor() {
        this.isActive = false;
        this.currentLocation = null;
        this.currentEnemy = null;
        this.combatInterval = null;
        this.enemyAttackInterval = null;
        this.killCount = 0;
    }
    
    // Начать бой в локации
    start(locationId) {
        if (this.isActive) return false;
        
        const location = getLocationById(locationId);
        if (!location) return false;
        
        this.currentLocation = location;
        this.isActive = true;
        this.killCount = 0;
        player.inCombat = true;
        player.currentLocation = locationId;
        
        this.spawnEnemy();
        this.startCombatLoop();
        
        addCombatLog(`Вы вошли в локацию: ${location.name}`, 'system');
        return true;
    }
    
    // Остановить бой
    stop() {
        if (!this.isActive) return;
        
        this.isActive = false;
        this.currentLocation = null;
        this.currentEnemy = null;
        player.inCombat = false;
        player.currentLocation = null;
        
        if (this.combatInterval) {
            clearInterval(this.combatInterval);
            this.combatInterval = null;
        }
        
        if (this.enemyAttackInterval) {
            clearInterval(this.enemyAttackInterval);
            this.enemyAttackInterval = null;
        }
        
        addCombatLog(`Вы покинули локацию. Убито врагов: ${this.killCount}`, 'system');
        updateEnemyDisplay();
    }
    
    // Создать нового врага
    spawnEnemy() {
        if (!this.currentLocation) return;
        
        this.currentEnemy = createRandomEnemy(this.currentLocation);
        updateEnemyDisplay();
        
        addCombatLog(`${this.currentEnemy.icon} Появился ${this.currentEnemy.name} (Уровень ${this.currentEnemy.level})!`, 'system');
    }
    
    // Запустить цикл боя
    startCombatLoop() {
        // Атака игрока
        this.combatInterval = setInterval(() => {
            if (!this.isActive || !this.currentEnemy) return;
            this.playerAttack();
        }, player.attackSpeed);
        
        // Атака врага
        this.enemyAttackInterval = setInterval(() => {
            if (!this.isActive || !this.currentEnemy) return;
            this.enemyAttack();
        }, CONFIG.COMBAT.ATTACK_INTERVAL);
    }
    
    // Атака игрока
    playerAttack() {
        if (!this.currentEnemy || player.isDead()) return;
        
        const { damage, isCrit } = player.calculateDamage();
        const actualDamage = this.currentEnemy.takeDamage(damage, DAMAGE_TYPE.PHYSICAL);
        
        const critText = isCrit ? ' 💥 КРИТ!' : '';
        addCombatLog(
            `Вы атаковали ${this.currentEnemy.name} на ${actualDamage} урона${critText}`,
            'player-attack'
        );
        
        if (this.currentEnemy.isDead()) {
            this.onEnemyDeath();
        } else {
            updateEnemyDisplay();
        }
    }
    
    // Атака врага
    enemyAttack() {
        if (!this.currentEnemy || player.isDead()) return;
        
        const damage = this.currentEnemy.calculateDamage();
        const result = player.takeDamage(damage, this.currentEnemy.damageType);
        
        if (result.dodged) {
            addCombatLog(
                `${this.currentEnemy.name} промахнулся! Вы уклонились!`,
                'system'
            );
        } else {
            addCombatLog(
                `${this.currentEnemy.name} атаковал вас на ${result.damage} урона`,
                'enemy-attack'
            );
        }
        
        updatePlayerStats();
        
        if (player.isDead()) {
            this.onPlayerDeath();
        }
    }
    
    // Смерть врага
    onEnemyDeath() {
        const loot = this.currentEnemy.generateLoot();
        this.killCount++;
        
        addCombatLog(
            `☠️ ${this.currentEnemy.name} повержен!`,
            'enemy-death'
        );
        
        // Лут
        player.addGold(loot.gold);
        addCombatLog(
            `💰 Получено ${loot.gold} золота`,
            'loot'
        );
        
        // Опыт
        const leveledUp = player.gainExp(loot.exp);
        addCombatLog(
            `⭐ Получено ${loot.exp} опыта`,
            'loot'
        );
        
        if (leveledUp) {
            addCombatLog(
                `🎉 Повышение уровня! Теперь вы ${player.level} уровня!`,
                'level-up'
            );
        }
        
        // Дроп предметов
        if (Math.random() < CONFIG.LOOT.ITEM_DROP_CHANCE) {
            const item = generateRandomItem(player.level);
            if (item) {
                player.addItem(item);
                addCombatLog(
                    `🎁 Найден предмет: ${item.icon} ${item.name}`,
                    'loot'
                );
            }
        }
        
        // Дроп зелий
        if (Math.random() < CONFIG.LOOT.POTION_DROP_CHANCE) {
            const potion = generateRandomPotion(player.level);
            if (potion) {
                player.addItem(potion);
                addCombatLog(
                    `🧪 Найдено зелье: ${potion.name}`,
                    'loot'
                );
            }
        }
        
        player.save();
        updatePlayerStats();
        updateInventoryDisplay();
        updateShopDisplay();
        
        // Спаун нового врага
        setTimeout(() => {
            if (this.isActive) {
                this.spawnEnemy();
            }
        }, 1000);
    }
    
    // Смерть игрока
    onPlayerDeath() {
        this.stop();
        
        addCombatLog(
            `☠️ Вы погибли! Воскрешение...`,
            'player-death'
        );
        
        setTimeout(() => {
            player.revive();
            player.save();
            updatePlayerStats();
            addCombatLog(`❤️ Вы воскресли с 50% HP и маны`, 'system');
        }, 2000);
    }
}

let combatSystem;