// Absolute RPG - UI Management
// Управление интерфейсом

function updatePlayerStats() {
    const stats = player.getDisplayStats();
    
    // Основная информация
    document.getElementById('playerLevel').textContent = stats.level;
    document.getElementById('playerGold').textContent = stats.gold;
    document.getElementById('statPoints').textContent = stats.statPoints;
    
    // Опыт
    document.getElementById('expBar').style.width = `${(stats.exp / stats.expNeeded) * 100}%`;
    document.getElementById('expText').textContent = `${stats.exp} / ${stats.expNeeded}`;
    
    // HP и мана
    document.getElementById('playerHP').textContent = stats.hp;
    document.getElementById('playerMana').textContent = stats.mana;
    
    // Характеристики
    document.getElementById('playerStrength').textContent = stats.strength;
    document.getElementById('playerIntelligence').textContent = stats.intelligence;
    document.getElementById('playerAgility').textContent = stats.agility;
    document.getElementById('playerVitality').textContent = stats.vitality;
    document.getElementById('playerDefense').textContent = stats.defense;
    document.getElementById('playerMagicResist').textContent = stats.magicResist;
    
    // Активность кнопок прокачки
    document.querySelectorAll('.stat-btn').forEach(btn => {
        btn.disabled = stats.statPoints <= 0;
    });
}

function updateEnemyDisplay() {
    const enemyContainer = document.getElementById('currentEnemy');
    
    if (!combatSystem.currentEnemy) {
        enemyContainer.innerHTML = '<p class="no-enemy">Выберите локацию и начните бой</p>';
        return;
    }
    
    const enemy = combatSystem.currentEnemy;
    const hpPercent = (enemy.currentHP / enemy.maxHP) * 100;
    
    enemyContainer.innerHTML = `
        <div class="enemy-name">${enemy.icon} ${enemy.name}</div>
        <div class="enemy-level">Уровень: ${enemy.level}</div>
        <div class="enemy-hp">
            <span class="label">❤️ HP:</span>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${hpPercent}%; background: linear-gradient(90deg, var(--hp-color), #f87171);"></div>
            </div>
            <span class="exp-text">${enemy.currentHP} / ${enemy.maxHP}</span>
        </div>
    `;
}

function populateLocationSelect() {
    const select = document.getElementById('locationSelect');
    
    // Проверка, что функция getAvailableLocations доступна
    if (typeof LOCATIONS === 'undefined') {
        console.error('LOCATIONS is not defined!');
        select.innerHTML = '<option value="none">Ошибка загрузки локаций</option>';
        return;
    }
    
    // Показываем ВСЕ локации, но недоступные помечаем
    const allLocations = LOCATIONS;
    
    // Очищаем список
    select.innerHTML = '<option value="none">Выберите локацию</option>';
    
    // Добавляем локации
    allLocations.forEach(location => {
        const option = document.createElement('option');
        option.value = location.id;
        
        // Проверяем, доступна ли локация
        const isAvailable = player.level >= location.levelRange[0];
        
        if (isAvailable) {
            option.textContent = `${location.name} (Ур. ${location.levelRange[0]}-${location.levelRange[1]})`;
        } else {
            option.textContent = `🔒 ${location.name} (Ур. ${location.levelRange[0]}-${location.levelRange[1]}) - Требуется ${location.levelRange[0]} ур.`;
            option.disabled = true;
            option.style.color = '#808080';
        }
        
        if (player.currentLocation === location.id) {
            option.selected = true;
        }
        
        select.appendChild(option);
    });
    
    console.log(`Loaded ${allLocations.length} locations (player level: ${player.level})`);
}

function addCombatLog(message, type = 'system') {
    const logContainer = document.getElementById('combatLog');
    const entry = document.createElement('p');
    entry.className = `log-entry ${type}`;
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    
    logContainer.appendChild(entry);
    logContainer.scrollTop = logContainer.scrollHeight;
    
    // Ограничиваем количество сообщений
    while (logContainer.children.length > 100) {
        logContainer.removeChild(logContainer.firstChild);
    }
}

function setupEventListeners() {
    // Изменение имени
    document.getElementById('playerName').addEventListener('change', (e) => {
        player.name = e.target.value || 'Герой';
        player.save();
    });
    
    // Кнопки прокачки характеристик
    document.querySelectorAll('.stat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const stat = btn.dataset.stat;
            if (player.addStatPoint(stat)) {
                updatePlayerStats();
                // Обновляем список локаций при повышении уровня
                populateLocationSelect();
                addCombatLog(`↑ +1 к ${stat}`, 'system');
            }
        });
    });
    
    // Кнопки боя
    document.getElementById('startCombatBtn').addEventListener('click', () => {
        const locationId = document.getElementById('locationSelect').value;
        if (locationId === 'none') {
            addCombatLog('❌ Выберите локацию!', 'system');
            return;
        }
        
        // Проверяем, доступна ли локация
        const location = getLocationById(locationId);
        if (location && player.level < location.levelRange[0]) {
            addCombatLog(`❌ Эта локация требует ${location.levelRange[0]} уровень!`, 'system');
            return;
        }
        
        if (combatSystem.start(locationId)) {
            document.getElementById('startCombatBtn').style.display = 'none';
            document.getElementById('stopCombatBtn').style.display = 'inline-block';
            document.getElementById('locationSelect').disabled = true;
        }
    });
    
    document.getElementById('stopCombatBtn').addEventListener('click', () => {
        combatSystem.stop();
        document.getElementById('startCombatBtn').style.display = 'inline-block';
        document.getElementById('stopCombatBtn').style.display = 'none';
        document.getElementById('locationSelect').disabled = false;
    });
    
    // Вкладки
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            
            // Убираем активный класс
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Добавляем активный класс
            btn.classList.add('active');
            document.getElementById(`${tabName}Tab`).classList.add('active');
        });
    });
    
    // Сохранение и сброс
    document.getElementById('saveBtn').addEventListener('click', () => {
        player.save();
        addCombatLog('✓ Игра сохранена', 'system');
    });
    
    document.getElementById('resetBtn').addEventListener('click', () => {
        if (confirm('Вы уверены, что хотите сбросить весь прогресс?')) {
            combatSystem.stop();
            player.reset();
            initializeGame();
            addCombatLog('🔄 Игра сброшена', 'system');
        }
    });
}