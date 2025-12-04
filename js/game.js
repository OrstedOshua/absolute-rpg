// Absolute RPG - Main Game Loop
// Главный файл игры

function initializeGame() {
    // Инициализация игрока
    player = new Player();
    combatSystem = new CombatSystem();
    
    // Установка имени
    document.getElementById('playerName').value = player.name;
    
    // Обновление UI
    updatePlayerStats();
    updateEquipmentDisplay();
    updateInventoryDisplay();
    updateShopDisplay();
    populateLocationSelect();
    updateEnemyDisplay();
    
    // Настройка обработчиков
    setupEventListeners();
    
    // Автосохранение каждые 30 секунд
    setInterval(() => {
        player.save();
    }, 30000);
    
    // Регенерация HP и маны вне боя
    setInterval(() => {
        if (!player.inCombat) {
            const healAmount = Math.floor(player.maxHP * CONFIG.COMBAT.HEALTH_REGEN_AMOUNT);
            const manaAmount = Math.floor(player.maxMana * CONFIG.COMBAT.MANA_REGEN_AMOUNT);
            
            if (player.currentHP < player.maxHP) {
                player.heal(healAmount);
                updatePlayerStats();
            }
            
            if (player.currentMana < player.maxMana) {
                player.restoreMana(manaAmount);
                updatePlayerStats();
            }
        }
    }, CONFIG.COMBAT.HEALTH_REGEN_INTERVAL);
    
    console.log('%c⚔️ Absolute RPG загружена!', 'color: #8b5cf6; font-size: 20px; font-weight: bold;');
    console.log('%cСоздано для OrstedOshua', 'color: #10b981; font-size: 14px;');
}

// Запуск игры при загрузке страницы
window.addEventListener('DOMContentLoaded', initializeGame);

// Сохранение перед закрытием
window.addEventListener('beforeunload', () => {
    if (player) {
        player.save();
    }
});