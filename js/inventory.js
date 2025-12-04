// Absolute RPG - Inventory Management
// Управление инвентарём и магазином

function updateInventoryDisplay() {
    const inventoryList = document.getElementById('inventoryList');
    inventoryList.innerHTML = '';
    
    if (player.inventory.length === 0) {
        inventoryList.innerHTML = '<p class="empty-text">Инвентарь пуст</p>';
        return;
    }
    
    player.inventory.forEach((item, index) => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        itemCard.style.borderLeft = `3px solid ${item.quality.color}`;
        
        const itemInfo = document.createElement('div');
        itemInfo.className = 'item-info';
        
        const itemName = document.createElement('div');
        itemName.className = 'item-name';
        itemName.style.color = item.quality.color;
        itemName.textContent = `${item.icon} ${item.name}`;
        
        const itemStats = document.createElement('div');
        itemStats.className = 'item-stats';
        itemStats.textContent = getItemDescription(item);
        
        itemInfo.appendChild(itemName);
        itemInfo.appendChild(itemStats);
        
        const itemActions = document.createElement('div');
        itemActions.className = 'item-actions';
        
        if (item.type === ITEM_TYPE.POTION) {
            const useBtn = document.createElement('button');
            useBtn.className = 'btn btn-success btn-small';
            useBtn.textContent = 'Исп.';
            useBtn.onclick = () => usePotion(index);
            itemActions.appendChild(useBtn);
        } else if (item.type !== ITEM_TYPE.MATERIAL) {
            const equipBtn = document.createElement('button');
            equipBtn.className = 'btn btn-primary btn-small';
            equipBtn.textContent = 'Надеть';
            equipBtn.onclick = () => equipItem(index);
            itemActions.appendChild(equipBtn);
        }
        
        itemCard.appendChild(itemInfo);
        itemCard.appendChild(itemActions);
        inventoryList.appendChild(itemCard);
    });
}

function updateShopDisplay() {
    const shopList = document.getElementById('shopList');
    const shopGold = document.getElementById('shopGold');
    
    shopGold.textContent = player.gold;
    shopList.innerHTML = '';
    
    const items = getShopItems(player.level);
    
    items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        itemCard.style.borderLeft = `3px solid ${item.quality.color}`;
        
        const itemInfo = document.createElement('div');
        itemInfo.className = 'item-info';
        
        const itemName = document.createElement('div');
        itemName.className = 'item-name';
        itemName.style.color = item.quality.color;
        itemName.textContent = `${item.icon} ${item.name}`;
        
        const itemStats = document.createElement('div');
        itemStats.className = 'item-stats';
        itemStats.textContent = getItemDescription(item);
        
        const itemPrice = document.createElement('div');
        itemPrice.className = 'item-stats';
        itemPrice.innerHTML = `<strong>💰 ${item.price}</strong>`;
        
        itemInfo.appendChild(itemName);
        itemInfo.appendChild(itemStats);
        itemInfo.appendChild(itemPrice);
        
        const itemActions = document.createElement('div');
        itemActions.className = 'item-actions';
        
        const buyBtn = document.createElement('button');
        buyBtn.className = 'btn btn-success btn-small';
        buyBtn.textContent = 'Купить';
        buyBtn.disabled = player.gold < item.price;
        buyBtn.onclick = () => buyItem(item);
        itemActions.appendChild(buyBtn);
        
        itemCard.appendChild(itemInfo);
        itemCard.appendChild(itemActions);
        shopList.appendChild(itemCard);
    });
}

function equipItem(index) {
    if (player.equipItem(index)) {
        updateInventoryDisplay();
        updateEquipmentDisplay();
        updatePlayerStats();
        addCombatLog(`✓ Предмет экипирован`, 'system');
    }
}

function unequipItem(slot) {
    if (player.unequipItem(slot)) {
        updateInventoryDisplay();
        updateEquipmentDisplay();
        updatePlayerStats();
        addCombatLog(`✓ Предмет снят`, 'system');
    }
}

function usePotion(index) {
    const result = player.useItem(index);
    if (result.success) {
        updateInventoryDisplay();
        updatePlayerStats();
        addCombatLog(`🧪 ${result.message}`, 'system');
    }
}

function buyItem(item) {
    if (player.spendGold(item.price)) {
        player.addItem({ ...item });
        player.save();
        updateInventoryDisplay();
        updateShopDisplay();
        updatePlayerStats();
        addCombatLog(`🛍️ Куплено: ${item.name}`, 'system');
    } else {
        addCombatLog(`❌ Недостаточно золота!`, 'system');
    }
}

function updateEquipmentDisplay() {
    const weaponSlot = document.getElementById('weaponSlot');
    const armorSlot = document.getElementById('armorSlot');
    const accessorySlot = document.getElementById('accessorySlot');
    
    weaponSlot.textContent = player.equipment.weapon 
        ? `${player.equipment.weapon.icon} ${player.equipment.weapon.name}` 
        : 'Нет';
    weaponSlot.style.color = player.equipment.weapon 
        ? player.equipment.weapon.quality.color 
        : 'var(--text-secondary)';
    
    armorSlot.textContent = player.equipment.armor 
        ? `${player.equipment.armor.icon} ${player.equipment.armor.name}` 
        : 'Нет';
    armorSlot.style.color = player.equipment.armor 
        ? player.equipment.armor.quality.color 
        : 'var(--text-secondary)';
    
    accessorySlot.textContent = player.equipment.accessory 
        ? `${player.equipment.accessory.icon} ${player.equipment.accessory.name}` 
        : 'Нет';
    accessorySlot.style.color = player.equipment.accessory 
        ? player.equipment.accessory.quality.color 
        : 'var(--text-secondary)';
    
    // Добавляем обработчики клика для снятия
    [weaponSlot, armorSlot, accessorySlot].forEach((slot, index) => {
        const slotType = ['weapon', 'armor', 'accessory'][index];
        slot.onclick = () => {
            if (player.equipment[slotType]) {
                unequipItem(slotType);
            }
        };
        slot.style.cursor = player.equipment[slotType] ? 'pointer' : 'default';
    });
}