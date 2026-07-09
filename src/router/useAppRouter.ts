import { useIonRouter } from '@ionic/vue';

/**
 * ============================================================
 *  useIonRouter() 完整 API 速查
 * ============================================================
 *
 *  interface UseIonRouterResult {
 *    canGoBack(deep?: number): boolean
 *    push(location, animation?)
 *    replace(location, animation?)
 *    back(animation?)
 *    forward(animation?)
 *    navigate(location, direction?, action?, animation?): void
 *  }
 *
 * ── routerDirection（动画方向 + 栈行为）─────────────────────
 *  'forward'  从右向左滑入动画    往 Ionic 内部栈推一层
 *  'back'     从左向右滑出动画    从 Ionic 内部栈弹一层
 *  'root'     无过渡动画          不推不弹，原地替换
 *
 * ── routerAction（浏览器历史记录操作）───────────────────────
 *  'push'     往 history 加一条记录（回退可回到前一页）
 *  'pop'      从 history 弹一条记录（等同于 back）
 *  'replace'  原地替换当前 history 记录（不新增，回退跳过本页）
 *
 * ── 快捷方法等价关系 ─────────────────────────────────────────
 *  push(loc)     = navigate(loc, 'forward', 'push')
 *  replace(loc)  = navigate(loc, 'root',    'replace')
 *  back()        = navigate(prev, 'back',   'pop')
 *
 * ── 典型场景 ─────────────────────────────────────────────────
 *  页面跳转（需保留回退）:  navigate(url, 'forward', 'push')
 *  替换当前页（登录后）:    navigate(url, 'root',    'replace')
 *  切换 tab:               navigate(url, 'root',    'replace')
 *  返回上一页:             back()
 * ============================================================
 */

/**
 * 统一路由跳转，全部走 useIonRouter，不混用 vue-router：
 * - push     → ionRouter.push     (navigate 'forward' + 'push')
 * - replace  → ionRouter.replace  (navigate 'root'    + 'replace')
 * - back     → ionRouter.back     (navigate 'back'    + 'pop')
 * - switchTab → ionRouter.navigate (root + push)
 */
export function useAppRouter() {
  const ionRouter = useIonRouter();

  /** 前进，往 history 加一条记录 */
  const push = (path: string) => ionRouter.push(path);

  /** 替换当前页，不新增 history */
  const replace = (path: string) => ionRouter.replace(path);

  /** 返回：栈空时跳兜底路由 */
  const back = (fallback = '/tabs/home') => {
    if (ionRouter.canGoBack()) {
      ionRouter.back();
    } else {
      ionRouter.replace(fallback);
    }
  };

  /** 能否回退 */
  const canGoBack = () => ionRouter.canGoBack();

  /**
   * 切换 tab
   * direction='root'  → 不推 Ionic 内部栈（避免重复切换卡死）
   * action='push'     → 往浏览器历史加记录（可通过回退键回到之前 tab）
   */
  const switchTab = (tab: string) => {
    ionRouter.navigate(`/tabs/${tab}`, 'root', 'push');
  };

  return { push, replace, back, canGoBack, switchTab };
}
