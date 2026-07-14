# Taser & Blackmarket Mod (泰瑟枪与黑市)

为《Degrees of Lewdity》添加一把可购买的泰瑟枪（电击枪），并提供完整的黑市购买、充能及战斗系统。

## 功能特性
- 新增战斗动作“使用泰瑟枪”，在战斗中造成 200-400 点伤害。
- 3% 的真实卡壳概率（扣减电量但不造成伤害），增加战斗不确定性。
- 最大 3 发充能，电量耗尽后战斗动作自动隐藏。
- 在倒钩街（Barb Street）新增黑市入口，可购买泰瑟枪（附赠 3 发）或单独购买充能电池。
- 提供 `window.taserMod` 全局 API，便于其他 Mod 调用。

## 安装方法
1. 确保已安装 **[ModLoader](https://github.com/Lyoko-Jeremie/DoLModLoaderBuild)** 和 **[maplebirchFramework](https://github.com/MaplebirchLeaf/SCML-DOL-maplebirchFramework)**。
2. 将 `TASER.mod.zip` 放入游戏根目录的 `mods` 文件夹。
3. 启动游戏，在左下角“Mod管理器”中启用本 Mod。

## 使用指南
- **获取泰瑟枪**：前往倒钩街，点击页面底部的“钻入防火梯下的阴影”进入黑市。
- **购买价格**：泰瑟枪 ￡600（附赠 3 发），充能电池 ￡150（+3 发）。
- **战斗使用**：战斗中点击“使用泰瑟枪”动作，消耗 1 发充能。
- **状态查看**：进入黑市时自动显示当前持枪状态及剩余电量。

## 依赖项
- [maplebirchFramework](https://github.com/MaplebirchLeaf/SCML-DOL-maplebirchFramework) (>= 1.0.0)
- [ModLoader](https://github.com/Lyoko-Jeremie/DoLModLoaderBuild)

## 开发者 API
本 Mod 暴露 `window.taserMod` 对象，包含以下方法：
- `setTaserOwned(charges)` ：获得泰瑟枪并设置初始电量（默认 3）。
- `chargeTaser(charges)` ：增加电量（不超过最大容量）。
- `hasTaserGun()` ：返回是否拥有泰瑟枪。
- `hasCharge()` ：返回是否有剩余电量。
- `getTaserCharges()` ：返回当前电量数值。

## 许可证
本 Mod 采用 **GNU General Public License v3.0 (GPLv3)** 授权。
您可以在 [https://www.gnu.org/licenses/gpl-3.0.html](https://www.gnu.org/licenses/gpl-3.0.html) 查看完整许可证文本。

## 版本历史
- v1.0.0 (2026-07-14) ：初始版本，包含核心战斗动作与黑市系统。