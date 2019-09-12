/**
 *   全局导航跳转工具类
 */
export default class NavigationUtil {
    /**
     * 跳转页面
     * @param {*} params 传递的参数
     * @param {*} page 跳转的页面
     */
    static goPage(params, page) {
        const navigation = NavigationUtil.navigation;
        if (!navigation) {
            console.log('NavigationUtil.navigation can not be null')
            return;
        }
        navigation.navigate(page, { ...params })
    }
    /**
     * 返回上一页
     * @param {*} navigation 
     */
    static goBack(navigation) {
        navigation.goBack()
    }
    /**
     * 重置到首页
     * @param {*} params 
     */
    static resetToHomePage(params) {
        const { navigation } = params;
        navigation.navigate("Main")
    }
}

