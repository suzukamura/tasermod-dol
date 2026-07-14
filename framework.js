/*
 * Taser Mod (泰瑟枪模组)
 * Copyright (C) 2024 [Suzuka]
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

(function () {
  'use strict';

  // ============ 常量 ============
  const MAX_CHARGES = 3;
  const JAM_RATE = 3; // 3% 卡壳概率

  // ============ 状态管理 ============

  const getState = () => {
    if (typeof V !== 'undefined' && V) return V;
    if (typeof window !== 'undefined' && window.V) return window.V;
    return null;
  };

  const ensureTaserState = () => {
    const state = getState();
    if (!state) return;

    // 迁移旧字段名（兼容 VSCode AI 版本的变量名）
    if (state.taserOwned !== undefined && state.hasTaser === undefined) {
      state.hasTaser = state.taserOwned;
      delete state.taserOwned;
    }
    if (state.taserCharges !== undefined && state.taserCharge === undefined) {
      state.taserCharge = state.taserCharges;
      delete state.taserCharges;
    }

    // 初始化默认值
    if (state.hasTaser === undefined) state.hasTaser = false;
    if (state.taserCharge === undefined) state.taserCharge = 0;
  };

  const setTaserOwned = (charges) => {
    const state = getState();
    if (!state) return;
    state.hasTaser = true;
    const c = charges !== undefined ? charges : MAX_CHARGES;
    state.taserCharge = Math.max(0, Math.min(MAX_CHARGES, c));
  };

  const chargeTaser = (charges) => {
    const state = getState();
    if (!state) return;
    const c = charges !== undefined ? charges : 1;
    state.taserCharge = Math.max(0, Math.min(MAX_CHARGES, state.taserCharge + c));
  };

  const consumeCharge = () => {
    const state = getState();
    if (!state) return;
    if (state.taserCharge > 0) state.taserCharge--;
  };

  const hasTaserGun = () => {
    const state = getState();
    return state ? !!state.hasTaser : false;
  };

  const hasCharge = () => {
    const state = getState();
    return state ? state.taserCharge > 0 : false;
  };

  const getTaserCharges = () => {
    const state = getState();
    return state ? state.taserCharge : 0;
  };

  // ============ 注册逻辑 ============

  const init = () => {
    if (typeof maplebirch === 'undefined') {
      console.error('[泰瑟枪Mod] maplebirch 框架未加载，模组无法工作');
      return;
    }

    // ---- 注册战斗按钮 ----
    // API: maplebirch.combat.CombatAction.reg(config)
    // 文档: docs/CN/Combat/Actions.md
    if (maplebirch.combat && maplebirch.combat.CombatAction) {
      maplebirch.combat.CombatAction.reg({
        id: 'taserMod.useTaser',
        actionType: 'leftaction',
        cond: () => {
          const s = getState();
          return s && s.hasTaser === true && s.taserCharge > 0;
        },
        display: () => '使用泰瑟枪',
        value: () => 'taserModUseTaser',
        color: 'brat',
        difficulty: () => '<span class="green">(远程)</span>',
        effect: '<<taserModTaserEffect>>',
        order: 2
      });
      console.log('[泰瑟枪Mod] 战斗按钮已注册');
    } else {
      console.error('[泰瑟枪Mod] maplebirch.combat.CombatAction 不可用');
    }

    // ---- 注册黑市入口 widget ----
    // API: maplebirch.tool.addTo(zone, widgetOrConfig)
    // 文档: docs/CN/ToolCollection/Framework.md
    // AfterLinkZone = 链接区之后; passage 字段限制只在 Barb Street 显示
    if (maplebirch.tool && typeof maplebirch.tool.addTo === 'function') {
      maplebirch.tool.addTo('AfterLinkZone', {
        widget: 'TaserModBlackmarketLink',
        passage: ['Barb Street']
      });
      console.log('[泰瑟枪Mod] 黑市入口已注册');
    } else {
      console.error('[泰瑟枪Mod] maplebirch.tool.addTo 不可用');
    }

    // ---- 初始化状态 ----
    // onInit 在 StoryInit 时机执行，此时 V 变量已就绪
    if (typeof maplebirch.tool.onInit === 'function') {
      maplebirch.tool.onInit(() => {
        ensureTaserState();
      });
    }

    // ---- 读档后修复状态 ----
    maplebirch.on(':onLoad', () => {
      ensureTaserState();
    });

    console.log('[泰瑟枪Mod] 模组已加载');
  };

  // ============ 暴露 API ============
  window.taserMod = {
    ensureTaserState,
    setTaserOwned,
    chargeTaser,
    consumeCharge,
    hasTaserGun,
    hasCharge,
    getTaserCharges
  };

  // ============ 执行初始化 ============
  init();
})();
